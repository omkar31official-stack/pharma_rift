import { motion } from "motion/react";
import { ReactNode } from "react";
import { DNAHelix } from "./DNAHelix";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export function DNATransitionOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-[#0a1628] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.5, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.5, rotate: 180 }}
        transition={{ duration: 0.6 }}
      >
        <DNAHelix size="large" color="#4FC3F7" />
      </motion.div>
    </motion.div>
  );
}
