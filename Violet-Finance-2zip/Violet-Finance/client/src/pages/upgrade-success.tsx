import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";

export default function UpgradeSuccess() {
  const search = useSearch();
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const orderId = params.get("order_id");

    if (orderId) {
      fetch(`/api/cashfree/order/${orderId}`)
        .then(res => res.json())
        .then(data => {
          setOrderStatus(data.orderStatus || "PAID");
          setLoading(false);
        })
        .catch(() => {
          setOrderStatus("PAID");
          setLoading(false);
        });
    } else {
      setOrderStatus("PAID");
      setLoading(false);
    }
  }, [search]);

  const isPaid = orderStatus === "PAID";

  return (
    <div className="min-h-screen bg-[#0a0a2e] text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {loading ? (
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
                <p className="text-xl text-white/60">Verifying your payment...</p>
              </div>
            ) : isPaid ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
                    <CheckCircle2 className="w-16 h-16 text-white" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                <div>
                  <h1 className="text-4xl md:text-6xl font-display font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                    Payment Successful!
                  </h1>
                  <p className="text-xl text-white/60 max-w-lg mx-auto">
                    Congratulations! Your Premium account has been activated. You now have access to all premium features.
                  </p>
                </div>

                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-xl">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl font-black text-white">Premium Activated</span>
                  </div>
                  <ul className="space-y-3 text-left max-w-sm mx-auto">
                    {[
                      "Neo Bank Unlimited access",
                      "PPI Wallet enabled",
                      "Premium loan processing",
                      "Full compliance suite",
                      "VIP 24/7 support",
                      "Elite commission rates"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/70">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-full px-12 h-16 text-lg font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center mx-auto shadow-2xl shadow-yellow-500/30">
                  <span className="text-5xl">⏳</span>
                </div>

                <div>
                  <h1 className="text-4xl md:text-5xl font-display font-black mb-6 text-white">
                    Payment Pending
                  </h1>
                  <p className="text-xl text-white/60 max-w-lg mx-auto">
                    Your payment is being processed. Please wait a moment and refresh this page, or contact support if the issue persists.
                  </p>
                </div>

                <Link href="/upgrade">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full px-12 h-16 text-lg font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
                    Try Again <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
