// This service simulates an ML-based salary prediction system
// In a production app, this would call an actual API or trained model

// Base salaries by experience level (in USD)
const baseSalariesByExperience = {
    'entry': 60000,
    'junior': 75000,
    'mid': 100000,
    'senior': 135000,
    'lead': 170000,
    'executive': 210000
  };
  
  // Skill value multipliers (skills that impact salary significantly)
  const skillValueMultipliers = {
    // Programming Languages
    'python': 1.12,
    'javascript': 1.08,
    'typescript': 1.11,
    'java': 1.09,
    'c++': 1.14,
    'rust': 1.20,
    'go': 1.18,
    'swift': 1.15,
    'kotlin': 1.14,
    'ruby': 1.05,
    'php': 1.02,
    'c#': 1.08,
    'scala': 1.15,
    
    // Machine Learning
    'machine learning': 1.25,
    'deep learning': 1.30,
    'tensorflow': 1.22,
    'pytorch': 1.25,
    'nlp': 1.28,
    'computer vision': 1.27,
    'reinforcement learning': 1.30,
    
    // Data Science
    'data science': 1.20,
    'pandas': 1.10,
    'numpy': 1.10,
    'data visualization': 1.08,
    'data analysis': 1.12,
    'r': 1.08,
    'sql': 1.05,
    'tableau': 1.08,
    'power bi': 1.06,
    
    // DevOps & Cloud
    'aws': 1.18,
    'azure': 1.15,
    'google cloud': 1.17,
    'docker': 1.12,
    'kubernetes': 1.20,
    'terraform': 1.15,
    'ci/cd': 1.10,
    'jenkins': 1.08,
    'devops': 1.15,
    
    // Web Development
    'react': 1.14,
    'angular': 1.12,
    'vue.js': 1.13,
    'node.js': 1.12,
    'frontend': 1.08,
    'backend': 1.10,
    'full stack': 1.15,
    'graphql': 1.12,
    'rest api': 1.08,
    
    // Databases
    'mongodb': 1.08,
    'postgresql': 1.10,
    'mysql': 1.05,
    'redis': 1.10,
    'elasticsearch': 1.12,
    'neo4j': 1.15,
    
    // Mobile Development
    'ios': 1.15,
    'android': 1.13,
    'react native': 1.15,
    'flutter': 1.14,
    'mobile development': 1.12,
    
    // Security
    'cybersecurity': 1.20,
    'security': 1.15,
    'penetration testing': 1.18,
    'encryption': 1.12,
    
    // Management & Soft Skills
    'project management': 1.10,
    'agile': 1.05,
    'scrum': 1.04,
    'team management': 1.12,
    'leadership': 1.18,
    'communication': 1.05,
    
    // Design
    'ui design': 1.08,
    'ux design': 1.10,
    'figma': 1.05,
    'adobe xd': 1.04,
    'sketch': 1.04,
    
    // Blockchain
    'blockchain': 1.25,
    'smart contracts': 1.22,
    'solidity': 1.25,
    'ethereum': 1.20,
    
    // Game Development
    'unity': 1.12,
    'unreal engine': 1.15,
    'game development': 1.10,
    '3d modeling': 1.08,
    
    // AI
    'artificial intelligence': 1.30,
    'chatgpt': 1.15,
    'llm': 1.25,
    'generative ai': 1.28,
    'ai engineering': 1.30
  };
  
  // Location salary adjustments (based on cost of living)
  const locationMultipliers = {
    'san francisco': 1.60,
    'new york': 1.50,
    'seattle': 1.40,
    'boston': 1.40,
    'los angeles': 1.35,
    'austin': 1.25,
    'chicago': 1.20,
    'denver': 1.20,
    'washington dc': 1.35,
    'portland': 1.15,
    'atlanta': 1.15,
    'dallas': 1.15,
    'miami': 1.10,
    'philadelphia': 1.15,
    'remote': 1.10,
    'london': 1.40,
    'berlin': 1.20,
    'toronto': 1.25,
    'sydney': 1.30,
    'tokyo': 1.35,
    'singapore': 1.40,
    'zurich': 1.60,
    'amsterdam': 1.30,
    'paris': 1.30,
    'bangalore': 0.70,
    'mumbai': 0.70
  };
  
  // Industry multipliers
  const industryMultipliers = {
    'technology': 1.15,
    'finance': 1.20,
    'healthcare': 1.10,
    'ecommerce': 1.12,
    'education': 0.90,
    'gaming': 1.10,
    'marketing': 1.05,
    'media': 1.00,
    'manufacturing': 1.00,
    'government': 0.95,
    'consulting': 1.15,
    'telecommunications': 1.10,
    'insurance': 1.05,
    'retail': 0.90,
    'energy': 1.15,
    'legal': 1.10,
    'real estate': 1.05,
    'transportation': 1.00,
    'agriculture': 0.95,
    'nonprofit': 0.85
  };
  
  // Company size multipliers
  const companySizeMultipliers = {
    'startup': 0.95,
    'small': 0.98,
    'medium': 1.05,
    'large': 1.12,
    'enterprise': 1.15
  };
  
  // Helper function to normalize the level
  const normalizeLevel = (level) => {
    level = level.toLowerCase();
    
    if (level.includes('entry') || level.includes('junior') || level === 'jr') {
      return 'junior';
    } else if (level.includes('mid') || level.includes('intermediate')) {
      return 'mid';
    } else if (level.includes('senior') || level.includes('sr')) {
      return 'senior';
    } else if (level.includes('lead') || level.includes('principal') || level.includes('architect')) {
      return 'lead';
    } else if (level.includes('exec') || level.includes('cto') || level.includes('cio') || level.includes('director')) {
      return 'executive';
    }
    
    return 'mid'; // Default to mid-level
  };
  
  // Helper function to normalize location
  const normalizeLocation = (location) => {
    if (!location) return 'remote';
    
    location = location.toLowerCase();
    
    for (const key in locationMultipliers) {
      if (location.includes(key)) {
        return key;
      }
    }
    
    return 'remote'; // Default to remote
  };
  
  // Helper function to normalize industry
  const normalizeIndustry = (industry) => {
    if (!industry) return 'technology';
    
    industry = industry.toLowerCase();
    
    for (const key in industryMultipliers) {
      if (industry.includes(key)) {
        return key;
      }
    }
    
    return 'technology'; // Default to technology
  };
  
  // Helper function to normalize company size
  const normalizeCompanySize = (size) => {
    if (!size) return 'medium';
    
    size = size.toLowerCase();
    
    for (const key in companySizeMultipliers) {
      if (size.includes(key)) {
        return key;
      }
    }
    
    return 'medium'; // Default to medium
  };
  
  // Calculate salary prediction based on skills, experience, location, industry, and company size
  export const predictSalary = (skills = [], experienceLevel = 'mid', location = 'remote', industry = 'technology', companySize = 'medium') => {
    try {
      // Normalize inputs
      const normalizedLevel = normalizeLevel(experienceLevel);
      const normalizedLocation = normalizeLocation(location);
      const normalizedIndustry = normalizeIndustry(industry);
      const normalizedCompanySize = normalizeCompanySize(companySize);
      
      // Start with base salary by experience level
      let baseSalary = baseSalariesByExperience[normalizedLevel] || baseSalariesByExperience['mid'];
      
      // Calculate skill multiplier
      let skillMultiplier = 1.0;
      let relevantSkillsCount = 0;
      
      if (skills && skills.length > 0) {
        const normalizedSkills = skills.map(skill => skill.toLowerCase());
        
        // Calculate total multiplier from relevant skills
        normalizedSkills.forEach(skill => {
          for (const [key, value] of Object.entries(skillValueMultipliers)) {
            if (skill.includes(key) || key.includes(skill)) {
              skillMultiplier *= Math.pow(value, 0.2); // Take the 5th root to dampen the effect
              relevantSkillsCount++;
              break;
            }
          }
        });
      }
      
      // Cap the skill multiplier to prevent unrealistically high salaries
      skillMultiplier = Math.min(skillMultiplier, 1.75);
      
      // Apply location adjustment
      const locationMultiplier = locationMultipliers[normalizedLocation] || locationMultipliers['remote'];
      
      // Apply industry adjustment
      const industryMultiplier = industryMultipliers[normalizedIndustry] || industryMultipliers['technology'];
      
      // Apply company size adjustment
      const companySizeMultiplier = companySizeMultipliers[normalizedCompanySize] || companySizeMultipliers['medium'];
      
      // Calculate final salary prediction
      const predictedSalary = baseSalary * skillMultiplier * locationMultiplier * industryMultiplier * companySizeMultiplier;
      
      // Generate salary range (±15%)
      const lowerBound = Math.round(predictedSalary * 0.85 / 1000) * 1000;
      const upperBound = Math.round(predictedSalary * 1.15 / 1000) * 1000;
      
      // Generate insights about the prediction
      const insights = generateInsights(
        normalizedLevel,
        normalizedLocation,
        normalizedIndustry,
        normalizedCompanySize,
        skills,
        relevantSkillsCount,
        skillMultiplier,
        baseSalary
      );
      
      return {
        prediction: Math.round(predictedSalary / 1000) * 1000,
        range: {
          min: lowerBound,
          max: upperBound
        },
        insights,
        factors: {
          baseByExperience: baseSalary,
          skillMultiplier: skillMultiplier.toFixed(2),
          locationMultiplier: locationMultiplier.toFixed(2),
          industryMultiplier: industryMultiplier.toFixed(2),
          companySizeMultiplier: companySizeMultiplier.toFixed(2)
        }
      };
    } catch (error) {
      console.error('Error predicting salary:', error);
      return {
        error: 'Failed to predict salary',
        details: error.message
      };
    }
  };
  
  // Generate insights based on prediction factors
  const generateInsights = (level, location, industry, companySize, skills, relevantSkillsCount, skillMultiplier, baseSalary) => {
    const insights = [];
    
    // Experience level insights
    if (level === 'junior') {
      insights.push("Entry-level positions typically have more growth potential as you gain experience.");
    } else if (level === 'mid') {
      insights.push("Mid-level roles offer a good balance of experience requirements and compensation.");
    } else if (level === 'senior') {
      insights.push("Senior positions command higher salaries but often require 5+ years of specialized experience.");
    } else if (level === 'lead') {
      insights.push("Leadership roles require both technical expertise and people management skills.");
    } else if (level === 'executive') {
      insights.push("Executive positions require strategic vision and typically involve managing large teams or departments.");
    }
    
    // Location insights
    if (locationMultipliers[location] > 1.3) {
      insights.push(`${location.charAt(0).toUpperCase() + location.slice(1)} has a high cost of living but offers competitive compensation.`);
    } else if (locationMultipliers[location] < 1.0) {
      insights.push(`${location.charAt(0).toUpperCase() + location.slice(1)} has a lower cost of living, which typically corresponds to adjusted compensation.`);
    }
    
    // Skill insights
    if (relevantSkillsCount === 0) {
      insights.push("No specific high-value skills detected. Adding in-demand technical skills could increase your salary potential.");
    } else if (relevantSkillsCount < 3) {
      insights.push("Adding more specialized skills to your profile could increase your salary potential.");
    } else if (skillMultiplier > 1.3) {
      insights.push("Your skill set includes high-value specialized skills that positively impact compensation.");
    }
    
    // Industry insights
    if (industryMultipliers[industry] > 1.1) {
      insights.push(`The ${industry} industry typically offers above-average compensation.`);
    } else if (industryMultipliers[industry] < 1.0) {
      insights.push(`The ${industry} sector typically offers more modest compensation but may provide other benefits.`);
    }
    
    // Company size insights
    if (companySize === 'startup') {
      insights.push("Startups may offer lower base salaries but often include equity compensation.");
    } else if (companySize === 'enterprise') {
      insights.push("Large enterprises typically offer more comprehensive benefits packages and greater stability.");
    }
    
    // Skill improvement recommendations
    const recommendedSkills = getRecommendedSkills(skills, level, industry);
    if (recommendedSkills.length > 0) {
      insights.push(`Consider adding these in-demand skills to increase your market value: ${recommendedSkills.join(', ')}.`);
    }
    
    return insights;
  };
  
  // Recommend skills based on current skills, level, and industry
  const getRecommendedSkills = (currentSkills = [], level, industry) => {
    const normalizedCurrentSkills = currentSkills.map(skill => skill.toLowerCase());
    
    // High-value skills by industry
    const industrySkillsMap = {
      'technology': ['cloud architecture', 'kubernetes', 'microservices', 'system design', 'ai engineering'],
      'finance': ['financial modeling', 'risk analysis', 'algorithmic trading', 'blockchain', 'regulatory compliance'],
      'healthcare': ['healthcare informatics', 'electronic health records', 'hipaa compliance', 'medical imaging', 'clinical data analysis'],
      'ecommerce': ['conversion optimization', 'payment processing', 'inventory management', 'customer analytics', 'a/b testing'],
      'gaming': ['game engine development', 'unity', 'unreal engine', '3d modeling', 'game monetization']
    };
    
    // High-value skills by experience level
    const levelSkillsMap = {
      'junior': ['data structures', 'algorithms', 'version control', 'testing', 'api integration'],
      'mid': ['system design', 'cloud services', 'security best practices', 'performance optimization', 'technical communication'],
      'senior': ['architecture', 'scalability', 'mentoring', 'technical leadership', 'cross-functional collaboration'],
      'lead': ['team management', 'technical roadmapping', 'hiring', 'strategic planning', 'stakeholder management'],
      'executive': ['business strategy', 'organizational leadership', 'technology vision', 'executive communication', 'financial planning']
    };
    
    // Get relevant skill sets
    const industrySkills = industrySkillsMap[industry] || industrySkillsMap['technology'];
    const levelSkills = levelSkillsMap[level] || levelSkillsMap['mid'];
    
    // Combine and filter skills the user doesn't already have
    const potentialSkills = [...industrySkills, ...levelSkills].filter(skill => 
      !normalizedCurrentSkills.some(userSkill => 
        userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill)
      )
    );
    
    // Get up to 3 random skills from the potential skills
    const shuffled = potentialSkills.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };
  
  // Provide market trend insights for specific skills
  export const getSkillMarketTrends = (skills = []) => {
    const trendInsights = [];
    
    // Predefined trends for common skill categories
    const skillTrendMap = {
      'python': {
        trend: 'rising',
        insight: 'Python continues to be in high demand, especially for AI, data science, and automation roles.'
      },
      'javascript': {
        trend: 'stable',
        insight: 'JavaScript remains essential for web development, with frameworks like React, Vue, and Angular driving demand.'
      },
      'react': {
        trend: 'rising',
        insight: 'React continues to be the most in-demand frontend framework, with growing adoption in enterprise applications.'
      },
      'machine learning': {
        trend: 'rising',
        insight: 'Machine learning skills command premium salaries, with specialized areas like NLP and computer vision seeing the highest growth.'
      },
      'blockchain': {
        trend: 'fluctuating',
        insight: 'Blockchain demand varies with market conditions, but specialized roles continue to offer above-average compensation.'
      },
      'cloud': {
        trend: 'rising',
        insight: 'Cloud skills remain in high demand as more organizations migrate infrastructure to AWS, Azure, and GCP.'
      },
      'devops': {
        trend: 'rising',
        insight: 'DevOps and SRE roles continue to command premium salaries as organizations focus on reliability and automation.'
      },
      'cybersecurity': {
        trend: 'rising',
        insight: 'Security skills have seen consistent demand growth, with specialized roles often commanding higher compensation.'
      },
      'generative ai': {
        trend: 'rapidly rising',
        insight: 'Generative AI skills are seeing explosive growth in demand, with significant salary premiums for experienced practitioners.'
      },
      'mobile': {
        trend: 'stable',
        insight: 'Mobile development skills remain valuable, with cross-platform frameworks gaining more adoption.'
      }
    };
    
    if (skills && skills.length > 0) {
      const normalizedSkills = skills.map(skill => skill.toLowerCase());
      
      // Check each skill against the trend map
      normalizedSkills.forEach(skill => {
        for (const [key, data] of Object.entries(skillTrendMap)) {
          if (skill.includes(key) || key.includes(skill)) {
            trendInsights.push({
              skill: skill,
              trend: data.trend,
              insight: data.insight
            });
            break;
          }
        }
      });
    }
    
    // If no specific insights were found, provide general market insights
    if (trendInsights.length === 0) {
      trendInsights.push({
        skill: 'general',
        trend: 'evolving',
        insight: 'The tech job market values specialized skills and continuous learning. Consider focusing on high-growth areas like AI, cloud, and cybersecurity.'
      });
    }
    
    return trendInsights;
  };