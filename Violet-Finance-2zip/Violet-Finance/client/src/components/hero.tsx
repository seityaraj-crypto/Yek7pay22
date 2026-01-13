import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Globe, Coins, CheckCircle2, Send, Wallet, CreditCard, Smartphone, Banknote } from "lucide-react";
import { AuthDialog } from "@/components/auth-dialog";
import { useState, useEffect } from "react";
import { Link } from "wouter";

const heroTextSlides = [
  {
    id: 1,
    highlight: "Neo Bank Unlimited",
    text: "Unlimited Daily Vendor Payments. Designed for High-Volume Transactions.",
    icon: Banknote
  },
  {
    id: 2,
    highlight: "Zero Transfer Fees",
    text: "Enjoy zero fees on all domestic transfers. Your money reaches faster without hidden charges.",
    icon: Send
  },
  {
    id: 3,
    highlight: "Instant Settlement",
    text: "Get T+0 instant settlement on all transactions. Your earnings hit your account immediately.",
    icon: Zap
  },
  {
    id: 4,
    highlight: "Secure & Reliable",
    text: "Bank-grade security with AES-256 encryption. Your transactions are always protected.",
    icon: ShieldCheck
  }
];

const slides = [
  {
    id: 1,
    title: "Indo-Nepal Transfer",
    amount: "Rs 1,00,000.00",
    recipient: "Rajesh X",
    transferId: "YK7-8821",
    icon: "🇮🇳",
    targetIcon: "🇳🇵",
    status: "Completed",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "AEPS Withdrawal",
    amount: "Rs 25,000.00",
    recipient: "Priya X",
    transferId: "YK7-9942",
    icon: "💳",
    targetIcon: "💰",
    status: "Processing",
    gradient: "from-green-500 to-emerald-400"
  },
  {
    id: 3,
    title: "DMT Transfer",
    amount: "Rs 50,000.00",
    recipient: "Amit X",
    transferId: "YK7-3356",
    icon: "🏦",
    targetIcon: "📱",
    status: "Completed",
    gradient: "from-purple-500 to-pink-400"
  },
  {
    id: 4,
    title: "mPOS Payment",
    amount: "Rs 8,500.00",
    recipient: "Quick Mart Store",
    transferId: "YK7-7721",
    icon: "📲",
    targetIcon: "✅",
    status: "Successful",
    gradient: "from-orange-500 to-yellow-400"
  }
];

