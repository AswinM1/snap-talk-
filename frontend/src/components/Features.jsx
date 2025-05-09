import { UploadCloud, FileText, Brain, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <UploadCloud className="w-8 h-8 text-blue-500" />,
    title: "Upload Your Audio",
    description: "Choose an audio file to begin the analysis journey. Supporting various formats."
  },
  {
    icon: <FileText className="w-8 h-8 text-green-500" />,
    title: "Transcribe to Text",
    description: "Convert your voice input into clear, readable text using AI."
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    title: "Analyze Your Speech",
    description: "Let our smart engine detect patterns and speaking issues."
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    title: "Get Results & Suggestions",
    description: "Receive actionable insights and improvements instantly."
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export default function Features() {
  return (
    <div className="text-white bg-gradient-to-b from-gray-900 to-black p-20 rounded-2xl shadow-lg max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          className="bg-violet-800 shadow-lg rounded-xl  cursor-pointer p-10 space-y-3 hover:shadow-violet-800 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            {feature.icon}
            <h3 className="text-xl font-semibold">{feature.title}</h3>
          </div>
          <p className="text-white">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
