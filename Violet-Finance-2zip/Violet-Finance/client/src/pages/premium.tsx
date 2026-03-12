import { Navbar, Footer } from "@/components/layout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown, Zap, ShieldCheck, Send, Globe,
  CreditCard, Banknote, Building2,
  QrCode, Wallet, Briefcase, HeadphonesIcon, TrendingUp, Star,
  Phone, MessageCircle, User, Mail, X, Loader2, BadgeCheck, Check
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

const keyBenefits = ["All 8 Services Included", "Highest Commission Rates", "24/7 VIP Support", "Instant Activation"];

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
      prefill: { name: form.name, email: form.email, contact: form.phone },
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

      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4">

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black mb-4 uppercase tracking-widest">
              <Crown className="h-3.5 w-3.5" /> Premium Services
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black leading-tight">
              All-in-One <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400">Premium</span> Platform
            </h1>
          </motion.div>

          {/* ── Activate Premium Banner (TOP) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-14"
          >
            {activated ? (
              <div className="w-full rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/5 px-6 py-5 flex flex-col sm:flex-row items-center gap-4">
                <BadgeCheck className="h-8 w-8 text-green-400 shrink-0" />
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-base font-black text-green-400">Premium Activated!</p>
                  <p className="text-xs text-white/50 mt-0.5">Txn ID: {activated.paymentId} · Confirmation sent to WhatsApp</p>
                </div>
              </div>
            ) : (
              <div className="w-full rounded-2xl border border-amber-500/25 bg-gradient-to-r from-[#1a1200] via-[#1a1500] to-[#0f0f2a] relative overflow-hidden">
                {/* amber left accent */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-l-2xl" />

                <div className="flex flex-col lg:flex-row items-center gap-6 px-6 py-5 pl-8">
                  {/* Left – icon + title */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                      <Crown className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-400/70 mb-0.5">One-time Activation</p>
                      <p className="text-lg font-black leading-tight">Activate Premium Now</p>
                    </div>
                  </div>

                  {/* Center – benefit pills */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start flex-1">
                    {keyBenefits.map((b, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                        <Check className="h-3 w-3 text-amber-400" /> {b}
                      </span>
                    ))}
                  </div>

                  {/* Right – price + button */}
                  <div className="flex items-center gap-5 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-2xl font-black text-amber-400 leading-none">₹999</p>
                      <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider mt-0.5">One-time fee</p>
                    </div>
                    <Button
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-sm h-10 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap"
                    >
                      <Zap className="h-4 w-4 fill-current" /> Activate — ₹999
                    </Button>
                  </div>
                </div>

                {/* Security note */}
                <div className="border-t border-white/5 px-8 py-2 flex items-center gap-2">
                  <ShieldCheck className="h-3 w-3 text-green-400" />
                  <span className="text-[10px] text-white/30 font-medium">Secured by Razorpay · 256-bit encrypted · Instant activation</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {premiumServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-3 right-3">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {service.highlight}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all mb-3">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold mb-1.5">{service.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Why Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-display font-black text-center mb-10">
              Why Go <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-400">Premium</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyPremium.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mx-auto mb-4 shadow-md shadow-amber-500/20">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-sm font-bold mb-1.5">{item.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-xl mx-auto text-center"
          >
            <p className="text-white/40 text-sm mb-4">Need help? Talk to our expert.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+919230967187">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white h-11 rounded-xl font-bold px-5 text-sm flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Call +91 92309 67187
                </Button>
              </a>
              <a href="https://wa.me/919230967187?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Yek7Pay%20Premium%20services." target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white h-11 rounded-xl font-bold px-5 text-sm flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-green-400" /> WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Activation Form Modal */}
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
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
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

              <div className="p-7">
                <p className="text-sm text-gray-500 mb-5">Enter your details to proceed. Confirmation will be sent via WhatsApp.</p>

                <div className="space-y-4 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input type="text" placeholder="Your full name" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="pl-10 h-10 text-sm border-gray-200 text-gray-900 bg-white" style={{ color: "#111827" }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Email (optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input type="email" placeholder="your@email.com" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="pl-10 h-10 text-sm border-gray-200 text-gray-900 bg-white" style={{ color: "#111827" }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">WhatsApp Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input type="tel" placeholder="10-digit mobile number" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="pl-10 h-10 text-sm border-gray-200 text-gray-900 bg-white" style={{ color: "#111827" }} />
                    </div>
                  </div>
                </div>

                <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-800">Premium Membership</p>
                    <p className="text-xs text-gray-500 mt-0.5">All 8 services · Highest commissions · Instant access</p>
                  </div>
                  <p className="text-2xl font-black text-amber-600">₹999</p>
                </div>

                <Button onClick={handleActivate} disabled={isLoading}
                  className="w-full h-11 text-sm font-black rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black shadow-md flex items-center justify-center gap-2">
                  {isLoading
                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                    : <><Crown className="h-4 w-4" /> Pay ₹999 &amp; Activate</>}
                </Button>

                <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 justify-center">
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
