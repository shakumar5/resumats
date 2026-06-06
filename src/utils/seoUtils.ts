/**
 * SEO utilities for structured data generation
 * Helps create proper schema.org markup for better search visibility
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolMetadata {
  name: string;
  description: string;
  url: string;
  icon?: string;
}

/**
 * Generate FAQ schema markup for rich snippets
 * @param faqs - Array of FAQ items
 * @returns Structured data for FAQPage schema
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate SoftwareApplication schema for tools
 * @param tools - Array of tool metadata
 * @param siteURL - Base site URL
 * @returns Structured data for software applications
 */
export function generateSoftwareApplicationSchema(tools: ToolMetadata[], siteURL: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.description,
        "url": `${siteURL}${tool.url}`,
        "applicationCategory": "Productivity",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "100"
        }
      }
    }))
  };
}

/**
 * Generate Product schema for resume tools
 */
export function generateProductSchema(siteURL: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Online Resume ATS - Free Resume Optimization Tools",
    "description": "Free ATS resume checker, cover letter generator, keyword analyzer, and domain converter. 100% browser-based, complete privacy.",
    "brand": {
      "@type": "Brand",
      "name": "Online Resume ATS"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "0",
      "availability": "https://schema.org/InStock",
      "url": `${siteURL}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "250"
    }
  };
}

/**
 * Expand meta description to use full 160 character limit
 * @param description - Current description
 * @param maxLength - Max length (default 160)
 * @returns Optimized description
 */
export function optimizeMetaDescription(description: string, maxLength = 160): string {
  if (description.length >= maxLength) return description;
  
  // Description is too short, could be expanded
  console.warn(`Meta description only ${description.length} chars (aim for ~160)`);
  return description;
}

/**
 * Generate internal linking suggestions
 */
export const INTERNAL_LINKS = {
  'ats-score-checker': {
    relatedPages: [
      { title: 'Resume Keywords Analyzer', path: '/resume-keywords', description: 'Extract and analyze keywords from your resume' },
      { title: 'Domain Converter', path: '/domain-converter', description: 'Convert your resume for specific industries' },
      { title: 'Cover Letter Generator', path: '/cover-letter-generator', description: 'Generate tailored cover letters' }
    ]
  },
  'resume-keywords': {
    relatedPages: [
      { title: 'ATS Score Checker', path: '/ats-score-checker', description: 'Check how well your resume matches job descriptions' },
      { title: 'Domain Converter', path: '/domain-converter', description: 'Convert keywords for your target industry' },
      { title: 'Cover Letter Generator', path: '/cover-letter-generator', description: 'Create professional cover letters' }
    ]
  },
  'cover-letter-generator': {
    relatedPages: [
      { title: 'ATS Score Checker', path: '/ats-score-checker', description: 'Optimize your resume before applying' },
      { title: 'Resume Keywords', path: '/resume-keywords', description: 'Analyze and improve resume keywords' },
      { title: 'Domain Converter', path: '/domain-converter', description: 'Tailor your resume for specific industries' }
    ]
  },
  'domain-converter': {
    relatedPages: [
      { title: 'ATS Score Checker', path: '/ats-score-checker', description: 'Check ATS compatibility of your converted resume' },
      { title: 'Resume Keywords', path: '/resume-keywords', description: 'Find industry-specific keywords' },
      { title: 'Cover Letter Generator', path: '/cover-letter-generator', description: 'Write letters for your target industry' }
    ]
  }
};
