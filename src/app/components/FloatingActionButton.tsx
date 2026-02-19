import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

export function FloatingActionButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate("/dashboard/intake")}
      className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#0066B4] to-[#4FC3F7] rounded-full shadow-2xl flex items-center justify-center z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        boxShadow: [
          "0 10px 40px rgba(0, 102, 180, 0.3)",
          "0 10px 60px rgba(79, 195, 247, 0.5)",
          "0 10px 40px rgba(0, 102, 180, 0.3)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Plus className="w-8 h-8 text-white" />
    </motion.button>
  );
}
