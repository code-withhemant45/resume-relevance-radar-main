
import * as pdfjsLib from 'pdfjs-dist';

// Set the PDF.js worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extract text from a PDF file
 */
export const extractTextFromPdf = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + ' ';
    }

    return fullText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

/**
 * Calculate the match score between a resume and a job description
 */
export const calculateMatchScore = (resumeText: string, jobDescription: string): number => {
  if (!resumeText || !jobDescription) return 0;

  // Convert to lowercase for case-insensitive matching
  const resumeLower = resumeText.toLowerCase();
  const jdLower = jobDescription.toLowerCase();

  // Extract keywords from job description
  const jdWords = jdLower.split(/\s+/)
    .filter(word => word.length > 3)  // Filter out short words
    .filter(word => !commonWords.has(word)); // Filter out common words

  // Count unique keywords
  const uniqueJdWords = new Set(jdWords);
  let matchCount = 0;

  // Check how many keywords from JD appear in resume
  uniqueJdWords.forEach(word => {
    if (resumeLower.includes(word)) {
      matchCount++;
    }
  });

  // Calculate percentage score
  const score = uniqueJdWords.size > 0 
    ? Math.min(100, Math.round((matchCount / uniqueJdWords.size) * 100))
    : 0;

  return score;
};

/**
 * Extract skills from text (using a predefined list)
 */
export const extractSkills = (text: string): string[] => {
  const textLower = text.toLowerCase();
  return commonSkills.filter(skill => 
    textLower.includes(skill.toLowerCase())
  );
};

/**
 * Find matching and missing skills between resume and job description
 */
export const analyzeSkillsMatch = (resumeText: string, jobDescription: string) => {
  const resumeSkills = extractSkills(resumeText);
  const jdSkills = extractSkills(jobDescription);
  
  const matchingSkills = resumeSkills.filter(skill => 
    jdSkills.includes(skill)
  );
  
  const missingSkills = jdSkills.filter(skill => 
    !resumeSkills.includes(skill)
  );

  return {
    matching: matchingSkills,
    missing: missingSkills,
    resumeOnly: resumeSkills.filter(skill => !jdSkills.includes(skill))
  };
};

/**
 * Extract years of experience from text
 */
export const extractExperience = (text: string) => {
  const expPatterns = [
    /(\d+)[\+]?\s*(?:years|year|yr|yrs)(?:\s+of)?\s+experience/i,
    /experience\s*(?:of|:)?\s*(\d+)[\+]?\s*(?:years|year|yr|yrs)/i
  ];
  
  for (const pattern of expPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
  }
  
  return null;
};

/**
 * Find the most relevant experience excerpts
 */
export const findRelevantExcerpts = (resumeText: string, jobDescription: string, count = 3) => {
  // Extract potential keywords from job description
  const jdWords = jobDescription.toLowerCase().split(/\s+/)
    .filter(word => word.length > 4)
    .filter(word => !commonWords.has(word));
  
  // Split resume into paragraphs/sections
  const sections = resumeText.split(/\n\s*\n/);
  
  // Score each section based on keyword matches
  const scoredSections = sections.map(section => {
    const sectionLower = section.toLowerCase();
    let score = 0;
    
    jdWords.forEach(word => {
      if (sectionLower.includes(word)) {
        score++;
      }
    });
    
    return { text: section, score };
  });
  
  // Sort by score and take top N
  return scoredSections
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(s => s.text);
};

// Common English words to filter out
const commonWords = new Set([
  'the', 'and', 'that', 'have', 'for', 'not', 'with', 'you', 'this',
  'but', 'his', 'from', 'they', 'say', 'her', 'she', 'will', 'one',
  'all', 'would', 'there', 'their', 'what', 'out', 'about', 'who',
  'get', 'which', 'when', 'make', 'can', 'like', 'time', 'just', 'him',
  'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some',
  'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look',
  'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after',
  'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even',
  'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'are',
  'with', 'for', 'the', 'and'
]);

// Common tech and professional skills
const commonSkills = [
  // Programming Languages
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'PHP', 'Ruby', 'Swift', 'Kotlin', 
  'Go', 'Rust', 'Scala', 'Perl', 'R', 'SQL', 'HTML', 'CSS', 'SASS', 'LESS',
  
  // Frameworks & Libraries
  'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 
  'Laravel', 'ASP.NET', 'Ruby on Rails', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'Material UI',
  '.NET', 'Redux', 'Next.js', 'Svelte', 'Gatsby', 'Ember.js', 'Spring', 'Hibernate',
  
  // DevOps & Cloud
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions', 
  'Terraform', 'Ansible', 'Chef', 'Puppet', 'CircleCI', 'Travis CI', 'Prometheus', 'Grafana',
  'CloudFormation', 'Pulumi', 'Helm', 'Vagrant',
  
  // Databases
  'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Oracle', 'SQL Server', 'Redis', 'Elasticsearch', 
  'DynamoDB', 'Cassandra', 'Firebase', 'Supabase', 'MariaDB', 'Neo4j', 'Couchbase',
  
  // Tools & Platforms
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence', 'Trello', 'Slack', 'Notion',
  'VS Code', 'IntelliJ IDEA', 'Eclipse', 'Postman', 'Swagger', 'Figma', 'Sketch', 'Adobe XD',
  
  // Methodologies & Concepts
  'Agile', 'Scrum', 'Kanban', 'DevOps', 'CI/CD', 'TDD', 'BDD', 'OOP', 'RESTful APIs',
  'Microservices', 'GraphQL', 'Serverless', 'WebSockets', 'Design Patterns',
  
  // Data Science & AI
  'Machine Learning', 'Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision',
  'Data Analysis', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy',
  'Data Visualization', 'Tableau', 'Power BI', 'Big Data', 'Hadoop', 'Spark',
  
  // Mobile Development
  'iOS', 'Android', 'Swift', 'Kotlin', 'React Native', 'Flutter', 'Xamarin',
  'Mobile App Development', 'UI/UX Design', 'Responsive Design',
  
  // Testing
  'Unit Testing', 'Integration Testing', 'E2E Testing', 'Jest', 'Mocha', 'Chai',
  'Selenium', 'Cypress', 'JUnit', 'TestNG', 'Pytest', 'Enzyme',
  
  // Soft Skills
  'Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Critical Thinking',
  'Time Management', 'Project Management', 'Adaptability', 'Creativity', 'Attention to Detail',
  
  // Business & Management
  'Product Management', 'Business Analysis', 'Technical Writing', 'SEO', 'Digital Marketing',
  'Content Strategy', 'UX Research', 'Analytics', 'A/B Testing'
];
