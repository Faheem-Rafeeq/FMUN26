import React, { useState } from "react";
import { db } from "../Firebase/Firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";

const Status = () => {
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const q = query(collection(db, "registrations"), where("email", "==", email.toLowerCase().trim()));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const data = userDoc.data();
        console.log("Fetched user data:", data); // Debug log
        setUserData({ id: userDoc.id, ...data });
      } else {
        setError("No registration found with this email address");
        setUserData(null);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Error fetching your data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted": 
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected": 
        return "bg-red-100 text-red-800 border-red-200";
      default: 
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted": return "✅";
      case "rejected": return "❌";
      default: return "⏳";
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "accepted":
        return "Your registration has been accepted! You can now participate in the event.";
      case "rejected":
        return "Your registration was not accepted. Please contact the organizers for more information.";
      default:
        return "Your application is under review by the organizing committee.";
    }
  };

  const getCategoryDisplay = (category) => {
    const categories = {
      "delegate": { label: "Delegate", color: "bg-blue-100 text-blue-800", icon: "🎯", fee: "PKR 2,500" },
      "observer": { label: "Observer", color: "bg-green-100 text-green-800", icon: "👁️", fee: "PKR 3,000" },
      "qawali": { label: "Qawali Night Only", color: "bg-purple-100 text-purple-800", icon: "🎵", fee: "PKR 1,250" },
      "concert": { label: "Concert Only", color: "bg-pink-100 text-pink-800", icon: "🎸", fee: "PKR 1,250" },
      "both": { label: "Qawali + Concert", color: "bg-amber-100 text-amber-800", icon: "🎉", fee: "PKR 2,000" }
    };
    return categories[category] || { label: category, color: "bg-gray-100 text-gray-800", icon: "📋", fee: "" };
  };

  const getCommitteeFullName = (committee) => {
    const committees = {
      "PNA": "Pakistan National Assembly",
      "UNSC": "UN Security Council",
      "UN Women": "UN Women",
      "SOCHUM": "Social, Cultural & Humanitarian",
      "WHO": "World Health Organization"
    };
    return committees[committee] || committee;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleDateString('en-PK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
      return new Date(timestamp).toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  const renderIfExists = (label, value, icon = "•", customClass = "") => {
    if (!value && value !== 0) return null;
    return (
      <div className={`bg-gray-50 rounded-lg p-4 border border-gray-200 ${customClass}`}>
        <p className="text-sm font-medium text-gray-500 mb-1 flex items-center">
          <span className="mr-2">{icon}</span>
          {label}
        </p>
        <p className="text-lg font-semibold text-gray-900 break-words">{value}</p>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Registration Status Portal
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Check your FMUN registration status and details
          </p>
        </div>

        {/* Email Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-blue-100">
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Enter your registered email address
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchUserData()}
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
              <button
                onClick={fetchUserData}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking...
                  </span>
                ) : (
                  "Check Status"
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-600 text-center mt-3 font-medium">{error}</p>
            )}
          </div>
        </div>

        {/* User Data Display */}
        {userData && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
            {/* Status Banner */}
            <div className={`p-6 ${getStatusColor(userData.status || "pending")} border-b`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Registration Status</h2>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    {getStatusIcon(userData.status || "pending")}
                    {(userData.status || "pending").toUpperCase()}
                  </p>
                </div>
                <div className="text-sm md:text-base">
                  {getStatusMessage(userData.status || "pending")}
                </div>
              </div>
            </div>

            {/* Registration Details */}
            <div className="p-6">
              {/* Registration Number - Always show if exists */}
              {userData.regNo && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Registration Number</p>
                      <p className="text-2xl font-bold font-mono">{userData.regNo}</p>
                    </div>
                    <span className="text-3xl">🎫</span>
                  </div>
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-800 mb-6">Complete Registration Details</h3>
              
              {/* Personal Information Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderIfExists("Full Name", userData.fullName, "👤")}
                  {renderIfExists("Email Address", userData.email, "📧")}
                  {renderIfExists("WhatsApp Number", userData.whatsapp, "📱")}
                  {renderIfExists("Institution / Class", userData.institution, "🏫")}
                </div>
              </div>

              {/* Category & Fee Information */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Category & Fee</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                      <span className="mr-2">{getCategoryDisplay(userData.category).icon}</span>
                      Category
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getCategoryDisplay(userData.category).color}`}>
                        {getCategoryDisplay(userData.category).label}
                      </span>
                      <span className="text-lg font-bold text-blue-600">{getCategoryDisplay(userData.category).fee}</span>
                    </div>
                  </div>
                  {renderIfExists("Ambassador Code", userData.ambassadorCode, "🔑", "bg-purple-50")}
                </div>
              </div>

              {/* Committee Preferences (for delegates) */}
              {(userData.category === "delegate") && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Committee Preferences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.committeePref1 && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <p className="text-sm font-medium text-gray-500 mb-1">First Preference</p>
                        <p className="text-lg font-semibold text-blue-700">{getCommitteeFullName(userData.committeePref1)}</p>
                        <p className="text-xs text-gray-500 mt-1">Code: {userData.committeePref1}</p>
                      </div>
                    )}
                    {userData.committeePref2 && (
                      <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                        <p className="text-sm font-medium text-gray-500 mb-1">Second Preference</p>
                        <p className="text-lg font-semibold text-indigo-700">{getCommitteeFullName(userData.committeePref2)}</p>
                        <p className="text-xs text-gray-500 mt-1">Code: {userData.committeePref2}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Assigned Information - Show if exists */}
              {(userData.assignedCommittee || userData.assignedCountryMember) && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Your Assignments</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.assignedCommittee && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-300">
                        <p className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                          <span className="mr-2">🎯</span>
                          Assigned Committee
                        </p>
                        <p className="text-xl font-bold text-green-700">{getCommitteeFullName(userData.assignedCommittee)}</p>
                        <p className="text-xs text-gray-500 mt-1">Code: {userData.assignedCommittee}</p>
                      </div>
                    )}
                    {userData.assignedCountryMember && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-300">
                        <p className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                          <span className="mr-2">🌍</span>
                          Assigned {userData.assignedCommittee === "PNA" ? "Member" : "Country"}
                        </p>
                        <p className="text-xl font-bold text-amber-700">{userData.assignedCountryMember}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Payment Information */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Payment Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-500 mb-1">Payment Method</p>
                    <p className="text-lg font-semibold text-gray-900 flex items-center">
                      {userData.payment === "Bank Transfer" ? (
                        <>
                          <span className="mr-2 text-green-600">🏦</span>
                          Bank Transfer
                        </>
                      ) : userData.payment === "Cash" ? (
                        <>
                          <span className="mr-2 text-amber-600">💵</span>
                          Cash (Onsite)
                        </>
                      ) : (
                        userData.payment || "Not selected"
                      )}
                    </p>
                  </div>
                  {userData.paymentScreenshot && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm font-medium text-gray-500 mb-1">Transaction Details</p>
                      <p className="text-base font-mono text-gray-800 break-words">{userData.paymentScreenshot}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* MUN Experience */}
              {userData.munExperience && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">MUN Experience</h4>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-base text-gray-700 italic">"{userData.munExperience}"</p>
                  </div>
                </div>
              )}

              {/* Payment Verification Status */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center">
                  <span className="text-yellow-600 mr-3">💳</span>
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Payment Verification Status</h4>
                    <p className="text-sm text-yellow-700">
                      {userData.paymentScreenshot ? 
                        "✅ Payment screenshot received. Verification in progress." : 
                        "❌ Payment screenshot not provided. Please share on WhatsApp numbers."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-sm text-gray-500">
                    <p>📅 Registration Date: {formatDate(userData.createdAt)}</p>
                    {userData.updatedAt && (
                      <p className="mt-1">🔄 Last Updated: {formatDate(userData.updatedAt)}</p>
                    )}
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`inline-flex items-center px-4 py-2 rounded-full font-semibold ${getStatusColor(userData.status || "pending")}`}>
                    <span className="mr-2">{getStatusIcon(userData.status || "pending")}</span>
                    <span>{(userData.status || "pending").toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Debug Info - Remove in production */}
              {process.env.NODE_ENV === "development" && (
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm font-mono text-gray-600">Raw Data:</p>
                  <pre className="text-xs overflow-auto max-h-40 mt-2">
                    {JSON.stringify(userData, null, 2)}
                  </pre>
                </div>
              )}

              {/* Important Notes */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Important Information:
                </h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Please bring your original CNIC and this registration confirmation to the event</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Status must show <span className="font-bold">"ACCEPTED"</span> to participate in conference sessions</span>
                  </li>
                  {userData.assignedCommittee && (
                    <li className="flex items-start font-medium">
                      <span className="mr-2">•</span>
                      <span>Your assigned committee is <span className="font-bold bg-blue-100 px-2 py-0.5 rounded">{userData.assignedCommittee}</span></span>
                    </li>
                  )}
                  {userData.assignedCountryMember && (
                    <li className="flex items-start font-medium">
                      <span className="mr-2">•</span>
                      <span>You will represent <span className="font-bold bg-amber-100 px-2 py-0.5 rounded">{userData.assignedCountryMember}</span></span>
                    </li>
                  )}
                  {userData.ambassadorCode && (
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Ambassador Code: <span className="font-mono font-bold">{userData.ambassadorCode}</span></span>
                    </li>
                  )}
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>For any queries, WhatsApp: <span className="font-bold">0307 6646639</span></span>
                  </li>
                  {userData.status === "pending" && (
                    <li className="flex items-start font-semibold text-yellow-700">
                      <span className="mr-2">⏳</span>
                      <span>Your application is currently being reviewed. Verification may take 24-48 hours.</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2026 FMUN - Model United Nations. All rights reserved.</p>
          <p className="mt-1">Official Email: fmun26@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Status;