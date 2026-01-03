import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { Receipt, Zap, Droplets, Flame, Wifi, Tv, Smartphone, CreditCard, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const bbpsServices = [
  { title: "MSPDCL", icon: Zap, desc: "Manipur Electricity - Direct bill payment for MSPDCL customers.", color: "text-yellow-500", bgColor: "bg-yellow-500/10", url: "https://billing.mspdcl.info" },
  { title: "Electricity", icon: Zap, desc: "Pay all state board electricity bills instantly.", color: "text-yellow-400", bgColor: "bg-yellow-400/10" },
  { title: "Water Bill", icon: Droplets, desc: "Seamless payment for municipal water connections.", color: "text-blue-400", bgColor: "bg-blue-400/10" },
  { title: "LPG Gas", icon: Flame, desc: "Book and pay for gas cylinders from your home.", color: "text-orange-400", bgColor: "bg-orange-400/10" },
  { title: "Broadband", icon: Wifi, desc: "High-speed internet bill payments for all ISPs.", color: "text-indigo-400", bgColor: "bg-indigo-400/10" },
  { title: "DTH / TV", icon: Tv, desc: "Quick recharges for all major DTH providers.", color: "text-rose-400", bgColor: "bg-rose-400/10" },
  { title: "Mobile Postpaid", icon: Smartphone, desc: "Clear your mobile bills with zero convenience fees.", color: "text-emerald-400", bgColor: "bg-emerald-400/10" },
  { title: "Fastag", icon: CreditCard, desc: "Instant Fastag recharges for smooth highway travel.", color: "text-cyan-400", bgColor: "bg-cyan-400/10" },
  { title: "Insurance", icon: Receipt, desc: "Pay life and health insurance premiums easily.", color: "text-blue-500", bgColor: "bg-blue-500/10" }
];

export default function BharatConnect() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b3b] via-[#0d0d2b] to-[#0a1a3a] text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-24">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-white/60 hover:text-white hover:bg-white/5 gap-2 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <div className="inline-block p-3 rounded-2xl bg-violet-500/10 text-violet-400 mb-6 border border-violet-500/20">
              <Receipt className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500">
              Bharat Connect (BBPS)
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Your one-stop destination for all utility bill payments and recharges. Fast, secure, and always reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bbpsServices.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, translateY: -10 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card 
                  className="h-full bg-white/5 border-white/10 hover:border-violet-500/50 transition-all backdrop-blur-xl group cursor-pointer"
                  onClick={() => {
                    if (service.url) {
                      window.open(service.url, '_blank');
                    }
                  }}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-2xl ${service.bgColor} flex items-center justify-center ${service.color} mb-4 group-hover:scale-110 transition-transform shadow-lg border border-white/5`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-white text-lg font-bold">{service.title}</CardTitle>
                    <CardDescription className="text-white/40 text-xs">{service.desc}</CardDescription>
                  </CardHeader>
                  <div className="px-6 pb-6">
                    <Button 
                      className="w-full bg-white/5 hover:bg-violet-500 text-white border-white/10 rounded-xl text-xs font-bold transition-all"
                      onClick={(e) => {
                        if (service.url) {
                          e.stopPropagation();
                          window.open(service.url, '_blank');
                        }
                      }}
                    >
                      Pay Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">Why Pay via Bharat Connect?</h3>
                <p className="text-white/50">Experience the benefits of NPCI's official bill payment system.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-auto">
                {["Official NPCI Partner", "Instant Confirmation", "Secure & Encrypted"].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-white/70 bg-white/5 px-4 py-3 rounded-2xl border border-white/5">
                    <CheckCircle2 className="h-5 w-5 text-green-500" /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
