import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { Download, FileJson, FileText, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import jsPDF from "jspdf";

export function ExportCenter() {
  const navigate = useNavigate();
  const { analysisResult, patientData, selectedDrug, vcfData, addAuditEntry } = useAppContext();
  const [copied, setCopied] = useState(false);

  if (!analysisResult || !patientData || !selectedDrug || !vcfData) {
    navigate("/dashboard");
    return null;
  }

  const generateJSON = () => {
    const exportData = {
      patient_id: patientData.patientId,
      drug: selectedDrug,
      timestamp: new Date().toISOString(),
      risk_assessment: {
        risk_level: analysisResult.riskLevel,
        risk_score: analysisResult.riskScore,
        confidence: analysisResult.confidence,
      },
      pharmacogenomic_profile: {
        primary_gene: analysisResult.primaryGene,
        diplotype: analysisResult.diplotype,
        phenotype: analysisResult.phenotype,
        variants: vcfData.variants,
      },
      clinical_recommendation: {
        action_required: analysisResult.recommendations,
        alternative_medications: analysisResult.alternatives,
        monitoring_guidance: analysisResult.monitoring,
      },
      llm_generated_explanation: {
        summary: analysisResult.explanation,
        mechanism: analysisResult.mechanism,
        variant_impact: analysisResult.variantImpact,
        pk_change: analysisResult.pkChange,
        clinical_risk: analysisResult.clinicalRisk,
      },
      quality_metrics: {
        gene_match_strength: 40,
        variant_completeness: 30,
        evidence_weight: 20,
        data_validation: 10,
      },
    };

    return JSON.stringify(exportData, null, 2);
  };

  const downloadJSON = () => {
    const jsonData = generateJSON();
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pharmaguard-${patientData.patientId}-${selectedDrug}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addAuditEntry({
      drug: selectedDrug,
      riskResult: analysisResult.riskLevel,
      exportType: "JSON",
    });
  };

  const copyToClipboard = () => {
    const jsonData = generateJSON();
    navigator.clipboard.writeText(jsonData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Header
    doc.setFillColor(0, 102, 180);
    doc.rect(0, 0, pageWidth, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("PharmaGuard X", 20, 15);
    doc.setFontSize(12);
    doc.text("Pharmacogenomic Risk Analysis Report", 20, 23);

    // Reset text color
    doc.setTextColor(0, 0, 0);
    yPos = 45;

    // Patient Information
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("Patient Information", 20, yPos);
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.text(`Name: ${patientData.fullName}`, 20, yPos);
    yPos += 7;
    doc.text(`Patient ID: ${patientData.patientId}`, 20, yPos);
    yPos += 7;
    doc.text(`Age: ${patientData.age} years | Gender: ${patientData.gender} | Weight: ${patientData.weight} kg`, 20, yPos);
    yPos += 15;

    // Drug & Risk Assessment
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("Risk Assessment", 20, yPos);
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.text(`Drug Analyzed: ${selectedDrug}`, 20, yPos);
    yPos += 7;
    doc.text(`Risk Level: ${analysisResult.riskLevel}`, 20, yPos);
    yPos += 7;
    doc.text(`Risk Score: ${analysisResult.riskScore}/100`, 20, yPos);
    yPos += 7;
    doc.text(`Confidence: ${analysisResult.confidence}%`, 20, yPos);
    yPos += 15;

    // Genetic Profile
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("Genetic Profile", 20, yPos);
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.text(`Primary Gene: ${analysisResult.primaryGene}`, 20, yPos);
    yPos += 7;
    doc.text(`Diplotype: ${analysisResult.diplotype}`, 20, yPos);
    yPos += 7;
    doc.text(`Phenotype: ${analysisResult.phenotype}`, 20, yPos);
    yPos += 15;

    // Variants
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("Detected Variants", 20, yPos);
    yPos += 10;
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    vcfData.variants.forEach((variant, index) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`${index + 1}. ${variant.rsid} - ${variant.gene} (${variant.genotype})`, 20, yPos);
      yPos += 6;
    });
    yPos += 10;

    // Clinical Recommendations
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("Clinical Recommendations", 20, yPos);
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    analysisResult.recommendations.forEach((rec, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      const lines = doc.splitTextToSize(`${index + 1}. ${rec}`, pageWidth - 40);
      doc.text(lines, 20, yPos);
      yPos += lines.length * 6;
    });
    yPos += 10;

    // AI Explanation
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("AI-Generated Explanation", 20, yPos);
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    const explanationLines = doc.splitTextToSize(analysisResult.explanation, pageWidth - 40);
    doc.text(explanationLines, 20, yPos);
    yPos += explanationLines.length * 6 + 10;

    // Footer
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `Generated by PharmaGuard X - ${new Date().toLocaleDateString()} - Page ${i} of ${totalPages}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }

    doc.save(`pharmaguard-report-${patientData.patientId}.pdf`);

    addAuditEntry({
      drug: selectedDrug,
      riskResult: analysisResult.riskLevel,
      exportType: "PDF",
    });
  };

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
            <Download className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Export Center</h1>
            <p className="text-gray-600">Download Analysis Reports</p>
          </div>
        </div>
      </motion.div>

      {/* Export Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* JSON Export */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <FileJson className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">JSON Export</h3>
              <p className="text-gray-600">Structured data format</p>
            </div>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Download the complete analysis results in JSON format, compatible with
            external systems and databases. Includes all patient data, genetic variants,
            risk assessment, and clinical recommendations.
          </p>

          <div className="space-y-3">
            <motion.button
              onClick={downloadJSON}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#0066B4] to-[#4FC3F7] text-white rounded-xl font-medium shadow-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              Download JSON
            </motion.button>

            <motion.button
              onClick={copyToClipboard}
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy to Clipboard
                </>
              )}
            </motion.button>
          </div>

          {/* JSON Preview */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-64 overflow-auto">
            <pre className="text-xs text-gray-700 font-mono">
              {generateJSON().split("\n").slice(0, 15).join("\n")}
              {"\n..."}
            </pre>
          </div>
        </motion.div>

        {/* PDF Export */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">PDF Report</h3>
              <p className="text-gray-600">Clinical document format</p>
            </div>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Generate a comprehensive PDF report suitable for clinical documentation,
            patient records, and medical review. Includes formatted patient information,
            genetic analysis, risk assessment, and recommendations.
          </p>

          <motion.button
            onClick={generatePDF}
            className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium shadow-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-5 h-5" />
            Generate PDF Report
          </motion.button>

          {/* PDF Preview Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-3">Report Contents:</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#0066B4] mt-1">✓</span>
                Patient Demographics & Information
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0066B4] mt-1">✓</span>
                Drug & Risk Assessment Summary
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0066B4] mt-1">✓</span>
                Complete Genetic Profile & Variants
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0066B4] mt-1">✓</span>
                Clinical Recommendations
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0066B4] mt-1">✓</span>
                AI-Generated Explanation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0066B4] mt-1">✓</span>
                Professional Medical Formatting
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#0066B4]/5 to-[#4FC3F7]/5 rounded-2xl border border-[#0066B4]/20 p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Analysis Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Patient</p>
            <p className="font-bold text-gray-900">{patientData.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Drug</p>
            <p className="font-bold text-gray-900">{selectedDrug}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Risk Level</p>
            <p className="font-bold text-gray-900">{analysisResult.riskLevel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Confidence</p>
            <p className="font-bold text-gray-900">{analysisResult.confidence}%</p>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div className="flex justify-between items-center mt-8">
        <motion.button
          onClick={() => navigate("/dashboard/results")}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
          whileHover={{ x: -5 }}
        >
          ← Back to Results
        </motion.button>

        <motion.button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Return to Dashboard
        </motion.button>
      </div>
    </div>
  );
}
