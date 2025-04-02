// Sample mentor data for initializing Firestore collection
export const mentorData = [
    {
      id: "mentor1",
      name: "Dr. Sarah Johnson",
      jobTitle: "Senior Data Scientist",
      company: "TechCorp AI",
      bio: "With over 12 years in data science and machine learning, I help professionals transition into AI careers. I specialize in mentoring those looking to bridge the gap between theoretical knowledge and practical application in the industry.",
      industry: "Technology",
      expertiseAreas: ["Data Science", "Machine Learning", "Career Transition", "Technical Skills"],
      yearsOfExperience: 12,
      preferredMenteeLevel: "intermediate",
      skills: ["Python", "TensorFlow", "Machine Learning", "Data Analysis", "Research"],
      interests: ["AI Ethics", "Neural Networks", "Computer Vision"],
      isAvailable: true,
      hourlyRate: 0, // Free mentoring
      languages: ["English", "Spanish"]
    },
    {
      id: "mentor2",
      name: "Michael Chen",
      jobTitle: "VP of Engineering",
      company: "StartupXYZ",
      bio: "I've led engineering teams across startups and enterprises. Passionate about helping technical professionals develop leadership skills and navigate the transition from individual contributor to management roles.",
      industry: "Technology",
      expertiseAreas: ["Leadership", "Management", "Technical Skills", "Team Building"],
      yearsOfExperience: 15,
      preferredMenteeLevel: "any",
      skills: ["Leadership", "Engineering Management", "Agile", "System Architecture", "Product Development"],
      interests: ["Tech Startups", "Engineering Culture", "Remote Team Management"],
      isAvailable: true,
      hourlyRate: 85,
      languages: ["English", "Mandarin"]
    },
    {
      id: "mentor3",
      name: "Elena Rodriguez",
      jobTitle: "Product Marketing Director",
      company: "GlobalBrand Inc.",
      bio: "Marketing executive with experience across B2B and B2C sectors. I help professionals develop strategic marketing skills and build their personal brand. Specialized in helping technically-oriented people communicate their value effectively.",
      industry: "Marketing",
      expertiseAreas: ["Marketing Strategy", "Personal Branding", "Communication", "Leadership"],
      yearsOfExperience: 10,
      preferredMenteeLevel: "beginner",
      skills: ["Brand Strategy", "Digital Marketing", "Content Marketing", "Market Research", "Analytics"],
      interests: ["Consumer Psychology", "Brand Storytelling", "Go-to-Market Strategy"],
      isAvailable: true,
      hourlyRate: 75,
      languages: ["English", "Spanish"]
    },
    {
      id: "mentor4",
      name: "James Wilson",
      jobTitle: "CTO",
      company: "FinTech Solutions",
      bio: "Executive leader with a focus on financial technology. I help technical professionals understand the finance industry and develop the skills needed to succeed in FinTech. Specialist in scaling teams and managing complex projects.",
      industry: "Finance",
      expertiseAreas: ["Leadership", "FinTech", "Technical Skills", "Entrepreneurship"],
      yearsOfExperience: 18,
      preferredMenteeLevel: "advanced",
      skills: ["System Architecture", "Team Leadership", "Strategic Planning", "Financial Systems"],
      interests: ["Blockchain", "Payment Systems", "Regulatory Compliance"],
      isAvailable: true,
      hourlyRate: 120,
      languages: ["English"]
    },
    {
      id: "mentor5",
      name: "Priya Sharma",
      jobTitle: "UX Research Lead",
      company: "DesignForward",
      bio: "Dedicated to bridging human needs with technology through user-centered design. I mentor designers and researchers looking to deepen their impact and create more inclusive digital experiences.",
      industry: "Design",
      expertiseAreas: ["User Research", "Design Thinking", "Career Transition", "Work-Life Balance"],
      yearsOfExperience: 8,
      preferredMenteeLevel: "any",
      skills: ["UX Research", "User Testing", "Inclusive Design", "Prototyping", "Workshop Facilitation"],
      interests: ["Accessibility", "Cognitive Psychology", "Design Ethics"],
      isAvailable: true,
      hourlyRate: 65,
      languages: ["English", "Hindi"]
    },
    {
      id: "mentor6",
      name: "David Kim",
      jobTitle: "Senior Product Manager",
      company: "TechGiant",
      bio: "Former software engineer turned product manager. I specialize in helping engineers transition to product roles and developing the strategic thinking needed to excel in product management.",
      industry: "Technology",
      expertiseAreas: ["Product Management", "Career Transition", "Technical Skills"],
      yearsOfExperience: 9,
      preferredMenteeLevel: "beginner",
      skills: ["Product Strategy", "Roadmapping", "User Stories", "Feature Prioritization", "Technical Communication"],
      interests: ["User Psychology", "Product-Led Growth", "Agile Methodologies"],
      isAvailable: true,
      hourlyRate: 80,
      languages: ["English", "Korean"]
    },
    {
      id: "mentor7",
      name: "Alex Thompson",
      jobTitle: "Startup Founder",
      company: "InnovateNow",
      bio: "Serial entrepreneur with 3 successful exits. I help professionals navigate the world of startups, whether you're founding your own company or joining an early-stage venture. Expertise in fundraising, growth, and team building.",
      industry: "Business",
      expertiseAreas: ["Entrepreneurship", "Leadership", "Management", "Strategic Planning"],
      yearsOfExperience: 14,
      preferredMenteeLevel: "any",
      skills: ["Business Development", "Fundraising", "Pitching", "Growth Strategy", "Team Building"],
      interests: ["Venture Capital", "Business Models", "Startup Ecosystems"],
      isAvailable: true,
      hourlyRate: 100,
      languages: ["English"]
    },
    {
      id: "mentor8",
      name: "Olivia Martinez",
      jobTitle: "HR Director",
      company: "Global Enterprises",
      bio: "Human resources executive focused on building inclusive workplaces. I mentor professionals on career navigation, negotiation skills, and workplace dynamics to help them achieve their professional goals.",
      industry: "Business",
      expertiseAreas: ["Career Development", "Communication", "Work-Life Balance", "Leadership"],
      yearsOfExperience: 11,
      preferredMenteeLevel: "any",
      skills: ["Career Planning", "Salary Negotiation", "Conflict Resolution", "Workplace Relationships"],
      interests: ["Workplace Diversity", "Employee Wellbeing", "Organizational Development"],
      isAvailable: true,
      hourlyRate: 70,
      languages: ["English", "Spanish"]
    },
    {
      id: "mentor9",
      name: "Dr. Robert Lee",
      jobTitle: "Director of Data Engineering",
      company: "HealthTech Innovations",
      bio: "Healthcare technology expert bridging the gap between medical and data domains. I help technologists understand the unique challenges of healthcare and develop solutions that make a meaningful impact.",
      industry: "Healthcare",
      expertiseAreas: ["Data Engineering", "Healthcare Technology", "Leadership", "Technical Skills"],
      yearsOfExperience: 16,
      preferredMenteeLevel: "intermediate",
      skills: ["Data Architecture", "Healthcare Systems", "Team Leadership", "Regulatory Compliance"],
      interests: ["Medical Informatics", "Healthcare AI", "Patient Privacy"],
      isAvailable: true,
      hourlyRate: 90,
      languages: ["English"]
    },
    {
      id: "mentor10",
      name: "Zoe Williams",
      jobTitle: "Chief Marketing Officer",
      company: "Sustainable Brands",
      bio: "Marketing executive specializing in sustainable and purpose-driven brands. I mentor professionals looking to align their careers with social impact and help them navigate the growing sustainability sector.",
      industry: "Marketing",
      expertiseAreas: ["Marketing Strategy", "Leadership", "Communication", "Entrepreneurship"],
      yearsOfExperience: 13,
      preferredMenteeLevel: "any",
      skills: ["Brand Purpose", "Sustainability Marketing", "Executive Communication", "Strategic Planning"],
      interests: ["Corporate Social Responsibility", "Environmental Impact", "Conscious Capitalism"],
      isAvailable: true,
      hourlyRate: 85,
      languages: ["English", "French"]
    }
  ];
  
  // Utility function to add mentors to Firestore
  export const addMentorsToFirestore = async (db) => {
    const mentorsCollectionRef = collection(db, 'mentors');
    
    for (const mentor of mentorData) {
      const { id, ...mentorData } = mentor;
      await setDoc(doc(mentorsCollectionRef, id), {
        ...mentorData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    console.log('Mentor data added to Firestore successfully!');
  };