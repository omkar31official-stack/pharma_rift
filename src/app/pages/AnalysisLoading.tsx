import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { DNAHelix } from "../components/DNAHelix";
import { Dna } from "lucide-react";

const analysisSteps = [
  { id: 1, label: "Parsing VCF File Structure...", duration: 1500 },
  { id: 2, label: "Mapping Diplotypes...", duration: 2000 },
  { id: 3, label: "Computing Phenotypes...", duration: 1800 },
  { id: 4, label: "Evaluating Drug-Gene Interactions...", duration: 2200 },
  { id: 5, label: "Calculating Risk Scores...", duration: 1600 },
  { id: 6, label: "Generating Clinical Explanation...", duration: 2000 },
];

export function AnalysisLoading() {
  const navigate = useNavigate();
  const { selectedDrug, vcfData, setAnalysisResult, addAuditEntry } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [variantNodes, setVariantNodes] = useState<number[]>([]);

  useEffect(() => {
    if (!selectedDrug || !vcfData) {
      navigate("/dashboard/drug-selection");
      return;
    }

    let stepIndex = 0;
    const progressSteps = () => {
      if (stepIndex < analysisSteps.length) {
        setTimeout(() => {
          setCurrentStep(stepIndex + 1);
          // Add variant nodes as we progress
          if (stepIndex % 2 === 0) {
            setVariantNodes((prev) => [...prev, stepIndex]);
          }
          stepIndex++;
          progressSteps();
        }, analysisSteps[stepIndex].duration);
      } else {
        // Analysis complete - generate mock results
        const mockResult = generateMockAnalysis();
        setAnalysisResult(mockResult);
        
        // Add to audit log
        addAuditEntry({
          drug: selectedDrug,
          riskResult: mockResult.riskLevel,
        });

        // Navigate to results
        setTimeout(() => {
          navigate("/dashboard/results");
        }, 1000);
      }
    };

    progressSteps();
  }, [selectedDrug, vcfData, navigate, setAnalysisResult, addAuditEntry]);

  const generateMockAnalysis = () => {
    const riskLevels: Array<"Safe" | "Caution" | "Toxic" | "Modified Dosing"> = [
      "Safe",
      "Caution",
      "Toxic",
      "Modified Dosing",
    ];
    const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const confidence = 85 + Math.random() * 15;

    return {
      drug: selectedDrug!,
      riskLevel: randomRisk,
      riskScore: randomRisk === "Toxic" ? 85 : randomRisk === "Caution" ? 60 : 30,
      confidence: Math.round(confidence),
      diplotype: "*4/*4",
      phenotype: randomRisk === "Toxic" ? "Poor Metabolizer" : "Intermediate Metabolizer",
      primaryGene: "CYP2D6",
      recommendations: [
        "Consider alternative medication",
        "If medication is necessary, reduce dose by 50%",
        "Monitor patient closely for adverse effects",
      ],
      alternatives: ["Morphine", "Oxycodone", "Hydromorphone"],
      monitoring: [
        "Monitor for respiratory depression",
        "Assess pain management effectiveness",
        "Check liver function regularly",
      ],
      explanation: `Based on the patient's genetic profile, they carry the ${
        randomRisk === "Toxic" ? "*4/*4" : "*1/*4"
      } diplotype in the CYP2D6 gene, resulting in ${
        randomRisk === "Toxic" ? "significantly reduced" : "moderately reduced"
      } enzyme activity. This genetic variant affects the metabolism of ${selectedDrug}, leading to ${
        randomRisk === "Toxic"
          ? "potential toxic accumulation"
          : "altered drug effectiveness"
      }. Clinical guidelines recommend dose adjustment or alternative therapy.`,
      mechanism: `CYP2D6 is responsible for the metabolic activation of ${selectedDrug}. The detected variants result in ${
        randomRisk === "Toxic" ? "absent" : "reduced"
      } enzyme function, preventing efficient drug metabolism.`,
      variantImpact: `The patient carries loss-of-function alleles that significantly impact drug processing, leading to ${
        randomRisk === "Toxic" ? "no enzyme activity" : "decreased enzyme activity"
      }.`,
      pkChange: `Expected ${
        randomRisk === "Toxic" ? "90%" : "50%"
      } reduction in drug clearance, with potential for ${
        randomRisk === "Toxic" ? "severe" : "moderate"
      } accumulation.`,
      clinicalRisk: `${
        randomRisk === "Toxic" ? "High" : "Moderate"
      } risk of adverse events including respiratory depression, sedation, and potential overdose symptoms.`,
    };
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-[#0a1628] flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#4FC3F7] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Central DNA Helix */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative"
        >
          <DNAHelix size="large" color="#4FC3F7" />

          {/* Variant nodes lighting up */}
          {variantNodes.map((node, index) => (
            <motion.div
              key={node}
              className="absolute w-4 h-4 rounded-full bg-[#0066B4]"
              style={{
                top: `${20 + node * 15}%`,
                left: `${40 + Math.sin(node) * 20}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 1],
                opacity: [0, 1, 0.8],
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[#4FC3F7]"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Analysis status */}
      <div className="absolute bottom-32 left-0 right-0 text-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Current step */}
          <div className="space-y-3">
            {analysisSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: index < currentStep ? 1 : index === currentStep ? 1 : 0.3,
                  x: 0,
                }}
                transition={{ delay: index * 0.1 }}
                className={`text-lg font-medium ${
                  index === currentStep
                    ? "text-[#4FC3F7]"
                    : index < currentStep
                    ? "text-green-400"
                    : "text-gray-500"
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  {index < currentStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                    >
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  ) : index === currentStep ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Dna className="w-5 h-5 text-[#4FC3F7]" />
                    </motion.div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
                  )}
                  <span>{step.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="max-w-md mx-auto">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0066B4] via-[#4FC3F7] to-[#0066B4]"
                initial={{ width: 0 }}
                animate={{
                  width: `${(currentStep / analysisSteps.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {Math.round((currentStep / analysisSteps.length) * 100)}% Complete
            </p>
          </div>

          {/* Analyzing text */}
          <motion.h2
            className="text-3xl font-bold text-white"
            animate={{
              opacity: [1, 0.7, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Analyzing {selectedDrug}...
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
}
