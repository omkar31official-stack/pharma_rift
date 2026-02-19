import { motion } from "motion/react";
import { useMemo } from "react";

interface MoleculeVisualizationProps {
  size?: number;
  nodeCount?: number;
}

export function MoleculeVisualization({ size = 300, nodeCount = 12 }: MoleculeVisualizationProps) {
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }).map((_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = size / 3;
      return {
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.sin(angle * 2) * 30,
      };
    });
  }, [nodeCount, size]);

  const connections = useMemo(() => {
    const conns: Array<{ from: number; to: number }> = [];
    nodes.forEach((node, i) => {
      // Connect to next node
      conns.push({ from: i, to: (i + 1) % nodes.length });
      // Connect to opposite node
      if (i < nodes.length / 2) {
        conns.push({ from: i, to: i + Math.floor(nodes.length / 2) });
      }
    });
    return conns;
  }, [nodes]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size, perspective: 1000 }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
        className="absolute"
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <defs>
          <radialGradient id="nodeGradient">
            <stop offset="0%" stopColor="#4FC3F7" stopOpacity="1" />
            <stop offset="100%" stopColor="#0066B4" stopOpacity="0.8" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((conn, i) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          return (
            <motion.line
              key={`conn-${i}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#0066B4"
              strokeWidth="2"
              opacity="0.3"
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill="url(#nodeGradient)"
              filter="url(#glow)"
              animate={{
                r: [8, 10, 8],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.id * 0.1,
              }}
            />
            {/* Orbital electrons */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill="#4FC3F7"
              animate={{
                cx: [node.x, node.x + 15, node.x],
                cy: [node.y, node.y, node.y],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.g>
        ))}
      </motion.svg>

      {/* Center atom */}
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#0066B4] to-[#4FC3F7] flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 20px rgba(0, 102, 180, 0.5)",
            "0 0 40px rgba(79, 195, 247, 0.8)",
            "0 0 20px rgba(0, 102, 180, 0.5)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white font-bold text-xl">DNA</span>
      </motion.div>
    </div>
  );
}
