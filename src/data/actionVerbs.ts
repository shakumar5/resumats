export interface VerbCategory {
  category: string;
  verbs: string[];
}

export const actionVerbs: VerbCategory[] = [
  {
    category: 'Leadership',
    verbs: [
      'spearheaded', 'orchestrated', 'directed', 'led', 'managed',
      'supervised', 'mentored', 'coached', 'guided', 'championed',
      'pioneered', 'established', 'founded', 'initiated', 'mobilized'
    ]
  },
  {
    category: 'Achievement',
    verbs: [
      'achieved', 'surpassed', 'exceeded', 'outperformed', 'attained',
      'earned', 'delivered', 'accomplished', 'completed', 'won',
      'captured', 'secured', 'maximized', 'generated', 'produced'
    ]
  },
  {
    category: 'Technical',
    verbs: [
      'developed', 'engineered', 'architected', 'programmed', 'coded',
      'debugged', 'deployed', 'configured', 'integrated', 'automated',
      'optimized', 'refactored', 'migrated', 'containerized', 'scripted'
    ]
  },
  {
    category: 'Communication',
    verbs: [
      'presented', 'articulated', 'authored', 'documented', 'published',
      'communicated', 'conveyed', 'translated', 'reported', 'briefed',
      'negotiated', 'persuaded', 'influenced', 'advocated', 'mediated'
    ]
  },
  {
    category: 'Growth & Improvement',
    verbs: [
      'improved', 'increased', 'enhanced', 'accelerated', 'boosted',
      'elevated', 'strengthened', 'expanded', 'amplified', 'advanced',
      'transformed', 'revitalized', 'modernized', 'upgraded', 'revamped'
    ]
  },
  {
    category: 'Efficiency',
    verbs: [
      'streamlined', 'reduced', 'consolidated', 'simplified', 'eliminated',
      'cut', 'decreased', 'minimized', 'centralized', 'standardized',
      'systematized', 'restructured', 'reorganized', 'realigned', 'trimmed'
    ]
  },
  {
    category: 'Analysis',
    verbs: [
      'analyzed', 'evaluated', 'assessed', 'identified', 'diagnosed',
      'investigated', 'researched', 'examined', 'discovered', 'mapped',
      'forecasted', 'modeled', 'calculated', 'measured', 'quantified'
    ]
  },
  {
    category: 'Collaboration',
    verbs: [
      'collaborated', 'partnered', 'coordinated', 'facilitated', 'united',
      'aligned', 'liaised', 'interfaced', 'bridged', 'connected',
      'fostered', 'cultivated', 'engaged', 'supported', 'enabled'
    ]
  },
  {
    category: 'Creation & Innovation',
    verbs: [
      'created', 'designed', 'built', 'invented', 'launched',
      'introduced', 'innovated', 'conceptualized', 'formulated', 'devised',
      'crafted', 'constructed', 'assembled', 'prototyped', 'drafted'
    ]
  }
];

export const getAllVerbs = (): string[] => {
  return actionVerbs.flatMap(cat => cat.verbs);
};

export const getVerbsByCategory = (category: string): string[] => {
  const cat = actionVerbs.find(c => c.category.toLowerCase() === category.toLowerCase());
  return cat ? cat.verbs : [];
};
