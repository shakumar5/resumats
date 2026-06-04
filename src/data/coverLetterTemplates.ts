export interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  tone: 'professional' | 'creative' | 'technical' | 'executive';
  template: string;
}

export const coverLetterTemplates: CoverLetterTemplate[] = [
  {
    id: 'professional',
    name: 'Professional Standard',
    description: 'Classic professional cover letter suitable for most industries',
    tone: 'professional',
    template: `Dear {{hiring_manager}},

I am writing to express my strong interest in the {{job_title}} position at {{company_name}}. With {{years_experience}} years of experience in {{industry}}, I am confident in my ability to make a meaningful contribution to your team.

{{experience_paragraph}}

{{skills_paragraph}}

{{closing_paragraph}}

I am excited about the opportunity to bring my skills and experience to {{company_name}} and would welcome the chance to discuss how I can contribute to your team's success.

Thank you for your time and consideration. I look forward to hearing from you.

Sincerely,
{{full_name}}`
  },
  {
    id: 'technical',
    name: 'Technical/Engineering',
    description: 'Focused on technical skills and project achievements',
    tone: 'technical',
    template: `Dear {{hiring_manager}},

I'm excited to apply for the {{job_title}} role at {{company_name}}. As a {{current_role}} with deep expertise in {{technical_skills}}, I've consistently delivered solutions that drive measurable business impact.

{{experience_paragraph}}

{{technical_paragraph}}

{{project_highlights}}

I'm particularly drawn to {{company_name}}'s work in {{company_focus}}, and I believe my background in {{relevant_expertise}} positions me to contribute from day one.

I'd love to discuss how my technical background aligns with your team's goals. Thank you for considering my application.

Best regards,
{{full_name}}`
  },
  {
    id: 'creative',
    name: 'Creative & Marketing',
    description: 'Engaging tone for creative, marketing, and design roles',
    tone: 'creative',
    template: `Hi {{hiring_manager}},

When I saw the {{job_title}} opening at {{company_name}}, I knew I had to reach out. Your team's work on {{company_project}} resonates deeply with my own passion for {{passion_area}}.

{{story_paragraph}}

{{experience_paragraph}}

{{impact_paragraph}}

I'd love to bring my creative energy and {{years_experience}} years of {{industry}} experience to {{company_name}}. Let's create something amazing together.

Looking forward to connecting,
{{full_name}}`
  },
  {
    id: 'executive',
    name: 'Executive/Senior Leadership',
    description: 'High-level focus on strategy, leadership, and business outcomes',
    tone: 'executive',
    template: `Dear {{hiring_manager}},

With a proven track record of {{key_achievement}} across {{years_experience}} years of leadership in {{industry}}, I am writing to express my interest in the {{job_title}} position at {{company_name}}.

{{leadership_paragraph}}

{{strategy_paragraph}}

{{results_paragraph}}

I am drawn to {{company_name}}'s vision for {{company_vision}}, and I am confident that my experience in {{relevant_expertise}} would drive significant value for your organization.

I welcome the opportunity to discuss how my leadership experience aligns with {{company_name}}'s strategic objectives.

Respectfully,
{{full_name}}`
  },
  {
    id: 'career_change',
    name: 'Career Change',
    description: 'For professionals transitioning to a new industry or role',
    tone: 'professional',
    template: `Dear {{hiring_manager}},

I am excited to apply for the {{job_title}} position at {{company_name}}. While my background is in {{previous_industry}}, my experience has equipped me with highly transferable skills in {{transferable_skills}} that directly apply to this role.

{{transition_paragraph}}

{{transferable_skills_paragraph}}

{{motivation_paragraph}}

I am passionate about {{new_industry}} and have taken proactive steps to prepare for this transition, including {{preparation_steps}}. I am confident that my unique perspective and proven {{key_strength}} will be valuable assets to your team.

Thank you for considering my application. I look forward to discussing how my diverse background can benefit {{company_name}}.

Sincerely,
{{full_name}}`
  }
];

export const getTemplateById = (id: string): CoverLetterTemplate | undefined => {
  return coverLetterTemplates.find(t => t.id === id);
};

export const getTemplatesByTone = (tone: string): CoverLetterTemplate[] => {
  return coverLetterTemplates.filter(t => t.tone === tone);
};

