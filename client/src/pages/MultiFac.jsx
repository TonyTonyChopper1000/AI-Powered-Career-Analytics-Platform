import React, { useState, useEffect, useRef } from 'react';
import { FiArrowLeft, FiShield, FiMail, FiSmartphone } from 'react-icons/fi';

const MultiFac = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [verificationMethod, setVerificationMethod] = useState('email'); // 'email' or 'sms'
  const inputRefs = useRef([]);

  // Focus on first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleChange = (index, value) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input if current one is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted content is a valid OTP
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    
    setOtp(newOtp);
    
    // Focus on the next empty input or the last input
    const lastFilledIndex = Math.min(digits.length - 1, 5);
    if (inputRefs.current[lastFilledIndex]) {
      inputRefs.current[lastFilledIndex].focus();
    }
  };

  const handleResendCode = () => {
    // Reset timer and start it again
    setTimer(30);
    setIsTimerRunning(true);
    
    // Here you would add logic to actually resend the code
    console.log('Resending code via', verificationMethod);
    
    // Clear OTP fields
    setOtp(['', '', '', '', '', '']);
    
    // Focus on first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    // Check if OTP is complete
    if (otpValue.length === 6) {
      console.log('Verifying OTP:', otpValue);
      // Add verification logic here
    }
  };

  const handleMethodChange = (method) => {
    setVerificationMethod(method);
    // Here you would add logic to send OTP via the new method
    handleResendCode();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 relative overflow-hidden">
        <img 
          src="https://i.pinimg.com/736x/ed/b9/e9/edb9e90436af10df178fa9be61f22035.jpg" 
          alt="Security verification background" 
          className="object-cover w-full h-full opacity-80"
        />
        <div className="absolute inset-0 bg-indigo-900 opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Secure Verification</h1>
          <p className="text-lg text-indigo-100">Protecting your account with multi-factor authentication.</p>
        </div>
      </div>

      {/* Right side - OTP form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Back button */}
          <button 
            type="button" 
            className="mb-8 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" /> Back to login
          </button>

          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
              <FiShield className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Verification Required</h2>
            <p className="mt-2 text-gray-600">
              Enter the 6-digit code sent to your {verificationMethod === 'email' ? 'email' : 'phone'}.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {verificationMethod === 'email' 
                ? 'j***@example.com' 
                : '+1 (***) ***-7890'}
            </p>
          </div>

          {/* Verification method toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg flex items-center ${
                  verificationMethod === 'email'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleMethodChange('email')}
              >
                <FiMail className="mr-1" /> Email
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg flex items-center ${
                  verificationMethod === 'sms'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleMethodChange('sms')}
              >
                <FiSmartphone className="mr-1" /> SMS
              </button>
            </div>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label htmlFor="otp-1" className="sr-only">OTP Input</label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                ))}
              </div>
            </div>

            {/* Resend code */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive a code?
              </p>
              {isTimerRunning ? (
                <p className="text-sm text-gray-600">
                  Resend code in <span className="font-medium text-indigo-600">{timer} seconds</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Resend verification code
                </button>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
                otp.join('').length === 6
                  ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  : 'bg-indigo-400 cursor-not-allowed'
              }`}
              disabled={otp.join('').length !== 6}
            >
              Verify
            </button>
          </form>

          {/* Help text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Having trouble? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiFac;