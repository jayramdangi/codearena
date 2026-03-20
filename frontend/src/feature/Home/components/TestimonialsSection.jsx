import React from 'react';
import TestimonialCard from './TestimonialCard';
import { FaTrophy } from 'react-icons/fa';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Kalpit Arora',
      role: 'Frontend Developer',
      quote: "The AI-assisted learning helped me overcome plateaus I'd been stuck at for months. I've improved faster in 3 months than I did in the previous year.",
      rating: 5,
    },
    {
      name: 'Nishant T.',
      role: 'Competitive Programmer',
      quote: "The 1-on-1 challenges with friends have become my favorite way to learn. The real-time competition makes solving problems engaging and fun.",
      rating: 5,
    },
    {
      name: 'James L.',
      role: 'Engineering Manager',
      quote: "Our team uses the daily contests for skill development. The multi-topic problems have been particularly valuable for our full-stack developers.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-300 mb-4">
          What Developers Say
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Hear from developers who have transformed their coding skills
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3 px-4">
        {testimonials.map((testimonial, idx) => (
          <TestimonialCard key={idx} testimonial={testimonial} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;