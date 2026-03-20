import React from 'react';

const FeatureCard = ({ feature, index }) => {
  return (
    <div
      className="bg-gray-900 rounded-2xl shadow-sm p-8 transition-all hover:shadow-md border-l-4 border-amber-500 hover:scale-[1.02] duration-300"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="text-amber-400 text-4xl mb-6">
        {feature.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-100 mb-4">
        {feature.title}
      </h3>
      <p className="text-gray-400 mb-6">{feature.desc}</p>
      <ul className="space-y-3">
        {feature.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start text-gray-400">
            <span className={`${feature.bulletColor} mr-2 rounded-full w-2 h-2 mt-2 inline-block`} />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;