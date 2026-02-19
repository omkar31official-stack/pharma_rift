import React, { createContext, useContext, useState, ReactNode } from "react";

interface PatientData {
  fullName: string;
  patientId: string;
  age: string;
  gender: string;
  weight: string;
  ethnicity: string;
  clinicalNotes: string;
}

interface VCFData {
  fileName: string;
  fileSize: number;
  variants: Array<{
    rsid: string;
    gene: string;
    allele: string;
    genotype: string;
    functionalImpact: string;
    evidenceLevel: string;
  }>;
  genesDetected: string[];
}

interface AnalysisResult {
  drug: string;
  riskLevel: "Safe" | "Caution" | "Toxic" | "Modified Dosing";
  riskScore: number;
  confidence: number;
  diplotype: string;
  phenotype: string;
  primaryGene: string;
  recommendations: string[];
  alternatives: string[];
  monitoring: string[];
  explanation: string;
  mechanism: string;
  variantImpact: string;
  pkChange: string;
  clinicalRisk: string;
}

interface AuditEntry {
  id: string;
  timestamp: string;
  drug: string;
  riskResult: string;
  exportType?: string;
}

interface AppContextType {
  patientData: PatientData | null;
  setPatientData: (data: PatientData) => void;
  vcfData: VCFData | null;
  setVcfData: (data: VCFData) => void;
  selectedDrug: string | null;
  setSelectedDrug: (drug: string) => void;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult) => void;
  auditLog: AuditEntry[];
  addAuditEntry: (entry: Omit<AuditEntry, "id" | "timestamp">) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [vcfData, setVcfData] = useState<VCFData | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);

  const addAuditEntry = (entry: Omit<AuditEntry, "id" | "timestamp">) => {
    const newEntry: AuditEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    setAuditLog((prev) => [newEntry, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        patientData,
        setPatientData,
        vcfData,
        setVcfData,
        selectedDrug,
        setSelectedDrug,
        analysisResult,
        setAnalysisResult,
        auditLog,
        addAuditEntry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
