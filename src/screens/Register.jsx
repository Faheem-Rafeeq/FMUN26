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
    committee: "",
    country: "",
    pnaParty: "",
    pnaMember: "",
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (error) setError("");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFormData({
      ...formData,
      category: category,
      committee: category === "qawali" ? "" : formData.committee,
      country: category === "qawali" ? "" : formData.country,
      pnaParty: "",
      pnaMember: ""
    });
  };

  const handlePaymentChange = (paymentMethod) => {
    setFormData({
      ...formData,
      payment: paymentMethod,
      paymentScreenshot: "" // Clear screenshot when payment method changes
    });
    setShowScreenshotField(paymentMethod === "Easypaisa");
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
      if (formData.category === "delegate" || formData.category === "observer") {
        if (!formData.committee) {
          throw new Error("Please select a committee");
        }
        if (formData.committee !== "PNA" && !formData.country) {
          throw new Error("Please select a country");
        }
        if (formData.committee === "PNA") {
          if (!formData.pnaParty) {
            throw new Error("Please select a PNA party");
          }
          if (!formData.pnaMember) {
            throw new Error("Please select a PNA member");
          }
        }
      }

      if (!formData.payment) {
        throw new Error("Please select a payment method");
      }

      // Validate screenshot only for Easypaisa
      if (formData.payment === "Easypaisa" && !formData.paymentScreenshot.trim()) {
        throw new Error("Please provide payment screenshot details for Easypaisa");
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
        committee: formData.committee,
        country: formData.country,
        pnaParty: formData.pnaParty,
        pnaMember: formData.pnaMember,
        payment: formData.payment,
        paymentScreenshot: formData.payment === "Easypaisa" ? formData.paymentScreenshot.trim() : "Cash Payment",
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
        committee: "",
        country: "",
        pnaParty: "",
        pnaMember: "",
        payment: "",
        paymentScreenshot: "",
        munExperience: "",
        agree: false
      });
      setSelectedCategory("");
      setShowScreenshotField(false);

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
    { value: "UNGA", label: "UN General Assembly (20 Delegates)" },
    { value: "UNHRC", label: "UN Human Rights Council (18 Delegates)" },
    { value: "UNSC", label: "UN Security Council (15 Delegates)" },
    { value: "WHO", label: "World Health Organization (17 Delegates)" },
    { value: "PNA", label: "Pakistan National Assembly (35 Delegates)" }
  ];

  const countries = [
    "Pakistan", "USA", "China", "UK", "India", "Turkey", "Germany", 
    "France", "Japan", "Brazil", "Canada", "Australia", "Russia", "South Korea"
  ];

  const pnaParties = [
    { value: "PMLN", label: "Pakistan Muslim League (N)" },
    { value: "PPP", label: "Pakistan Peoples Party" },
    { value: "PTI", label: "Pakistan Tehreek-e-Insaf" },
    { value: "IND", label: "Independent" }
  ];

  const pnaMembers = {
    PMLN: [
      "Shehbaz Sharif",
      "Khwaja Asif",
      "Faisal Vawda",
      "Ata Tarar",
      "Ahsan Iqbal Chaudhary",
      "Sardar Ayaz Sadiq",
      "Nawaz Sharif",
      "Rana Sanaullah",
      "Mohammed Ilyas Chaudhary",
      "Chaudhary Farukh Altaf"
    ],
    PPP: [
      "Asif Ali Zardari",
      "Bilawal Bhutto Zardari",
      "Murad Ali Shah",
      "Sherry Rehman",
      "Raja Parvez Ashraf",
      "Syed Khursheed Ahmad Shah",
      "Asifa Bhutto Zardari",
      "Syed Ghulam Mustafa Shah",
      "M. Irfan Ali Leghari",
      "Abdul Qadir Patel"
    ],
    PTI: [
      "Imran Khan",
      "Murad Saeed",
      "Faisal Qureshi",
      "Fawad Chaudhary",
      "Khurram Shehzad Nawaz",
      "Asad Umer",
      "Pervez Elahi",
      "Ali Mohammed Khan",
      "Pervez Khattak",
      "Shahriyaar Afridi"
    ],
    IND: [
      "Waqas Akram",
      "Asad Qaisar",
      "Shahram Khan Tarakai",
      "M. Sher Ali Arab",
      "Shahid Khan Khattak"
    ]
  };

  const getCategoryFee = () => {
    switch(selectedCategory) {
      case "delegate": return "PKR 2,000";
      case "observer": return "PKR 2,500";
      case "qawali": return "PKR 1,000";
      default: return "Select category to see fee";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="bg-white text-gray-800 shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-4xl mx-auto border border-blue-100">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3">
            FMUN 2026 Registration
          </h2>
          <p className="text-gray-600 text-sm sm:text-base px-2">
            Complete your registration for the most prestigious Model UN conference
          </p>
        </div>

        {/* Status Messages */}
        {success && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 font-semibold text-center text-sm sm:text-base">
              ✅ Registration Successful! You will receive confirmation on your WhatsApp.
            </p>
            <p className="text-green-500 text-xs sm:text-sm text-center mt-2">
              Keep your payment proof safe for verification.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center font-medium text-sm sm:text-base">
              ❌ {error}
            </p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
                placeholder="Enter your full name"
                required
                minLength="2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
                placeholder="0300 1234567"
                required
                minLength="10"
              />
            </div>

            {/* Institution/Class */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Institution / Class *
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
                placeholder="e.g., Fazaia Degree College, XII-G"
                required
              />
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              Select Category *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => handleCategoryChange("delegate")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedCategory === "delegate" 
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                    : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold text-gray-800">Delegate</div>
                  <div className="text-sm sm:text-base text-gray-600 mt-1">PKR 2,000</div>
                  <div className="text-xs text-gray-500 mt-1">Full Participation</div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => handleCategoryChange("observer")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedCategory === "observer" 
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-200' 
                    : 'border-gray-300 hover:border-green-300 hover:bg-green-50/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold text-gray-800">Observer</div>
                  <div className="text-sm sm:text-base text-gray-600 mt-1">PKR 2,500</div>
                  <div className="text-xs text-gray-500 mt-1">Observation Only</div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => handleCategoryChange("qawali")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedCategory === "qawali" 
                    ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
                    : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold text-gray-800">Qawali Night</div>
                  <div className="text-sm sm:text-base text-gray-600 mt-1">PKR 1,000</div>
                  <div className="text-xs text-gray-500 mt-1">Cultural Event Only</div>
                </div>
              </button>
            </div>
            <input type="hidden" name="category" value={formData.category} required />
          </div>

          {/* MUN Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              MUN Experience *
            </label>
            <textarea
              name="munExperience"
              value={formData.munExperience}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
              placeholder="Tell us about your previous MUN experiences (if any). If you're a beginner, just say 'No prior experience'"
              required
            />
          </div>

          {/* Committee Selection (Only for Delegate/Observer) */}
          {(selectedCategory === "delegate" || selectedCategory === "observer") && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Select Committee *
                </label>
                <select
                  name="committee"
                  value={formData.committee}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white text-sm sm:text-base"
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

              {/* Country Selection (Not for PNA) */}
              {formData.committee && formData.committee !== "PNA" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Country Preference *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white text-sm sm:text-base"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* PNA Party and Member Selection */}
              {formData.committee === "PNA" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Select Political Party *
                    </label>
                    <select
                      name="pnaParty"
                      value={formData.pnaParty}
                      onChange={handleChange}
                      className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white text-sm sm:text-base"
                      required
                    >
                      <option value="">Select Party</option>
                      {pnaParties.map(party => (
                        <option key={party.value} value={party.value}>
                          {party.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.pnaParty && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Select Party Member *
                      </label>
                      <select
                        name="pnaMember"
                        value={formData.pnaMember}
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white text-sm sm:text-base"
                        required
                      >
                        <option value="">Select Member</option>
                        {pnaMembers[formData.pnaParty]?.map(member => (
                          <option key={member} value={member}>
                            {member}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Payment Information */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-blue-200">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Payment Information</h3>
            
            <div className="mb-4 sm:mb-6">
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-gray-300">
                <div className="text-xs sm:text-sm text-gray-600 mb-1">Selected Category Fee</div>
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{getCategoryFee()}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 sm:mb-6">
              {/* Easypaisa */}
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <span className="text-green-600 font-bold mr-2 text-lg">📱</span>
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base">Easypaisa</h4>
                </div>
                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold text-gray-900">0301 9359625</div>
                  <div className="text-xs sm:text-sm text-gray-600">Account Name: Muhammad Qaisar</div>
                </div>
              </div>

              {/* Cash */}
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-amber-200">
                <div className="flex items-center mb-2">
                  <span className="text-amber-600 font-bold mr-2 text-lg">💵</span>
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base">Cash Payment</h4>
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-base font-bold text-gray-900">Pay at Venue</div>
                  <div className="text-xs sm:text-sm text-gray-600">On event day at registration desk</div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method *
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="Easypaisa"
                    checked={formData.payment === "Easypaisa"}
                    onChange={(e) => handlePaymentChange(e.target.value)}
                    className="mr-2"
                    required
                  />
                  <span className="text-sm sm:text-base">Easypaisa</span>
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
                  <span className="text-sm sm:text-base">Cash (Pay at Venue)</span>
                </label>
              </div>
            </div>

            {/* Payment Screenshot (Only for Easypaisa) */}
            {showScreenshotField && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Payment Transaction ID / Screenshot Details *
                </label>
                <textarea
                  name="paymentScreenshot"
                  value={formData.paymentScreenshot}
                  onChange={handleChange}
                  rows="2"
                  className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
                  placeholder="Enter transaction ID and any details about your payment"
                  required
                />
                <div className="mt-2 text-xs sm:text-sm text-gray-600">
                  <p>📲 Send payment screenshot to:</p>
                  <p className="font-bold">• 03076646639 (Easypaisa verification)</p>
                </div>
              </div>
            )}

            {/* Cash Payment Note */}
            {formData.payment === "Cash" && (
              <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-700">
                  💡 You selected Cash Payment. Please bring the exact amount to the registration desk on the event day.
                </p>
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="p-3 sm:p-4 bg-amber-50 rounded-lg border border-amber-200">
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
                before submission {formData.payment === "Easypaisa" && "and will share the payment screenshot for verification"}.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 sm:py-4 rounded-lg font-bold text-white transition duration-300 text-sm sm:text-base ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Registration...
              </span>
            ) : (
              'Complete Registration'
            )}
          </button>
        </form>

        {/* Important Notes */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
          <h4 className="font-bold text-red-700 mb-2 text-sm sm:text-base">⚠️ Important Instructions:</h4>
          <ul className="text-xs sm:text-sm text-red-600 space-y-1">
            <li>• Payment is <span className="font-bold">NON-REFUNDABLE</span> under any circumstances</li>
            {formData.payment === "Easypaisa" && (
              <li>• Must send payment screenshot to provided WhatsApp numbers</li>
            )}
            {formData.payment === "Cash" && (
              <li>• Cash payment to be made at venue registration desk</li>
            )}
            <li>• Registration confirmation will be sent via WhatsApp within 24 hours</li>
            <li>• Keep your transaction ID/payment proof safe for verification</li>
            <li>• For any issues, contact: 03076646639 (WhatsApp only)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;