export function Hero() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTextSlide, setCurrentTextSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextSlide((prev) => (prev + 1) % heroTextSlides.length);
    }, 5000);
    return () => clearInterval(textInterval);
  }, []);

  const slide = slides[currentSlide];
  const textSlide = heroTextSlides[currentTextSlide];

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-gradient-to-br from-[#0a1a3a] via-[#0d0d2b] to-[#1a0b3b]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-3xl lg:text-left text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-bold mb-8 neo-glow">
                <Coins className="h-4 w-4 text-secondary" />
                Next Gen Neo Banking with Yek7pay
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-8 tracking-tighter">
                Powering <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">India's</span> <br />
                <span className="relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500">Fintech Ecosystem</span>
                  <span className="absolute -bottom-2 left-0 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
                    <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                  </span>
                </span>
              </h1>
              
              <div className="mb-10 max-w-xl mx-auto lg:mx-0 min-h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={textSlide.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
                        <textSlide.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        {textSlide.highlight}
                      </span>
                    </div>
                    <p className="text-xl text-gray-300 leading-relaxed">
                      {textSlide.text}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="flex gap-2 mt-4 justify-center lg:justify-start">
                  {heroTextSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTextSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentTextSlide 
                          ? 'bg-blue-400 w-6' 
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-10 rounded-full shadow-2xl neo-glow text-lg font-bold" onClick={() => setIsAuthOpen(true)}>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="h-14 px-10 rounded-full border-white/10 hover:bg-white/5 hover:text-white text-lg font-bold">
                    Explore Features
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/5">
                {[
                  { icon: ShieldCheck, color: "text-green-400", label: "Military Grade", sub: "AES-256 Encryption" },
                  { icon: Zap, color: "text-secondary", label: "Instant Payouts", sub: "T+0 Settlement" },
                  { icon: Globe, color: "text-primary", label: "Remittance", sub: "India & Nepal" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center lg:items-start gap-2">
                    <div className={`p-2 rounded-xl bg-white/5 ${item.color}`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.label}</h4>
                      <p className="text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Abstract Device/Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block relative mx-auto lg:mx-0 mt-8 lg:mt-0"
          >
            <div className="relative w-[280px] h-[360px] md:w-[400px] md:h-[500px] lg:w-[500px] lg:h-[600px] glass-card rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem] flex flex-col items-center justify-start p-3 md:p-4 lg:p-6 rotate-0 lg:rotate-2 hover:rotate-0 transition-transform duration-700 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 rounded-[4rem]" />
               
               {/* Indo-Nepal Money Transfer Feature Card */}
               <div className="relative w-full h-full bg-gradient-to-br from-[#000a26] via-[#00124d] to-[#000a26] rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[3rem] p-3 md:p-4 lg:p-6 border border-white/10 flex flex-col gap-2 md:gap-4 lg:gap-6 shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10">
                     <div className="h-6 w-6 md:h-8 md:w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <ArrowRight className="h-3 w-3 md:h-5 md:w-5 text-white -rotate-45" />
                     </div>
                     <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-widest bg-white/10 backdrop-blur-md px-2 md:px-3 py-1 rounded-full border border-white/5">Secure Node</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="space-y-2 relative z-10"
                    >
                      <h3 className="text-sm md:text-lg lg:text-xl font-display font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 leading-tight">{slide.title}</h3>
                      <p className="text-[8px] md:text-[10px] text-white/50 font-medium">Real-time settlement with advanced encryption.</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="relative h-28 md:h-36 lg:h-48 w-full bg-gradient-to-br from-blue-900/50 via-purple-900/30 to-blue-900/50 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="relative w-full h-full flex items-center justify-center">
                          <motion.div
                            className="absolute left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2"
                            animate={{ 
                              x: [0, 10, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center shadow-lg`}>
                              <span className="text-lg md:text-xl lg:text-2xl">{slide.icon}</span>
                            </div>
                          </motion.div>
                          
                          <motion.div
                            className="absolute"
                            animate={{ 
                              rotate: [0, 360],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          >
                            <Send className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-green-400" />
                          </motion.div>
                          
                          <motion.div
                            className="absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2"
                            animate={{ 
                              x: [0, -10, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                          >
                            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-500/30">
                              <span className="text-lg md:text-xl lg:text-2xl">{slide.targetIcon}</span>
                            </div>
                          </motion.div>
                          
                          <motion.div
                            className="absolute bottom-2 md:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <div className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold ${slide.status === 'Completed' || slide.status === 'Successful' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {slide.status}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000a26]/80 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="text-[7px] md:text-[10px] font-bold uppercase tracking-wider text-blue-300">ID: {slide.transferId}</div>
                        <div className="flex gap-0.5 md:gap-1">
                          {slides.map((_, i) => (
                            <div key={i} className={`h-1 w-1 md:h-1.5 md:w-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-blue-400 w-2 md:w-4' : 'bg-white/30'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-3 relative z-10"
                    >
                      <div className="flex items-center justify-between text-[10px] md:text-xs">
                        <span className="text-white/40 font-medium">Recipient</span>
                        <span className="font-bold text-white truncate max-w-[100px] md:max-w-none">{slide.recipient}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] md:text-xs">
                        <span className="text-white/40 font-medium">Amount</span>
                        <span className="font-bold text-blue-400">
                          ₹ <span className="blur-[2px]">{slide.amount.replace('Rs ', '')}</span>
                        </span>
                      </div>
                      <div className="h-8 md:h-10 lg:h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center text-white text-[10px] md:text-xs font-bold gap-1 md:gap-2 shadow-lg shadow-blue-900/20 active:scale-95 transition-transform">
                        Confirm <Zap className="h-2.5 w-2.5 md:h-3 md:w-3" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
               </div>

               {/* Decorative floating elements */}
               <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-400/20 rounded-3xl blur-2xl" />
               <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
      <AuthDialog isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </div>
  );
}
