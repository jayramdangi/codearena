import React from 'react';
import { useNavigate } from 'react-router';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-amber-300 mb-4">
          Welcome, Coders!
        </h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
          Elevate your coding journey with AI-powered guidance, hands-on tutorials, and engaging contests.
          Sharpen your skills, compete with peers, and master algorithms all in one platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/problems')}
            className="px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Explore Problems
          </button>
          <button
            onClick={() => navigate('/contest')}
            className="px-6 py-3 bg-transparent border-2 border-amber-500 text-gray-100 font-semibold rounded-lg hover:bg-gray-800 hover:border-amber-400 transition-colors"
          >
            Join Contests
          </button>
          <button
            onClick={() => navigate('/onevsone')}
            className="px-6 py-3 bg-transparent border-2 border-purple-500 text-gray-100 font-semibold rounded-lg hover:bg-gray-800 hover:border-purple-400 transition-colors"
          >
            1v1 Battles
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;