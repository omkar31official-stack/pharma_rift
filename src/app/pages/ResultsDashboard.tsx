import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Dna,
  FileText,
  ChevronDown,
  ChevronUp,
  Download,
  Activity,
  Pill,
} from "lucide-react";
import { useState } from "react";

export function ResultsDashboard() {
  const navigate = useNavigate();
  const { analysisResult, patientData, selectedDrug, vcfData } = useAppContext();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    explanation: false,
    mechanism: false,
    variants: true,
  });

  if (!analysisResult || !patientData || !selectedDrug || !vcfData) {
    navigate("/dashboard");
    return null;
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const riskColor =
    analysisResult.riskLevel === "Safe"
      ? "#388E3C"
      : analysisResult.riskLevel === "Toxic"
      ? "#D32F2F"
      : analysisResult.riskLevel === "Caution"
      ? "#FBC02D"
      : "#0066B4";

  const riskBgColor =
    analysisResult.riskLevel === "Safe"
      ? "from-green-500 to-green-600"
      : analysisResult.riskLevel === "Toxic"
      ? "from-red-500 to-red-600"
      : analysisResult.riskLevel === "Caution"
      ? "from-yellow-500 to-yellow-600"
      : "from-blue-500 to-blue-600";

  // Radar chart data
  const radarData = [
    { metric: "Efficacy", value: 100 - analysisResult.riskScore },
    { metric: "Safety", value: analysisResult.riskLevel === "Safe" ? 95 : 45 },
    { metric: "Confidence", value: analysisResult.confidence },
    { metric: "Evidence", value: 92 },
    { metric: "CPIC Level", value: 88 },
  ];

  // Confidence breakdown data
  const confidenceData = [
    { name: "Gene Match", value: 40, color: "#0066B4" },
    { name: "Variant Quality", value: 30, color: "#4FC3F7" },
    { name: "Evidence", value: 20, color: "#388E3C" },
    { name: "Validation", value: 10, color: "#FBC02D" },
  ];

  // Phenotype distribution
  const phenotypeData = [
    { phenotype: "PM", count: 20 },
    { phenotype: "IM", count: 35 },
    { phenotype: "NM", count: 40 },
    { phenotype: "RM", count: 5 },
  ];

  return (
    <div className="min-h-screen p-8 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066B4] to-[#4FC3F7] flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
              <p className="text-gray-600">{selectedDrug} Risk Assessment</p>
            </div>
          </div>
          <motion.button
            onClick={() => navigate("/dashboard/export")}
            className="px-6 py-3 bg-[#0066B4] text-white rounded-xl font-medium flex items-center gap-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            Export Report
          </motion.button>
        </div>
      </motion.div>

      {/* Top Risk Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8 overflow-hidden"
      >
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${riskBgColor} opacity-5`}
        />

        {/* Pulse animation for critical risks */}
        {analysisResult.riskLevel === "Toxic" && (
          <motion.div
            className="absolute inset-0 border-4 border-red-500 rounded-3xl"
            animate={{
              opacity: [0.5, 0, 0.5],
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Level */}
          <div className="text-center lg:border-r border-gray-200">
            <motion.div
              className="inline-block mb-4"
              animate={
                analysisResult.riskLevel === "Toxic"
                  ? { scale: [1, 1.1, 1] }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            >
              {analysisResult.riskLevel === "Safe" ? (
                <CheckCircle2 className="w-20 h-20 mx-auto" style={{ color: riskColor }} />
              ) : (
                <AlertTriangle className="w-20 h-20 mx-auto" style={{ color: riskColor }} />
              )}
            </motion.div>
            <h3 className="text-3xl font-bold mb-2" style={{ color: riskColor }}>
              {analysisResult.riskLevel}
            </h3>
            <p className="text-gray-600">Risk Classification</p>
            <div className="mt-4">
              <span
                className="px-4 py-2 rounded-full text-sm font-bold"
                style={{
                  backgroundColor: `${riskColor}20`,
                  color: riskColor,
                }}
              >
                Score: {analysisResult.riskScore}/100
              </span>
            </div>
          </div>

          {/* Confidence Meter */}
          <div className="text-center lg:border-r border-gray-200">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#0066B4"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 352 }}
                  animate={{
                    strokeDashoffset: 352 - (352 * analysisResult.confidence) / 100,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ strokeDasharray: 352 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">
                  {analysisResult.confidence}%
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confidence Score</h3>
            <p className="text-gray-600">Analysis Certainty</p>
          </div>

          {/* Genetic Profile */}
          <div className="text-center">
            <Dna className="w-20 h-20 mx-auto mb-4 text-[#0066B4]" />
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">Primary Gene</p>
                <p className="text-xl font-bold text-gray-900">
                  {analysisResult.primaryGene}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Diplotype</p>
                <p className="text-lg font-bold text-[#0066B4]">
                  {analysisResult.diplotype}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phenotype</p>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
                  {analysisResult.phenotype}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts and Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#0066B4]" />
            Multi-Gene Impact Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "#6b7280", fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#9ca3af" }} />
              <Radar
                name="Score"
                dataKey="value"
                stroke="#0066B4"
                fill="#0066B4"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Confidence Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#0066B4]" />
            Confidence Score Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={confidenceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {confidenceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>• Gene Match Strength: 40%</p>
            <p>• Variant Completeness: 30%</p>
            <p>• Evidence Weight: 20%</p>
            <p>• Data Validation: 10%</p>
          </div>
        </motion.div>
      </div>

      {/* Phenotype Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Population Phenotype Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={phenotypeData}>
            <XAxis dataKey="phenotype" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#0066B4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Detected Variants Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8"
      >
        <button
          onClick={() => toggleSection("variants")}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Dna className="w-5 h-5 text-[#0066B4]" />
            Detected Variants ({vcfData.variants.length})
          </h3>
          {expandedSections.variants ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {expandedSections.variants && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    RSID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    Gene
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    Allele
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    Genotype
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    Functional Impact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    Evidence
                  </th>
                </tr>
              </thead>
              <tbody>
                {vcfData.variants.map((variant, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-[#0066B4]">
                      {variant.rsid}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">
                      {variant.gene}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{variant.allele}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                        {variant.genotype}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {variant.functionalImpact}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                        {variant.evidenceLevel}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>

      {/* Clinical Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#0066B4]" />
          Clinical Recommendations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Action Required */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Action Required
            </h4>
            <ul className="space-y-2">
              {analysisResult.recommendations.map((rec, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <span className="text-[#0066B4] mt-1">•</span>
                  <span>{rec}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Alternative Medications */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Pill className="w-4 h-4 text-green-500" />
              Alternative Medications
            </h4>
            <div className="space-y-2">
              {analysisResult.alternatives.map((alt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="px-3 py-2 bg-green-50 rounded-lg text-sm font-medium text-green-700"
                >
                  {alt}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Monitoring Guidance */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              Monitoring Guidance
            </h4>
            <ul className="space-y-2">
              {analysisResult.monitoring.map((mon, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <span className="text-[#0066B4] mt-1">•</span>
                  <span>{mon}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* AI-Generated Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-[#0066B4]/5 to-[#4FC3F7]/5 rounded-2xl shadow-xl border border-[#0066B4]/20 p-6"
      >
        <button
          onClick={() => toggleSection("explanation")}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-xl font-bold text-gray-900">AI-Generated Clinical Explanation</h3>
          {expandedSections.explanation ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {expandedSections.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4"
          >
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Summary</h4>
              <p className="text-gray-700 leading-relaxed">{analysisResult.explanation}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Mechanism of Action</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {analysisResult.mechanism}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Variant Functional Impact</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {analysisResult.variantImpact}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">
                  Pharmacokinetic Change
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {analysisResult.pkChange}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Clinical Risk</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {analysisResult.clinicalRisk}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Action buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <motion.button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Dashboard
        </motion.button>
        <motion.button
          onClick={() => navigate("/dashboard/export")}
          className="px-8 py-4 bg-gradient-to-r from-[#0066B4] to-[#4FC3F7] text-white rounded-xl font-medium shadow-lg shadow-[#0066B4]/30 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-5 h-5" />
          Export Full Report
        </motion.button>
      </div>
    </div>
  );
}
