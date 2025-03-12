import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import Testimonials from '../components/Testimonals';
import Footer from "../components/Footer"


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-indigo-900">
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;