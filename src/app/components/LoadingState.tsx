import { motion } from "motion/react";
import { Dna } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-4"
      >
        <Dna className="w-16 h-16 text-[#0066B4]" />
      </motion.div>
      <motion.p
        className="text-gray-600 text-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  );
}

export function DNALoadingSpinner() {
  return (
    <div className="relative w-16 h-16">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0066B4]"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.2,
          }}
          style={{
            transform: `scale(${1 - i * 0.2})`,
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <Dna className="w-6 h-6 text-[#0066B4]" />
      </div>
    </div>
  );
}
