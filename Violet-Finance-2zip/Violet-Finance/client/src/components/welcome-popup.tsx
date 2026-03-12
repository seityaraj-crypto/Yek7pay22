import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, TrendingUp, Users, Zap, ArrowRight, Sparkles, Crown, Phone, MessageCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showGetStarted, setShowGetStarted] = useState(false);

  const slides = [
    {
      title: "India's Leading",
      highlight: "Fintech Platform",
      description: "Join 100,000+ businesses already growing with Yek7Pay",
      icon: Rocket,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Seamless",
      highlight: "Vendor Payments",
      description: "Effortless vendor payments with no daily limit. Built for scale.",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Earn",
      highlight: "Unlimited Monthly",
      description: "Become a Yek7Pay partner and maximize your income",
      icon: Users,
      gradient: "from-pink-500 to-orange-500"
    }
  ];

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('yek7pay_welcome_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isVisible && !showGetStarted) {
      const slideTimer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
      return () => clearInterval(slideTimer);
    }
  }, [isVisible, showGetStarted, slides.length]);

  const handleClose = () => {
    setIsVisible(false);
    setShowGetStarted(false);
    sessionStorage.setItem('yek7pay_welcome_seen', 'true');
  };

  const handleBoostBusiness = () => {
    setShowGetStarted(true);
  };

  const handleBack = () => {
    setShowGetStarted(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d0d2b]/95 via-[#1a0a3a]/95 to-[#2a0a4a]/95 border border-white/10 shadow-2xl shadow-purple-500/20 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
            >
              <X className="w-5 h-5 text-white/70 group-hover:text-white" />
            </button>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
              />
            </div>

            <AnimatePresence mode="wait">
              {!showGetStarted ? (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="relative p-8 pt-12"
                >
                  <div className="flex justify-center mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="relative"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                      >
                        <Zap className="w-4 h-4 text-yellow-900" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="text-center mb-8"
                    >
                      <div className="flex justify-center mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${slides[currentSlide].gradient} bg-opacity-20`}>
                          {(() => {
                            const Icon = slides[currentSlide].icon;
                            return <Icon className="w-8 h-8 text-white" />;
                          })()}
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display font-black text-white mb-2">
                        {slides[currentSlide].title}{" "}
                        <span className={`bg-gradient-to-r ${slides[currentSlide].gradient} bg-clip-text text-transparent`}>
                          {slides[currentSlide].highlight}
                        </span>
                      </h2>
                      <p className="text-white/70 text-lg">
                        {slides[currentSlide].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-center gap-2 mb-8">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                            : "w-2 bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleBoostBusiness}
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white rounded-2xl shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Boost Your Business Now</span>
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <button
                      onClick={handleClose}
                      className="w-full py-3 text-white/50 hover:text-white/80 text-sm font-medium transition-colors"
                    >
                      Maybe later
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>100,000+ Partners</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span>100% Secure</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="agent"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative overflow-hidden"
                >
                  {/* Header */}
                  <div className="relative px-6 pt-6 pb-5 border-b border-white/8">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10 pointer-events-none" />
                    <button
                      onClick={handleBack}
                      className="absolute top-4 left-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 text-white/50 rotate-180" />
                    </button>
                    <button
                      onClick={handleClose}
                      className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <X className="w-4 h-4 text-white/40" />
                    </button>
                    <div className="flex items-center gap-3 pl-8 relative">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <LogIn className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-400 mb-0.5">Yek7Pay Platform</p>
                        <h3 className="text-lg font-black leading-none">Partner Access & Support</h3>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-5 space-y-4">

                    {/* Agent Card */}
                    <div className="p-4 rounded-2xl bg-white/4 border border-white/8 flex items-center gap-4">
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/25">YK</div>
                        <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#0d0d2b]" />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-black leading-tight">Yek7Pay Expert</p>
                        <p className="text-[11px] text-white/45 mt-0.5">Financial Onboarding Specialist</p>
                        <p className="text-[10px] font-bold text-emerald-400 mt-1.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                          Online · Available Now
                        </p>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-[11px] text-white/40 leading-relaxed px-0.5">
                      Our dedicated expert will personally guide you through seamless onboarding, assist with account setup, and ensure you start earning commissions from Day 1.
                    </p>

                    {/* Call & WhatsApp — two-line labels */}
                    <div className="flex gap-2.5">
                      <a href="tel:+919230967187" onClick={handleClose} className="flex-1">
                        <div className="flex items-center gap-2.5 h-12 px-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-500/15 hover:border-blue-400/30 transition-all cursor-pointer">
                          <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                          <div>
                            <p className="text-[9px] text-white/35 leading-none font-medium uppercase tracking-wider">Direct Line</p>
                            <p className="text-[11px] font-black text-white leading-tight mt-0.5">+91 92309 67187</p>
                          </div>
                        </div>
                      </a>
                      <a href="https://wa.me/919230967187?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Yek7Pay%20services" target="_blank" rel="noopener noreferrer" onClick={handleClose} className="flex-1">
                        <div className="flex items-center gap-2.5 h-12 px-3.5 rounded-xl bg-[#25D366]/8 border border-[#25D366]/20 hover:bg-[#25D366]/18 hover:border-[#25D366]/45 transition-all cursor-pointer">
                          <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0" />
                          <div>
                            <p className="text-[9px] text-white/35 leading-none font-medium uppercase tracking-wider">WhatsApp</p>
                            <p className="text-[11px] font-black text-white leading-tight mt-0.5">Chat Now</p>
                          </div>
                        </div>
                      </a>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/8" />
                      <span className="text-[10px] text-white/25 uppercase tracking-widest font-semibold">or</span>
                      <div className="flex-1 h-px bg-white/8" />
                    </div>

                    {/* Register / Login — Featured Card */}
                    <a href="https://yek7pay.finstore.app/" target="_blank" rel="noopener noreferrer" onClick={handleClose} className="block group">
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-[0.98] cursor-pointer">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-6 -translate-x-6 pointer-events-none" />
                        <div className="relative flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-200/80 mb-1">New to Yek7Pay?</p>
                            <p className="text-base font-black text-white leading-tight">Register Online / Login</p>
                            <p className="text-[11px] text-blue-100/70 mt-1">Access your Yek7Pay dashboard instantly</p>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 ml-3 group-hover:bg-white/25 transition-colors">
                            <ArrowRight className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </a>

                    {/* Upgrade Premium — expanded card */}
                    <Link href="/premium" onClick={handleClose} className="block group">
                      <div className="relative rounded-2xl bg-gradient-to-r from-amber-600/15 via-yellow-600/10 to-amber-600/15 border border-amber-500/25 hover:border-amber-400/50 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer p-3.5">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            <Crown className="h-4 w-4 text-amber-400" />
                            <span className="text-sm font-black text-amber-400">Upgrade Premium — ₹999</span>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-amber-400/50 group-hover:text-amber-400 transition-colors" />
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="inline-flex items-center text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.5">🏆 Highest Commission</span>
                          <span className="inline-flex items-center text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.5">✦ Full Access</span>
                          <span className="inline-flex items-center text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.5">⚡ Instant</span>
                        </div>
                      </div>
                    </Link>

                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/8 px-5 py-3 flex items-center justify-between bg-white/2">
                    <p className="text-[10px] text-white/25 font-medium">Mon–Sat · 9 AM – 7 PM IST</p>
                    <p className="text-[10px] text-white/25 font-medium">Pan India Service</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
