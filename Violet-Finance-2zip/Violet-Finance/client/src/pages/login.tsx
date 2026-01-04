import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Eye, EyeOff, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('phone');

  return (
    <div className="min-h-screen bg-[#0a0a2e] text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <LogIn className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black mb-4">
                Welcome <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400">Back</span>
              </h1>
              <p className="text-white/60 text-lg">
                Login to your Yek7Pay account
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <div className="flex gap-2 mb-8 p-1 rounded-xl bg-white/5">
                <button
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    loginMethod === 'phone' 
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' 
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Phone
                </button>
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    loginMethod === 'email' 
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' 
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              </div>

              <form className="space-y-6">
                {loginMethod === 'phone' ? (
                  <div>
                    <label className="block text-sm font-bold text-white/60 mb-2">Phone Number</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-bold text-white/60 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-white/60 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-green-500 focus:ring-green-500/20" />
                    <span className="text-sm text-white/50">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-green-400 hover:text-green-300 transition-colors">
                    Forgot Password?
                  </a>
                </div>

                <Button 
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white rounded-xl text-lg font-bold shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Login to Yek7Pay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-white/50 text-sm">
                  Don't have an account?{" "}
                  <a href="/new-account" className="text-green-400 hover:text-green-300 font-bold transition-colors">
                    Create Account
                  </a>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <p className="text-white/40 text-sm">
                Need help?{" "}
                <a 
                  href="https://wa.me/919230967187?text=Hi%2C%20I%20need%20help%20with%20login" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors"
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
