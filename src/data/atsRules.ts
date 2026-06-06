export interface ATSRule {
  id: string;
  category: string;
  name: string;
  description: string;
  weight: number;
  check: (text: string) => { passed: boolean; score: number; feedback: string };
}

export const atsRules: ATSRule[] = [
  {
    id: 'contact_info',
    category: 'Format',
    name: 'Contact Information',
    description: 'Resume includes email and phone number',
    weight: 10,
    check: (text: string) => {
      const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text);
      const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
      const score = (hasEmail ? 5 : 0) + (hasPhone ? 5 : 0);
      const missing = [];
      if (!hasEmail) missing.push('email');
      if (!hasPhone) missing.push('phone number');
      return {
        passed: score >= 8,
        score,
        feedback: missing.length > 0
          ? `Missing: ${missing.join(', ')}`
          : 'Contact information is complete'
      };
    }
  },
  {
    id: 'keyword_density',
    category: 'Keywords',
    name: 'Keyword Density',
    description: 'Resume contains relevant keywords from the job description',
    weight: 25,
    check: (_text: string) => {
      // This is dynamically calculated against job description
      return { passed: true, score: 0, feedback: 'Calculated dynamically' };
    }
  },
  {
    id: 'action_verbs',
    category: 'Content',
    name: 'Action Verbs',
    description: 'Uses strong action verbs to describe achievements',
    weight: 10,
    check: (text: string) => {
      const actionVerbs = [
        'achieved', 'improved', 'developed', 'managed', 'created',
        'designed', 'implemented', 'increased', 'reduced', 'led',
        'built', 'launched', 'delivered', 'optimized', 'streamlined',
        'established', 'generated', 'transformed', 'accelerated', 'spearheaded',
        'orchestrated', 'pioneered', 'resolved', 'negotiated', 'collaborated'
      ];
      const lowerText = text.toLowerCase();
      const found = actionVerbs.filter(verb => lowerText.includes(verb));
      const score = Math.min(10, found.length * 2);
      return {
        passed: score >= 6,
        score,
        feedback: found.length >= 3
          ? `Good use of action verbs (${found.length} found)`
          : `Add more action verbs. Found only: ${found.join(', ') || 'none'}`
      };
    }
  },
  {
    id: 'quantified_results',
    category: 'Content',
    name: 'Quantified Results',
    description: 'Includes measurable achievements with numbers',
    weight: 15,
    check: (text: string) => {
      const metrics = text.match(/\d+[%$+]|\$[\d,]+|\d+x|\d+\+/g) || [];
      const numbers = text.match(/\b\d{2,}\b/g) || [];
      const totalMetrics = metrics.length + Math.floor(numbers.length / 2);
      const score = Math.min(15, totalMetrics * 3);
      return {
        passed: score >= 9,
        score,
        feedback: totalMetrics >= 3
          ? `Good quantification (${totalMetrics} metrics found)`
          : 'Add more measurable results (%, $, numbers) to strengthen impact'
      };
    }
  },
  {
    id: 'section_headers',
    category: 'Format',
    name: 'Standard Sections',
    description: 'Contains standard resume sections (Experience, Education, Skills)',
    weight: 10,
    check: (text: string) => {
      const lowerText = text.toLowerCase();
      const sections = [
        { name: 'Experience', patterns: ['experience', 'work history', 'employment'] },
        { name: 'Education', patterns: ['education', 'academic', 'degree'] },
        { name: 'Skills', patterns: ['skills', 'technical skills', 'competencies'] }
      ];
      const found = sections.filter(s => s.patterns.some(p => lowerText.includes(p)));
      const score = Math.round((found.length / sections.length) * 10);
      const missing = sections.filter(s => !s.patterns.some(p => lowerText.includes(p)));
      return {
        passed: score >= 7,
        score,
        feedback: missing.length === 0
          ? 'All standard sections present'
          : `Missing sections: ${missing.map(s => s.name).join(', ')}`
      };
    }
  },
  {
    id: 'resume_length',
    category: 'Format',
    name: 'Appropriate Length',
    description: 'Resume is an appropriate length (not too short or too long)',
    weight: 5,
    check: (text: string) => {
      const wordCount = text.split(/\s+/).length;
      let score = 5;
      let feedback = 'Good length';
      if (wordCount < 150) {
        score = 2;
        feedback = `Too short (${wordCount} words). Aim for 300-700 words.`;
      } else if (wordCount < 300) {
        score = 3;
        feedback = `Slightly short (${wordCount} words). Consider adding more detail.`;
      } else if (wordCount > 1000) {
        score = 3;
        feedback = `Quite long (${wordCount} words). Consider being more concise.`;
      } else if (wordCount > 700) {
        score = 4;
        feedback = `Good length (${wordCount} words), but consider trimming if possible.`;
      }
      return { passed: score >= 4, score, feedback };
    }
  },
  {
    id: 'no_graphics',
    category: 'ATS Compatibility',
    name: 'ATS-Friendly Format',
    description: 'No tables, images, or complex formatting that confuses ATS',
    weight: 10,
    check: (text: string) => {
      const issues = [];
      if (text.includes('|') && (text.match(/\|/g) || []).length > 5) {
        issues.push('possible table formatting');
      }
      if (/[★☆●◆■□▪▫►▼▲◄]/.test(text)) {
        issues.push('special characters/symbols');
      }
      const score = Math.max(0, 10 - issues.length * 3);
      return {
        passed: score >= 7,
        score,
        feedback: issues.length === 0
          ? 'Format appears ATS-friendly'
          : `Potential ATS issues: ${issues.join(', ')}`
      };
    }
  },
  {
    id: 'date_format',
    category: 'Format',
    name: 'Consistent Dates',
    description: 'Dates are in a consistent, ATS-readable format',
    weight: 5,
    check: (text: string) => {
      const datePatterns = [
        /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+\d{4}/i,
        /\b\d{1,2}\/\d{4}/,
        /\b\d{4}\s*[-–]\s*(Present|\d{4})/i
      ];
      const hasAnyDates = datePatterns.some(p => p.test(text));
      return {
        passed: hasAnyDates,
        score: hasAnyDates ? 5 : 2,
        feedback: hasAnyDates
          ? 'Dates detected in resume'
          : 'No clear date formatting found. Use "Month Year" format (e.g., Jan 2023 - Present)'
      };
    }
  },
  {
    id: 'professional_summary',
    category: 'Content',
    name: 'Professional Summary',
    description: 'Includes a professional summary or objective',
    weight: 10,
    check: (text: string) => {
      const lowerText = text.toLowerCase();
      const hasSummary = ['summary', 'objective', 'profile', 'about me', 'professional summary']
        .some(term => lowerText.includes(term));
      return {
        passed: hasSummary,
        score: hasSummary ? 10 : 3,
        feedback: hasSummary
          ? 'Professional summary/objective found'
          : 'Add a Professional Summary section at the top of your resume'
      };
    }
  }
];

export const calculateATSScore = (text: string): {
  totalScore: number;
  maxScore: number;
  percentage: number;
  results: Array<{ rule: ATSRule; result: ReturnType<ATSRule['check']> }>;
} => {
  const results = atsRules
    .filter(rule => rule.id !== 'keyword_density')
    .map(rule => ({
      rule,
      result: rule.check(text)
    }));

  const totalScore = results.reduce((sum, r) => sum + r.result.score, 0);
  const maxScore = results.reduce((sum, r) => sum + r.rule.weight, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  return { totalScore, maxScore, percentage, results };
};
