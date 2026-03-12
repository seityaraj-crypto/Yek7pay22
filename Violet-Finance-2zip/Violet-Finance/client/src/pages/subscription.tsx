import { Navbar, Footer } from "@/components/layout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown, Zap, ShieldCheck, Check, Star, Phone, MessageCircle,
  Loader2, User, Mail, X, ArrowRight, BadgeCheck, Sparkles, Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRazorpaySubscription } from "@/hooks/use-razorpay-subscription";
import { useToast } from "@/hooks/use-toast";

type Billing = "monthly" | "yearly";

interface Plan {
  key: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  color: string;
  highlight: boolean;
  badge?: string;
  features: string[];
  icon: React.ElementType;
}

const plans: Plan[] = [
  {
    key: "basic",
    name: "Basic",
    monthlyPrice: 999,
    yearlyPrice: 9999,
    description: "Perfect for individual agents just starting out",
    color: "from-blue-500 to-blue-700",
    highlight: false,
    icon: Zap,
    features: [
      "Domestic Money Transfer (DMT)",
      "UPI QR Code Payments",
      "Cash Withdrawal (AEPS)",
      "Basic Dashboard & Reports",
      "Email & Chat Support",
      "Up to ₹1L daily transaction limit",
      "Standard commission rates",
    ],
  },
  {
    key: "professional",
    name: "Professional",
    monthlyPrice: 1999,
    yearlyPrice: 19999,
    description: "For growing agents and small businesses",
    color: "from-amber-500 to-yellow-500",
    highlight: true,
    badge: "Most Popular",
    icon: Crown,
    features: [
      "Everything in Basic",
      "Indo-Nepal Remittance",
      "mPOS Card Acceptance",
      "PPI Digital Wallet",
      "Business Loans Access",
      "Priority 24/7 Support",
      "Up to ₹5L daily limit",
      "Higher commission slabs",
      "Advanced analytics dashboard",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    monthlyPrice: 4999,
    yearlyPrice: 49999,
    description: "For high-volume merchants & distributors",
    color: "from-purple-500 to-violet-700",
    highlight: false,
    badge: "Best Value",
    icon: Building2,
    features: [
      "Everything in Professional",
      "Unlimited daily limits",
      "GST & Compliance Suite",
      "Insurance Services",
      "Dedicated Account Manager",
      "White-label dashboard",
      "Custom API integrations",
      "Highest commission rates",
      "SLA-backed uptime guarantee",
      "Multi-branch management",
    ],
  },
];

interface CustomerForm {
  name: string;
  email: string;
  phone: string;
}

export default function Subscription() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [form, setForm] = useState<CustomerForm>({ name: "", email: "", phone: "" });
  const [subscribed, setSubscribed] = useState<{ planName: string; paymentId: string } | null>(null);
  const { initiateSubscription, isLoading } = useRazorpaySubscription();
  const { toast } = useToast();

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = () => {
    if (!form.name.trim()) {
      toast({ title: "Name required", description: "Please enter your full name.", variant: "destructive" });
      return;
    }
    if (!form.phone.trim()) {
      toast({ title: "Phone required", description: "Please enter your phone number.", variant: "destructive" });
      return;
    }

    const planKey = `${selectedPlan!.key}-${billing}`;

    initiateSubscription({
      planKey,
      name: "Yek7Pay Solutions",
      description: `${selectedPlan!.name} Plan — ${billing === "monthly" ? "Monthly" : "Annual"} Subscription`,
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      onSuccess: (response) => {
        setSubscribed({ planName: selectedPlan!.name, paymentId: response.razorpay_payment_id });
        setSelectedPlan(null);
        toast({
          title: "Subscription Activated!",
          description: `Your ${selectedPlan!.name} plan is now active.`,
        });

        const msg = `*Yek7Pay Subscription Activated* 🎉\n\nPlan: ${selectedPlan!.name} (${billing === "monthly" ? "Monthly" : "Annual"})\nName: ${form.name}\nPhone: ${form.phone}\nTransaction ID: ${response.razorpay_payment_id}\n\nThank you for choosing Yek7Pay!\n\n_Yek7Pay Solutions Private Limited_`;
        const waUrl = `https://api.whatsapp.com/send?phone=91${form.phone.replace(/\D/g, "")}&text=${encodeURIComponent(msg)}`;
        window.open(waUrl, "_blank");
      },
      onError: (err) => {
        toast({ title: "Subscription Failed", description: err.message, variant: "destructive" });
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a2e] text-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-black mb-6 uppercase tracking-widest">
              <Sparkles className="h-4 w-4" /> Subscription Plans
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight">
              Choose Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400">Plan</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
              Start with any plan and scale as your business grows. Cancel anytime.
            </p>

            <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/10">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${billing === "monthly" ? "bg-amber-500 text-black shadow-lg" : "text-white/60 hover:text-white"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billing === "yearly" ? "bg-amber-500 text-black shadow-lg" : "text-white/60 hover:text-white"}`}
              >
                Annual <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/20">SAVE 2 MONTHS</span>
              </button>
            </div>
          </motion.div>

          {subscribed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto mb-16 p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 text-center"
            >
              <BadgeCheck className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-black mb-2">You're Subscribed!</h2>
              <p className="text-white/60 mb-1">{subscribed.planName} Plan is now active</p>
              <p className="text-xs text-white/40">Transaction ID: {subscribed.paymentId}</p>
              <p className="text-xs text-green-400 mt-3 font-medium">Invoice sent to your WhatsApp</p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, i) => {
              const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
              const PlanIcon = plan.icon;
              return (
                <motion.div
                  key={plan.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-[2rem] border transition-all flex flex-col ${
                    plan.highlight
                      ? "bg-gradient-to-b from-amber-500/10 via-yellow-500/5 to-transparent border-amber-500/30 shadow-2xl shadow-amber-500/10 scale-105"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r ${plan.color} text-white shadow-lg`}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-8 flex-1">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <PlanIcon className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="text-2xl font-black mb-1">{plan.name}</h3>
                    <p className="text-white/40 text-sm mb-6">{plan.description}</p>

                    <div className="mb-8">
                      <span className="text-5xl font-black">₹{price.toLocaleString("en-IN")}</span>
                      <span className="text-white/40 text-sm ml-2">/ {billing === "monthly" ? "month" : "year"}</span>
                      {billing === "yearly" && (
                        <p className="text-xs text-green-400 font-bold mt-1">
                          ₹{Math.round(price / 12).toLocaleString("en-IN")}/mo — 2 months free!
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-sm text-white/70">
                          <Check className={`h-4 w-4 mt-0.5 shrink-0 ${plan.highlight ? "text-amber-400" : "text-blue-400"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-8 pb-8">
                    <Button
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full h-12 text-sm font-black rounded-2xl transition-all hover:scale-105 active:scale-95 ${
                        plan.highlight
                          ? "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-lg shadow-amber-500/20"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                      }`}
                    >
                      Get Started <ArrowRight className="h-4 w-4 ml-1 inline" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-white/40 text-sm mb-4">Need a custom plan for your business?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919230967187">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white h-12 rounded-2xl font-bold px-6 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Call +91 92309 67187
                </Button>
              </a>
              <a href="https://wa.me/919230967187?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Yek7Pay%20subscription%20plans." target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white h-12 rounded-2xl font-bold px-6 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-green-400" /> WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedPlan(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-[110] bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b">
                <span className="text-sm font-bold text-gray-700">Activate {selectedPlan.name} Plan</span>
                <button onClick={() => setSelectedPlan(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-8">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${selectedPlan.color} text-white text-sm font-bold mb-6`}>
                  <selectedPlan.icon className="h-4 w-4" />
                  {selectedPlan.name} — {billing === "monthly" ? "Monthly" : "Annual"}
                </div>

                <div className="text-3xl font-black text-gray-900 mb-1">
                  ₹{(billing === "monthly" ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice).toLocaleString("en-IN")}
                  <span className="text-base font-medium text-gray-500 ml-2">/{billing === "monthly" ? "month" : "year"}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">{selectedPlan.description}</p>

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
                    <p className="text-xs text-gray-400 mt-1">Subscription confirmation sent to this WhatsApp</p>
                  </div>
                </div>

                <Button
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  className="w-full h-12 text-sm font-black rounded-xl bg-amber-500 hover:bg-amber-400 text-black shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    <><Crown className="h-4 w-4" /> Subscribe Now</>
                  )}
                </Button>

                <div className="flex items-center gap-2 text-xs text-gray-400 mt-4 justify-center">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                  Secured by Razorpay · Cancel anytime
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
