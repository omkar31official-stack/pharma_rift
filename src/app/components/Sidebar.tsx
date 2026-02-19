import { NavLink } from "react-router";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Upload,
  Dna,
  FileText,
  ClipboardList,
  Download,
  History,
  Settings as SettingsIcon,
  Activity,
} from "lucide-react";

const menuItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/dashboard/intake", icon: ClipboardList, label: "Patient Intake" },
  { path: "/dashboard/upload", icon: Upload, label: "Upload & Analyze" },
  { path: "/dashboard/results", icon: Dna, label: "Genetic Profile" },
  { path: "/dashboard/results", icon: FileText, label: "Drug Risk Reports" },
  { path: "/dashboard/export", icon: Download, label: "Export Center" },
  { path: "/dashboard/audit", icon: History, label: "Audit Log" },
  { path: "/dashboard/settings", icon: SettingsIcon, label: "Settings" },
];

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#0066B4]/10 shadow-xl z-50"
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 border-b border-[#0066B4]/10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0066B4] to-[#4FC3F7] flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#0066B4]">PharmaGuard X</h1>
            <p className="text-xs text-gray-500">AI Genomics</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item, index) => (
          <NavLink key={item.path + item.label} to={item.path}>
            {({ isActive }) => (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  relative group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#0066B4]/10 text-[#0066B4]"
                      : "text-gray-600 hover:bg-[#0066B4]/5"
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#0066B4] rounded-r"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom decoration - DNA strand */}
      <div className="absolute bottom-8 left-4 right-4">
        <motion.div
          className="h-16 rounded-lg bg-gradient-to-br from-[#0066B4]/5 to-[#4FC3F7]/5 p-3"
          animate={{
            boxShadow: [
              "0 0 20px rgba(0, 102, 180, 0.1)",
              "0 0 30px rgba(79, 195, 247, 0.2)",
              "0 0 20px rgba(0, 102, 180, 0.1)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Dna className="w-4 h-4 text-[#0066B4]" />
            <div>
              <div className="font-medium">System Active</div>
              <div className="text-gray-400">FDA-Grade Analytics</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}
