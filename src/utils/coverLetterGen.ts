/**
 * Cover Letter Generator
 * Template-based generation using resume data and job description
 * No AI/API dependency - works entirely client-side
 */

import { coverLetterTemplates, generateCoverLetter, type CoverLetterData } from '../data/coverLetterTemplates';

export interface CoverLetterInput {
  resumeText: string;
  jobDescription: string;
  templateId: string;
  fullName?: string;
  hiringManager?: string;
  companyName?: string;
  jobTitle?: string;
}

export interface CoverLetterOutput {
  letter: string;
  templateUsed: string;
  wordCount: number;
  suggestions: string[];
}

export function generateCoverLetterFromInputs(input: CoverLetterInput): CoverLetterOutput {
  // Extract info from job description
  const extractedInfo = extractJobInfo(input.jobDescription);
  const resumeInfo = extractResumeInfo(input.resumeText);

  // Build template data
  const data: Partial<CoverLetterData> = {
    full_name: input.fullName || resumeInfo.name || '[Your Name]',
    hiring_manager: input.hiringManager || 'Hiring Manager',
    job_title: input.jobTitle || extractedInfo.jobTitle || '[Position]',
    company_name: input.companyName || extractedInfo.companyName || '[Company]',
    years_experience: resumeInfo.yearsExperience || '5+',
    industry: extractedInfo.industry || 'technology',
    current_role: resumeInfo.currentRole || '[Your Current Role]',
    technical_skills: resumeInfo.topSkills.join(', ') || '[Your Key Skills]',
    relevant_expertise: resumeInfo.topSkills.slice(0, 3).join(', ') || '[Your Expertise]',
    company_focus: extractedInfo.focus || 'innovation',
    key_achievement: resumeInfo.topAchievement || 'driving measurable results',
    resumeText: input.resumeText,
    jobDescription: input.jobDescription
  };

  // Generate the letter
  const letter = generateCoverLetter(input.templateId, data);
  const wordCount = letter.split(/\s+/).length;

  // Generate suggestions
  const suggestions = generateLetterSuggestions(letter, input);

  return {
    letter,
    templateUsed: input.templateId,
    wordCount,
    suggestions
  };
}

function extractJobInfo(jobDescription: string): {
  jobTitle: string | null;
  companyName: string | null;
  industry: string | null;
  focus: string | null;
} {
  const lines = jobDescription.split('\n').filter(l => l.trim());

  // Try to find job title (usually in first few lines)
  let jobTitle: string | null = null;
  const titlePatterns = [
    /(?:job\s*title|position|role)\s*[:]\s*(.+)/i,
    /^(.+?)\s*(?:at|@)\s+/i,
  ];
  for (const pattern of titlePatterns) {
    const match = jobDescription.match(pattern);
    if (match) {
      jobTitle = match[1].trim();
      break;
    }
  }
  if (!jobTitle && lines.length > 0) {
    // First line might be the title
    const firstLine = lines[0].trim();
    if (firstLine.length < 80) {
      jobTitle = firstLine;
    }
  }

  // Try to find company name
  let companyName: string | null = null;
  const companyPatterns = [
    /(?:company|organization|employer)\s*[:]\s*(.+)/i,
    /(?:at|@)\s+([A-Z][A-Za-z\s&]+)/,
    /(?:about|join)\s+([A-Z][A-Za-z\s&]+)/i,
  ];
  for (const pattern of companyPatterns) {
    const match = jobDescription.match(pattern);
    if (match) {
      companyName = match[1].trim();
      break;
    }
  }

  // Detect industry
  const industryKeywords: Record<string, string[]> = {
    'technology': ['software', 'tech', 'saas', 'platform', 'digital'],
    'finance': ['fintech', 'banking', 'financial', 'investment', 'trading'],
    'healthcare': ['health', 'medical', 'clinical', 'patient', 'pharma'],
    'education': ['education', 'learning', 'academic', 'university', 'school'],
    'e-commerce': ['ecommerce', 'retail', 'marketplace', 'shopping', 'merchant']
  };

  let industry: string | null = null;
  const jdLower = jobDescription.toLowerCase();
  for (const [ind, keywords] of Object.entries(industryKeywords)) {
    if (keywords.some(kw => jdLower.includes(kw))) {
      industry = ind;
      break;
    }
  }

  return { jobTitle, companyName, industry, focus: industry };
}

function extractResumeInfo(resumeText: string): {
  name: string | null;
  currentRole: string | null;
  yearsExperience: string | null;
  topSkills: string[];
  topAchievement: string | null;
} {
  const lines = resumeText.split('\n').filter(l => l.trim());

  // Name is usually first line
  const name = lines.length > 0 && lines[0].trim().length < 50
    ? lines[0].trim()
    : null;

  // Try to find current role
  let currentRole: string | null = null;
  const rolePatterns = [
    /(?:senior|lead|principal|staff|junior|mid)?\s*(?:\w+\s*){1,3}(?:engineer|developer|designer|manager|analyst|architect|scientist|consultant)/i,
  ];
  for (const line of lines.slice(0, 5)) {
    for (const pattern of rolePatterns) {
      const match = line.match(pattern);
      if (match) {
        currentRole = match[0].trim();
        break;
      }
    }
    if (currentRole) break;
  }

  // Estimate years of experience from dates
  const yearMatches = resumeText.match(/\b(20\d{2}|19\d{2})\b/g);
  let yearsExperience: string | null = null;
  if (yearMatches && yearMatches.length >= 2) {
    const years = yearMatches.map(Number).sort();
    const span = years[years.length - 1] - years[0];
    yearsExperience = span > 0 ? `${span}+` : null;
  }

  // Extract skills (look for technical terms)
  const skillPatterns = /\b(javascript|typescript|python|java|react|angular|vue|node\.?js|aws|docker|kubernetes|sql|git|agile|scrum|figma|tableau|excel)\b/gi;
  const skillMatches = resumeText.match(skillPatterns) || [];
  const topSkills = [...new Set(skillMatches.map(s => s.trim()))].slice(0, 6);

  // Find a quantified achievement
  let topAchievement: string | null = null;
  for (const line of lines) {
    if (/\d+%|\$[\d,]+|\d+x/.test(line) && line.length > 20) {
      topAchievement = line.trim().slice(0, 100);
      break;
    }
  }

  return { name, currentRole, yearsExperience, topSkills, topAchievement };
}

function generateLetterSuggestions(letter: string, input: CoverLetterInput): string[] {
  const suggestions: string[] = [];

  const wordCount = letter.split(/\s+/).length;
  if (wordCount < 200) {
    suggestions.push('Cover letter seems short. Consider adding more specific examples from your experience.');
  }
  if (wordCount > 500) {
    suggestions.push('Cover letter is quite long. Aim for 250-400 words for best impact.');
  }

  if (letter.includes('[Your Name]') || letter.includes('[Company]')) {
    suggestions.push('Fill in all placeholder fields for a polished letter.');
  }

  if (!input.companyName) {
    suggestions.push('Adding the company name makes the letter feel personalized.');
  }

  if (!input.hiringManager || input.hiringManager === 'Hiring Manager') {
    suggestions.push('Try to find the hiring manager\'s name on LinkedIn for a personal touch.');
  }

  return suggestions;
}

export function getAvailableTemplates() {
  return coverLetterTemplates.map(t => ({
    id: t.id,
    name: t.name,
    description: t.description,
    tone: t.tone
  }));
}
