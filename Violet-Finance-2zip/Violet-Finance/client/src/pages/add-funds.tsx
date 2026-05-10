import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import {
  Wallet, CreditCard, Smartphone, Building2,
  ShieldCheck, Zap, BadgeCheck, Loader2, IndianRupee, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRazorpay } from "@/hooks/use-razorpay";
import { useToast } from "@/hooks/use-toast";

const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000, 25000];

const paymentMethods = [
  { icon: Smartphone, label: "UPI", desc: "GPay, PhonePe, Paytm & more" },
  { icon: CreditCard, label: "Card", desc: "Debit & credit cards accepted" },
  { icon: Building2, label: "Net Banking", desc: "All major banks supported" },
  { icon: Wallet, label: "Wallet", desc: "Paytm, Mobikwik & more" },
];

export default function AddFunds() {
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState<{ paymentId: string; amount: string } | null>(null);
  const { initiatePayment, isLoading } = useRazorpay();
  const { toast } = useToast();

  const numericAmount = parseFloat(amount.replace(/,/g, ""));
  const isValid = !isNaN(numericAmount) && numericAmount >= 1 && numericAmount <= 500000;

  const handleQuick = (val: number) => setAmount(val.toLocaleString("en-IN"));

  const handlePay = () => {
    if (!isValid) {
      toast({ title: "Invalid amount", description: "Enter an amount between ₹1 and ₹5,00,000.", variant: "destructive" });
      return;
    }
    initiatePayment({
      amount: numericAmount,
      name: "Yek7Pay Solutions",
      description: `Add Funds — ₹${numericAmount.toLocaleString("en-IN")} to Yek7Pay Wallet`,
      prefill: {},
      onSuccess: (response) => {
        setSuccess({ paymentId: response.razorpay_payment_id, amount: numericAmount.toLocaleString("en-IN") });
        toast({ title: "Funds Added!", description: `₹${numericAmount.toLocaleString("en-IN")} added to your wallet.` });
        const msg = `*Yek7Pay Wallet — Funds Added* ✅\n\nAmount: ₹${numericAmount.toLocaleString("en-IN")}\nTransaction ID: ${response.razorpay_payment_id}\n\nYour wallet has been topped up successfully.\n\n_Yek7Pay Solutions Private Limited_`;
        window.open(`https://wa.me/919230967187?text=${encodeURIComponent(msg)}`, "_blank");
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
        <div className="container mx-auto px-4 max-w-xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black mb-4 uppercase tracking-widest">
              <Wallet className="h-3.5 w-3.5" /> Wallet Top-Up
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black leading-tight mb-3">
              Add <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">Funds</span>
            </h1>
            <p className="text-white/40 text-sm">Instantly top up your Yek7Pay wallet using UPI, card, or net banking.</p>
          </motion.div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-green-500/20 bg-green-500/8 p-8 text-center"
            >
              <BadgeCheck className="h-14 w-14 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-green-400 mb-1">₹{success.amount} Added!</h2>
              <p className="text-white/50 text-sm mb-2">Your wallet has been topped up successfully.</p>
              <p className="text-white/30 text-xs mb-6">Txn ID: {success.paymentId} · WhatsApp confirmation sent</p>
              <Button
                onClick={() => { setSuccess(null); setAmount(""); }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black h-11 px-8 rounded-xl"
              >
                <Plus className="h-4 w-4 mr-2" /> Add More Funds
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Amount Card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <label className="text-xs font-black uppercase tracking-widest text-white/50 mb-3 block">Enter Amount</label>
                <div className="relative mb-4">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400" />
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      setAmount(raw ? parseInt(raw, 10).toLocaleString("en-IN") : "");
                    }}
                    className="pl-11 h-14 text-2xl font-black bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-emerald-500/50 focus:ring-0"
                  />
                </div>

                {/* Quick amounts */}
                <div className="grid grid-cols-3 gap-2">
                  {QUICK_AMOUNTS.map((val) => (
                    <button
                      key={val}
                      onClick={() => handleQuick(val)}
                      className={`rounded-xl border py-2.5 text-sm font-bold transition-all ${
                        amount === val.toLocaleString("en-IN")
                          ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400"
                          : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      ₹{val.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-black uppercase tracking-widest text-white/50 mb-4">Payment Methods Accepted</p>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/8">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                        <m.icon className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{m.label}</p>
                        <p className="text-[10px] text-white/40">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pay Button */}
              <Button
                onClick={handlePay}
                disabled={!isValid || isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-base h-14 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading
                  ? <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</>
                  : <><Zap className="h-5 w-5 fill-current" /> Add {isValid ? `₹${numericAmount.toLocaleString("en-IN")}` : "Funds"} Now</>}
              </Button>

              {/* Security note */}
              <div className="flex items-center justify-center gap-2 text-center">
                <ShieldCheck className="h-3.5 w-3.5 text-green-400 shrink-0" />
                <span className="text-[11px] text-white/30 font-medium">256-bit encrypted · Secured by Razorpay · Instant credit</span>
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
