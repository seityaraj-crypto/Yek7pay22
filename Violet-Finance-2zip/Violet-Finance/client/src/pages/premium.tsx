import { Navbar, Footer } from "@/components/layout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Crown, CheckCircle2, Zap, ShieldCheck, Send, Globe, Fingerprint, 
  CreditCard, Banknote, Smartphone, Building2, Plane, Train, 
  QrCode, Wallet, Briefcase, HeadphonesIcon, TrendingUp, Star,
  ArrowRight, Phone, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Invoice } from "@/components/invoice";
import { Link } from "wouter";

const premiumServices = [
  {
    icon: Send,
    title: "Yek7pay Unlimited",
    desc: "Unlimited daily money transfer limits with zero downtime. Process high-volume transactions instantly across all banks in India.",
    highlight: "No Daily Limits"
  },
  {
    icon: CreditCard,
    title: "mPOS Solutions",
    desc: "Accept debit and credit card payments anywhere with a portable card machine. Ideal for shops, delivery, and field agents.",
    highlight: "Card Acceptance"
  },
  {
    icon: QrCode,
    title: "UPI QR Payments",
    desc: "Accept UPI payments with branded QR codes and instant soundbox alerts. No missed payments ever again.",
    highlight: "Instant Alerts"
  },
  {
    icon: Wallet,
    title: "PPI Wallet",
    desc: "Digital prepaid wallet for instant merchant payouts, bill payments, and recharges. Works even without a bank account.",
    highlight: "Digital Wallet"
  },
  {
    icon: Globe,
    title: "Indo-Nepal Remittance",
    desc: "Send money to Nepal instantly with the best exchange rates. Fully RBI compliant cross-border transfer service.",
    highlight: "Cross-Border"
  },
  {
    icon: Banknote,
    title: "Business Loans",
    desc: "Priority processing for business and personal financing. Quick disbursals with minimal documentation required.",
    highlight: "Fast Approval"
  },
  {
    icon: Building2,
    title: "GST & Compliance",
    desc: "Complete access to GST filing, ITR returns, company incorporation, MSME registration, and audit services.",
    highlight: "Full Access"
  },
  {
    icon: Briefcase,
    title: "Insurance Services",
    desc: "Offer life, health, motor, and travel insurance policies. Earn premium commissions on every policy sold.",
    highlight: "High Commission"
  }
];

const whyPremium = [
  { icon: TrendingUp, title: "Highest Commissions", desc: "Unlock the highest commission slabs in the industry across all services." },
  { icon: HeadphonesIcon, title: "24/7 VIP Support", desc: "Dedicated account manager available round the clock for your business." },
  { icon: Star, title: "Priority Processing", desc: "All your transactions and requests get priority processing and faster settlements." },
  { icon: ShieldCheck, title: "Secure & Compliant", desc: "RBI compliant platform with 256-bit encryption and full data security." }
];

export default function Premium() {
  const [showInvoice, setShowInvoice] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a2e] text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-black mb-6 uppercase tracking-widest">
              <Crown className="h-4 w-4" /> Premium Services
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black mb-8 leading-tight">
              All-in-One <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400">Premium</span> Platform
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto font-medium">
              Get access to every Yek7Pay service with a single activation fee of <span className="text-amber-400 font-bold">₹999</span>. 
              Start earning from Day 1 with India's most powerful fintech toolkit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {premiumServices.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-[1.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {service.highlight}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all mb-4">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-center mb-12">
              Why Go <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-400">Premium</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyPremium.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center p-8 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-500/20">
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-gradient-to-br from-amber-600/20 via-yellow-600/20 to-amber-600/20 border border-amber-500/20 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20">
                <Crown className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-display font-black mb-4">Activate Premium Now</h2>
              <p className="text-white/60 mb-6 max-w-lg mx-auto">One-time activation fee. Lifetime access to all premium services and highest commission rates.</p>
              <div className="text-6xl font-black text-amber-400 mb-10">₹ 999 <span className="text-lg text-white/40 font-bold uppercase tracking-widest">Only</span></div>
              
              <Button 
                className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-400 hover:to-amber-400 text-black rounded-full px-16 h-20 text-xl font-black shadow-2xl shadow-amber-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto"
                onClick={() => setShowInvoice(true)}
              >
                <Crown className="h-6 w-6" /> Activate Premium <Zap className="h-6 w-6 fill-current" />
              </Button>
              
              <p className="mt-8 text-white/40 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Secure 256-bit Encrypted Payment
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-2xl mx-auto mt-16 text-center"
          >
            <p className="text-white/40 text-sm mb-4">Need help deciding? Talk to our expert.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919230967187">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white h-12 rounded-2xl font-bold px-6 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Call +91 92309 67187
                </Button>
              </a>
              <a href="https://wa.me/919230967187?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Yek7Pay%20Premium%20services." target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white h-12 rounded-2xl font-bold px-6 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-green-400" /> WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {showInvoice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowInvoice(false)}
            />
            <div className="relative z-[110] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <Invoice 
                title="Premium Membership Activation"
                amount="₹ 999.00"
                productId="premium-activation"
                invoiceNumber={`INV-${Math.floor(Math.random() * 90000) + 10000}`}
                date={new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                items={[
                  { name: "Premium Business License", price: "₹ 846.61" },
                  { name: "GST (18%)", price: "₹ 152.39" }
                ]}
                onClose={() => setShowInvoice(false)}
                onPaymentSuccess={() => {
                  console.log("Premium activation payment successful");
                }}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
