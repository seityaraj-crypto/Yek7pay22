import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { Building2, Target, Eye, ShieldCheck, Zap, Globe, Landmark, CreditCard, QrCode, Smartphone, Briefcase, Plane, ClipboardCheck } from "lucide-react";
import { NetworkDots } from "@/components/network-dots";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b3b] via-[#0d0d2b] to-[#0a1a3a] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-screen z-0 opacity-30" style={{ maskImage: 'linear-gradient(to left, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 100%)' }}>
        <NetworkDots />
      </div>
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-24">
            <h1 className="text-5xl md:text-7xl font-display font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              About Us
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-medium">
              Empowering Growth through Digital Finance
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 border border-white/10 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400 mb-8">
                <Building2 className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <div className="space-y-6 text-lg text-white/60 leading-relaxed font-medium">
                <p>
                  Yek7Pay empowers Agents, Retailers, and Merchants with a complete suite of digital financial services, payment acceptance, and financial growth tools, designed to simplify operations and maximize profitability.
                </p>
                <p>
                  Our platform enables seamless Domestic Money Transfer (DMT) and Indo–Nepal Cross-Border Remittance, supported by AEPS, Micro ATM, and secure digital payment services that bring reliable digital finance to every corner of India.
                </p>
                <p>
                  For modern merchants, Yek7Pay delivers advanced payment acceptance solutions, including: mPOS (Card Acceptance) for debit & credit cards, UPI Payment Collection via Static QR & Soundbox, and Instant UPI alerts for faster customer checkout.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 shadow-xl group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-6 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Business Expansion</h3>
                </div>
                <p className="text-white/50 leading-relaxed">
                  To support business expansion, Yek7Pay also assists agents and merchants in accessing working capital and business loans, helping them increase cash flow, expand services, and grow faster with confidence.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 shadow-xl group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-6 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">All-in-One Ecosystem</h3>
                </div>
                <p className="text-white/50 leading-relaxed">
                  Beyond payments, our ecosystem extends to BBPS, Recharge services, and a full range of Travel Services — Flights, Buses, Trains, and Hotels, along with GST, ITR, and compliance solutions, making Yek7Pay a true all-in-one platform.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values / Summary */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center bg-white/5 backdrop-blur-xl rounded-[3rem] p-16 border border-white/10 shadow-2xl mb-24"
          >
            <p className="text-2xl md:text-3xl text-white/80 font-medium leading-relaxed mb-8 italic">
              "Built on secure infrastructure, high uptime, fast settlements, and transparent pricing, Yek7Pay is trusted by partners nationwide to deliver reliable services and sustainable growth."
            </p>
            <div className="text-xl font-bold text-purple-400">
              Yek7Pay is not just enabling transactions — it is enabling businesses to grow.
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Secure", desc: "Military-grade encryption for every transaction." },
              { icon: Zap, title: "Instant", desc: "Real-time settlements and instant notifications." },
              { icon: Globe, title: "Global", desc: "Seamless cross-border Indo-Nepal remittances." },
              { icon: Landmark, title: "Digital Payments", desc: "Complete suite of digital financial tools." }
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-blue-400">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
