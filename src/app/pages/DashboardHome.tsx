import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import {
  Activity,
  FileText,
  TrendingUp,
  Users,
  ChevronRight,
  Dna,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export function DashboardHome() {
  const navigate = useNavigate();
  const { auditLog, analysisResult } = useAppContext();

  const stats = [
    {
      label: "Total Analyses",
      value: auditLog.length.toString(),
      icon: Activity,
      color: "from-[#0066B4] to-[#4FC3F7]",
      change: "+12%",
    },
    {
      label: "Patients Processed",
      value: auditLog.length > 0 ? auditLog.length.toString() : "0",
      icon: Users,
      color: "from-[#388E3C] to-[#66BB6A]",
      change: "+8%",
    },
    {
      label: "Risk Alerts",
      value: auditLog.filter((e) => e.riskResult.includes("Toxic")).length.toString(),
      icon: AlertTriangle,
      color: "from-[#D32F2F] to-[#F44336]",
      change: "-5%",
    },
    {
      label: "Success Rate",
      value: "99.9%",
      icon: CheckCircle2,
      color: "from-[#388E3C] to-[#66BB6A]",
      change: "+0.2%",
    },
  ];

  const quickActions = [
    {
      title: "New Patient Analysis",
      description: "Start a new pharmacogenomic assessment",
      icon: FileText,
      color: "#0066B4",
      action: () => navigate("/dashboard/intake"),
    },
    {
      title: "View Results",
      description: "Review recent analysis results",
      icon: TrendingUp,
      color: "#388E3C",
      action: () => navigate("/dashboard/results"),
    },
    {
      title: "Export Reports",
      description: "Download clinical reports and data",
      icon: Dna,
      color: "#FBC02D",
      action: () => navigate("/dashboard/export"),
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to PharmaGuard X
        </h1>
        <p className="text-lg text-gray-600">
          AI-Powered Pharmacogenomic Risk Intelligence Platform
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            onClick={action.action}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer group"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
              style={{ backgroundColor: `${action.color}15` }}
            >
              <action.icon className="w-7 h-7" style={{ color: action.color }} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#0066B4] transition-colors">
              {action.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{action.description}</p>
            <div className="flex items-center gap-2 text-[#0066B4] text-sm font-medium group-hover:gap-3 transition-all">
              Get Started
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
          <button
            onClick={() => navigate("/dashboard/audit")}
            className="text-[#0066B4] hover:text-[#4FC3F7] text-sm font-medium flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {auditLog.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No recent activity. Start your first analysis to see results here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {auditLog.slice(0, 5).map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0066B4]/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#0066B4]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{entry.drug} Analysis</p>
                    <p className="text-sm text-gray-600">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    entry.riskResult.includes("Toxic")
                      ? "bg-red-100 text-red-700"
                      : entry.riskResult.includes("Caution")
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {entry.riskResult}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
