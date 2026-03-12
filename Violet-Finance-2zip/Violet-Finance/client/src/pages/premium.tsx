import { Navbar, Footer } from "@/components/layout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Crown, Zap, ShieldCheck, Send, Globe,
  CreditCard, Banknote, Building2,
  QrCode, Wallet, Briefcase, HeadphonesIcon, TrendingUp, Star,
  Phone, MessageCircle, User, Mail, X, Loader2, BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRazorpaySubscription } from "@/hooks/use-razorpay-subscription";
import { useToast } from "@/hooks/use-toast";

const PREMIUM_PLAN_ID = "plan_SQLtRpumAcjWcJ";

const premiumServices = [
  { icon: Send, title: "Yek7pay Unlimited", desc: "Unlimited daily money transfer limits with zero downtime. Process high-volume transactions instantly across all banks in India.", highlight: "No Daily Limits" },
  { icon: CreditCard, title: "mPOS Solutions", desc: "Accept debit and credit card payments anywhere with a portable card machine. Ideal for shops, delivery, and field agents.", highlight: "Card Acceptance" },
  { icon: QrCode, title: "UPI QR Payments", desc: "Accept UPI payments with branded QR codes and instant soundbox alerts. No missed payments ever again.", highlight: "Instant Alerts" },
  { icon: Wallet, title: "PPI Wallet", desc: "Digital prepaid wallet for instant merchant payouts, bill payments, and recharges. Works even without a bank account.", highlight: "Digital Wallet" },
  { icon: Globe, title: "Indo-Nepal Remittance", desc: "Send money to Nepal instantly with the best exchange rates. Fully RBI compliant cross-border transfer service.", highlight: "Cross-Border" },
  { icon: Banknote, title: "Business Loans", desc: "Priority processing for business and personal financing. Quick disbursals with minimal documentation required.", highlight: "Fast Approval" },
  { icon: Building2, title: "GST & Compliance", desc: "Complete access to GST filing, ITR returns, company incorporation, MSME registration, and audit services.", highlight: "Full Access" },
  { icon: Briefcase, title: "Insurance Services", desc: "Offer life, health, motor, and travel insurance policies. Earn premium commissions on every policy sold.", highlight: "High Commission" }
];

const whyPremium = [
  { icon: TrendingUp, title: "Highest Commissions", desc: "Unlock the highest commission slabs in the industry across all services." },
  { icon: HeadphonesIcon, title: "24/7 VIP Support", desc: "Dedicated account manager available round the clock for your business." },
  { icon: Star, title: "Priority Processing", desc: "All your transactions and requests get priority processing and faster settlements." },
  { icon: ShieldCheck, title: "Secure & Compliant", desc: "RBI compliant platform with 256-bit encryption and full data security." }
];

interface CustomerForm {
  name: string;
  email: string;
  phone: string;
}

export default function Premium() {
  const [showForm, setShowForm] = useState(false);
  const [activated, setActivated] = useState<{ paymentId: string } | null>(null);
  const [form, setForm] = useState<CustomerForm>({ name: "", email: "", phone: "" });
  const { initiateSubscription, isLoading } = useRazorpaySubscription();
  const { toast } = useToast();

  const handleActivate = () => {
    if (!form.name.trim()) {
      toast({ title: "Name required", description: "Please enter your full name.", variant: "destructive" });
      return;
    }
    if (!form.phone.trim()) {
      toast({ title: "Phone required", description: "Please enter your phone number.", variant: "destructive" });
      return;
    }

    initiateSubscription({
      planId: PREMIUM_PLAN_ID,
      name: "Yek7Pay Solutions",
      description: "Premium Membership — ₹999 Activation",
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      onSuccess: (response) => {
        setActivated({ paymentId: response.razorpay_payment_id });
        setShowForm(false);
        toast({ title: "Premium Activated!", description: "Your premium membership is now active." });

        const msg = `*Yek7Pay Premium Activated* 🎉\n\nName: ${form.name}\nPhone: ${form.phone}\nPlan: Premium Membership ₹999\nTransaction ID: ${response.razorpay_payment_id}\n\nThank you for activating Yek7Pay Premium!\n\n_Yek7Pay Solutions Private Limited_`;
        const waUrl = `https://api.whatsapp.com/send?phone=91${form.phone.replace(/\D/g, "")}&text=${encodeURIComponent(msg)}`;
        window.open(waUrl, "_blank");
      },
      onError: (err) => {
        toast({ title: "Payment Failed", description: err.message, variant: "destructive" });
      },
    });
  };

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

          {activated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto mb-16 p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 text-center"
            >
              <BadgeCheck className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-black mb-2">Premium Activated!</h2>
              <p className="text-white/60 mb-1">Your Yek7Pay Premium membership is now active.</p>
              <p className="text-xs text-white/40">Transaction ID: {activated.paymentId}</p>
              <p className="text-xs text-green-400 mt-3 font-medium">Confirmation sent to your WhatsApp</p>
            </motion.div>
          )}

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
                onClick={() => setShowForm(true)}
              >
                <Crown className="h-6 w-6" /> Activate Premium <Zap className="h-6 w-6 fill-current" />
              </Button>
              
              <p className="mt-8 text-white/40 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Secure 256-bit Encrypted Payment via Razorpay
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
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-[110] bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-bold text-gray-700">Premium Membership — ₹999</span>
                </div>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-8">
                <p className="text-sm text-gray-500 mb-6">Enter your details to proceed to payment. Confirmation will be sent via WhatsApp.</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="pl-10 h-11 text-sm border-gray-300 text-gray-900 bg-white"
                        style={{ color: "#111827" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email (optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="pl-10 h-11 text-sm border-gray-300 text-gray-900 bg-white"
                        style={{ color: "#111827" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone (WhatsApp) *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="pl-10 h-11 text-sm border-gray-300 text-gray-900 bg-white"
                        style={{ color: "#111827" }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Confirmation receipt will be sent to this number</p>
                  </div>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-800">Premium Membership</p>
                    <p className="text-xs text-gray-500 mt-0.5">All services · Highest commissions</p>
                  </div>
                  <p className="text-2xl font-black text-amber-600">₹999</p>
                </div>

                <Button
                  onClick={handleActivate}
                  disabled={isLoading}
                  className="w-full h-12 text-sm font-black rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    <><Crown className="h-4 w-4" /> Pay ₹999 & Activate</>
                  )}
                </Button>

                <div className="flex items-center gap-2 text-xs text-gray-400 mt-4 justify-center">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                  Secured by Razorpay Payment Gateway
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
