import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { History, Search, Filter, FileText } from "lucide-react";
import { useState } from "react";

export function AuditLog() {
  const { auditLog } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredLogs = auditLog.filter((entry) => {
    const matchesSearch =
      entry.drug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.riskResult.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      (filterType === "export" && entry.exportType) ||
      (filterType === "analysis" && !entry.exportType);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066B4] to-[#4FC3F7] flex items-center justify-center">
            <History className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
            <p className="text-gray-600">Track all system activities</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by drug or risk result..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#0066B4] outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-12 pr-8 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#0066B4] outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Activities</option>
              <option value="analysis">Analysis Only</option>
              <option value="export">Exports Only</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Activities", value: auditLog.length, color: "from-blue-500 to-blue-600" },
          {
            label: "Analyses",
            value: auditLog.filter((e) => !e.exportType).length,
            color: "from-green-500 to-green-600",
          },
          {
            label: "Exports",
            value: auditLog.filter((e) => e.exportType).length,
            color: "from-purple-500 to-purple-600",
          },
          {
            label: "High Risk",
            value: auditLog.filter((e) => e.riskResult.includes("Toxic")).length,
            color: "from-red-500 to-red-600",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}
            >
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Audit Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        {filteredLogs.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <History className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No audit entries found</p>
            <p className="text-sm mt-2">Start analyzing to see activity logs here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Activity Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Drug
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Risk Result
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                    Export Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(entry.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#0066B4]" />
                        <span className="text-sm font-medium text-gray-900">
                          {entry.exportType ? "Export" : "Analysis"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {entry.drug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
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
                    </td>
                    <td className="px-6 py-4">
                      {entry.exportType ? (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {entry.exportType}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
