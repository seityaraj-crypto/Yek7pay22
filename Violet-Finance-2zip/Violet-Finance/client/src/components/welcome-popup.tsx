import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, TrendingUp, Users, Zap, ArrowRight, Sparkles, UserPlus, LogIn, Crown, Phone, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                  key="getstarted"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative p-8 pt-12"
                >
                  <button
                    onClick={handleBack}
                    className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
                  >
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white rotate-180" />
                  </button>

                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-display font-black text-white mb-2">
                      Get Started with{" "}
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Yek7Pay
                      </span>
                    </h2>
                    <p className="text-white/60 text-sm">Choose how you'd like to proceed</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href="/new-account"
                        className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 hover:border-blue-400/50 transition-all group cursor-pointer text-center"
                        onClick={handleClose}
                      >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <UserPlus className="w-5 h-5 text-white" />
                        </div>
                        <p className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors">Create Account</p>
                      </a>

                      <a
                        href="/login"
                        className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-green-600/20 to-teal-600/20 border border-green-500/30 hover:border-green-400/50 transition-all group cursor-pointer text-center"
                        onClick={handleClose}
                      >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                          <LogIn className="w-5 h-5 text-white" />
                        </div>
                        <p className="font-bold text-white text-sm group-hover:text-green-300 transition-colors">Login</p>
                      </a>
                    </div>

                    <a
                      href="/upgrade"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 hover:border-yellow-400/50 transition-all group cursor-pointer"
                      onClick={handleClose}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white group-hover:text-yellow-300 transition-colors">Upgrade Premium</p>
                        <p className="text-sm text-white/50">Unlock exclusive features & benefits</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <p className="text-center text-white/50 text-sm mb-4">Need help? Contact us</p>
                    <div className="flex justify-center gap-4">
                      <a
                        href="tel:+919230967187"
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                          <Phone className="w-5 h-5 text-green-400" />
                        </div>
                        <span className="text-xs text-white/60 group-hover:text-white transition-colors">Call</span>
                      </a>

                      <a
                        href="https://wa.me/919230967187?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Yek7Pay%20services"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                          <MessageCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <span className="text-xs text-white/60 group-hover:text-white transition-colors">WhatsApp</span>
                      </a>

                      <a
                        href="mailto:info@yek7pay.com"
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                          <Mail className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-xs text-white/60 group-hover:text-white transition-colors">Email</span>
                      </a>
                    </div>
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
