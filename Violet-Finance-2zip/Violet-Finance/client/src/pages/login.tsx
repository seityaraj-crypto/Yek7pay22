import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff, ArrowLeft, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [otpSent, setOtpSent] = useState(false);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setTimeout(() => setOtpSent(false), 30000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a2e] text-white">
      <Navbar />
      
      <main className="pt-24 pb-24 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-lg shadow-green-500/30 z-10">
                <LogIn className="w-8 h-8 text-white" />
              </div>

              <div className="pt-12 p-8 rounded-3xl bg-gradient-to-br from-[#1a1a4a]/90 to-[#0d0d2b]/90 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <button className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/10 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-white/60" />
                </button>
                <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-white/60" />
                </button>

                <div className="text-center mb-8 mt-4">
                  <h1 className="text-2xl font-display font-black mb-2">Login to Yek7Pay</h1>
                  <p className="text-white/50 text-sm">Enter your credentials to access your account</p>
                </div>

                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">User ID (Mobile No / Email)</label>
                    <input
                      type="text"
                      placeholder="Enter mobile number or email"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0d0d2b]/80 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3.5 pr-12 rounded-xl bg-[#0d0d2b]/80 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">4-Digit OTP (via SMS/Email)</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="E n t e r   O T P"
                        className="flex-1 px-4 py-3.5 rounded-xl bg-[#0d0d2b]/80 border border-white/10 text-white text-center tracking-[0.5em] placeholder:text-white/30 placeholder:tracking-[0.2em] focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                      />
                      <Button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpSent}
                        className="px-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white rounded-xl font-medium text-sm whitespace-nowrap disabled:opacity-50"
                      >
                        ⚡ {otpSent ? 'Sent' : 'Send OTP'}
                      </Button>
                    </div>
                    <p className="text-xs text-white/40 mt-2">OTP will be sent via SMS and Email automatically</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Captcha</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Enter captcha"
                        className="flex-1 px-4 py-3.5 rounded-xl bg-[#0d0d2b]/80 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                      />
                      <div className="flex items-center gap-2">
                        <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-white/20 font-mono text-lg font-bold tracking-wider text-white/90 select-none italic">
                          {captcha}
                        </div>
                        <button
                          type="button"
                          onClick={refreshCaptcha}
                          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                        >
                          <RefreshCw className="w-5 h-5 text-white/60" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-400 hover:via-purple-400 hover:to-pink-400 text-white rounded-xl text-lg font-bold shadow-lg shadow-pink-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] mt-6"
                  >
                    Login
                  </Button>

                  <div className="flex items-center justify-between pt-2">
                    <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      Forgot Password?
                    </a>
                    <a href="/new-account" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      Create Account
                    </a>
                  </div>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-white/40 text-sm">
                Don't have an account?{" "}
                <a href="/new-account" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Create Account
                </a>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-center"
            >
              <p className="text-white/40 text-sm">
                Need help?{" "}
                <a 
                  href="https://wa.me/919230967187?text=Hi%2C%20I%20need%20help%20with%20login" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition-colors"
                >
                  Contact Support
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
