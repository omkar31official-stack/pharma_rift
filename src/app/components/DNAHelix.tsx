import { motion } from "motion/react";

interface DNAHelixProps {
  size?: "small" | "medium" | "large";
  animate?: boolean;
  color?: string;
}

export function DNAHelix({ size = "medium", animate = true, color = "#0066B4" }: DNAHelixProps) {
  const sizeMap = {
    small: 100,
    medium: 200,
    large: 400,
  };

  const width = sizeMap[size];
  const height = width * 1.5;

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={animate ? { rotateY: 360 } : {}}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ perspective: 1000 }}
    >
      <defs>
        <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor="#4FC3F7" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Left strand */}
      <motion.path
        d="M50,0 Q30,50 50,100 T50,200 T50,300"
        stroke="url(#dnaGradient)"
        strokeWidth="4"
        fill="none"
        filter="url(#glow)"
        animate={animate ? { pathLength: [0, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Right strand */}
      <motion.path
        d="M150,0 Q170,50 150,100 T150,200 T150,300"
        stroke="url(#dnaGradient)"
        strokeWidth="4"
        fill="none"
        filter="url(#glow)"
        animate={animate ? { pathLength: [0, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
      />

      {/* Base pairs */}
      {Array.from({ length: 20 }).map((_, i) => {
        const y = i * 15;
        const xOffset = Math.sin(i * 0.4) * 20;
        return (
          <motion.g key={i}>
            <motion.line
              x1={50 + xOffset}
              y1={y}
              x2={150 - xOffset}
              y2={y}
              stroke={i % 2 === 0 ? color : "#4FC3F7"}
              strokeWidth="2"
              opacity="0.6"
              animate={
                animate
                  ? {
                      opacity: [0.3, 0.8, 0.3],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
            <motion.circle
              cx={50 + xOffset}
              cy={y}
              r="4"
              fill={color}
              animate={
                animate
                  ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
            <motion.circle
              cx={150 - xOffset}
              cy={y}
              r="4"
              fill="#4FC3F7"
              animate={
                animate
                  ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          </motion.g>
        );
      })}
    </motion.svg>
  );
}
