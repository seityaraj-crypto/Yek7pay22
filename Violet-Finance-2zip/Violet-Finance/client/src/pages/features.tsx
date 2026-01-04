import { Navbar, Footer } from "@/components/layout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Banknote, CreditCard, Smartphone, QrCode, Wallet, Building2, 
  Globe, FileText, Shield, Plane, Train, TrendingUp, Users, Zap, 
  CheckCircle2, ArrowRight, Star, Award, Clock, HeadphonesIcon, X, Sparkles,
  Crown, Phone, Mail, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Features() {
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [promoCount, setPromoCount] = useState(0);
  const [activeVipCard, setActiveVipCard] = useState<number | null>(null);

  const vipBenefits = [
    { 
      icon: TrendingUp, 
      title: "Higher Commissions", 
      desc: "Earn up to 3x more",
      features: [
        "Up to 3x higher commission rates on all services",
        "Special bonus payouts on monthly targets",
        "Additional incentives on new agent onboarding",
        "Quarterly performance rewards",
        "Early access to new high-margin products"
      ]
    },
    { 
      icon: Users, 
      title: "Build Your Network", 
      desc: "Onboard sub-agents",
      features: [
        "Onboard unlimited sub-agents under your network",
        "Earn override commissions on sub-agent transactions",
        "Dedicated recruitment support & training materials",
        "Territory exclusivity options available",
        "Network performance dashboard & analytics"
      ]
    },
    { 
      icon: HeadphonesIcon, 
      title: "Priority Support", 
      desc: "Dedicated manager",
      features: [
        "Dedicated relationship manager assigned",
        "Priority 24/7 WhatsApp & call support",
        "Faster issue resolution (< 2 hours SLA)",
        "Direct escalation to senior management",
        "Monthly business review calls"
      ]
    },
    { 
      icon: Award, 
      title: "Exclusive Benefits", 
      desc: "VIP perks & rewards",
      features: [
        "VIP badge & certification for your business",
        "Featured listing on Yek7Pay partner directory",
        "Exclusive invites to annual partner summit",
        "Early access to new products & features",
        "Special financing options for business expansion"
      ]
    }
  ];

  useEffect(() => {
    if (promoCount >= 3) return;

    const timer = setTimeout(() => {
      setShowPromoPopup(true);
      setPromoCount(prev => prev + 1);
    }, 50000);

    return () => clearTimeout(timer);
  }, [promoCount, showPromoPopup]);

  useEffect(() => {
    if (showPromoPopup) {
      const hideTimer = setTimeout(() => {
        setShowPromoPopup(false);
      }, 4000);
      return () => clearTimeout(hideTimer);
    }
  }, [showPromoPopup]);
  const services = [
    {
      icon: Banknote,
      title: "Neo Bank Unlimited",
      tagline: "Zero Limits, Maximum Growth",
      description: "Send unlimited money daily with instant settlements. No daily caps, no restrictions - just seamless transactions for your growing business.",
      features: ["Unlimited Daily Transfers", "T+0 Instant Settlement", "Zero Hidden Charges", "Pan-India Coverage"],
      gradient: "from-blue-500 to-purple-600",
      highlight: true
    },
    {
      icon: Globe,
      title: "Indo-Nepal Remittance",
      tagline: "Cross-Border Made Simple",
      description: "Fast and secure money transfers to Nepal with real-time exchange rates and instant delivery to beneficiaries.",
      features: ["Real-Time Exchange Rates", "Instant Delivery", "RBI Authorized", "24/7 Service"],
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: CreditCard,
      title: "AEPS Services",
      tagline: "Banking at Doorstep",
      description: "Offer Aadhaar-enabled payment services including cash withdrawal, balance enquiry, and mini statements using biometrics.",
      features: ["Cash Withdrawal", "Balance Enquiry", "Mini Statement", "Aadhaar Pay"],
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Smartphone,
      title: "Micro ATM",
      tagline: "Your Pocket ATM",
      description: "Convert any location into a banking point with portable Micro ATM device. Earn on every transaction.",
      features: ["Portable Device", "All Bank Cards", "High Commission", "Quick Setup"],
      gradient: "from-pink-500 to-rose-600",
      comingSoon: true
    },
    {
      icon: QrCode,
      title: "UPI QR & Soundbox",
      tagline: "Accept Payments Instantly",
      description: "Accept UPI payments with branded QR codes and get instant voice alerts with our smart soundbox device.",
      features: ["Instant Payments", "Voice Alerts", "Settlement in Minutes", "Multi-Language"],
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: Wallet,
      title: "PPI Wallet",
      tagline: "Digital Wallet Solutions",
      description: "Issue prepaid wallets to your customers for easy payments and top-ups. Earn on every wallet transaction.",
      features: ["Easy Top-Up", "Bill Payments", "Money Transfer", "Rewards Points"],
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: Building2,
      title: "Business Loans",
      tagline: "Fuel Your Growth",
      description: "Quick business loans with minimal documentation. Get funds within 24 hours to expand your operations.",
      features: ["24hr Disbursement", "Minimal Docs", "Flexible Tenure", "Competitive Rates"],
      gradient: "from-amber-500 to-orange-600"
    },
    {
      icon: FileText,
      title: "GST & Compliance",
      tagline: "Complete Tax Solutions",
      description: "GST registration, filing, ITR, and complete compliance services for hassle-free business operations.",
      features: ["GST Registration", "Monthly Filing", "ITR Filing", "Audit Support"],
      gradient: "from-emerald-500 to-green-600"
    },
    {
      icon: Plane,
      title: "Travel Booking",
      tagline: "Flights & Hotels",
      description: "Book domestic and international flights, hotels with instant confirmation and earn commission on every booking.",
      features: ["All Airlines", "Best Prices", "Instant Confirmation", "High Commission"],
      gradient: "from-sky-500 to-blue-600"
    },
    {
      icon: Train,
      title: "IRCTC Rail Booking",
      tagline: "Train Tickets Made Easy",
      description: "Book train tickets across India with instant confirmation. Tatkal and general bookings available.",
      features: ["Tatkal Booking", "Pan-India Trains", "E-Tickets", "Quick Refunds"],
      gradient: "from-red-500 to-pink-600"
    }
  ];

  const whyChooseUs = [
    { icon: TrendingUp, title: "Earn ₹1 Lakh+ Monthly", desc: "High commission rates on all services" },
    { icon: Users, title: "100,000+ Partners", desc: "Join India's largest fintech network" },
    { icon: Shield, title: "100% Secure", desc: "Bank-grade security & RBI compliant" },
    { icon: Zap, title: "Instant Settlement", desc: "Get your money in minutes, not days" },
    { icon: HeadphonesIcon, title: "24/7 Support", desc: "Dedicated support whenever you need" },
    { icon: Award, title: "Best Commission", desc: "Highest payouts in the industry" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a2e] text-white">
      <AnimatePresence>
        {showPromoPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-2xl shadow-purple-500/40 border border-white/20">
              <button 
                onClick={() => setShowPromoPopup(false)}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                <span className="text-lg font-bold text-white">India's Leading Fintech Platform</span>
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />
      
      <main className="pt-24 pb-24">
        <div className="container mx-auto px-4">
          <Link href="/">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </motion.button>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
              <Star className="w-4 h-4" />
              All-in-One Fintech Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black mb-6">
              Explore Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Features</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Everything you need to transform your retail business into a profitable fintech service center. 
              Join 100,000+ merchants earning big with Yek7Pay.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative p-6 rounded-3xl bg-white/5 border transition-all duration-300 hover:scale-[1.02] group ${
                  service.highlight 
                    ? 'border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-purple-600/10' 
                    : service.comingSoon
                    ? 'border-amber-500/30 bg-gradient-to-br from-amber-600/10 to-orange-600/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {service.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                {service.comingSoon && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold uppercase tracking-wider animate-pulse shadow-lg shadow-orange-500/30">
                    Coming Soon
                  </div>
                )}
                
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                <p className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${service.gradient} mb-3`}>
                  {service.tagline}
                </p>
                <p className="text-white/50 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 rounded-[3rem] blur-3xl" />
            <div className="relative p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-amber-900/40 via-yellow-900/30 to-amber-900/40 border-2 border-amber-500/40 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Crown className="w-10 h-10 text-yellow-400 animate-pulse" />
                  <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-sm font-black uppercase tracking-wider">
                    VIP Services
                  </div>
                  <Crown className="w-10 h-10 text-yellow-400 animate-pulse" />
                </div>
                
                <h2 className="text-3xl md:text-5xl font-display font-black text-center mb-4">
                  Become a <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300">Franchise or Distributor</span>
                </h2>
                <p className="text-xl text-amber-100/70 text-center max-w-3xl mx-auto mb-10">
                  Take your business to the next level! Partner with Yek7Pay as a Franchise or Distributor and unlock exclusive benefits, higher commissions, and priority support.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                  {vipBenefits.map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveVipCard(i)}
                      className="p-4 rounded-2xl bg-white/5 border border-amber-500/20 text-center hover:bg-white/10 transition-all cursor-pointer hover:scale-105 hover:border-yellow-400/50 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/30 to-amber-500/30 flex items-center justify-center mx-auto mb-3 group-hover:from-yellow-500/50 group-hover:to-amber-500/50 transition-all">
                        <item.icon className="w-6 h-6 text-yellow-400" />
                      </div>
                      <h4 className="font-bold text-amber-100">{item.title}</h4>
                      <p className="text-sm text-amber-200/50">{item.desc}</p>
                      <p className="text-xs text-yellow-400/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click for details</p>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {activeVipCard !== null && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                      onClick={() => setActiveVipCard(null)}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-gradient-to-br from-amber-900/90 via-yellow-900/80 to-amber-900/90 border-2 border-amber-500/50 rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button 
                          onClick={() => setActiveVipCard(null)}
                          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                            {(() => {
                              const IconComponent = vipBenefits[activeVipCard].icon;
                              return <IconComponent className="w-8 h-8 text-white" />;
                            })()}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{vipBenefits[activeVipCard].title}</h3>
                            <p className="text-amber-200/70">{vipBenefits[activeVipCard].desc}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          {vipBenefits[activeVipCard].features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                              <span className="text-amber-100/90">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-3">
                          <a 
                            href="tel:+919230967189" 
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all font-bold"
                          >
                            <Phone className="w-4 h-4" />
                            Call Now
                          </a>
                          <a 
                            href="https://wa.me/919230967189?text=Hi%2C%20I%20am%20interested%20in%20Yek7Pay%20VIP%20partnership" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 transition-all font-bold"
                          >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </a>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center">
                  <p className="text-lg text-amber-100/80 mb-6 font-medium">Contact us for VIP Partnership</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="tel:+919230967189" className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all hover:scale-105 shadow-lg shadow-green-500/30">
                      <Phone className="w-5 h-5" />
                      <span className="font-bold">+91 92309 67189</span>
                    </a>
                    <a href="tel:+919230967187" className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all hover:scale-105 shadow-lg shadow-green-500/30">
                      <Phone className="w-5 h-5" />
                      <span className="font-bold">+91 92309 67187</span>
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
                    <a href="mailto:info@yek7pay.com?subject=VIP%20Franchise%20Enquiry" className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all hover:scale-105 shadow-lg shadow-blue-500/30">
                      <Mail className="w-5 h-5" />
                      <span className="font-bold">info@yek7pay.com</span>
                    </a>
                    <a href="https://wa.me/919230967189?text=Hi%2C%20I%20am%20interested%20in%20Yek7Pay%20VIP%20Franchise%2FDistributor%20partnership" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 transition-all hover:scale-105 shadow-lg shadow-emerald-500/30">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-bold">WhatsApp Us</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-center mb-12">
              Why <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Yek7Pay?</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex items-start gap-4 hover:bg-white/10 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-black mb-6">
                Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">Boost Your Business?</span>
              </h2>
              <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                Join 100,000+ merchants already earning with Yek7Pay. Start your fintech journey today with zero investment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/new-account">
                  <Button className="h-16 px-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white rounded-full text-lg font-bold shadow-2xl shadow-purple-500/30 transition-all hover:scale-105">
                    Open Free Account
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="https://wa.me/919230967187?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Yek7Pay%20services" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="h-16 px-10 rounded-full border-white/20 hover:bg-white/10 text-lg font-bold">
                    Chat with Us
                  </Button>
                </a>
              </div>

              <div className="mt-10 flex items-center justify-center gap-8 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Quick Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Instant Activation</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-12 text-center">
            <Link href="/">
              <Button variant="ghost" className="text-white/60 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
