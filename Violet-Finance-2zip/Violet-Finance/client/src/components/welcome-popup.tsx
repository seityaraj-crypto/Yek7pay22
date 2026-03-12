import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, TrendingUp, Users, Zap, ArrowRight, Sparkles, Crown, Phone, MessageCircle } from "lucide-react";
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
                  className="relative p-7 pt-12"
                >
                  <button
                    onClick={handleBack}
                    className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
                  >
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white rotate-180" />
                  </button>

                  {/* Agent Card */}
                  <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <span className="text-white font-black text-xl">YK</span>
                      </div>
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-[#0d0d2b]"></span>
                      </span>
                    </div>
                    <div>
                      <p className="font-black text-white text-base leading-tight">Yek7Pay Agent</p>
                      <p className="text-white/50 text-xs mt-0.5">Financial Expert · Available Now</p>
                      <p className="text-[10px] font-semibold text-green-400 mt-1 uppercase tracking-wider">● Online</p>
                    </div>
                  </div>

                  {/* Call & WhatsApp */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <a href="tel:+919230967187" onClick={handleClose}
                      className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-400/40 transition-all group">
                      <Phone className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                      <div className="text-left">
                        <p className="text-[10px] text-white/40 leading-none">Call Agent</p>
                        <p className="text-xs font-bold text-white leading-tight">+91 92309 67187</p>
                      </div>
                    </a>
                    <a
                      href="https://wa.me/919230967187?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Yek7Pay%20services"
                      target="_blank" rel="noopener noreferrer" onClick={handleClose}
                      className="flex items-center justify-center gap-2 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/25 hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-all group">
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <div className="text-left">
                        <p className="text-[10px] text-white/40 leading-none">WhatsApp</p>
                        <p className="text-xs font-bold text-white leading-tight">Chat Now</p>
                      </div>
                    </a>
                  </div>

                  <div className="relative flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Register / Login */}
                  <a
                    href="https://yek7pay.finstore.app/"
                    target="_blank" rel="noopener noreferrer"
                    onClick={handleClose}
                    className="flex items-center gap-3 w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group mb-3"
                  >
                    <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors flex-1">Register Online / Login</span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Upgrade Premium */}
                  <Link href="/premium" onClick={handleClose}>
                    <button className="flex items-center gap-3 w-full h-11 px-4 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-400/40 transition-all group">
                      <Crown className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-bold text-amber-400 group-hover:text-amber-300 transition-colors flex-1 text-left">Upgrade Premium — ₹999</span>
                      <ArrowRight className="w-4 h-4 text-amber-400/50 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
                    </button>
                  </Link>

                  {/* Availability */}
                  <p className="text-center text-[10px] text-white/25 mt-4 font-medium uppercase tracking-wider">
                    Mon – Sat · 9 AM – 7 PM IST
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
