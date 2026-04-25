import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import {
  Crown, Zap, ShieldCheck, Send, Globe,
  CreditCard, Banknote, Building2,
  QrCode, Wallet, Briefcase, HeadphonesIcon, TrendingUp, Star,
  Phone, MessageCircle, Loader2, BadgeCheck, Check, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRazorpaySubscription } from "@/hooks/use-razorpay-subscription";
import { useRazorpay } from "@/hooks/use-razorpay";
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

const plans = [
  {
    id: "starter",
    badge: "Starter",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    accentColor: "from-blue-500 to-cyan-400",
    buttonColor: "from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 shadow-blue-500/20",
    borderColor: "border-blue-500/20",
    price: "₹999",
    period: "/yr",
    label: "Shops & Very Small Business",
    description: "Perfect for kirana stores, small retailers, and individual shop owners who need simple GST compliance.",
    features: [
      "1 Year GST Filing (Normal Scheme)",
      "GST Registration Support",
      "Quarterly Return Filing (GSTR-1 & 3B)",
      "All Yek7Pay Financial Services",
      "Priority Customer Support",
    ],
    highlight: false,
    mode: "subscription",
  },
  {
    id: "msme",
    badge: "Most Popular",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    accentColor: "from-amber-500 to-yellow-400",
    buttonColor: "from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 shadow-amber-500/20",
    borderColor: "border-amber-500/30",
    price: "₹5,000",
    period: "/yr",
    label: "MSME & Transaction Business",
    description: "Ideal for MSMEs, traders, and businesses with regular transactions needing full GST compliance.",
    features: [
      "1 Year GST Filing (MSME Scheme)",
      "MSME Registration & Udyam Certificate",
      "Monthly Return Filing (GSTR-1, 3B, 2A Reconciliation)",
      "E-Invoice & E-Way Bill Support",
      "All Yek7Pay Financial Services",
      "Dedicated Account Manager",
    ],
    highlight: true,
    mode: "order",
    amount: 5000,
  },
  {
    id: "corporate",
    badge: "Corporate",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    accentColor: "from-purple-500 to-pink-500",
    buttonColor: "from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 shadow-purple-500/20",
    borderColor: "border-purple-500/20",
    price: "₹15,000",
    period: "/yr",
    label: "Corporate & Large Business",
    description: "Comprehensive GST & compliance package for corporates, Pvt. Ltd. companies, and high-volume businesses.",
    features: [
      "1 Year GST Filing (Corporate Scheme)",
      "Full Annual Compliance Package",
      "Monthly GSTR-1, 3B, 9 & 9C Filing",
      "TDS/TCS Compliance",
      "Director & Payroll Compliance",
      "All Yek7Pay Financial Services",
      "VIP 24/7 Dedicated Support",
    ],
    highlight: false,
    mode: "order",
    amount: 15000,
  },
];

type ActivatedMap = Record<string, string>;

