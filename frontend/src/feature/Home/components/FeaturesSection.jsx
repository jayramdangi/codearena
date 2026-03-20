import React from 'react';
import FeatureCard from './FeatureCard';
import { 
  FaRobot, 
  FaVideo, 
  FaCode, 
  FaCalendarAlt, 
  FaUserFriends, 
  FaLayerGroup 
} from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaRobot />,
      title: 'Intelligent Assistance',
      desc: 'Get tailored guidance at every level with our AI-powered support system that adapts to your learning pace.',
      bulletColor: 'bg-amber-400',
      bullets: [
        'Personalized hints and explanations',
        'Adaptive difficulty progression',
        'Concept reinforcement based on weaknesses',
      ],
    },
    {
      icon: <FaVideo />,
      title: 'Comprehensive Tutorials',
      desc: 'Access detailed video explanations and walkthroughs for every problem to enhance your understanding.',
      bulletColor: 'bg-amber-400',
      bullets: [
        'Step-by-step solution breakdowns',
        'Multiple solution approaches',
        'Best practice demonstrations',
      ],
    },
    {
      icon: <FaCode />,
      title: 'Multi-language Support',
      desc: 'Code in your preferred language with our robust compiler supporting all major programming languages.',
      bulletColor: 'bg-amber-400',
      bullets: [
        'Real-time code execution',
        'Comprehensive debugging tools',
        'Language-specific best practices',
      ],
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Daily Live Contests',
      desc: 'Test your skills against developers worldwide in timed coding competitions with real-time leaderboards.',
      bulletColor: 'bg-amber-400',
      bullets: [
        'Regular coding challenges',
        'Real-time performance tracking',
        'Competitive leaderboards',
      ],
    },
    {
      icon: <FaUserFriends />,
      title: '1v1 Coding Challenges',
      desc: 'Challenge friends to head-to-head coding duels with random problems selected from our database.',
      bulletColor: 'bg-amber-400',
      bullets: [
        'Real-time head-to-head competitions',
        'Random problem selection',
        'Progress tracking during challenges',
      ],
    },
    {
      icon: <FaLayerGroup />,
      title: 'Multi-topic Problems',
      desc: 'Access a vast library of problems across various topics and difficulty levels to match your skill.',
      bulletColor: 'bg-amber-400',
      bullets: [
        'Curated problem collections',
        'Beginner to advanced difficulty levels',
        'Diverse topics and categories',
      ],
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-300 mb-4">
            Powerful Learning Features
          </h2>
          <p className="text-lg text-gray-400">
            Everything you need to improve your coding skills efficiently
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;