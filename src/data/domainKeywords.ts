export interface DomainMapping {
  name: string;
  description: string;
  keywords: string[];
  actionVerbs: string[];
  skills: string[];
  certifications: string[];
}

export const domainKeywords: Record<string, DomainMapping> = {
  fintech: {
    name: 'Fintech & Banking',
    description: 'Financial technology, banking, payments, and insurance',
    keywords: [
      'blockchain', 'cryptocurrency', 'digital payments', 'KYC', 'AML',
      'regulatory compliance', 'risk management', 'algorithmic trading',
      'payment gateway', 'digital wallet', 'open banking', 'API integration',
      'fraud detection', 'credit scoring', 'robo-advisory', 'insurtech',
      'neobank', 'decentralized finance', 'smart contracts', 'tokenization',
      'PCI DSS', 'SOX compliance', 'Basel III', 'financial modeling',
      'quantitative analysis', 'portfolio management', 'wealth management',
      'underwriting', 'settlement systems', 'SWIFT', 'ISO 20022'
    ],
    actionVerbs: [
      'optimized', 'automated', 'streamlined', 'implemented', 'integrated',
      'secured', 'validated', 'processed', 'analyzed', 'reconciled',
      'mitigated', 'forecasted', 'audited', 'regulated', 'transacted'
    ],
    skills: [
      'Python', 'SQL', 'R', 'Tableau', 'Bloomberg Terminal', 'Excel VBA',
      'SAS', 'MATLAB', 'Hadoop', 'Spark', 'AWS', 'Docker', 'Kubernetes',
      'React', 'Node.js', 'Java', 'Scala', 'Kafka', 'Redis', 'PostgreSQL'
    ],
    certifications: [
      'CFA', 'FRM', 'CPA', 'Series 7', 'Series 63', 'CAMS', 'PMP',
      'AWS Solutions Architect', 'Azure Fundamentals', 'Certified Blockchain Professional'
    ]
  },
  gaming: {
    name: 'Gaming & Interactive Entertainment',
    description: 'Video games, esports, VR/AR, and interactive media',
    keywords: [
      'game engine', 'Unity', 'Unreal Engine', 'multiplayer', 'real-time rendering',
      'shader programming', 'physics simulation', 'AI pathfinding', 'procedural generation',
      'level design', 'game mechanics', 'player engagement', 'monetization',
      'live ops', 'matchmaking', 'anti-cheat', 'cross-platform', 'VR/AR',
      'motion capture', 'narrative design', 'QA testing', 'performance optimization',
      'netcode', 'dedicated servers', 'cloud gaming', 'game analytics',
      'user acquisition', 'retention metrics', 'DAU/MAU', 'ARPU', 'LTV'
    ],
    actionVerbs: [
      'developed', 'designed', 'prototyped', 'optimized', 'shipped',
      'launched', 'iterated', 'playtested', 'debugged', 'rendered',
      'animated', 'scripted', 'balanced', 'modeled', 'textured'
    ],
    skills: [
      'C++', 'C#', 'Unity', 'Unreal Engine', 'Godot', 'Blender', 'Maya',
      'Substance Painter', 'Photoshop', 'HLSL/GLSL', 'Lua', 'Python',
      'Git', 'Perforce', 'JIRA', 'Jenkins', 'DirectX', 'Vulkan', 'OpenGL'
    ],
    certifications: [
      'Unity Certified Developer', 'Unreal Authorized Instructor',
      'AWS Game Tech', 'Google Play Academy', 'Apple Developer Certification'
    ]
  },
  education: {
    name: 'Education & EdTech',
    description: 'Educational technology, e-learning, and academic institutions',
    keywords: [
      'learning management system', 'LMS', 'curriculum development', 'instructional design',
      'adaptive learning', 'gamification', 'student engagement', 'assessment',
      'e-learning', 'MOOC', 'blended learning', 'microlearning', 'pedagogy',
      'learning analytics', 'accessibility', 'WCAG', 'SCORM', 'xAPI',
      'competency-based', 'personalized learning', 'tutoring', 'SaaS',
      'content authoring', 'video streaming', 'interactive content',
      'student retention', 'enrollment', 'accreditation', 'K-12', 'higher education'
    ],
    actionVerbs: [
      'taught', 'facilitated', 'mentored', 'designed', 'developed',
      'assessed', 'curated', 'implemented', 'trained', 'collaborated',
      'researched', 'published', 'presented', 'evaluated', 'coordinated'
    ],
    skills: [
      'JavaScript', 'React', 'Python', 'Django', 'AWS', 'Docker',
      'Moodle', 'Canvas', 'Blackboard', 'Articulate', 'Adobe Captivate',
      'Google Classroom', 'Zoom SDK', 'WebRTC', 'PostgreSQL', 'MongoDB',
      'GraphQL', 'REST APIs', 'Figma', 'Accessibility Tools'
    ],
    certifications: [
      'Google Certified Educator', 'Microsoft Certified Educator',
      'Certified Instructional Designer', 'Quality Matters', 'ISTE Certification',
      'AWS Certified Cloud Practitioner', 'Scrum Master'
    ]
  },
  healthcare: {
    name: 'Healthcare & Health Tech',
    description: 'Healthcare technology, medical devices, telemedicine, and health data',
    keywords: [
      'EHR', 'EMR', 'HIPAA', 'HL7', 'FHIR', 'telemedicine', 'telehealth',
      'clinical trials', 'FDA approval', 'medical imaging', 'diagnostics',
      'patient portal', 'interoperability', 'health informatics', 'wearables',
      'remote patient monitoring', 'population health', 'precision medicine',
      'genomics', 'bioinformatics', 'drug discovery', 'clinical decision support',
      'revenue cycle management', 'claims processing', 'ICD-10', 'CPT codes',
      'patient safety', 'quality metrics', 'value-based care', 'care coordination'
    ],
    actionVerbs: [
      'implemented', 'integrated', 'secured', 'validated', 'optimized',
      'diagnosed', 'treated', 'monitored', 'analyzed', 'coordinated',
      'streamlined', 'automated', 'ensured', 'complied', 'improved'
    ],
    skills: [
      'Python', 'R', 'SQL', 'Java', 'C++', 'HL7 FHIR', 'AWS HealthLake',
      'Azure Health APIs', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes',
      'Epic', 'Cerner', 'DICOM', 'Snowflake', 'Databricks', 'Tableau',
      'Power BI', 'SAS'
    ],
    certifications: [
      'CISSP', 'CPHIMS', 'RHIA', 'CAHIMS', 'HL7 FHIR Certification',
      'AWS Health Specialty', 'CompTIA Healthcare IT', 'PMP', 'Six Sigma'
    ]
  },
  shipping: {
    name: 'Shipping & Logistics',
    description: 'Supply chain, logistics, maritime, freight, and transportation',
    keywords: [
      'supply chain management', 'logistics optimization', 'fleet management',
      'route optimization', 'warehouse management', 'inventory control',
      'last-mile delivery', 'freight forwarding', 'customs clearance',
      'bill of lading', 'container tracking', 'IoT sensors', 'GPS tracking',
      'demand forecasting', 'procurement', 'vendor management', 'EDI',
      'TMS', 'WMS', 'ERP integration', '3PL', 'cold chain', 'reverse logistics',
      'cross-docking', 'lean management', 'Six Sigma', 'just-in-time',
      'autonomous vehicles', 'drone delivery', 'blockchain tracking'
    ],
    actionVerbs: [
      'optimized', 'tracked', 'managed', 'coordinated', 'streamlined',
      'reduced', 'delivered', 'shipped', 'automated', 'forecasted',
      'negotiated', 'dispatched', 'routed', 'consolidated', 'warehoused'
    ],
    skills: [
      'SAP', 'Oracle', 'Python', 'SQL', 'Tableau', 'Power BI',
      'Google Maps API', 'AWS IoT', 'Azure IoT Hub', 'RFID', 'Barcode Systems',
      'EDI', 'XML', 'REST APIs', 'Machine Learning', 'Excel Advanced',
      'Salesforce', 'NetSuite', 'JDA', 'Manhattan Associates'
    ],
    certifications: [
      'CSCP', 'CPIM', 'CLTD', 'Six Sigma Green Belt', 'Six Sigma Black Belt',
      'PMP', 'Lean Certification', 'IATA Certified', 'Customs Broker License',
      'CDL', 'HAZMAT Certification'
    ]
  },
  cybersecurity: {
    name: 'Cybersecurity & InfoSec',
    description: 'Information security, penetration testing, compliance, and threat intelligence',
    keywords: [
      'penetration testing', 'vulnerability assessment', 'incident response',
      'threat intelligence', 'SIEM', 'SOC', 'zero trust', 'IAM',
      'encryption', 'firewall', 'IDS/IPS', 'malware analysis', 'forensics',
      'compliance', 'GDPR', 'SOC 2', 'ISO 27001', 'NIST', 'risk assessment',
      'red team', 'blue team', 'purple team', 'DevSecOps', 'container security',
      'cloud security', 'endpoint protection', 'DLP', 'PKI', 'MFA',
      'security architecture', 'threat modeling', 'OWASP'
    ],
    actionVerbs: [
      'secured', 'hardened', 'mitigated', 'detected', 'investigated',
      'remediated', 'automated', 'monitored', 'assessed', 'audited',
      'penetrated', 'analyzed', 'encrypted', 'authenticated', 'patched'
    ],
    skills: [
      'Python', 'Bash', 'PowerShell', 'C/C++', 'Wireshark', 'Metasploit',
      'Burp Suite', 'Nmap', 'Splunk', 'CrowdStrike', 'Palo Alto',
      'AWS Security', 'Azure Sentinel', 'Terraform', 'Ansible',
      'Docker', 'Kubernetes', 'ELK Stack', 'Snort', 'YARA'
    ],
    certifications: [
      'CISSP', 'CEH', 'OSCP', 'CompTIA Security+', 'CISM', 'CISA',
      'GIAC', 'AWS Security Specialty', 'Azure Security Engineer',
      'CKS', 'CCSP'
    ]
  },
  ai_ml: {
    name: 'AI & Machine Learning',
    description: 'Artificial intelligence, deep learning, NLP, and data science',
    keywords: [
      'machine learning', 'deep learning', 'neural networks', 'NLP',
      'computer vision', 'reinforcement learning', 'GANs', 'transformers',
      'large language models', 'fine-tuning', 'prompt engineering', 'RAG',
      'MLOps', 'model deployment', 'feature engineering', 'A/B testing',
      'recommendation systems', 'anomaly detection', 'time series',
      'transfer learning', 'federated learning', 'edge AI', 'AutoML',
      'data pipeline', 'ETL', 'data labeling', 'model evaluation',
      'bias detection', 'explainability', 'responsible AI'
    ],
    actionVerbs: [
      'trained', 'developed', 'deployed', 'optimized', 'fine-tuned',
      'engineered', 'researched', 'published', 'experimented', 'evaluated',
      'scaled', 'automated', 'predicted', 'classified', 'clustered'
    ],
    skills: [
      'Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy',
      'Hugging Face', 'LangChain', 'OpenAI API', 'AWS SageMaker',
      'Azure ML', 'GCP Vertex AI', 'MLflow', 'Kubeflow', 'Airflow',
      'Spark', 'SQL', 'Docker', 'Kubernetes', 'Git'
    ],
    certifications: [
      'AWS ML Specialty', 'Google ML Engineer', 'Azure AI Engineer',
      'TensorFlow Developer', 'Deep Learning Specialization',
      'Stanford ML Certificate', 'Fast.ai Certification'
    ]
  },
  ecommerce: {
    name: 'E-Commerce & Retail Tech',
    description: 'Online retail, marketplace platforms, and digital commerce',
    keywords: [
      'e-commerce platform', 'marketplace', 'product catalog', 'shopping cart',
      'checkout optimization', 'payment processing', 'inventory management',
      'order fulfillment', 'customer experience', 'personalization',
      'recommendation engine', 'search relevance', 'SEO', 'conversion rate',
      'A/B testing', 'analytics', 'customer segmentation', 'loyalty program',
      'omnichannel', 'headless commerce', 'dropshipping', 'subscription model',
      'dynamic pricing', 'fraud prevention', 'returns management',
      'product information management', 'digital marketing', 'social commerce'
    ],
    actionVerbs: [
      'launched', 'optimized', 'increased', 'scaled', 'integrated',
      'personalized', 'automated', 'merchandised', 'analyzed', 'converted',
      'retained', 'acquired', 'marketed', 'fulfilled', 'managed'
    ],
    skills: [
      'Shopify', 'Magento', 'WooCommerce', 'Salesforce Commerce',
      'JavaScript', 'React', 'Next.js', 'Node.js', 'Python', 'SQL',
      'Elasticsearch', 'Redis', 'AWS', 'Google Analytics', 'GTM',
      'Stripe', 'PayPal', 'Algolia', 'Contentful', 'GraphQL'
    ],
    certifications: [
      'Google Analytics', 'Google Ads', 'Shopify Partner',
      'Salesforce Commerce Cloud', 'AWS Solutions Architect',
      'HubSpot Marketing', 'Meta Blueprint'
    ]
  }
};

export const getDomainNames = (): string[] => Object.keys(domainKeywords);

export const getDomainByKey = (key: string): DomainMapping | undefined => domainKeywords[key];