export default function Premium() {
  const [activated, setActivated] = useState<ActivatedMap>({});
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const { initiateSubscription } = useRazorpaySubscription();
  const { initiatePayment } = useRazorpay();
  const { toast } = useToast();

  const handleActivate = (plan: typeof plans[0]) => {
    setLoadingPlan(plan.id);

    const onSuccess = (response: any) => {
      const txnId = response.razorpay_payment_id || response.razorpay_subscription_id || "";
      setActivated((prev) => ({ ...prev, [plan.id]: txnId }));
      setLoadingPlan(null);
      toast({ title: `${plan.badge} Plan Activated!`, description: "Your plan is now active." });
      const msg = `*Yek7Pay ${plan.badge} Plan Activated* 🎉\n\nPlan: ${plan.label} — ${plan.price}/year\nTransaction ID: ${txnId}\n\nThank you for choosing Yek7Pay! Your GST filing plan is now active for 1 year.\n\n_Yek7Pay Solutions Private Limited_`;
      window.open(`https://wa.me/919230967187?text=${encodeURIComponent(msg)}`, "_blank");
    };

    const onError = (err: Error) => {
      setLoadingPlan(null);
      toast({ title: "Payment Failed", description: err.message, variant: "destructive" });
    };

    if (plan.mode === "subscription") {
      initiateSubscription({
        planId: PREMIUM_PLAN_ID,
        name: "Yek7Pay Solutions",
        description: `${plan.label} — ₹999/year`,
        prefill: {},
        onSuccess,
        onError,
      });
    } else {
      initiatePayment({
        amount: plan.amount,
        name: "Yek7Pay Solutions",
        description: `${plan.label} — ${plan.price}/year`,
        prefill: {},
        onSuccess,
        onError,
      });
    }
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
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black mb-4 uppercase tracking-widest">
              <Crown className="h-3.5 w-3.5" /> Premium Services
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black leading-tight mb-3">
              Choose Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400">Premium</span> Plan
            </h1>
            <p className="text-white/40 text-base max-w-xl mx-auto">
              All plans include 1 year of GST filing support + full access to Yek7Pay's financial services platform.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 mt-12"
          >
            {plans.map((plan, i) => {
              const isActivated = !!activated[plan.id];
              const isLoading = loadingPlan === plan.id;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className={`relative rounded-2xl border ${plan.borderColor} ${plan.highlight ? "bg-gradient-to-b from-amber-500/8 to-[#0a0a2e]" : "bg-white/5"} flex flex-col overflow-hidden`}
                >
                  {/* Top accent bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${plan.accentColor}`} />

                  {plan.highlight && (
                    <div className="absolute top-4 right-4">
                      <Sparkles className="h-4 w-4 text-amber-400 opacity-60" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    {/* Badge */}
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border mb-4 w-fit ${plan.badgeColor}`}>
                      {plan.badge}
                    </span>

                    {/* Price */}
                    <div className="mb-1">
                      <span className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${plan.accentColor}`}>
                        {plan.price}
                      </span>
                      <span className="text-white/40 text-sm font-medium">{plan.period}</span>
                    </div>
                    <p className="text-xs text-white/40 font-medium mb-1">1 Year Plan</p>
                    <h3 className="text-base font-bold text-white mb-2">{plan.label}</h3>
                    <p className="text-xs text-white/40 leading-relaxed mb-5">{plan.description}</p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-white/70">
                          <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 bg-clip-text`} style={{ color: plan.highlight ? "#f59e0b" : undefined }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    {isActivated ? (
                      <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                        <BadgeCheck className="h-4 w-4 text-green-400 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-green-400">Plan Activated!</p>
                          <p className="text-[10px] text-white/30 truncate">Txn: {activated[plan.id]}</p>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleActivate(plan)}
                        disabled={!!loadingPlan}
                        className={`w-full bg-gradient-to-r ${plan.buttonColor} text-black font-black text-sm h-11 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100`}
                      >
                        {isLoading
                          ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                          : <><Zap className="h-4 w-4 fill-current" /> Activate — {plan.price}</>}
                      </Button>
                    )}
                  </div>

                  {/* Security note */}
                  <div className="border-t border-white/5 px-6 py-2 flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3 text-green-400 shrink-0" />
                    <span className="text-[10px] text-white/25 font-medium">
                      {plan.mode === "subscription" ? "Auto-renews yearly · Cancel anytime" : "One-time payment · Secured by Razorpay"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
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
            <p className="text-white/40 text-sm mb-4">Need help choosing a plan? Talk to our expert.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+919230967187">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white h-11 rounded-xl font-bold px-5 text-sm flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Call +91 92309 67187
                </Button>
              </a>
              <a href="https://wa.me/919230967187?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Yek7Pay%20Premium%20plans." target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white h-11 rounded-xl font-bold px-5 text-sm flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-green-400" /> WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
