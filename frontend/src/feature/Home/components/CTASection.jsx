import React from 'react';
import { useNavigate } from 'react-router';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-sm p-12 border-l-4 border-amber-500">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-300 mb-4">
          Ready to Start Your Coding Journey?
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Join thousands of developers who have improved their skills and landed their dream jobs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/problems')}
            className="px-8 py-4 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-400 transition-colors text-lg"
          >
            Get Started Now
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-transparent border-2 border-amber-500 text-amber-300 font-bold rounded-lg hover:bg-amber-500 hover:text-gray-900 transition-colors text-lg"
          >
            Create Free Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;