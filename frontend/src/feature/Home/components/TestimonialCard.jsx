import React from 'react';
import { FaTrophy } from 'react-icons/fa';

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <div
      className="bg-gray-900 rounded-2xl shadow-sm p-8 flex flex-col transition-all hover:shadow-md border-l-4 border-amber-500 hover:scale-[1.02] duration-300"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="flex items-center mb-6">
        <div className="bg-gray-800 border-2 border-gray-700 rounded-xl w-16 h-16 flex items-center justify-center text-amber-400 text-lg hover:border-amber-400 transition-colors">
          {testimonial.name.charAt(0)}
        </div>
        <div className="ml-4 text-left">
          <div className="font-bold text-gray-100">{testimonial.name}</div>
          <div className="text-gray-400">{testimonial.role}</div>
        </div>
      </div>
      <p className="text-gray-400 italic mb-6 flex-grow">{testimonial.quote}</p>
      <div className="text-amber-400 mt-auto">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FaTrophy key={i} className="inline-block mr-1" />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;