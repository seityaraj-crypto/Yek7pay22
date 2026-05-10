import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import {
  Wallet, ShieldCheck, Zap, BadgeCheck, Loader2, Upload, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  userId: string;
  fullName: string;
  utr: string;
  receipt: File | null;
  remarks: string;
}

const INITIAL: FormData = {
  userId: "",
  fullName: "",
  utr: "",
  receipt: null,
  remarks: "",
};

export default function AddFunds() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const set = (key: keyof FormData, value: string | File | null) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const allowed = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowed.includes(file.type)) {
        toast({ title: "Invalid file", description: "Only JPG, PNG, or PDF allowed.", variant: "destructive" });
        return;
      }
      set("receipt", file);
    }
  };

  const handleSubmit = async () => {
    if (!form.userId.trim()) {
      toast({ title: "Required", description: "Please enter your Yek7Pay User ID.", variant: "destructive" });
      return;
    }
    if (!form.fullName.trim()) {
      toast({ title: "Required", description: "Please enter your full name.", variant: "destructive" });
      return;
    }
    if (!form.utr.trim()) {
      toast({ title: "Required", description: "Please enter the UTR / Bank Reference number.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setSubmitted(true);

    const msg =
      `*Yek7Pay — Add Funds Request* 💰\n\n` +
      `User ID: ${form.userId}\n` +
      `Full Name: ${form.fullName}\n` +
      `UTR / Ref: ${form.utr}\n` +
      (form.remarks ? `Remarks: ${form.remarks}\n` : "") +
      `\n_Yek7Pay Solutions Private Limited_`;
    window.open(`https://wa.me/919230967187?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0a0a2e] text-white">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4 max-w-lg">

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
            <p className="text-white/40 text-sm">Fill in the details below and our team will credit your wallet shortly.</p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-green-500/20 bg-green-500/8 p-10 text-center"
            >
              <BadgeCheck className="h-14 w-14 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-green-400 mb-2">Request Submitted!</h2>
              <p className="text-white/50 text-sm mb-1">Your fund addition request has been sent.</p>
              <p className="text-white/30 text-xs mb-6">Our team will verify and credit your wallet within a few minutes. A WhatsApp message has been sent to our support team.</p>
              <Button
                onClick={() => { setSubmitted(false); setForm(INITIAL); }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black h-11 px-8 rounded-xl"
              >
                Submit Another Request
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5"
            >

              {/* 1. User ID */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-white/50 mb-1.5 block">
                  Yek7Pay User ID <span className="text-red-400">*</span>
                </label>
                <Input
                  value={form.userId}
                  onChange={(e) => set("userId", e.target.value)}
                  placeholder="e.g. YEK-00123"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-xl h-11 focus:border-emerald-500/50 focus:ring-0"
                />
              </div>

              {/* 2. Full Name */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-white/50 mb-1.5 block">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <Input
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  placeholder="As per bank account"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-xl h-11 focus:border-emerald-500/50 focus:ring-0"
                />
              </div>

              {/* 3. UTR */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-white/50 mb-1.5 block">
                  UTR / Bank Reference <span className="text-red-400">*</span>
                </label>
                <Input
                  value={form.utr}
                  onChange={(e) => set("utr", e.target.value)}
                  placeholder="12-digit UTR or reference number"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-xl h-11 focus:border-emerald-500/50 focus:ring-0"
                />
              </div>

              {/* 4. Receipt Upload */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-white/50 mb-1.5 block">
                  Upload Receipt <span className="text-white/30 font-medium normal-case tracking-normal">(Optional · JPG, PNG, PDF)</span>
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={handleFile}
                />
                {form.receipt ? (
                  <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                    <Upload className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-emerald-400 font-medium flex-1 truncate">{form.receipt.name}</span>
                    <button onClick={() => { set("receipt", null); if (fileRef.current) fileRef.current.value = ""; }}>
                      <X className="h-4 w-4 text-white/40 hover:text-white transition-colors" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="w-full flex items-center gap-3 bg-white/5 border border-dashed border-white/15 rounded-xl px-4 py-4 text-white/40 hover:bg-white/8 hover:border-white/25 hover:text-white/60 transition-all"
                  >
                    <Upload className="h-5 w-5 shrink-0" />
                    <span className="text-sm">Click to upload payment receipt</span>
                  </button>
                )}
              </div>

              {/* 5. Remarks */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-white/50 mb-1.5 block">
                  Branch Name or Remarks <span className="text-white/30 font-medium normal-case tracking-normal">(Optional)</span>
                </label>
                <Textarea
                  value={form.remarks}
                  onChange={(e) => set("remarks", e.target.value)}
                  placeholder="e.g. SBI Main Branch, Mumbai — or any additional info"
                  rows={3}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-xl resize-none focus:border-emerald-500/50 focus:ring-0"
                />
              </div>

              {/* 6. Submit */}
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-base h-14 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading
                  ? <><Loader2 className="h-5 w-5 animate-spin" /> Submitting...</>
                  : <><Zap className="h-5 w-5 fill-current" /> Add Funds Now</>}
              </Button>

              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-green-400 shrink-0" />
                <span className="text-[11px] text-white/30 font-medium">Your details are safe · Verified by Yek7Pay team</span>
              </div>

            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