export interface CoverLetterData {
  full_name: string;
  hiring_manager: string;
  job_title: string;
  company_name: string;
  years_experience: string;
  industry: string;
  current_role: string;
  technical_skills: string;
  relevant_expertise: string;
  company_focus: string;
  key_achievement: string;
  resumeText: string;
  jobDescription: string;
}

export const generateCoverLetter = (templateId: string, data: Partial<CoverLetterData>): string => {
  const template = getTemplateById(templateId);
  if (!template) return '';

  let result = template.template;

  // Replace all placeholders with data or sensible defaults
  const replacements: Record<string, string> = {
    '{{full_name}}': data.full_name || '[Your Name]',
    '{{hiring_manager}}': data.hiring_manager || 'Hiring Manager',
    '{{job_title}}': data.job_title || '[Job Title]',
    '{{company_name}}': data.company_name || '[Company Name]',
    '{{years_experience}}': data.years_experience || '[X]',
    '{{industry}}': data.industry || '[Industry]',
    '{{current_role}}': data.current_role || '[Current Role]',
    '{{technical_skills}}': data.technical_skills || '[Technical Skills]',
    '{{relevant_expertise}}': data.relevant_expertise || '[Relevant Expertise]',
    '{{company_focus}}': data.company_focus || '[Company Focus Area]',
    '{{key_achievement}}': data.key_achievement || '[Key Achievement]',
    '{{company_project}}': '[Notable Project]',
    '{{passion_area}}': data.industry || '[Your Passion]',
    '{{company_vision}}': '[Company Vision]',
    '{{previous_industry}}': '[Previous Industry]',
    '{{transferable_skills}}': '[Transferable Skills]',
    '{{new_industry}}': data.industry || '[New Industry]',
    '{{preparation_steps}}': '[Preparation Steps]',
    '{{key_strength}}': '[Key Strength]',
  };

  // Generate dynamic paragraphs based on resume content
  const experienceParagraph = generateExperienceParagraph(data);
  const skillsParagraph = generateSkillsParagraph(data);
  const closingParagraph = generateClosingParagraph(data);

  replacements['{{experience_paragraph}}'] = experienceParagraph;
  replacements['{{skills_paragraph}}'] = skillsParagraph;
  replacements['{{closing_paragraph}}'] = closingParagraph;
  replacements['{{technical_paragraph}}'] = experienceParagraph;
  replacements['{{project_highlights}}'] = '';
  replacements['{{story_paragraph}}'] = '';
  replacements['{{impact_paragraph}}'] = experienceParagraph;
  replacements['{{leadership_paragraph}}'] = experienceParagraph;
  replacements['{{strategy_paragraph}}'] = skillsParagraph;
  replacements['{{results_paragraph}}'] = closingParagraph;
  replacements['{{transition_paragraph}}'] = experienceParagraph;
  replacements['{{transferable_skills_paragraph}}'] = skillsParagraph;
  replacements['{{motivation_paragraph}}'] = closingParagraph;

  for (const [placeholder, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
  }

  // Clean up any remaining unreplaced placeholders
  result = result.replace(/\{\{[\w_]+\}\}/g, '');

  return result.trim();
};

function generateExperienceParagraph(data: Partial<CoverLetterData>): string {
  if (!data.resumeText) {
    return 'In my current role, I have consistently delivered results that exceed expectations, leveraging my expertise to drive growth and efficiency.';
  }
  const years = data.years_experience || 'several';
  const role = data.current_role || 'my current position';
  return `Throughout my ${years} years of professional experience, particularly in my role as ${role}, I have developed strong capabilities that directly align with this position's requirements. I have consistently delivered measurable results and am known for my ability to tackle complex challenges with innovative solutions.`;
}

function generateSkillsParagraph(data: Partial<CoverLetterData>): string {
  if (!data.technical_skills) {
    return 'My skill set spans both technical and interpersonal domains, allowing me to bridge the gap between strategy and execution effectively.';
  }
  return `My technical expertise includes ${data.technical_skills}, complemented by strong problem-solving abilities and a collaborative approach to teamwork. I stay current with industry trends and continuously expand my skill set to deliver cutting-edge solutions.`;
}

function generateClosingParagraph(data: Partial<CoverLetterData>): string {
  const company = data.company_name || 'your organization';
  return `I am particularly drawn to ${company}'s commitment to innovation and growth. I am confident that my combination of technical expertise, leadership skills, and passion for excellence would make me a valuable addition to your team.`;
}
