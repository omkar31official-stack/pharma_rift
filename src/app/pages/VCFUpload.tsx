import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import {
  Upload,
  File,
  CheckCircle2,
  AlertCircle,
  Dna,
  ChevronRight,
  FileCode,
} from "lucide-react";

export function VCFUpload() {
  const navigate = useNavigate();
  const { setVcfData, patientData } = useAppContext();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [genesDetected, setGenesDetected] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsProcessing(true);
    setProgress(0);

    // Simulate file validation and parsing
    const mockGenes = ["CYP2D6", "CYP2C19", "VKORC1", "SLCO1B1", "TPMT", "DPYD"];

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
      if (i === 50) {
        setGenesDetected(mockGenes.slice(0, 3));
      } else if (i === 80) {
        setGenesDetected(mockGenes);
      }
    }

    // Mock validation
    const fileSizeValid = uploadedFile.size <= 5 * 1024 * 1024; // 5MB
    const fileExtensionValid = uploadedFile.name.endsWith(".vcf");

    if (fileSizeValid && fileExtensionValid) {
      setIsValid(true);
      setValidationMessage("VCF file validated successfully!");

      // Mock variant data
      const mockVariants = [
        {
          rsid: "rs1065852",
          gene: "CYP2D6",
          allele: "*4",
          genotype: "G/G",
          functionalImpact: "No function",
          evidenceLevel: "1A",
        },
        {
          rsid: "rs4244285",
          gene: "CYP2C19",
          allele: "*2",
          genotype: "A/A",
          functionalImpact: "Decreased function",
          evidenceLevel: "1A",
        },
        {
          rsid: "rs9923231",
          gene: "VKORC1",
          allele: "-1639G>A",
          genotype: "A/A",
          functionalImpact: "Increased sensitivity",
          evidenceLevel: "1A",
        },
        {
          rsid: "rs4149056",
          gene: "SLCO1B1",
          allele: "*5",
          genotype: "T/T",
          functionalImpact: "Decreased function",
          evidenceLevel: "1A",
        },
      ];

      setVcfData({
        fileName: uploadedFile.name,
        fileSize: uploadedFile.size,
        variants: mockVariants,
        genesDetected: mockGenes,
      });
    } else {
      setIsValid(false);
      setValidationMessage(
        !fileExtensionValid
          ? "Invalid file format. Please upload a .vcf file."
          : "File size exceeds 5MB limit."
      );
    }

    setIsProcessing(false);
  };

  const handleContinue = () => {
    navigate("/dashboard/drug-selection");
  };

  if (!patientData) {
    navigate("/dashboard/intake");
    return null;
  }

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
            <Upload className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">VCF Upload</h1>
            <p className="text-gray-600">
              Step 2 of 3 - Upload Genetic Variant Data
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "33.33%" }}
            animate={{ width: "66.66%" }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-[#0066B4] to-[#4FC3F7]"
          />
        </div>
      </motion.div>

      {/* Patient Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-3">Patient Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">{patientData.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">ID</p>
            <p className="font-medium">{patientData.patientId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Age</p>
            <p className="font-medium">{patientData.age} years</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Weight</p>
            <p className="font-medium">{patientData.weight} kg</p>
          </div>
        </div>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".vcf"
          onChange={handleFileSelect}
          className="hidden"
        />

        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative bg-white rounded-2xl shadow-xl border-4 border-dashed p-12 cursor-pointer
            transition-all duration-300
            ${
              isDragging
                ? "border-[#0066B4] bg-[#0066B4]/5 scale-105"
                : "border-gray-300 hover:border-[#0066B4]/50 hover:bg-gray-50"
            }
          `}
          whileHover={{ scale: 1.02 }}
        >
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#0066B4]/10 to-[#4FC3F7]/10 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FileCode className="w-12 h-12 text-[#0066B4]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Drop your VCF file here
                </h3>
                <p className="text-gray-600 mb-4">
                  or click to browse your computer
                </p>
                <p className="text-sm text-gray-500">
                  Supported: .vcf files (max 5MB)
                </p>
              </motion.div>
            ) : isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Dna className="w-24 h-24 text-[#0066B4]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Analyzing VCF File...
                </h3>

                {/* Progress bar */}
                <div className="max-w-md mx-auto mb-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#0066B4] to-[#4FC3F7]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{progress}% complete</p>
                </div>

                {/* Genes detected */}
                {genesDetected.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Genes Detected:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {genesDetected.map((gene, index) => (
                        <motion.span
                          key={gene}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-3 py-1 bg-[#0066B4]/10 text-[#0066B4] rounded-full text-sm font-medium"
                        >
                          {gene}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    isValid
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {isValid ? (
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  ) : (
                    <AlertCircle className="w-12 h-12 text-red-600" />
                  )}
                </motion.div>

                <h3
                  className={`text-2xl font-bold mb-2 ${
                    isValid ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {validationMessage}
                </h3>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg inline-block">
                  <div className="flex items-center gap-3">
                    <File className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                </div>

                {isValid && genesDetected.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                  >
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      {genesDetected.length} Genes Detected:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {genesDetected.map((gene) => (
                        <span
                          key={gene}
                          className="px-3 py-1 bg-[#0066B4]/10 text-[#0066B4] rounded-full text-sm font-medium"
                        >
                          {gene}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setIsValid(false);
                    setGenesDetected([]);
                  }}
                  className="mt-6 text-sm text-gray-600 hover:text-gray-900 underline"
                  whileHover={{ scale: 1.05 }}
                >
                  Upload Different File
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <motion.button
            type="button"
            onClick={() => navigate("/dashboard/intake")}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
            whileHover={{ x: -5 }}
          >
            ← Back to Intake
          </motion.button>

          {isValid && (
            <motion.button
              onClick={handleContinue}
              className="px-8 py-4 bg-gradient-to-r from-[#0066B4] to-[#4FC3F7] text-white rounded-xl font-medium shadow-lg shadow-[#0066B4]/30 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue to Drug Selection
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
