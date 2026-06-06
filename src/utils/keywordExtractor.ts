/**
 * Keyword Extractor & Analyzer
 * Extracts, categorizes, and suggests keywords for resume optimization
 */

import { actionVerbs, getAllVerbs } from '../data/actionVerbs';
import { 
  COMMON_STOP_WORDS, 
  VALIDATION_CONSTRAINTS, 
  sanitizeInput, 
  isValidInput 
} from './constants';

export interface KeywordAnalysis {
  hardSkills: string[];
  softSkills: string[];
  actionVerbsFound: string[];
  missingActionVerbs: string[];
  industryTerms: string[];
  overusedWords: string[];
  keywordDensity: Record<string, number>;
  suggestions: string[];
  score: number;
}

const SOFT_SKILLS = [
  'communication', 'leadership', 'teamwork', 'problem-solving', 'critical thinking',
  'adaptability', 'creativity', 'time management', 'collaboration', 'interpersonal',
  'negotiation', 'conflict resolution', 'decision-making', 'emotional intelligence',
  'mentoring', 'public speaking', 'customer service', 'flexibility', 'initiative',
  'self-motivated', 'detail-oriented', 'analytical', 'strategic', 'innovative',
  'proactive', 'results-driven', 'cross-functional', 'stakeholder management'
];

const TECH_SKILLS_PATTERNS = [
  // Programming languages
  /\b(javascript|typescript|python|java|c\+\+|c#|ruby|php|go|rust|swift|kotlin|scala|r)\b/gi,
  // Frameworks
  /\b(react|angular|vue|next\.?js|node\.?js|express|django|flask|spring|rails|laravel|\.net)\b/gi,
  // Cloud & DevOps
  /\b(aws|azure|gcp|docker|kubernetes|terraform|jenkins|ci\/cd|git|github|gitlab)\b/gi,
  // Databases
  /\b(sql|mysql|postgresql|mongodb|redis|elasticsearch|dynamodb|cassandra|oracle)\b/gi,
  // Tools & Platforms
  /\b(jira|confluence|slack|figma|tableau|power\s?bi|salesforce|hubspot|sap)\b/gi,
  // Methodologies
  /\b(agile|scrum|kanban|devops|tdd|bdd|ci\/cd|microservices|rest|graphql|api)\b/gi,
];

/**
 * Creates a default analysis result when validation fails
 */
function createDefaultAnalysis(message: string): KeywordAnalysis {
  return {
    hardSkills: [],
    softSkills: [],
    actionVerbsFound: [],
    missingActionVerbs: [],
    industryTerms: [],
    overusedWords: [],
    keywordDensity: {},
    suggestions: [message],
    score: 0
  };
}

export function analyzeKeywords(resumeText: string, jobDescription?: string): KeywordAnalysis {
  // Validate input
  const sanitizedResume = sanitizeInput(resumeText);
  if (!isValidInput(sanitizedResume, VALIDATION_CONSTRAINTS.MIN_RESUME_LENGTH)) {
    return createDefaultAnalysis('Resume must have at least 50 characters');
  }

  const resumeLower = sanitizedResume.toLowerCase();
  const allActionVerbs = getAllVerbs();

  // Find action verbs used
  const actionVerbsFound = allActionVerbs.filter(verb =>
    resumeLower.includes(verb.toLowerCase())
  );

  // Suggest missing action verbs (from underrepresented categories)
  const verbCategoriesUsed = new Set<string>();
  for (const cat of actionVerbs) {
    if (cat.verbs.some(v => resumeLower.includes(v))) {
      verbCategoriesUsed.add(cat.category);
    }
  }
  const missingCategories = actionVerbs.filter(cat => !verbCategoriesUsed.has(cat.category));
  const missingActionVerbs = missingCategories.flatMap(cat => cat.verbs.slice(0, 3));

  // Extract hard skills
  const hardSkills: string[] = [];
  for (const pattern of TECH_SKILLS_PATTERNS) {
    const matches = resumeText.match(pattern) || [];
    hardSkills.push(...matches.map(m => m.trim()));
  }
  const uniqueHardSkills = [...new Set(hardSkills.map(s => s.toLowerCase()))];

  // Find soft skills
  const softSkills = SOFT_SKILLS.filter(skill => resumeLower.includes(skill));

  // Calculate keyword density (limited to prevent memory issues)
  const words = resumeLower.split(/\s+/);
  const wordFreq: Record<string, number> = {};

  for (const word of words) {
    if (word.length > 3 && !COMMON_STOP_WORDS.has(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  }

  // Limit keywordDensity output to top entries to prevent memory bloat
  const keywordDensity = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, VALIDATION_CONSTRAINTS.MAX_KEYWORD_DENSITY_ENTRIES)
    .reduce((acc, [word, freq]) => {
      acc[word] = freq;
      return acc;
    }, {} as Record<string, number>);

  // Find overused words (appearing more than 5 times)
  const overusedWords = Object.entries(wordFreq)
    .filter(([_, freq]) => freq > 5)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);

  // Industry terms (words that appear in job description but not common)
  const industryTerms: string[] = [];
  if (jobDescription) {
    const sanitizedJobDesc = sanitizeInput(jobDescription);
    const jdWords = sanitizedJobDesc.toLowerCase().split(/\s+/);
    const jdFreq: Record<string, number> = {};
    for (const word of jdWords) {
      if (word.length > 3 && !COMMON_STOP_WORDS.has(word)) {
        jdFreq[word] = (jdFreq[word] || 0) + 1;
      }
    }
    const topJdTerms = Object.entries(jdFreq)
      .filter(([_, freq]) => freq >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word]) => word);

    industryTerms.push(...topJdTerms.filter(term => !resumeLower.includes(term)));
  }

  // Generate suggestions
  const suggestions = generateKeywordSuggestions(
    uniqueHardSkills, softSkills, actionVerbsFound,
    overusedWords, industryTerms, words.length
  );

  // Calculate score
  const score = calculateKeywordScore(
    uniqueHardSkills.length, softSkills.length,
    actionVerbsFound.length, overusedWords.length, words.length
  );

  return {
    hardSkills: uniqueHardSkills,
    softSkills,
    actionVerbsFound,
    missingActionVerbs: missingActionVerbs.slice(0, 10),
    industryTerms,
    overusedWords,
    keywordDensity,
    suggestions,
    score
  };
}

