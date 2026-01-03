import { Navbar, Footer } from "@/components/layout";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Zap, ShieldCheck, Rocket, ArrowRight, Loader2, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Cashfree: any;
  }
}

export default function Upgrade() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const loadCashfreeScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.Cashfree) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Cashfree SDK"));
      document.head.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    if (!phone || phone.length < 10) {
      toast({
        title: "Phone required",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await loadCashfreeScript();

      const response = await fetch("/api/cashfree/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 999,
          customerName: name || "Customer",
          customerEmail: email,
          customerPhone: phone
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to create order");
      }

      const cashfree = await window.Cashfree.load({
        mode: process.env.NODE_ENV === "production" ? "production" : "sandbox"
      });

      const checkoutOptions = {
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self"
      };

      cashfree.checkout(checkoutOptions);
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setShowPhoneModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a2e] text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-black mb-6 uppercase tracking-widest">
                🚀 Business Accelerator
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black mb-8 leading-tight">
                Upgrade to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400">Premium</span>
              </h1>
              <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium">
                Transform your agency into a high-income business for a one-time activation fee of only <span className="text-pink-500 font-bold">₹ 999</span>.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {[
                { title: "Neo Bank Unlimited", desc: "Unlimited daily limits for high-volume money transfers." },
                { title: "PPI Wallet", desc: "Digital wallet solutions for instant merchant payouts." },
                { title: "Premium Loans", desc: "Priority processing for business and personal financing." },
                { title: "Compliance Suite", desc: "Full access to GST filing, ITR, and audit services." },
                { title: "VIP Support", desc: "24/7 dedicated account manager for your business." },
                { title: "Elite Commission", desc: "Unlock the highest commission slabs in the industry." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-white/40 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="p-12 rounded-[3rem] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-4xl font-display font-black mb-6">Activate Premium Now</h2>
                <div className="text-6xl font-black text-pink-500 mb-10">₹ 999 <span className="text-lg text-white/40 font-bold uppercase tracking-widest">Only</span></div>
                
                <Button 
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 text-white rounded-full px-16 h-20 text-xl font-black shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto"
                  onClick={() => setShowPhoneModal(true)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm Activation <Zap className="h-6 w-6 fill-current" />
                    </>
                  )}
                </Button>
                
                <p className="mt-8 text-white/40 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Secure 256-bit Encrypted Payment
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showPhoneModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowPhoneModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#1a1a3a] border border-white/10 rounded-[2rem] p-8 shadow-2xl"
            >
              <button 
                onClick={() => setShowPhoneModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="h-6 w-6 text-white/40" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                  <Rocket className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white text-left">Enter Your Details</h3>
                  <p className="text-sm text-white/40 text-left">Complete payment to activate Premium</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-white/60 mb-2 text-left">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="Enter 10-digit phone number"
                    className="w-full h-14 px-6 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-pink-500/50 focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-white/60 mb-2 text-left">Name (Optional)</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full h-14 px-6 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-pink-500/50 focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-white/60 mb-2 text-left">Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full h-14 px-6 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-pink-500/50 focus:outline-none transition-colors"
                  />
                </div>

                <Button 
                  onClick={initiatePayment}
                  disabled={isLoading || phone.length < 10}
                  className="w-full h-14 mt-4 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-500 hover:to-blue-500 text-white rounded-xl font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ₹ 999 <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-3 text-left">
                <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-200/50 leading-relaxed">
                  You will be redirected to Cashfree's secure payment page. After successful payment, your Premium features will be activated instantly.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
