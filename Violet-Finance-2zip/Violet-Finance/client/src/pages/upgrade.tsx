import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Upgrade() {
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
                { title: "mPOS Solutions", desc: "Portable card payment device for seamless transactions anywhere." },
                { title: "QR Payment", desc: "Accept UPI payments with QR codes and instant soundbox alerts." },
                { title: "VIP Support", desc: "24/7 dedicated account manager for your business.", has247: true },
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
                      <p className="text-white/40 leading-relaxed">
                        {(feature as any).has247 ? (
                          <>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 font-bold">24/7</span>
                            {feature.desc.replace("24/7", "")}
                          </>
                        ) : feature.desc}
                      </p>
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
                
                <a href="https://wa.me/919230967187?text=Hi%2C%20I%20want%20to%20activate%20Premium%20for%20%E2%82%B9999" target="_blank" rel="noopener noreferrer">
                  <Button 
                    className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 text-white rounded-full px-16 h-20 text-xl font-black shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto"
                  >
                    Confirm Activation <Zap className="h-6 w-6 fill-current" />
                  </Button>
                </a>
                
                <p className="mt-8 text-white/40 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Secure 256-bit Encrypted Payment
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