function generateKeywordSuggestions(
  hardSkills: string[],
  softSkills: string[],
  verbsFound: string[],
  overused: string[],
  industryTerms: string[],
  wordCount: number
): string[] {
  const suggestions: string[] = [];

  if (hardSkills.length < 5) {
    suggestions.push('Add more technical skills. Aim for at least 8-12 relevant hard skills.');
  }

  if (softSkills.length < 3) {
    suggestions.push('Include more soft skills like leadership, communication, or problem-solving.');
  }

  if (verbsFound.length < 5) {
    suggestions.push('Use more action verbs to start your bullet points (e.g., "Developed", "Led", "Optimized").');
  }

  if (overused.length > 3) {
    suggestions.push(`Vary your vocabulary. These words are overused: ${overused.slice(0, 3).join(', ')}`);
  }

  if (industryTerms.length > 5) {
    suggestions.push(`Consider adding these industry terms from the job description: ${industryTerms.slice(0, 5).join(', ')}`);
  }

  if (wordCount < 250) {
    suggestions.push('Your resume seems sparse. Add more detail about your achievements and responsibilities.');
  }

  if (wordCount > 800) {
    suggestions.push('Your resume is quite long. Focus on the most relevant and impactful experiences.');
  }

  return suggestions;
}

function calculateKeywordScore(
  hardSkillCount: number,
  softSkillCount: number,
  verbCount: number,
  overusedCount: number,
  wordCount: number
): number {
  let score = 50; // Base score

  // Hard skills (up to +20)
  score += Math.min(20, hardSkillCount * 2);

  // Soft skills (up to +10)
  score += Math.min(10, softSkillCount * 2);

  // Action verbs (up to +15)
  score += Math.min(15, verbCount * 2);

  // Penalize overused words (-2 each, up to -10)
  score -= Math.min(10, overusedCount * 2);

  // Length bonus/penalty
  if (wordCount >= 300 && wordCount <= 700) {
    score += 5;
  } else if (wordCount < 150 || wordCount > 1000) {
    score -= 5;
  }

  return Math.min(100, Math.max(0, score));
}
