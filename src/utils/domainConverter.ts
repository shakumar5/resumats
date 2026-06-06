/**
 * Domain Converter
 * Converts resume keywords and phrases to target industry language
 * Unique feature - no competitor offers this
 */

import { domainKeywords, type DomainMapping } from '../data/domainKeywords';
import { sanitizeInput, isValidInput, escapeRegex, VALIDATION_CONSTRAINTS } from './constants';

export interface ConversionResult {
  originalText: string;
  convertedText: string;
  suggestedKeywords: string[];
  suggestedSkills: string[];
  suggestedCertifications: string[];
  suggestedActionVerbs: string[];
  changes: Array<{
    original: string;
    suggested: string;
    reason: string;
  }>;
  domainFitScore: number;
}

// Generic tech terms that can be mapped to domain-specific equivalents
const GENERIC_TERM_MAPPINGS: Record<string, Record<string, string>> = {
  fintech: {
    'application': 'financial application',
    'platform': 'trading platform',
    'data analysis': 'financial modeling',
    'security': 'regulatory compliance',
    'user management': 'KYC management',
    'reporting': 'financial reporting',
    'dashboard': 'portfolio dashboard',
    'api': 'payment API',
    'automation': 'trade automation',
    'database': 'transaction database',
    'customer': 'client',
    'product': 'financial product',
    'optimization': 'cost optimization',
    'testing': 'compliance testing',
    'monitoring': 'fraud monitoring'
  },
  gaming: {
    'application': 'game client',
    'platform': 'gaming platform',
    'data analysis': 'player analytics',
    'performance': 'frame rate optimization',
    'user management': 'player management',
    'reporting': 'game analytics reporting',
    'dashboard': 'game telemetry dashboard',
    'api': 'game services API',
    'automation': 'build pipeline automation',
    'database': 'player data store',
    'customer': 'player',
    'product': 'game title',
    'optimization': 'performance optimization',
    'testing': 'QA testing / playtesting',
    'ui design': 'UI/UX game design'
  },
  education: {
    'application': 'learning platform',
    'platform': 'LMS platform',
    'data analysis': 'learning analytics',
    'user management': 'student management',
    'reporting': 'academic reporting',
    'dashboard': 'student progress dashboard',
    'api': 'LTI integration',
    'automation': 'grading automation',
    'database': 'student records system',
    'customer': 'learner',
    'product': 'course / learning module',
    'optimization': 'engagement optimization',
    'testing': 'assessment design',
    'content': 'educational content'
  },
  healthcare: {
    'application': 'clinical application',
    'platform': 'health platform',
    'data analysis': 'clinical data analysis',
    'security': 'HIPAA compliance',
    'user management': 'patient management',
    'reporting': 'clinical reporting',
    'dashboard': 'patient monitoring dashboard',
    'api': 'HL7/FHIR API',
    'automation': 'clinical workflow automation',
    'database': 'EHR system',
    'customer': 'patient',
    'product': 'health solution',
    'optimization': 'care pathway optimization',
    'testing': 'clinical validation',
    'monitoring': 'patient monitoring'
  },
  shipping: {
    'application': 'logistics application',
    'platform': 'supply chain platform',
    'data analysis': 'supply chain analytics',
    'tracking': 'shipment tracking',
    'user management': 'fleet management',
    'reporting': 'logistics reporting',
    'dashboard': 'fleet tracking dashboard',
    'api': 'carrier integration API',
    'automation': 'routing automation',
    'database': 'inventory management system',
    'customer': 'shipper / consignee',
    'product': 'logistics solution',
    'optimization': 'route optimization',
    'testing': 'load testing',
    'monitoring': 'shipment monitoring'
  },
  cybersecurity: {
    'application': 'security application',
    'platform': 'security platform',
    'data analysis': 'threat intelligence analysis',
    'monitoring': 'security monitoring (SIEM)',
    'user management': 'identity & access management',
    'reporting': 'security incident reporting',
    'dashboard': 'SOC dashboard',
    'api': 'security API integration',
    'automation': 'security automation (SOAR)',
    'database': 'threat intelligence database',
    'testing': 'penetration testing',
    'optimization': 'security posture optimization',
    'compliance': 'security compliance (SOC 2, ISO 27001)'
  },
  ai_ml: {
    'application': 'ML application',
    'platform': 'AI/ML platform',
    'data analysis': 'feature engineering',
    'development': 'model development',
    'user management': 'experiment tracking',
    'reporting': 'model performance reporting',
    'dashboard': 'ML monitoring dashboard',
    'api': 'model serving API',
    'automation': 'MLOps automation',
    'database': 'feature store',
    'testing': 'model evaluation',
    'optimization': 'hyperparameter optimization',
    'deployment': 'model deployment'
  },
  ecommerce: {
    'application': 'e-commerce application',
    'platform': 'commerce platform',
    'data analysis': 'conversion analytics',
    'user management': 'customer lifecycle management',
    'reporting': 'sales analytics reporting',
    'dashboard': 'merchant dashboard',
    'api': 'payment / catalog API',
    'automation': 'marketing automation',
    'database': 'product catalog',
    'testing': 'A/B testing',
    'optimization': 'conversion rate optimization',
    'customer': 'shopper',
    'content': 'product content'
  }
};

