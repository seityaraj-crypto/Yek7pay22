import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Globe, Coins, CheckCircle2, Send, Wallet, CreditCard, Smartphone } from "lucide-react";
import { AuthDialog } from "@/components/auth-dialog";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Indo-Nepal Transfer",
    amount: "₹1,00,000.00",
    recipient: "Rajesh Sharma",
    transferId: "YK7-8821",
    icon: "🇮🇳",
    targetIcon: "🇳🇵",
    status: "Completed",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "AEPS Withdrawal",
    amount: "₹25,000.00",
    recipient: "Priya Patel",
    transferId: "YK7-9942",
    icon: "💳",
    targetIcon: "💰",
    status: "Processing",
    gradient: "from-green-500 to-emerald-400"
  },
  {
    id: 3,
    title: "DMT Transfer",
    amount: "₹50,000.00",
    recipient: "Amit Kumar",
    transferId: "YK7-3356",
    icon: "🏦",
    targetIcon: "📱",
    status: "Completed",
    gradient: "from-purple-500 to-pink-400"
  },
  {
    id: 4,
    title: "mPOS Payment",
    amount: "₹8,500.00",
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

  const slide = slides[currentSlide];

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
                Empowering <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">India</span> <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500">Solution Provider</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed mx-auto lg:mx-0">
                Yek7pay brings you Neo Bank unlimited money transfer. Secure wallets, Indo-Nepal remittances, and instant AEPS. 
                The best solution for merchants and high-volume transactions.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-10 rounded-full shadow-2xl neo-glow text-lg font-bold" onClick={() => setIsAuthOpen(true)}>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 rounded-full border-white/10 hover:bg-white/5 hover:text-white text-lg font-bold" onClick={() => setIsAuthOpen(true)}>
                  Explore Features
                </Button>
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
            className="hidden lg:block relative"
          >
            <div className="relative w-[500px] h-[600px] glass-card rounded-[4rem] flex flex-col items-center justify-start p-6 rotate-2 hover:rotate-0 transition-transform duration-700 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 rounded-[4rem]" />
               
               {/* Indo-Nepal Money Transfer Feature Card */}
               <div className="relative w-full h-full bg-gradient-to-br from-[#000a26] via-[#00124d] to-[#000a26] rounded-[3rem] p-6 border border-white/10 flex flex-col gap-6 shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10">
                     <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <ArrowRight className="h-5 w-5 text-white -rotate-45" />
                     </div>
                     <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">Secure Node</span>
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
                      <h3 className="text-xl font-display font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 leading-tight">{slide.title}</h3>
                      <p className="text-[10px] text-white/50 font-medium">Real-time settlement with advanced encryption.</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="relative h-48 w-full bg-gradient-to-br from-blue-900/50 via-purple-900/30 to-blue-900/50 rounded-2xl overflow-hidden border border-white/10 z-10">
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
                            className="absolute left-8 top-1/2 -translate-y-1/2"
                            animate={{ 
                              x: [0, 20, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center shadow-lg`}>
                              <span className="text-2xl">{slide.icon}</span>
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
                            <Send className="h-8 w-8 text-green-400" />
                          </motion.div>
                          
                          <motion.div
                            className="absolute right-8 top-1/2 -translate-y-1/2"
                            animate={{ 
                              x: [0, -20, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                          >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-500/30">
                              <span className="text-2xl">{slide.targetIcon}</span>
                            </div>
                          </motion.div>
                          
                          <motion.div
                            className="absolute bottom-6 left-1/2 -translate-x-1/2"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${slide.status === 'Completed' || slide.status === 'Successful' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {slide.status}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000a26]/80 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-blue-300">Transfer ID: {slide.transferId}</div>
                        <div className="flex gap-1">
                          {slides.map((_, i) => (
                            <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-blue-400 w-4' : 'bg-white/30'}`} />
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
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/40 font-medium">Recipient Name</span>
                        <span className="font-bold text-white">{slide.recipient}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/40 font-medium">Transfer Amount</span>
                        <span className="font-bold text-blue-400">{slide.amount}</span>
                      </div>
                      <div className="h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-xs font-bold gap-2 shadow-lg shadow-blue-900/20 active:scale-95 transition-transform">
                        Confirm Transfer <Zap className="h-3 w-3" />
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
