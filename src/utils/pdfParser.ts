/**
 * Client-side PDF parser using pdf.js
 * All processing happens in the browser - no data is sent to any server
 */

import { VALIDATION_CONSTRAINTS } from './constants';

export async function parsePDF(file: File): Promise<string> {
  // Validate file size
  if (file.size > VALIDATION_CONSTRAINTS.MAX_PDF_FILE_SIZE) {
    throw new Error(
      `PDF file is too large (${Math.round(file.size / 1024 / 1024)}MB). ` +
      `Maximum size is ${Math.round(VALIDATION_CONSTRAINTS.MAX_PDF_FILE_SIZE / 1024 / 1024)}MB.`
    );
  }

  // Validate file type
  if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
    throw new Error('File must be a PDF. Please upload a valid PDF file.');
  }

  try {
    const pdfjsLib = await import('pdfjs-dist');

    // Set worker source
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      throw new Error('PDF file appears to be empty or corrupted.');
    }

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    if (pdf.numPages === 0) {
      throw new Error('PDF file has no pages.');
    }

    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n\n';
      } catch (pageError) {
        console.warn(`Failed to extract text from page ${i}:`, pageError);
        // Continue with other pages even if one fails
      }
    }

    if (!fullText || fullText.trim().length === 0) {
      throw new Error(
        'No text could be extracted from the PDF. ' +
        'Ensure the PDF contains searchable text (not just images).'
      );
    }

    return fullText.trim();
  } catch (error) {
    if (error instanceof Error) {
      // Re-throw known errors with user-friendly messages
      if (error.message.includes('not a valid PDF')) {
        throw new Error('The file does not appear to be a valid PDF.');
      }
      if (error.message.includes('Password')) {
        throw new Error('This PDF is password-protected. Please provide an unencrypted PDF.');
      }
      throw error;
    }
    throw new Error('Failed to parse PDF file. Please ensure it is a valid, unencrypted PDF.');
  }
}

export function extractSections(text: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const sectionHeaders = [
    'summary', 'objective', 'profile', 'about',
    'experience', 'work history', 'employment',
    'education', 'academic',
    'skills', 'technical skills', 'competencies',
    'projects', 'portfolio',
    'certifications', 'certificates',
    'achievements', 'awards',
    'publications', 'research',
    'volunteer', 'community',
    'references'
  ];

  const lines = text.split('\n');
  let currentSection = 'header';
  sections[currentSection] = '';

  for (const line of lines) {
    const lowerLine = line.toLowerCase().trim();
    const matchedHeader = sectionHeaders.find(header =>
      lowerLine === header ||
      lowerLine.startsWith(header + ':') ||
      lowerLine.startsWith(header + ' ')
    );

    if (matchedHeader && line.trim().length < 50) {
      currentSection = matchedHeader;
      sections[currentSection] = '';
    } else {
      sections[currentSection] = (sections[currentSection] || '') + line + '\n';
    }
  }

  return sections;
}

export function extractContactInfo(text: string): {
  email: string | null;
  phone: string | null;
  name: string | null;
  linkedin: string | null;
} {
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);

  // First non-empty line is likely the name
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  const name = lines.length > 0 ? lines[0].trim() : null;

  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    name: name && name.length < 50 ? name : null,
    linkedin: linkedinMatch ? linkedinMatch[0] : null
  };
}
