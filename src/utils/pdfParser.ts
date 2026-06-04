/**
 * Client-side PDF parser using pdf.js
 * All processing happens in the browser - no data is sent to any server
 */

export async function parsePDF(file: File): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist');

  // Set worker source
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n\n';
  }

  return fullText.trim();
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
