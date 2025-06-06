import { UploadCloud, FileText, Brain, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <UploadCloud className="w-8 h-8 text-blue-500" />,
    title: "Upload Your Audio",
    description: "Choose an audio file to begin the analysis journey. Supporting various formats.",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    icon: <FileText className="w-8 h-8 text-green-500" />,
    title: "Transcribe to Text",
    description: "Convert your voice input into clear, readable text using AI.",
    span: "md:col-span-2"
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    title: "Analyze Your Speech",
    description: "Let our smart engine detect patterns and speaking issues.",
    span: "md:col-span-1"
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    title: "Get Results & Suggestions",
    description: "Receive actionable insights and improvements instantly.",
    span: "md:col-span-1"
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
    <div className="text-white  md:p-20  shadow-lg max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 md:grid-rows-2  border-neutral-800 gap-2">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className={`bg-neutral-900  justify-center border border-neutral-800 rounded-xl   items-center font-sans shadow-lg  cursor-pointer p-8 space-y-3 transition-all duration-300 ${feature.span}`}
            style={{
              background:"radial-gradient(circle at bottom,blue  10%,#1e1e1e 50%)"
            }}
          >
            <div className="flex items-center gap-4">
              
              <h3 className="text-4xl font-sans tracking-tighter font-bold ">{feature.title}</h3>
            </div>
            <p className="text-white">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
