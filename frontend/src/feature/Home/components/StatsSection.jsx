import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: '10K+', label: 'Active Coders' },
    { value: '5K+', label: 'Problems Solved' },
    { value: '500+', label: 'Contests Hosted' },
    { value: '100+', label: 'Countries' },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-300 mb-16">
          Join Our Growing Community
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;