/**
 * ATS Scoring Engine
 * Compares resume text against job description to calculate match score
 * All processing is client-side for privacy
 */

import { calculateATSScore } from '../data/atsRules';

export interface ATSResult {
  overallScore: number;
  keywordScore: number;
  formatScore: number;
  contentScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  detailedResults: Array<{
    category: string;
    name: string;
    score: number;
    maxScore: number;
    feedback: string;
    passed: boolean;
  }>;
}

export function scoreResume(resumeText: string, jobDescription: string): ATSResult {
  // Get base ATS score from rules
  const baseResults = calculateATSScore(resumeText);

  // Calculate keyword matching
  const keywordResult = calculateKeywordMatch(resumeText, jobDescription);

  // Calculate category scores
  const formatResults = baseResults.results.filter(r => r.rule.category === 'Format' || r.rule.category === 'ATS Compatibility');
  const contentResults = baseResults.results.filter(r => r.rule.category === 'Content');

  const formatScore = Math.round(
    (formatResults.reduce((sum, r) => sum + r.result.score, 0) /
      formatResults.reduce((sum, r) => sum + r.rule.weight, 0)) * 100
  );

  const contentScore = Math.round(
    (contentResults.reduce((sum, r) => sum + r.result.score, 0) /
      contentResults.reduce((sum, r) => sum + r.rule.weight, 0)) * 100
  );

  // Overall score is weighted combination
  const overallScore = Math.round(
    keywordResult.score * 0.45 +
    formatScore * 0.25 +
    contentScore * 0.30
  );

  // Generate suggestions
  const suggestions = generateSuggestions(baseResults, keywordResult, resumeText);

  const detailedResults = baseResults.results.map(r => ({
    category: r.rule.category,
    name: r.rule.name,
    score: r.result.score,
    maxScore: r.rule.weight,
    feedback: r.result.feedback,
    passed: r.result.passed
  }));

  // Add keyword result to detailed results
  detailedResults.unshift({
    category: 'Keywords',
    name: 'Job Description Match',
    score: Math.round(keywordResult.score / 4),
    maxScore: 25,
    feedback: `${keywordResult.matchedKeywords.length} of ${keywordResult.matchedKeywords.length + keywordResult.missingKeywords.length} keywords matched`,
    passed: keywordResult.score >= 60
  });

  return {
    overallScore: Math.min(100, Math.max(0, overallScore)),
    keywordScore: keywordResult.score,
    formatScore,
    contentScore,
    matchedKeywords: keywordResult.matchedKeywords,
    missingKeywords: keywordResult.missingKeywords,
    suggestions,
    detailedResults
  };
}

interface KeywordMatchResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
}

function calculateKeywordMatch(resumeText: string, jobDescription: string): KeywordMatchResult {
  // Extract important keywords from job description
  const jobKeywords = extractKeywords(jobDescription);
  const resumeLower = resumeText.toLowerCase();

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const keyword of jobKeywords) {
    if (resumeLower.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  }

  const totalKeywords = jobKeywords.length;
  const score = totalKeywords > 0
    ? Math.round((matchedKeywords.length / totalKeywords) * 100)
    : 0;

  return { score, matchedKeywords, missingKeywords };
}

function extractKeywords(text: string): string[] {
  // Common stop words to ignore
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'shall', 'can', 'need', 'must',
    'this', 'that', 'these', 'those', 'it', 'its', 'we', 'you', 'your',
    'our', 'their', 'who', 'which', 'what', 'where', 'when', 'how',
    'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other',
    'some', 'such', 'no', 'not', 'only', 'same', 'so', 'than', 'too',
    'very', 'just', 'about', 'above', 'after', 'again', 'also', 'any',
    'because', 'before', 'between', 'during', 'into', 'through',
    'ability', 'able', 'experience', 'work', 'working', 'team', 'role',
    'position', 'company', 'looking', 'seeking', 'required', 'preferred',
    'including', 'within', 'across', 'strong', 'excellent', 'good'
  ]);

  const words = text.toLowerCase()
    .replace(/[^a-z0-9\s\-\+\#\.\/]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));

  // Extract single words and common bigrams
  const wordFreq: Record<string, number> = {};
  for (const word of words) {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  }

  // Extract bigrams (two-word phrases)
  const cleanWords = text.toLowerCase()
    .replace(/[^a-z0-9\s\-\+\#\.\/]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1);

  for (let i = 0; i < cleanWords.length - 1; i++) {
    if (!stopWords.has(cleanWords[i]) && !stopWords.has(cleanWords[i + 1])) {
      const bigram = `${cleanWords[i]} ${cleanWords[i + 1]}`;
      wordFreq[bigram] = (wordFreq[bigram] || 0) + 1;
    }
  }

  // Sort by frequency and return top keywords
  const sorted = Object.entries(wordFreq)
    .filter(([word, freq]) => freq >= 1 && word.length > 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40)
    .map(([word]) => word);

  return sorted;
}

function generateSuggestions(
  baseResults: ReturnType<typeof calculateATSScore>,
  keywordResult: KeywordMatchResult,
  resumeText: string
): string[] {
  const suggestions: string[] = [];

  // Keyword suggestions
  if (keywordResult.missingKeywords.length > 0) {
    const topMissing = keywordResult.missingKeywords.slice(0, 5);
    suggestions.push(`Add these missing keywords: ${topMissing.join(', ')}`);
  }

  if (keywordResult.score < 50) {
    suggestions.push('Your resume matches less than 50% of job keywords. Tailor it more closely to the job description.');
  }

  // Format suggestions from rules
  for (const result of baseResults.results) {
    if (!result.result.passed) {
      suggestions.push(result.result.feedback);
    }
  }

  // Additional heuristic suggestions
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount < 200) {
    suggestions.push('Your resume seems too short. Consider adding more detail about your achievements.');
  }

  if (!/linkedin/i.test(resumeText)) {
    suggestions.push('Consider adding your LinkedIn profile URL.');
  }

  // Check for first person pronouns (ATS best practice is to avoid them)
  if (/\bI\b/.test(resumeText) && (resumeText.match(/\bI\b/g) || []).length > 5) {
    suggestions.push('Reduce first-person pronouns ("I"). Use action verbs at the start of bullet points instead.');
  }

  return suggestions.slice(0, 8); // Limit to 8 suggestions
}
