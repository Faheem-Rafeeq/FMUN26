import React, { useState, useEffect } from "react";
import { db } from "../Firebase/Firebase.js";
import { collection, addDoc } from "firebase/firestore";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    institution: "",
    category: "",
    committeePref1: "",
    committeePref2: "",
    ambassadorCode: "",
    payment: "",
    paymentScreenshot: "",
    munExperience: "",
    agree: false
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showScreenshotField, setShowScreenshotField] = useState(false);
  const [showCommitteePref, setShowCommitteePref] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Convert ambassador code to uppercase (optional field)
    if (name === "ambassadorCode") {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
    
    if (error) setError("");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    // Show committee preferences only for delegate
    setShowCommitteePref(category === "delegate");
    
    setFormData({
      ...formData,
      category: category,
      committeePref1: "",
      committeePref2: "",
      ambassadorCode: formData.ambassadorCode // Keep ambassador code if entered
    });
  };

  const handlePaymentChange = (paymentMethod) => {
    setFormData({
      ...formData,
      payment: paymentMethod,
      paymentScreenshot: "" // Clear screenshot when payment method changes
    });
    setShowScreenshotField(paymentMethod === "Bank Transfer");
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText("22837900341203");
    alert("Account number copied to clipboard!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Enhanced validation
      if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
        throw new Error("Please enter a valid full name");
      }

      if (!formData.email.includes('@') || !formData.email.includes('.')) {
        throw new Error("Please enter a valid email address");
      }

      if (!formData.whatsapp.trim() || formData.whatsapp.length < 10) {
        throw new Error("Please enter a valid WhatsApp number");
      }

      if (!formData.institution.trim()) {
        throw new Error("Please enter your institution/class");
      }

      if (!formData.category) {
        throw new Error("Please select a category");
      }

      // Validation based on category
      if (formData.category === "delegate") {
        if (!formData.committeePref1) {
          throw new Error("Please select your first committee preference");
        }
        if (!formData.committeePref2) {
          throw new Error("Please select your second committee preference");
        }
        if (formData.committeePref1 === formData.committeePref2) {
          throw new Error("Committee preferences must be different");
        }
        // Ambassador code is optional - no validation needed
      }

      if (!formData.payment) {
        throw new Error("Please select a payment method");
      }

      // Validate screenshot only for Bank Transfer
      if (formData.payment === "Bank Transfer" && !formData.paymentScreenshot.trim()) {
        throw new Error("Please confirm you have sent the payment screenshot");
      }

      if (!formData.munExperience.trim()) {
        throw new Error("Please share your MUN experience");
      }

      if (!formData.agree) {
        throw new Error("You must agree to the terms and conditions");
      }

      // Prepare data for Firestore
      const registrationData = {
        fullName: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        whatsapp: formData.whatsapp.trim(),
        institution: formData.institution.trim(),
        category: formData.category,
        committeePref1: formData.committeePref1 || "",
        committeePref2: formData.committeePref2 || "",
        ambassadorCode: formData.ambassadorCode || "", // Optional field
        payment: formData.payment,
        paymentScreenshot: formData.payment === "Bank Transfer" ? formData.paymentScreenshot.trim() : "Cash Payment",
        munExperience: formData.munExperience.trim(),
        createdAt: new Date(),
        status: "pending",
        timestamp: Date.now()
      };

      console.log("Attempting to write to Firestore...", registrationData);

      const docRef = await addDoc(collection(db, "registrations"), registrationData);
      console.log("✅ Document written successfully with ID:", docRef.id);

      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        whatsapp: "",
        institution: "",
        category: "",
        committeePref1: "",
        committeePref2: "",
        ambassadorCode: "",
        payment: "",
        paymentScreenshot: "",
        munExperience: "",
        agree: false
      });
      setSelectedCategory("");
      setShowScreenshotField(false);
      setShowCommitteePref(false);

      setTimeout(() => setSuccess(false), 8000);

    } catch (err) {
      console.error("❌ Registration error:", err);
      
      if (err.code === 'permission-denied') {
        setError("Firestore Permission Denied. Please check security rules.");
      } else if (err.code === 'unavailable') {
        setError("Network error. Please check your internet connection.");
      } else if (err.code === 'invalid-argument') {
        setError("Invalid data format. Please check your inputs.");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const committees = [
    { value: "PNA", label: "Pakistan National Assembly (PNA)" },
    { value: "UNSC", label: "UN Security Council (UNSC)" },
    { value: "UN Women", label: "UN Women" },
    { value: "SOCHUM", label: "Social, Cultural & Humanitarian (SOCHUM)" },
    { value: "WHO", label: "World Health Organization (WHO)" }
  ];

  const getCategoryFee = () => {
    switch(selectedCategory) {
      case "delegate": return "PKR 2,500";
      case "observer": return "PKR 3,000";
      case "qawali": return "PKR 1,250";
      case "concert": return "PKR 1,250";
      case "both": return "PKR 2,000";
      default: return "Select category to see fee";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-3 sm:px-4 py-4 sm:py-8">
      <div className="bg-white text-gray-800 shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-4xl mx-auto border border-blue-100">
        
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2 md:mb-3">
            FMUN 2026 Registration
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base px-2">
            Complete your registration for the most prestigious Model UN conference
          </p>
        </div>

        {/* Status Messages */}
        {success && (
          <div className="mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 font-semibold text-center text-xs sm:text-sm md:text-base">
              ✅ Registration Successful! You will receive confirmation on your WhatsApp.
            </p>
            <p className="text-green-500 text-xs sm:text-sm text-center mt-1 sm:mt-2">
              Keep your payment proof safe for verification.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center font-medium text-xs sm:text-sm md:text-base">
              ❌ {error}
            </p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 sm:p-2.5 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm"
                placeholder="Enter your full name"
                required
                minLength="2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 sm:p-2.5 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm"
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full p-2 sm:p-2.5 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm"
                placeholder="0300 1234567"
                required
                minLength="10"
              />
            </div>

            {/* Institution/Class */}
            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Institution / Class *
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full p-2 sm:p-2.5 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm"
                placeholder="e.g., Fazaia Degree College, XII-G"
                required
              />
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Select Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => handleCategoryChange("delegate")}
                className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-xs sm:text-sm ${
                  selectedCategory === "delegate" 
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                    : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-gray-800">Delegate</div>
                  <div className="text-gray-600 mt-1">PKR 2,500</div>
                  <div className="text-gray-500 mt-1 hidden sm:block">All Access + Dinner</div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => handleCategoryChange("observer")}
                className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-xs sm:text-sm ${
                  selectedCategory === "observer" 
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-200' 
                    : 'border-gray-300 hover:border-green-300 hover:bg-green-50/50'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-gray-800">Observer</div>
                  <div className="text-gray-600 mt-1">PKR 3,000</div>
                  <div className="text-gray-500 mt-1 hidden sm:block">All Access + Dinner</div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => handleCategoryChange("qawali")}
                className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-xs sm:text-sm ${
                  selectedCategory === "qawali" 
                    ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
                    : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-gray-800">Qawali Night</div>
                  <div className="text-gray-600 mt-1">PKR 1,250</div>
                  <div className="text-gray-500 mt-1 hidden sm:block">Base/Ex-Fazains</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleCategoryChange("concert")}
                className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-xs sm:text-sm ${
                  selectedCategory === "concert" 
                    ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-200' 
                    : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50/50'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-gray-800">Concert Only</div>
                  <div className="text-gray-600 mt-1">PKR 1,250</div>
                  <div className="text-gray-500 mt-1 hidden sm:block">Base Residents</div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => handleCategoryChange("both")}
                className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-xs sm:text-sm col-span-2 sm:col-span-1 ${
                  selectedCategory === "both" 
                    ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200' 
                    : 'border-gray-300 hover:border-amber-300 hover:bg-amber-50/50'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-gray-800">Qawali+Concert</div>
                  <div className="text-gray-600 mt-1">PKR 2,000</div>
                  <div className="text-gray-500 mt-1 hidden sm:block">Both Events</div>
                </div>
              </button>
            </div>
            <input type="hidden" name="category" value={formData.category} required />
          </div>

          {/* MUN Experience */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              MUN Experience *
            </label>
            <textarea
              name="munExperience"
              value={formData.munExperience}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 sm:p-2.5 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm"
              placeholder="Tell us about your previous MUN experiences (if any). If you're a beginner, just say 'No prior experience'"
              required
            />
          </div>

          {/* Committee Preferences (Only for Delegate) */}
          {showCommitteePref && (
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    First Committee Preference *
                  </label>
                  <select
                    name="committeePref1"
                    value={formData.committeePref1}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-2.5 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white text-sm"
                    required
                  >
                    <option value="">Select Committee</option>
                    {committees.map(committee => (
                      <option key={committee.value} value={committee.value}>
                        {committee.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Second Committee Preference *
                  </label>
                  <select
                    name="committeePref2"
                    value={formData.committeePref2}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-2.5 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white text-sm"
                    required
                  >
                    <option value="">Select Committee</option>
                    {committees.map(committee => (
                      <option key={committee.value} value={committee.value}>
                        {committee.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ambassador Code - Optional */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Ambassador Code <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="ambassadorCode"
                  value={formData.ambassadorCode}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-2.5 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm uppercase"
                  placeholder="ENTER AMBASSADOR CODE (IF ANY)"
                  minLength="3"
                />
                <p className="text-xs text-gray-500 mt-1">Code will be automatically capitalized</p>
              </div>
            </div>
          )}

          {/* Payment Information */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-blue-200">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
              Payment Information
            </h3>
            
            <div className="mb-3 sm:mb-4 md:mb-6">
              <div className="text-center p-2 sm:p-3 md:p-4 bg-white rounded-lg border border-gray-300">
                <div className="text-xs sm:text-sm text-gray-600 mb-1">Selected Category Fee</div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
                  {getCategoryFee()}
                </div>
              </div>
            </div>

            {/* Bank Account Details */}
            <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-blue-200 mb-3 sm:mb-4">
              <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">
                Bank Account Details
              </h4>
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg gap-2">
                  <div className="text-xs sm:text-sm">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-mono font-bold text-blue-600 ml-2 break-all">
                      22837900341203
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={copyAccountNumber}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-lg text-xs sm:text-sm transition duration-200 w-full sm:w-auto"
                  >
                    Copy Number
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  <span className="font-medium">Account Name:</span> Bilqees Fatima
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  <span className="font-medium">Bank:</span> HBL Prestige
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Payment Method *
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="Bank Transfer"
                    checked={formData.payment === "Bank Transfer"}
                    onChange={(e) => handlePaymentChange(e.target.value)}
                    className="mr-2"
                    required
                  />
                  <span className="text-xs sm:text-sm">Bank Transfer</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash"
                    checked={formData.payment === "Cash"}
                    onChange={(e) => handlePaymentChange(e.target.value)}
                    className="mr-2"
                    required
                  />
                  <span className="text-xs sm:text-sm">Cash (Onsite Registration)</span>
                </label>
              </div>
            </div>

            {/* Payment Screenshot (Only for Bank Transfer) */}
            {showScreenshotField && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Payment Confirmation *
                </label>
                <textarea
                  name="paymentScreenshot"
                  value={formData.paymentScreenshot}
                  onChange={handleChange}
                  rows="2"
                  className="w-full p-2 sm:p-2.5 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm"
                  placeholder="Write: I have sent payment screenshot with my name and email to 03076646639"
                  required
                />
                <div className="mt-2 text-xs sm:text-sm text-gray-600">
                  <p>📲 Send payment screenshot with your name and email to:</p>
                  <p className="font-bold text-blue-600 break-all">• 03076646639 (WhatsApp)</p>
                </div>
              </div>
            )}

            {/* Cash Payment Note */}
            {formData.payment === "Cash" && (
              <div className="mt-3 p-2 sm:p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs sm:text-sm text-amber-700">
                  💡 You selected Cash Payment. Please bring the exact amount to the registration desk on the event day.
                </p>
              </div>
            )}
          </div>

          {/* Onsite Registration Disclaimer */}
          <div className="p-2 sm:p-3 md:p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs sm:text-sm text-yellow-700 flex items-center">
              <span className="font-bold mr-2">💰</span>
              <span>For on-site registration, please bring your cash payment to the registration desk along with the email you used during registration</span>
            </p>
          </div>

          {/* Terms and Conditions */}
          <div className="p-2 sm:p-3 md:p-4 bg-amber-50 rounded-lg border border-amber-200">
            <label className="flex items-start">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 mr-2 sm:mr-3 flex-shrink-0"
                required
              />
              <span className="text-xs sm:text-sm text-gray-700">
                I agree to the terms and conditions. I understand that in case of any mistake or incorrect information provided, 
                the payment will <span className="font-bold text-red-600">NOT be refundable</span>. I have verified all information 
                before submission {formData.payment === "Bank Transfer" && "and will send my payment screenshot with name and email to 03076646639 for verification"}.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 sm:py-3 md:py-4 rounded-lg font-bold text-white transition duration-300 text-sm sm:text-base ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Complete Registration'
            )}
          </button>
        </form>

        {/* Important Notes */}
        <div className="mt-4 sm:mt-6 md:mt-8 p-2 sm:p-3 md:p-4 bg-red-50 rounded-lg border border-red-200">
          <h4 className="font-bold text-red-700 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
            ⚠️ Important Instructions:
          </h4>
          <ul className="text-xs sm:text-sm text-red-600 space-y-1">
            <li>• Payment is <span className="font-bold">NON-REFUNDABLE</span> under any circumstances</li>
            <li>• Fazaians,Base Faisal residents and Ex-Fazaians only for Qawali Night (PKR 1,250)</li>
            <li>• Fazaians,Base Faisal residents and Ex-Fazaians only for Concert (PKR 1,250)</li>
            <li>• Both events: PKR 2,000 (for eligible participants)</li>
            {formData.payment === "Bank Transfer" && (
              <li>• Must send payment screenshot with name and email to 03076646639</li>
            )}
            {formData.payment === "Cash" && (
              <li>• Cash payment to be made at venue registration desk</li>
            )}
            <li>• Registration confirmation will be sent via WhatsApp within 24 hours</li>
            <li>• For any issues, contact: 03076646639 (WhatsApp only)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;