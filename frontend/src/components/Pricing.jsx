import React from 'react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: ['1 user', 'Basic analytics', 'Email support'],
    button: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$29',
    features: ['Up to 10 users', 'Advanced analytics', 'Priority email support'],
    button: 'Buy Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact us',
    features: ['Unlimited users', 'Custom analytics', 'Dedicated support'],
    button: 'Contact Sales',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function PricingPage() {
  return (
    <div className="min-h-screen text-white p-8 font-sans ">
      <h1 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h1>
      <div className="grid gap-5 md:grid-cols-3 max-w-4xl mx-auto">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={`rounded-2xl p-8 border transition-transform hover:scale-105 ${
              plan.highlight
                ? 'border-neutral-800 bg-gradient-to-b from-blue-700 to-[#1e1e1e] shadow-lg'
                : 'border-neutral-800 bg-neutral-900'
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-3xl font-bold mb-6">{plan.price}</p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="mr-2">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-blue-600 text-white  py-2 rounded-xl font-medium hover:bg-blue-700 transition">
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
