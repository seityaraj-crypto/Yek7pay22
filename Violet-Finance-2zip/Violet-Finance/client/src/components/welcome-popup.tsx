import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, TrendingUp, Users, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "India's Leading",
      highlight: "Fintech Platform",
      description: "Join 50,000+ businesses already growing with Yek7Pay",
      icon: Rocket,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Unlimited Money",
      highlight: "Transfers Daily",
      description: "Neo Bank with zero limits. Send any amount, anytime.",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Earn Up To",
      highlight: "₹1 Lakh/Month",
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
    if (isVisible) {
      const slideTimer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
      return () => clearInterval(slideTimer);
    }
  }, [isVisible, slides.length]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('yek7pay_welcome_seen', 'true');
  };

  const handleGetStarted = () => {
    handleClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d0d2b] via-[#1a0a3a] to-[#2a0a4a] border border-white/10 shadow-2xl shadow-purple-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
            >
              <X className="w-5 h-5 text-white/70 group-hover:text-white" />
            </button>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
              />
            </div>

            <div className="relative p-8 pt-12">
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
                  onClick={handleGetStarted}
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
                  <span>50,000+ Partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
