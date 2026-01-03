import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn, ShieldCheck, Zap, ArrowLeft, RefreshCw, Eye, EyeOff, Send, Upload, CreditCard, FileText, User, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultView?: "menu" | "login" | "register";
}

function generateCaptcha(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function AuthDialog({ isOpen, onOpenChange, defaultView = "menu" }: AuthDialogProps) {
  const [view, setView] = useState<"menu" | "login" | "register">(defaultView);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const { toast } = useToast();

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regAadhaar, setRegAadhaar] = useState("");
  const [regPan, setRegPan] = useState("");
  const [aadhaarFront, setAadhaarFront] = useState<File | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<File | null>(null);
  const [panImage, setPanImage] = useState<File | null>(null);

  const aadhaarFrontRef = useRef<HTMLInputElement>(null);
  const aadhaarBackRef = useRef<HTMLInputElement>(null);
  const panRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setView(defaultView);
    } else {
      setView("menu");
      setUserId("");
      setPassword("");
      setOtp("");
      setCaptchaInput("");
      setError("");
      setCaptcha(generateCaptcha());
      setOtpSent(false);
      setOtpLoading(false);
      setRegName("");
      setRegEmail("");
      setRegMobile("");
      setRegAddress("");
      setRegAadhaar("");
      setRegPan("");
      setAadhaarFront(null);
      setAadhaarBack(null);
      setPanImage(null);
    }
  }, [isOpen, defaultView]);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  const handleSendOtp = async () => {
    if (!userId) {
      setError("Please enter your Mobile Number or Email first");
      return;
    }
    
    setOtpLoading(true);
    setError("");
    
    setTimeout(() => {
      setOtpLoading(false);
      setOtpSent(true);
      toast({
        title: "OTP Sent!",
        description: `A 4-digit OTP has been sent to ${userId} via SMS/Email`,
      });
    }, 1500);
  };

  const handleResendOtp = () => {
    setOtp("");
    handleSendOtp();
  };

  const handleLogin = () => {
    if (!userId) {
      setError("Please enter your User ID (Mobile/Email)");
      return;
    }
    if (!password) {
      setError("Please enter your password");
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
    console.log("Login attempt:", { userId, password, otp });
    toast({
      title: "Login",
      description: "Login functionality will be connected to backend soon!",
    });
  };

  const handleRegister = () => {
    if (!regName) {
      setError("Please enter your full name");
      return;
    }
    if (!regMobile || regMobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!regEmail) {
      setError("Please enter your email address");
      return;
    }
    if (!regAddress) {
      setError("Please enter your address");
      return;
    }
    if (!regAadhaar || regAadhaar.length !== 12) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    if (!aadhaarFront || !aadhaarBack) {
      setError("Please upload both Aadhaar card images (front and back)");
      return;
    }
    if (!regPan || regPan.length !== 10) {
      setError("Please enter a valid 10-character PAN number");
      return;
    }
    if (!panImage) {
      setError("Please upload your PAN card image");
      return;
    }

    setError("");
    console.log("Registration data:", { regName, regEmail, regMobile, regAddress, regAadhaar, regPan, aadhaarFront, aadhaarBack, panImage });
    toast({
      title: "Application Submitted!",
      description: "Your KYC application has been submitted. We will verify and contact you soon.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`bg-gradient-to-br from-[#0a0a2e] via-[#1a0a3a] to-[#2a0a4a] border-white/10 text-white rounded-3xl backdrop-blur-3xl shadow-[0_0_50px_rgba(59,130,246,0.3)] ${view === "register" ? "sm:max-w-[600px] max-h-[90vh] overflow-y-auto" : "sm:max-w-[450px]"}`}
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
                <Button 
                  className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-400 border-0 text-white rounded-2xl font-bold text-lg flex items-center justify-between px-6 group"
                  onClick={() => setView("register")}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <UserPlus className="h-5 w-5" />
                    </div>
                    <span>Open Account</span>
                  </div>
                  <span className="text-white/40 group-hover:text-white transition-colors">→</span>
                </Button>
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
        ) : view === "login" ? (
          <>
            <DialogHeader>
              <button 
                onClick={() => setView("menu")}
                className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-white/60" />
              </button>
              <div className="mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-400 to-purple-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] mx-auto">
                <LogIn className="h-7 w-7" />
              </div>
              <DialogTitle className="text-2xl font-display font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 mb-1">
                Login to Yek7Pay
              </DialogTitle>
              <DialogDescription className="text-white/60 text-sm text-center mb-2">
                Enter your credentials to access your account
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5 text-left">User ID (Mobile No / Email)</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter mobile number or email"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5 text-left">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-12 px-4 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none transition-colors text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5 text-left">4-Digit OTP (via SMS/Email)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="Enter OTP"
                    maxLength={4}
                    className="flex-1 h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none transition-colors text-center text-lg tracking-[0.4em] font-bold"
                  />
                  {!otpSent ? (
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpLoading}
                      className="h-12 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                      {otpLoading ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      Send OTP
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={otpLoading}
                      className="h-12 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                      <RefreshCw className={`h-4 w-4 ${otpLoading ? 'animate-spin' : ''}`} />
                      Resend
                    </Button>
                  )}
                </div>
                <p className="text-[10px] text-white/40 mt-1 text-left">OTP will be sent via SMS and Email automatically</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5 text-left">Captcha</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter captcha"
                    className="flex-1 h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none transition-colors text-sm"
                  />
                  <div className="h-12 px-3 rounded-xl bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-white/10 flex items-center justify-center select-none">
                    <span className="text-lg font-mono font-bold tracking-wider text-white/90 italic" style={{ textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.2)" }}>
                      {captcha}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/60 hover:bg-white/10 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                  {error}
                </div>
              )}

              <Button 
                onClick={handleLogin}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-base shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                Login
              </Button>

              <div className="flex justify-between text-xs">
                <a href="#" className="text-blue-400 hover:underline">Forgot Password?</a>
                <button onClick={() => setView("register")} className="text-blue-400 hover:underline">
                  Create Account
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <button 
                onClick={() => setView("menu")}
                className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/5 transition-colors z-10"
              >
                <ArrowLeft className="h-5 w-5 text-white/60" />
              </button>
              <div className="mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] mx-auto">
                <UserPlus className="h-7 w-7" />
              </div>
              <DialogTitle className="text-2xl font-display font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 mb-1">
                Open New Account
              </DialogTitle>
              <DialogDescription className="text-white/60 text-sm text-center mb-2">
                Complete KYC to start using Yek7Pay services
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-1.5 text-left flex items-center gap-2">
                    <User className="h-3 w-3" /> Full Name *
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50 focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/60 mb-1.5 text-left flex items-center gap-2">
                    <Phone className="h-3 w-3" /> Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit mobile number"
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5 text-left flex items-center gap-2">
                  <Mail className="h-3 w-3" /> Email Address *
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50 focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5 text-left flex items-center gap-2">
                  <MapPin className="h-3 w-3" /> Full Address *
                </label>
                <textarea
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="Enter your complete address with PIN code"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-green-500/50 focus:outline-none transition-colors text-sm resize-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                <h4 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Aadhaar Card Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-1.5 text-left">Aadhaar Number *</label>
                    <input
                      type="text"
                      value={regAadhaar}
                      onChange={(e) => setRegAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))}
                      placeholder="12-digit Aadhaar number"
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none transition-colors text-sm tracking-wider"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-white/60 mb-1.5 text-left">Front Side *</label>
                      <input
                        type="file"
                        ref={aadhaarFrontRef}
                        accept="image/*"
                        onChange={(e) => setAadhaarFront(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => aadhaarFrontRef.current?.click()}
                        className={`w-full h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors ${aadhaarFront ? 'border-green-500/50 bg-green-500/10' : 'border-white/10 bg-white/5 hover:border-blue-500/50'}`}
                      >
                        {aadhaarFront ? (
                          <>
                            <FileText className="h-5 w-5 text-green-400" />
                            <span className="text-[10px] text-green-400 font-bold">Uploaded</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-5 w-5 text-white/40" />
                            <span className="text-[10px] text-white/40">Upload Front</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white/60 mb-1.5 text-left">Back Side *</label>
                      <input
                        type="file"
                        ref={aadhaarBackRef}
                        accept="image/*"
                        onChange={(e) => setAadhaarBack(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => aadhaarBackRef.current?.click()}
                        className={`w-full h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors ${aadhaarBack ? 'border-green-500/50 bg-green-500/10' : 'border-white/10 bg-white/5 hover:border-blue-500/50'}`}
                      >
                        {aadhaarBack ? (
                          <>
                            <FileText className="h-5 w-5 text-green-400" />
                            <span className="text-[10px] text-green-400 font-bold">Uploaded</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-5 w-5 text-white/40" />
                            <span className="text-[10px] text-white/40">Upload Back</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                <h4 className="text-sm font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> PAN Card Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-1.5 text-left">PAN Number *</label>
                    <input
                      type="text"
                      value={regPan}
                      onChange={(e) => setRegPan(e.target.value.toUpperCase().slice(0, 10))}
                      placeholder="10-character PAN number"
                      className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none transition-colors text-sm tracking-wider uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/60 mb-1.5 text-left">PAN Card Image *</label>
                    <input
                      type="file"
                      ref={panRef}
                      accept="image/*"
                      onChange={(e) => setPanImage(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => panRef.current?.click()}
                      className={`w-full h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors ${panImage ? 'border-green-500/50 bg-green-500/10' : 'border-white/10 bg-white/5 hover:border-purple-500/50'}`}
                    >
                      {panImage ? (
                        <>
                          <FileText className="h-5 w-5 text-green-400" />
                          <span className="text-xs text-green-400 font-bold">PAN Card Uploaded</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-5 w-5 text-white/40" />
                          <span className="text-xs text-white/40">Click to upload PAN card</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                  {error}
                </div>
              )}

              <Button 
                onClick={handleRegister}
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-bold text-base shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                Submit KYC Application
              </Button>

              <p className="text-center text-[10px] text-white/40 leading-relaxed">
                By submitting, you agree to our KYC verification process. Your documents will be securely processed.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
