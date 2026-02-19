import { motion } from "motion/react";
import { Settings as SettingsIcon, Bell, Shield, Database, User } from "lucide-react";

export function Settings() {
  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066B4] to-[#4FC3F7] flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Configure your PharmaGuard X platform</p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl space-y-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-[#0066B4]" />
            <h3 className="text-xl font-bold text-gray-900">Profile Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution Name
              </label>
              <input
                type="text"
                defaultValue="General Hospital"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#0066B4] outline-none bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                defaultValue="Clinical Genomics"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#0066B4] outline-none bg-white"
              />
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-[#0066B4]" />
            <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">High-risk alerts</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#0066B4]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">Analysis completion</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#0066B4]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">Export confirmations</span>
              <input type="checkbox" className="w-5 h-5 text-[#0066B4]" />
            </label>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-[#0066B4]" />
            <h3 className="text-xl font-bold text-gray-900">Security</h3>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">HIPAA Compliance Mode</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#0066B4]" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">Audit logging</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#0066B4]" />
            </label>
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-[#0066B4]" />
            <h3 className="text-xl font-bold text-gray-900">Data Management</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-left">
              Export All Data
            </button>
            <button className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors text-left">
              Clear Audit Log
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