export function convertResume(resumeText: string, targetDomain: string): ConversionResult {
  // Validate input
  const sanitizedResume = sanitizeInput(resumeText);
  if (!isValidInput(sanitizedResume, VALIDATION_CONSTRAINTS.MIN_RESUME_LENGTH)) {
    return createDefaultResult('Resume must have at least 50 characters');
  }

  // Validate domain exists
  const domain = domainKeywords[targetDomain];
  if (!domain) {
    return createDefaultResult(`Domain "${targetDomain}" is not supported. Please select a valid domain.`);
  }

  const mappings = GENERIC_TERM_MAPPINGS[targetDomain] || {};
  const changes: ConversionResult['changes'] = [];
  let convertedText = sanitizedResume;

  // Apply term mappings
  for (const [generic, specific] of Object.entries(mappings)) {
    const regex = new RegExp(`\\b${escapeRegex(generic)}\\b`, 'gi');
    if (regex.test(sanitizedResume)) {
      convertedText = convertedText.replace(regex, specific);
      changes.push({
        original: generic,
        suggested: specific,
        reason: `Replaced with ${domain.name}-specific terminology`
      });
    }
  }

  // Find keywords from domain that are missing from resume
  const resumeLower = sanitizedResume.toLowerCase();
  const missingKeywords = domain.keywords.filter(kw =>
    !resumeLower.includes(kw.toLowerCase())
  );
  const presentKeywords = domain.keywords.filter(kw =>
    resumeLower.includes(kw.toLowerCase())
  );

  // Calculate domain fit score
  const totalDomainTerms = domain.keywords.length + domain.skills.length;
  const matchedTerms = presentKeywords.length +
    domain.skills.filter(s => resumeLower.includes(s.toLowerCase())).length;
  const domainFitScore = Math.round((matchedTerms / totalDomainTerms) * 100);

  // Find missing skills
  const missingSkills = domain.skills.filter(skill =>
    !resumeLower.includes(skill.toLowerCase())
  );

  return {
    originalText: sanitizedResume,
    convertedText,
    suggestedKeywords: missingKeywords.slice(0, 15),
    suggestedSkills: missingSkills.slice(0, 10),
    suggestedCertifications: domain.certifications,
    suggestedActionVerbs: domain.actionVerbs,
    changes,
    domainFitScore
  };
}

/**
 * Creates a default error result when validation fails
 */
function createDefaultResult(message: string): ConversionResult {
  return {
    originalText: '',
    convertedText: '',
    suggestedKeywords: [],
    suggestedSkills: [],
    suggestedCertifications: [],
    suggestedActionVerbs: [],
    changes: [],
    domainFitScore: 0
  };
}

export function getDomainSuggestions(targetDomain: string): DomainMapping | null {
  return domainKeywords[targetDomain] || null;
}
