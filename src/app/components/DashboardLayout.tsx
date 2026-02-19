import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { ParticleBackground } from "./ParticleBackground";
import { FloatingActionButton } from "./FloatingActionButton";
import { motion, AnimatePresence } from "motion/react";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <ParticleBackground />
      <Sidebar />
      <main className="ml-64">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <FloatingActionButton />
    </div>
  );
}