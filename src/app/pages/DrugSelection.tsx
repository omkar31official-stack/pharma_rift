import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { Pill, ChevronRight, Check } from "lucide-react";

const drugs = [
  {
    name: "CODEINE",
    category: "Analgesic",
    gene: "CYP2D6",
    description: "Opioid pain medication metabolized by CYP2D6",
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "WARFARIN",
    category: "Anticoagulant",
    gene: "CYP2C9, VKORC1",
    description: "Blood thinner requiring dose adjustment based on genetics",
    color: "from-red-500 to-red-600",
  },
  {
    name: "CLOPIDOGREL",
    category: "Antiplatelet",
    gene: "CYP2C19",
    description: "Prevents blood clots, activated by CYP2C19",
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "SIMVASTATIN",
    category: "Statin",
    gene: "SLCO1B1",
    description: "Cholesterol-lowering drug affected by SLCO1B1 variants",
    color: "from-green-500 to-green-600",
  },
  {
    name: "AZATHIOPRINE",
    category: "Immunosuppressant",
    gene: "TPMT",
    description: "Immune system suppressant metabolized by TPMT",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    name: "FLUOROURACIL",
    category: "Chemotherapy",
    gene: "DPYD",
    description: "Cancer treatment requiring DPYD screening",
    color: "from-pink-500 to-pink-600",
  },
];

export function DrugSelection() {
  const navigate = useNavigate();
  const { vcfData, setSelectedDrug } = useAppContext();
  const [selected, setSelected] = useState<string | null>(null);

  if (!vcfData) {
    navigate("/dashboard/upload");
    return null;
  }

  const handleSelect = (drugName: string) => {
    setSelected(drugName);
  };

  const handleContinue = () => {
    if (selected) {
      setSelectedDrug(selected);
      navigate("/dashboard/analyzing");
    }
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066B4] to-[#4FC3F7] flex items-center justify-center">
            <Pill className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Drug Selection</h1>
            <p className="text-gray-600">
              Step 3 of 3 - Select Medication for Analysis
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "66.66%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-[#0066B4] to-[#4FC3F7]"
          />
        </div>
      </motion.div>

      {/* VCF Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-3">Genomic Data Loaded</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">File</p>
            <p className="font-medium">{vcfData.fileName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Variants</p>
            <p className="font-medium">{vcfData.variants.length} detected</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Genes</p>
            <p className="font-medium">{vcfData.genesDetected.length} identified</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-medium text-green-600 flex items-center gap-1">
              <Check className="w-4 h-4" />
              Validated
            </p>
          </div>
        </div>
      </motion.div>

      {/* Drug Selection Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Select a medication to analyze
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drugs.map((drug, index) => {
            const isSelected = selected === drug.name;
            return (
              <motion.div
                key={drug.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => handleSelect(drug.name)}
                className={`
                  relative bg-white rounded-2xl p-6 cursor-pointer transition-all
                  border-2 shadow-lg hover:shadow-2xl
                  ${
                    isSelected
                      ? "border-[#0066B4] scale-105 shadow-[#0066B4]/20"
                      : "border-gray-200 hover:border-[#0066B4]/50"
                  }
                `}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0066B4] flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${drug.color} flex items-center justify-center mb-4`}
                >
                  <Pill className="w-8 h-8 text-white" />
                </div>

                {/* Drug name */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {drug.name}
                </h3>

                {/* Category */}
                <p className="text-sm text-gray-600 mb-3">{drug.category}</p>

                {/* Gene badge */}
                <div className="mb-3">
                  <span className="px-2 py-1 bg-[#0066B4]/10 text-[#0066B4] rounded text-xs font-medium">
                    {drug.gene}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {drug.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8">
        <motion.button
          type="button"
          onClick={() => navigate("/dashboard/upload")}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          whileHover={{ x: -5 }}
        >
          ← Back to Upload
        </motion.button>

        {selected && (
          <motion.button
            onClick={handleContinue}
            className="px-8 py-4 bg-gradient-to-r from-[#0066B4] to-[#4FC3F7] text-white rounded-xl font-medium shadow-lg shadow-[#0066B4]/30 flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Analysis
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
