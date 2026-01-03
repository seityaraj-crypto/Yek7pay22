import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn, ShieldCheck, Zap, ArrowLeft, RefreshCw, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useEffect } from "react";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function generateCaptcha(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function AuthDialog({ isOpen, onOpenChange }: AuthDialogProps) {
  const [view, setView] = useState<"menu" | "login">("menu");
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setView("menu");
      setUserId("");
      setOtp("");
      setCaptchaInput("");
      setError("");
      setCaptcha(generateCaptcha());
      setOtpSent(false);
    }
  }, [isOpen]);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  const handleSendOtp = () => {
    if (!userId) {
      setError("Please enter your Mobile Number or Email first");
      return;
    }
    const message = `Hi, I need OTP for login. My User ID is: ${userId}`;
    const whatsappUrl = `https://wa.me/919230967187?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setOtpSent(true);
    setError("");
  };

  const handleLogin = () => {
    if (!userId) {
      setError("Please enter your User ID (Mobile/Email)");
      return;
    }
    if (!otp || otp.length !== 4) {
      setError("Please enter valid 4-digit OTP");
      return;
    }
    if (captchaInput.toLowerCase() !== captcha.toLowerCase()) {
      setError("Invalid captcha. Please try again.");
      refreshCaptcha();
      return;
    }
    setError("");
    console.log("Login attempt:", { userId, otp });
    alert("Login functionality will be connected to backend soon!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="bg-gradient-to-br from-[#0a0a2e] via-[#1a0a3a] to-[#2a0a4a] border-white/10 text-white sm:max-w-[450px] rounded-3xl backdrop-blur-3xl shadow-[0_0_50px_rgba(59,130,246,0.3)]"
      >
        {view === "menu" ? (
          <>
            <DialogHeader>
              <div className="mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-400 to-purple-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] mx-auto animate-pulse">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <DialogTitle className="text-3xl font-display font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 mb-2">
                Get Started
              </DialogTitle>
              <DialogDescription className="text-white/70 text-lg text-center mb-8">
                Choose an option to continue with Yek7Pay
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 mt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href="https://wa.me/919230967187?text=Hi%2C%20I%20want%20to%20open%20an%20account%20with%20Yek7Pay" target="_blank" rel="noopener noreferrer" className="w-full" onClick={() => onOpenChange(false)}>
                  <Button 
                    className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-400 border-0 text-white rounded-2xl font-bold text-lg flex items-center justify-between px-6 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <UserPlus className="h-5 w-5" />
                      </div>
                      <span>Open Account</span>
                    </div>
                    <span className="text-white/40 group-hover:text-white transition-colors">→</span>
                  </Button>
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline"
                  className="w-full h-16 bg-white/5 border-white/10 text-white rounded-2xl font-bold text-lg flex items-center justify-between px-6 group hover:bg-white/10 hover:border-blue-500/50"
                  onClick={() => setView("login")}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                      <LogIn className="h-5 w-5" />
                    </div>
                    <span>Login</span>
                  </div>
                  <span className="text-white/40 group-hover:text-blue-400 transition-colors">→</span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/upgrade">
                  <Button 
                    onClick={() => onOpenChange(false)}
                    className="w-full h-16 bg-gradient-to-r from-pink-600 to-purple-600 border-0 text-white rounded-2xl font-bold text-lg flex items-center justify-between px-6 group shadow-lg shadow-pink-500/20"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs uppercase tracking-widest text-white/60 font-black">Special Offer</div>
                        <span>Upgrade Premium ₹999</span>
                      </div>
                    </div>
                    <span className="text-white/40 group-hover:text-white transition-colors">→</span>
                  </Button>
                </Link>
              </motion.div>
            </div>

            <p className="text-center text-xs text-white/40 mt-8 leading-relaxed">
              By continuing, you agree to our <br />
              <a href="/terms" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>
            </p>
          </>
        ) : (
          <>
            <DialogHeader>
              <button 
                onClick={() => setView("menu")}
                className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-white/60" />
              </button>
              <div className="mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-400 to-purple-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] mx-auto">
                <LogIn className="h-8 w-8" />
              </div>
              <DialogTitle className="text-3xl font-display font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 mb-2">
                Login
              </DialogTitle>
              <DialogDescription className="text-white/70 text-base text-center mb-4">
                Enter your credentials to access your account
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 mt-4">
              <div>
                <label className="block text-sm font-bold text-white/60 mb-2 text-left">User ID (Mobile No / Email)</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter mobile number or email"
                  className="w-full h-14 px-5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white/60 mb-2 text-left">4-Digit OTP</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="Enter 4-digit OTP"
                    maxLength={4}
                    className="flex-1 h-14 px-5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none transition-colors text-center text-xl tracking-[0.5em] font-bold"
                  />
                  <Button
                    type="button"
                    onClick={handleSendOtp}
                    className={`h-14 px-4 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                      otpSent 
                        ? "bg-green-600 hover:bg-green-700 text-white" 
                        : "bg-[#25D366] hover:bg-[#20bd5a] text-white"
                    }`}
                  >
                    <MessageCircle className="h-5 w-5" />
                    {otpSent ? "Resend" : "Get OTP"}
                  </Button>
                </div>
                <p className="text-xs text-white/40 mt-2 text-left">OTP will be sent via WhatsApp</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-white/60 mb-2 text-left">Captcha</label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Enter captcha"
                      className="w-full h-14 px-5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-14 px-4 rounded-xl bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-white/10 flex items-center justify-center select-none">
                      <span className="text-xl font-mono font-bold tracking-wider text-white/90 italic" style={{ textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.2)" }}>
                        {captcha}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="h-14 w-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/60 hover:bg-white/10 transition-colors"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <Button 
                onClick={handleLogin}
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                Login
              </Button>

              <div className="text-center text-sm">
                <span className="text-white/40">Don't have an account? </span>
                <a href="https://wa.me/919230967187?text=Hi%2C%20I%20want%20to%20open%20an%20account%20with%20Yek7Pay" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline" onClick={() => onOpenChange(false)}>
                  Create Account
                </a>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
