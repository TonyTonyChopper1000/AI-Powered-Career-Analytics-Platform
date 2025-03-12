import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar , FiArrowRight } from 'react-icons/fi';

const TestimonialCard = ({ quote, name, title, company, rating }) => {
  return (
    <div className="bg-indigo-800/20 backdrop-blur-sm border border-indigo-700/30 rounded-xl p-8 h-full flex flex-col">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-indigo-600'}`} />
        ))}
      </div>
      <blockquote className="text-indigo-100 mb-6 flex-grow">"{quote}"</blockquote>
      <div>
        <p className="font-semibold text-white">{name}</p>
        <p className="text-indigo-300">
          {title} {company && `• ${company}`}
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      quote: "CareerAI's skill gap analysis was a game-changer for me. I identified exactly what I needed to learn, completed their recommended courses, and landed a role that increased my salary by 35%.",
      name: "Sarah Johnson",
      title: "Senior Data Scientist",
      company: "TechCorp",
      rating: 5
    },
    {
      quote: "The mentor matching feature connected me with a seasoned professional in my field who provided invaluable guidance. The personalized career roadmap gave me clear direction on what steps to take next.",
      name: "Michael Chen",
      title: "Product Manager",
      company: "InnovateCo",
      rating: 5
    },
    {
      quote: "After three months using CareerAI, I negotiated a $15k salary increase based on the market insights and skills valuation data. The ROI on this platform is incredible.",
      name: "Priya Patel",
      title: "UX Designer",
      company: "DesignHub",
      rating: 5
    },
    {
      quote: "The resume scoring tool helped me optimize my CV for ATS systems, resulting in triple the interview callbacks. I secured my dream job within weeks.",
      name: "James Wilson",
      title: "Marketing Director",
      company: "GrowthLabs",
      rating: 4
    },
    {
      quote: "As someone transitioning careers, the customized learning paths were essential in helping me acquire relevant skills quickly. The AI recommendations were spot-on.",
      name: "Elena Rodriguez",
      title: "Frontend Developer",
      company: "WebSolutions",
      rating: 5
    },
    {
      quote: "The salary prediction feature gave me confidence during negotiations. I was able to secure a compensation package that exceeded industry standards in my area.",
      name: "David Kim",
      title: "Financial Analyst",
      company: "Capital Group",
      rating: 4
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };

  // For mobile and tablet
  const mobileTestimonials = testimonials.slice(currentSlide, currentSlide + 1);
  
  // For desktop (show 3 at a time)
  const desktopStart = currentSlide * 3;
  const desktopTestimonials = testimonials.slice(desktopStart, desktopStart + 3);

  return (
    <section id="testimonials" className="bg-gradient-to-b from-indigo-950 to-indigo-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Join thousands of professionals who have accelerated their careers with our AI-powered platform.
          </p>
        </div>
        
        {/* Mobile/Tablet Testimonials (1 at a time) */}
        <div className="lg:hidden relative">
          <div className="grid grid-cols-1 gap-8">
            {mobileTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index + currentSlide}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                company={testimonial.company}
                rating={testimonial.rating}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-indigo-800/50 text-white hover:bg-indigo-700 transition-colors"
            >
              <FiChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-indigo-800/50 text-white hover:bg-indigo-700 transition-colors"
            >
              <FiChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Desktop Testimonials (3 at a time) */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-3 gap-8">
            {desktopTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index + desktopStart}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                company={testimonial.company}
                rating={testimonial.rating}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-indigo-800/50 text-white hover:bg-indigo-700 transition-colors"
            >
              <FiChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-indigo-800/50 text-white hover:bg-indigo-700 transition-colors"
            >
              <FiChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-indigo-600 font-medium py-3 px-8 rounded-lg transition-colors">
            Read All Success Stories <FiArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;