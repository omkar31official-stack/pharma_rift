import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { User, Calendar, Activity, ChevronRight, Sparkles } from "lucide-react";

export function PatientIntake() {
  const navigate = useNavigate();
  const { setPatientData } = useAppContext();
  const [formData, setFormData] = useState({
    fullName: "",
    patientId: "",
    age: "",
    gender: "",
    weight: "",
    ethnicity: "",
    clinicalNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const generatePatientId = () => {
    const id = `PG-${Date.now().toString().slice(-6)}`;
    setFormData((prev) => ({ ...prev, patientId: id }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Patient name is required";
    if (!formData.patientId.trim()) newErrors.patientId = "Patient ID is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.weight.trim()) newErrors.weight = "Weight is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setPatientData(formData);
      navigate("/dashboard/upload");
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
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Intake</h1>
            <p className="text-gray-600">Step 1 of 3 - Clinical Information</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "33.33%" }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-[#0066B4] to-[#4FC3F7]"
          />
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
            {/* Patient Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0066B4]" />
                Patient Demographics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Full Name *
                  </label>
                  <motion.input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all bg-white ${
                      errors.fullName
                        ? "border-red-500"
                        : "border-gray-200 focus:border-[#0066B4]"
                    } outline-none`}
                    placeholder="John Doe"
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.fullName}
                    </motion.p>
                  )}
                </div>

                {/* Patient ID */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient ID *
                  </label>
                  <div className="flex gap-2">
                    <motion.input
                      type="text"
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleChange}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all bg-white ${
                        errors.patientId
                          ? "border-red-500"
                          : "border-gray-200 focus:border-[#0066B4]"
                      } outline-none`}
                      placeholder="PG-123456"
                      whileFocus={{ scale: 1.01 }}
                    />
                    <motion.button
                      type="button"
                      onClick={generatePatientId}
                      className="px-4 py-3 bg-[#0066B4]/10 text-[#0066B4] rounded-lg font-medium hover:bg-[#0066B4]/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Auto
                    </motion.button>
                  </div>
                  {errors.patientId && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.patientId}
                    </motion.p>
                  )}
                </div>

                {/* Age */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <motion.input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all bg-white ${
                      errors.age
                        ? "border-red-500"
                        : "border-gray-200 focus:border-[#0066B4]"
                    } outline-none`}
                    placeholder="45"
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.age && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.age}
                    </motion.p>
                  )}
                </div>

                {/* Gender */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <motion.select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all bg-white ${
                      errors.gender
                        ? "border-red-500"
                        : "border-gray-200 focus:border-[#0066B4]"
                    } outline-none`}
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </motion.select>
                  {errors.gender && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.gender}
                    </motion.p>
                  )}
                </div>

                {/* Weight */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg) *
                  </label>
                  <motion.input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all bg-white ${
                      errors.weight
                        ? "border-red-500"
                        : "border-gray-200 focus:border-[#0066B4]"
                    } outline-none`}
                    placeholder="70"
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.weight && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.weight}
                    </motion.p>
                  )}
                </div>

                {/* Ethnicity */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ethnicity (Optional)
                  </label>
                  <motion.input
                    type="text"
                    name="ethnicity"
                    value={formData.ethnicity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#0066B4] transition-all outline-none bg-white"
                    placeholder="e.g., Caucasian"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </div>

              {/* Clinical Notes */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinical Notes (Optional)
                </label>
                <motion.textarea
                  name="clinicalNotes"
                  value={formData.clinicalNotes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#0066B4] transition-all outline-none resize-none bg-white"
                  placeholder="Enter any relevant clinical information or medical history..."
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <motion.button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
              whileHover={{ x: -5 }}
            >
              ← Back to Dashboard
            </motion.button>

            <motion.button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-[#0066B4] to-[#4FC3F7] text-white rounded-xl font-medium shadow-lg shadow-[#0066B4]/30 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue to VCF Upload
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
