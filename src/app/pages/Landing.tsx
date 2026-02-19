import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { DNAHelix } from "../components/DNAHelix";
import { ParticleBackground } from "../components/ParticleBackground";
import { 
  Dna, 
  Shield, 
  Zap, 
  Activity, 
  ChevronRight,
  Microscope,
  FileCheck,
  TrendingUp,
} from "lucide-react";

export function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Dna,
      title: "Genomic Analysis",
      description: "Advanced VCF parsing with real-time variant detection",
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "FDA-grade drug-gene interaction analysis",
    },
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Clinical decision support with ML-driven insights",
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Live confidence scoring and quality metrics",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: FileCheck,
      title: "Patient Intake",
      description: "Enter patient demographics and clinical information",
      patientNote: "Your doctor will enter your basic information including age, weight, and medical history.",
    },
    {
      number: "02",
      icon: Microscope,
      title: "Upload VCF",
      description: "Upload genetic variant data for comprehensive analysis",
      patientNote: "We'll analyze your genetic test results (VCF file) to understand how your genes affect medication.",
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Get Insights",
      description: "Receive actionable pharmacogenomic recommendations",
      patientNote: "You'll receive a clear report showing which medications work best for your unique genetic makeup.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fb] via-[#e8f4f8] to-[#f8f9fb] overflow-hidden">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Animated DNA background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <DNAHelix size="large" />
        </div>

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <div className="px-4 py-2 rounded-full bg-[#0066B4]/10 border border-[#0066B4]/20 inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0066B4] animate-pulse" />
                <span className="text-sm font-medium text-[#0066B4]">
                  FDA-Grade Clinical Platform
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Transform{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066B4] to-[#4FC3F7]">
                  Genetic Variants
                </span>
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl lg:text-5xl font-bold text-gray-900"
              >
                Into Actionable Prescription Intelligence
              </motion.h2>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              PharmaGuard X delivers hospital-grade pharmacogenomic risk analysis,
              enabling clinicians to make data-driven prescription decisions with
              confidence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={() => navigate("/dashboard/intake")}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#0066B4] to-[#4FC3F7] text-white rounded-xl font-medium overflow-hidden shadow-lg shadow-[#0066B4]/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative flex items-center gap-2">
                  Start Clinical Analysis
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-4 bg-white text-[#0066B4] rounded-xl font-medium border-2 border-[#0066B4]/20 hover:border-[#0066B4] hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Dashboard
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {[
                { label: "Genes Analyzed", value: "200+" },
                { label: "Drugs Covered", value: "50+" },
                { label: "Accuracy Rate", value: "99.9%" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-[#0066B4]">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D DNA Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{
                rotateY: [0, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <DNAHelix size="large" />
            </motion.div>

            {/* Floating data points */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-[#0066B4]"
                style={{
                  top: `${15 + i * 10}%`,
                  left: `${30 + Math.sin(i) * 40}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* For Patients Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 bg-gradient-to-r from-[#0066B4]/10 to-[#4FC3F7]/10 rounded-2xl p-8 border-2 border-[#0066B4]/20"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              📋 For Patients: How This Helps You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-xl p-6">
                <div className="text-3xl mb-3">🧬</div>
                <h4 className="font-bold text-gray-900 mb-2">Your DNA Matters</h4>
                <p className="text-sm text-gray-600">
                  Everyone's genes are different. This test shows how YOUR body processes medications.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-3xl mb-3">💊</div>
                <h4 className="font-bold text-gray-900 mb-2">Safer Prescriptions</h4>
                <p className="text-sm text-gray-600">
                  Get personalized medication recommendations that work better and safer for you.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-3xl mb-3">✅</div>
                <h4 className="font-bold text-gray-900 mb-2">Easy to Understand</h4>
                <p className="text-sm text-gray-600">
                  Results are presented in clear, simple language with visual guides.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple Steps for Powerful Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our streamlined workflow makes pharmacogenomic analysis accessible and actionable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-[#0066B4]/10 h-full">
                  {/* Step number */}
                  <div className="text-6xl font-bold text-[#0066B4]/10 mb-4">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0066B4] to-[#4FC3F7] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#0066B4]/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for hospitals and research institutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white rounded-xl p-6 border border-[#0066B4]/10 hover:border-[#0066B4]/30 transition-all h-full hover:shadow-xl">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0066B4]/10 to-[#4FC3F7]/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="w-6 h-6 text-[#0066B4]" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#0066B4] to-[#4FC3F7] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <DNAHelix size="large" color="#ffffff" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Patient Care?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join leading healthcare institutions using PharmaGuard X for precision medicine
          </p>
          <motion.button
            onClick={() => navigate("/dashboard/intake")}
            className="px-10 py-5 bg-white text-[#0066B4] rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}