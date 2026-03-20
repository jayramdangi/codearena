import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import StatsSection from '../components/StatsSection';
import CTASection from '../components/CTASection';

const Homepage = () => {
  return (
    <div className="h-screen overflow-y-auto scrollbar-hide bg-gray-950 text-gray-100 py-10 px-4">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default Homepage;