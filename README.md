# AI-Powered-Career-Analytics-Platform

![version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![npm](https://img.shields.io/badge/npm->=10.8.0-blue.svg)
![node](https://img.shields.io/badge/node->=20.18.1-blue.svg)
![documentation](https://img.shields.io/badge/documentation-yes-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)

## Project Name

AI Powered Career Analytics Platform

## 🏠 Project Description

Career AI is a full-stack AI-powered career analytics application designed to help job seekers improve their career prospects. The application addresses several key challenges faced by job seekers, including lack of industry insights, resume optimization difficulties, interview preparation gaps, and cover letter customization challenges. By leveraging AI technology, the platform provides personalized career guidance based on users' specific industry, skills, and experience level.

## 💫 Implemented Features:

### Authentication & Onboarding
- Google and email sign-in via Clerk
- Custom onboarding flow collecting industry, experience, and skills
- User profile management

### Industry Insights Dashboard
- Market outlook with growth rate and demand level
- Top skills visualization
- Salary ranges by role with interactive charts
- Key industry trends
- Weekly automated updates via Inngest cron jobs

### Resume Builder
- Form-based resume creation interface
- AI-powered description improvement
- Markdown preview and editing
- PDF export functionality
- Resume saving to database

### Mock Interview Preparation
- AI-generated industry-specific technical questions
- Multiple-choice question format with explanations
- Performance tracking and scoring
- AI-generated improvement tips based on incorrect answers

### Performance Dashboard
- Visualization of quiz performance over time
- Statistics on questions practiced, average score, etc.
- Access to past quiz results

### Cover Letter Generator
- Company and job-specific cover letter generation
- Storage and management of multiple cover letters
- Industry and skill-tailored content

### Responsive Design
- Mobile-friendly interface
- Dark mode support

## 💫 Planned Future Enhancements:
- Resume ATS Scoring: Addition of an ATS score analyzer
- Enhanced Cover Letter Functionality: More sophisticated customization options
- Expanded Interview Preparation:
  - Behavioral interview questions
  - Video interview practice
  - Voice-based interview simulation
- Job Application Tracking:
  - Integration with job boards
  - Application status tracking
  - Follow-up reminders
- Networking Features:
  - LinkedIn integration
  - Networking opportunity suggestions
  - Professional event recommendations
- More Advanced Analytics:
  - Skill gap analysis
  - Career path recommendations
  - Comparison with industry benchmarks
- Premium Subscription Model

## Tech Stack

### Frontend Technologies
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge)

### Backend Technologies
![Next.js API](https://img.shields.io/badge/Next.js_API-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL_Neon-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge)
![Inngest](https://img.shields.io/badge/Inngest-FF5D0A?style=for-the-badge)
![Google Generative AI](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

### Languages
![JavaScript/JSX](https://img.shields.io/badge/JavaScript_JSX-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=sql&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)

### External Services
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Neon PostgreSQL](https://img.shields.io/badge/Neon_PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

## Project Learnings and Challenges

### Main Learning Outcomes
- Full-Stack Integration: Connecting modern frontend frameworks with backend services and databases
- AI Integration: Implementing generative AI with prompt engineering for specific use cases
- Authentication Flows: Creating secure user authentication and profile management
- Background Processing: Using Inngest for scheduled tasks
- Form Management: Using React Hook Form and Zod for form handling and validation
- State Management: Managing complex application state across multiple components
- Data Visualization: Implementing interactive charts for displaying industry data
- Deployment Pipeline: Setting up continuous deployment with environment variables

### Development Challenges
- Server vs. Client Components: Managing the distinction in Next.js
- AI Prompt Engineering: Crafting effective prompts for Gemini AI
- Database Schema Design: Creating relationships between different entities
- PDF Generation: Implementing HTML-to-PDF conversion
- Background Job Configuration: Setting up weekly updates with Inngest
- Form State Management: Managing complex nested forms
- Responsive Design: Ensuring cross-device compatibility
- Authentication Integration: Properly integrating Clerk authentication

## Tech Stack Learning Timeline
[Tech Stack Learning](https://github.com/users/luckymaddineni/projects/1)

### Development Dashboards
[Software Development Dashboard](https://trello.com/invite/b/678d1787452600a8b819f27a/ATTI9df9bdd16702e62d5e8e3f46990a173e13111F53/ai-powered-career-analytics-platform)

[Daily Task Progression Dashboard](https://trello.com/invite/b/679118c829e24fe2344f6d98/ATTIdaa3670eea2a7378b60d5ffad4cbd7015202AFC2/daily-task-progression-dashboard)

### 16 Week Development Schedule (Primary)
![16 week development schedule link](https://www.mermaidchart.com/raw/58b55bc3-7dbc-4260-86e1-4a36a3866f25?theme=light&version=v0.1&format=svg)

## Installation and Setup

```sh
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd ai-powered-career-analytics-platform

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with the necessary credentials for:
# - Clerk authentication
# - PostgreSQL Neon database
# - Google Generative AI (Gemini)
# - Inngest

# Run the development server
npm run dev

# Access the application at http://localhost:3000
```

## Author

👤 **[Lakshmi Prasanna]**

* Github: [@luckymaddineni](https://github.com/luckymaddineni)
* LinkedIn: [@lakshmiprasanna](https://www.linkedin.com/in/maddineni-lakshmi-prasanna-8b811a1a6/)
