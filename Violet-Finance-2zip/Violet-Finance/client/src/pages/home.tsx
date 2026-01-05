import { Navbar, Footer } from "@/components/layout";
import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { SectionHeader } from "@/components/section-header";
import { AuthDialog } from "@/components/auth-dialog";
import { WelcomePopup } from "@/components/welcome-popup";
import { NetworkDots } from "@/components/network-dots";
import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Globe, Fingerprint, 
  Plane, Train, Briefcase, Building2, 
  Zap, Receipt, Landmark, Banknote, CreditCard,
  CheckCircle2, QrCode, Smartphone, Mail, Phone, MapPin,
  ShieldCheck, UserCheck, Coins, ArrowRight, ClipboardCheck, FileText, Scale, Building,
  Hotel, Bus, MessageCircle, Clock, X, AlertCircle, TabletSmartphone, Loader2,
  Crown, TrendingUp, Users, Award, HeadphonesIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const countryCodes = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+977", country: "Nepal", flag: "🇳🇵" },
  { code: "+1", country: "USA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+93", country: "Afghanistan", flag: "🇦🇫" },
  { code: "+355", country: "Albania", flag: "🇦🇱" },
  { code: "+213", country: "Algeria", flag: "🇩🇿" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+975", country: "Bhutan", flag: "🇧🇹" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+673", country: "Brunei", flag: "🇧🇳" },
  { code: "+855", country: "Cambodia", flag: "🇰🇭" },
  { code: "+237", country: "Cameroon", flag: "🇨🇲" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+30", country: "Greece", flag: "🇬🇷" },
  { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
  { code: "+36", country: "Hungary", flag: "🇭🇺" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+98", country: "Iran", flag: "🇮🇷" },
  { code: "+964", country: "Iraq", flag: "🇮🇶" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+972", country: "Israel", flag: "🇮🇱" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+962", country: "Jordan", flag: "🇯🇴" },
  { code: "+7", country: "Kazakhstan", flag: "🇰🇿" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
  { code: "+856", country: "Laos", flag: "🇱🇦" },
  { code: "+961", country: "Lebanon", flag: "🇱🇧" },
  { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
  { code: "+853", country: "Macau", flag: "🇲🇴" },
  { code: "+960", country: "Maldives", flag: "🇲🇻" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+212", country: "Morocco", flag: "🇲🇦" },
  { code: "+95", country: "Myanmar", flag: "🇲🇲" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+40", country: "Romania", flag: "🇷🇴" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+886", country: "Taiwan", flag: "🇹🇼" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦" },
  { code: "+598", country: "Uruguay", flag: "🇺🇾" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+967", country: "Yemen", flag: "🇾🇪" },
  { code: "+260", country: "Zambia", flag: "🇿🇲" },
  { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
];

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    service: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: data.message });
        setFormData({ name: "", countryCode: "+91", phone: "", email: "", service: "" });
      } else {
        setSubmitStatus({ success: false, message: data.error || "Something went wrong" });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: "Failed to submit. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitStatus && (
        <div className={`p-4 rounded-xl text-center ${submitStatus.success ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
          {submitStatus.message}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <div className="flex gap-2">
          <select 
            value={formData.countryCode}
            onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
            className="px-3 py-3 bg-[#1a1a3e] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors min-w-[120px]"
          >
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code} className="bg-[#1a1a3e] text-white">
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          <input 
            type="tel" 
            placeholder="Phone Number" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="email" 
          placeholder="Email Address" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <select 
          value={formData.service}
          onChange={(e) => setFormData({...formData, service: e.target.value})}
          required
          className="w-full px-4 py-3 bg-[#1a1a3e] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="" className="bg-[#1a1a3e] text-white">Choose Service</option>
          <option value="Advance DMT" className="bg-[#1a1a3e] text-white">Advance DMT</option>
          <option value="Neo Bank" className="bg-[#1a1a3e] text-white">Neo Bank</option>
          <option value="Indo-Nepal Remit" className="bg-[#1a1a3e] text-white">Indo-Nepal Remit</option>
          <option value="AEPS Withdrawal" className="bg-[#1a1a3e] text-white">AEPS Withdrawal</option>
          <option value="Bharat Connect (BBPS)" className="bg-[#1a1a3e] text-white">Bharat Connect (BBPS)</option>
          <option value="mPOS Solutions" className="bg-[#1a1a3e] text-white">mPOS Solutions</option>
          <option value="Travel Bookings" className="bg-[#1a1a3e] text-white">Travel Bookings</option>
          <option value="GST & Compliance" className="bg-[#1a1a3e] text-white">GST & Compliance</option>
          <option value="Other" className="bg-[#1a1a3e] text-white">Other</option>
        </select>
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeNumber, setActiveNumber] = useState<string | null>(null);
  const [activeVipCard, setActiveVipCard] = useState<number | null>(null);
  const [showVipContact, setShowVipContact] = useState(false);
  const [vipContactOption, setVipContactOption] = useState<'call' | 'whatsapp' | 'email' | null>(null);
  const [showAppointmentContact, setShowAppointmentContact] = useState(false);
  const [appointmentContactOption, setAppointmentContactOption] = useState<'call' | 'whatsapp' | 'email' | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"
  ];

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

  const handleWhatsAppAppointment = (number: string) => {
    setActiveNumber(number);
    setShowTimePicker(true);
  };

  const confirmAppointment = (time: string) => {
    if (activeNumber) {
      const message = encodeURIComponent(`Hello, I would like to make an appointment for Tax Audit/Compliance services at ${time}.`);
      window.open(`https://wa.me/${activeNumber}?text=${message}`, '_blank');
      setShowTimePicker(false);
      setActiveNumber(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a3a] via-[#0d0d2b] to-[#1a0b3b] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-screen z-0 opacity-30" style={{ maskImage: 'linear-gradient(to left, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 100%)' }}>
        <NetworkDots />
      </div>
      <WelcomePopup />
      <Navbar />
      
      <Hero />

      {/* Quick Actions Bar */}
      <section className="relative mt-4 md:mt-8 z-20">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
               {[
                 { label: 'Sent Money', icon: Send, color: 'text-blue-500', action: () => setIsAuthOpen(true) },
                 { label: 'AEPS', icon: Fingerprint, color: 'text-blue-400', action: () => setIsAuthOpen(true) },
                 { label: 'Credit Card', icon: CreditCard, color: 'text-blue-500', action: () => setIsAuthOpen(true) },
                 { label: 'Nepal Remit', icon: Globe, color: 'text-blue-600', action: () => setIsAuthOpen(true) }
               ].map((action, i) => (
                  <Button key={i} variant="ghost" className="h-20 bg-white/5 backdrop-blur-md shadow-xl border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 rounded-2xl flex flex-col gap-2 transition-all group" onClick={action.action}>
                     <div className={`p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform ${action.color}`}>
                        <action.icon className="h-5 w-5" />
                     </div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-white">{action.label}</span>
                  </Button>
               ))}
            </div>
         </div>
      </section>

      {/* Large Booking Section */}
      <section id="travel-booking" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/15 via-pink-600/10 to-blue-600/15 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="rounded-[3rem] bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e1b4b] border border-white/10 backdrop-blur-xl p-12 md:p-20 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-30 transition-all duration-700 ease-out transform group-hover:scale-125 group-hover:-translate-x-12 group-hover:-translate-y-8">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateX: [0, 15, 0],
                  rotateY: [0, -15, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{ perspective: 1000 }}
              >
                <Plane className="h-64 w-64 -rotate-12 drop-shadow-2xl text-blue-400" />
              </motion.div>
            </div>
            
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-pink-500/10 text-blue-400 text-xs font-bold mb-8 border border-white/10">
                ✈️ Travel & Lifestyle
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-8 leading-tight">
                Book <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400">Flights, Hotels</span> & <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400">Buses</span> Instantly
              </h2>
              <p className="text-xl text-gray-300 mb-12 font-medium leading-relaxed">
                Experience the world with Yek7pay. Get exclusive deals on domestic and international bookings with the lowest convenience fees in the industry.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                {[
                  { label: 'Flights', icon: Plane, desc: 'Domestic & International', color: 'text-blue-400' },
                  { label: 'Hotels', icon: Hotel, desc: '500,000+ Worldwide', color: 'text-pink-400' },
                  { label: 'Bus', icon: Bus, desc: 'All Major Operators', color: 'text-blue-400' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <div className={`w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color} group-hover/item:bg-white/10 transition-colors`}>
                      <item.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{item.label}</h4>
                      <p className="text-sm text-white/30">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 text-white rounded-full px-12 h-16 text-lg font-bold shadow-xl shadow-blue-900/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 border border-white/10"
                  onClick={() => window.location.href = "https://yek7pay.in"}
                >
                  Go to Booking Portal <ArrowRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Banking Section */}
      <section id="banking" className="py-24 relative bg-gradient-to-b from-blue-950 to-black">
        <div className="container mx-auto px-4">
          <SectionHeader 
            badge="Banking Excellence"
            title="Next-Gen Financial Hub"
            description="Experience seamless transactions with Yek7pay's comprehensive suite of banking and remittance tools."
            className="text-white"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <ServiceCard 
              icon={Send}
              title="Advance DMT"
              description="Seamlessly transfer funds to any bank account in India instantly with Yek7pay's 24/7 DMT service."
              delay={0.1}
              variant="featured"
              features={[
                "24/7_GRADIENT Instant DMT to any bank in India",
                "Real-time settlements with zero delays",
                "Bank-grade security with seamless experience",
                "High success rate & instant confirmations"
              ]}
            />
            <ServiceCard 
              icon={Landmark}
              title="Neo Bank Unlimited"
              description="Unlimited daily limits for merchants and high-volume users. Safe, secure, and instant."
              delay={0.2}
              variant="featured"
              features={[
                "Unlimited daily limits for merchants",
                "Designed for high-volume enterprises",
                "Real-time liquidity management",
                "Customized dashboard for business"
              ]}
            />
            <ServiceCard 
              icon={Globe}
              title="Indo-Nepal Remit"
              description="Secure cross-border corridor for instant money transfers between India and Nepal."
              delay={0.3}
              variant="featured"
              features={[
                "Instant India-Nepal money corridor",
                "Secure & compliant transactions",
                "Minimal downtime & high success rate",
                "New revenue stream for partners"
              ]}
            />
            <ServiceCard 
              icon={Banknote}
              title="Cash Withdrawal"
              description="AEPS enabled biometric cash withdrawals and balance inquiries at any Yek7pay point."
              delay={0.4}
              features={[
                "Biometric AEPS cash withdrawals",
                "Balance inquiry at any Yek7pay point",
                "Fast, reliable & paperless process",
                "Perfect for rural & semi-urban reach"
              ]}
            />
            <ServiceCard 
              icon={CreditCard}
              title="Premium Credit Cards"
              description="Apply for high-limit credit cards with instant approval and exclusive lifestyle rewards."
              delay={0.5}
              variant="featured"
              features={[
                "High-limit premium credit cards",
                "Instant approval with credit scoring",
                "Exclusive rewards & lifestyle perks",
                "Smart credit management tools"
              ]}
            />
            <ServiceCard 
              icon={Briefcase}
              title="PPI Wallet"
              description="Digital wallet solutions for instant payouts and smart expense management."
              delay={0.6}
              features={[
                "PPI Wallet for instant payouts",
                "Smart expense control for businesses",
                "Integrated smart wallet management",
                "Seamless wallet-to-bank settlement"
              ]}
            />
                      </div>
        </div>
      </section>

      {/* Services & Bharat Connect Section */}
      <section id="bharat-connect" className="py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-[2.5rem] bg-gradient-to-b from-black to-violet-950/20 border border-white/5 p-10 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              <div className="max-w-xl">
                <div className="inline-block p-3 rounded-2xl bg-violet-500/10 text-violet-400 mb-6">
                  <Receipt className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500">Bharat Connect</h2>
                <p className="text-lg text-white mb-8">
                  Pay all your utility bills—Electricity, Gas, Water, Broadband, and more—instantly via Yek7pay's universal payout system.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                  {[
                    'Electricity', 'Gas', 'Water', 'Broadband', 'DTH', 'Mobile Recharge',
                    'Credit Card', 'Insurance', 'Fastag', 'LPG', 'Landline', 'Education Fees'
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                      <Zap className="h-4 w-4 text-violet-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 font-bold shadow-lg shadow-blue-900/40" onClick={() => window.location.href = "/bbps"}>
                  Pay Bills Now
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                <div className="p-6 bg-white/5 border border-white/5 rounded-2xl text-center shadow-inner flex flex-col justify-center min-h-[100px]">
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 mb-1">24/7</div>
                  <div className="text-xs uppercase tracking-widest text-white/30">Support</div>
                </div>
                <div className="p-6 bg-white/5 border border-white/5 rounded-2xl text-center shadow-inner flex flex-col justify-center min-h-[100px]">
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-400 mb-1">Instant</div>
                  <div className="text-xs uppercase tracking-widest text-white/30">Settlement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loans & Bookings Section */}
      <section id="booking" className="py-24 bg-gradient-to-br from-black via-black to-blue-950">
        <div className="container mx-auto px-4">
          <SectionHeader 
            badge="Travel & Finance"
            title="Lifestyle Solutions"
            description="Empowering your ambitions with flexible loans and seamless travel planning tools."
            className="text-white"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <ServiceCard 
              icon={Briefcase}
              title="Personal Loans"
              description="Hassle-free personal financing with competitive interest rates."
              delay={0.1}
              features={[
                "Instant eligibility check with minimal documentation",
                "Competitive interest rates from trusted lenders",
                "Fast approval & quick disbursal",
                "Fully digital, hassle-free process"
              ]}
            />
            <ServiceCard 
              icon={Building2}
              title="Business Loans"
              description="Fuel your enterprise with tailored working capital solutions."
              delay={0.2}
              variant="featured"
              features={[
                "Customized working capital solutions",
                "High loan limits for growing enterprises",
                "Quick approval with flexible repayment options",
                "Designed for MSMEs, retailers & partners"
              ]}
            />
            <ServiceCard 
              icon={Train}
              title="Train Booking"
              description="Quick IRCTC bookings with real-time seat tracking and updates."
              delay={0.3}
              features={[
                "Fast IRCTC booking integration",
                "Real-time seat availability & PNR updates",
                "Tatkal & advance booking support",
                "Smooth, secure, and reliable transactions"
              ]}
            />
            <ServiceCard 
              icon={ShieldCheck}
              title="Vehicle Insurance"
              description="Protect your car and bike with comprehensive insurance plans from top providers."
              delay={0.4}
              variant="featured"
              onClick={() => window.location.href = "/insurance"}
              features={[
                "Comprehensive Car & Bike Insurance",
                "Cashless claims at 5000+ garages",
                "Instant policy issuance & renewal",
                "24/7_GRADIENT Roadside assistance support"
              ]}
            />
                      </div>
        </div>
      </section>

      {/* GST & Compliance Section */}
      <section id="compliance" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader 
            badge="Tax & Regulatory"
            title="GST & Compliance Services"
            description="Professional solutions for GST filing, ITR, audits, and company formation to keep your business compliant."
            className="text-white"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <ServiceCard 
              icon={FileText}
              title="GST Filing"
              description="Monthly & Quarterly GST returns with instant real-time processing and support."
              delay={0.1}
              variant="featured"
              features={[
                "Monthly & Quarterly GST returns",
                "Instant real-time processing",
                "Secure bank-grade encryption",
                "24/7_GRADIENT technical support"
              ]}
            />
            <ServiceCard 
              icon={ClipboardCheck}
              title="ITR Filing"
              description="Income tax returns for individuals, professionals, and business entities."
              delay={0.2}
              features={[
                "Income tax returns for all entities",
                "Expert tax planning advice",
                "Secure document management",
                "Fast processing & filing"
              ]}
            />
            <ServiceCard 
              icon={Scale}
              title="Deep Tax related"
              description="Professional tax audit services by certified experts to ensure compliance."
              delay={0.3}
              features={[
                "Statutory tax audit services",
                "Compliance verification",
                "Risk assessment & mitigation",
                "Professional certified reports"
              ]}
            />
            <ServiceCard 
              icon={Building}
              title="Company Setup"
              description="End-to-end assistance with PVT LTD, LLP, and OPC registration and incorporation."
              delay={0.4}
              features={[
                "PVT LTD, LLP, OPC registration",
                "Registration & incorporation support",
                "Compliance documentation",
                "Legal advisory services"
              ]}
            />
          </div>

          <div className="mt-16 flex flex-col items-center gap-8">
            <Link href="/compliance">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-12 h-14 font-bold shadow-lg shadow-emerald-900/40 transition-all hover:scale-105 active:scale-95">
                Explore All Compliance Services
              </Button>
            </Link>

            <button 
              onClick={() => setShowAppointmentContact(true)}
              className="relative px-10 py-4 rounded-2xl font-black text-lg shadow-xl transition-all hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]" />
              <span className="relative z-10 flex items-center gap-3 text-white">
                <Clock className="w-5 h-5" />
                Make an Appointment
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Statistics Section */}
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-600/40 to-blue-600/40 backdrop-blur-xl rounded-[2.5rem] p-12 text-white border border-white/10 shadow-2xl mb-24 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="relative z-10">
               <div className="flex flex-col items-center text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold mb-6">
                    <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400 font-black">Our Impact in Numbers</span>
                  </div>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: 'Daily Transactions', value: '50 Cr+' },
                    { label: 'Active Merchants', value: '1 Lakh+' },
                    { label: 'Cities Covered', value: '500+' },
                    { label: 'Customer Satisfaction', value: '98%' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
                      <div className="text-3xl md:text-4xl font-black mb-2">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-blue-100 font-bold opacity-70">{stat.label}</div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Yek7pay?</span>
            </h2>
            <p className="text-lg text-white/60 font-medium">
              Experience the best-in-class fintech services with unmatched reliability and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: ShieldCheck, title: 'Secure Transactions', desc: 'Bank-grade security with end-to-end encryption for all transactions.' },
              { icon: UserCheck, title: '24/7 Support', desc: 'Round-the-clock customer support to assist you anytime, anywhere.', gradient: true },
              { icon: Zap, title: 'Instant Settlement', desc: 'Get your money instantly with our fast settlement system.' },
              { icon: Coins, title: 'Low Charges', desc: 'Industry-best pricing with transparent and minimal charges.' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h4 className={`text-lg font-bold mb-3 ${(feature as any).gradient ? 'bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500' : 'text-white'}`}>{feature.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Solutions Section */}
      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold mb-6 border border-purple-500/20">
               🛒 For Merchants & Businesses
             </div>
             <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
               Powerful <span className="text-purple-400">Payment Solutions</span> for Your Business
             </h2>
             <p className="text-lg text-white/50 max-w-2xl font-medium">
               Accept payments seamlessly with our cutting-edge QR and mPOS solutions tailored for your growth.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-white/10 flex flex-col items-center text-center group">
               <div className="w-20 h-20 rounded-3xl bg-purple-600 flex items-center justify-center text-white mb-8 shadow-xl shadow-purple-500/20">
                  <QrCode className="h-10 w-10" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-4">QR Payment Collection</h3>
               <p className="text-white/50 mb-8 max-w-sm">Accept payments via QR codes with instant settlement and soundbox alerts.</p>
               <ul className="space-y-3 mb-10 w-full max-w-xs">
                  {['Soundbox included', 'Instant alerts', 'All UPI apps supported'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-white/70">
                       <CheckCircle2 className="h-5 w-5 text-green-500" /> {item}
                    </li>
                  ))}
               </ul>
               <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white h-14 rounded-2xl font-bold" onClick={() => setIsAuthOpen(true)}>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-white/10 flex flex-col items-center text-center group">
               <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-500/20">
                  <TabletSmartphone className="h-10 w-10" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-4">mPOS Solutions</h3>
               <p className="text-white/50 mb-8 max-w-sm">Portable card payment solutions for your store with instant settlement.</p>
               <ul className="space-y-3 mb-10 w-full max-w-xs">
                  {['All card types', 'Portable device', 'Instant settlement'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-white/70">
                       <CheckCircle2 className="h-5 w-5 text-green-500" /> {item}
                    </li>
                  ))}
               </ul>
               <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-2xl font-bold" onClick={() => setIsAuthOpen(true)}>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Yek7pay Feature Grid */}
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-4">
           <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 border border-white/10 shadow-xl overflow-hidden relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg">
                       <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Why Choose Yek7pay for Your Business?</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-auto">
                    {[
                      { label: 'Setup Fee', value: '0%', color: 'text-purple-400' },
                      { label: 'Support Available', value: '24/7', color: 'bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500' },
                      { label: 'Settlement', value: 'Instant', color: 'text-purple-400' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                        <div className={`text-3xl font-black ${item.color} mb-1`}>{item.value}</div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">{item.label}</div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Ready to Get Started Section */}
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-600/60 to-blue-600/60 backdrop-blur-2xl rounded-[2.5rem] p-12 text-white border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              <div className="max-w-2xl text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Ready to Get Started?</h2>
                <p className="text-xl text-white/80 font-medium">Join thousands of satisfied merchants and start accepting payments today.</p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto text-center md:text-right">
                <Button className="w-full md:w-auto bg-white text-purple-600 hover:bg-white/90 h-16 px-12 rounded-2xl font-black text-lg shadow-xl transition-all hover:scale-105 active:scale-95" onClick={() => setIsAuthOpen(true)}>
                  Create Free Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Franchise & Distributor Section */}
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 rounded-[2.5rem] blur-3xl" />
          <div className="relative bg-gradient-to-br from-amber-900/40 via-yellow-900/30 to-amber-900/40 backdrop-blur-2xl rounded-[2.5rem] p-12 text-white border-2 border-amber-500/40 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-3xl" />
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-yellow-300 animate-pulse" />
                <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-black text-sm font-black uppercase tracking-wider">
                  VIP Services
                </div>
                <Crown className="w-8 h-8 text-yellow-300 animate-pulse" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Become a Franchise or Distributor</h2>
              <p className="text-xl text-amber-100/80 font-medium mb-8 max-w-2xl">Unlock exclusive benefits, higher commissions, and priority support with Yek7Pay VIP partnership.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full max-w-4xl">
                {vipBenefits.map((item, i) => {
                  const cardGradients = [
                    { bg: 'from-rose-500/20 via-pink-500/15 to-orange-500/20', border: 'border-rose-400/40 hover:border-rose-300', icon: 'from-rose-500 to-orange-500', iconColor: 'text-white' },
                    { bg: 'from-blue-500/20 via-cyan-500/15 to-teal-500/20', border: 'border-cyan-400/40 hover:border-cyan-300', icon: 'from-blue-500 to-teal-500', iconColor: 'text-white' },
                    { bg: 'from-purple-500/20 via-violet-500/15 to-indigo-500/20', border: 'border-purple-400/40 hover:border-purple-300', icon: 'from-purple-500 to-indigo-500', iconColor: 'text-white' },
                    { bg: 'from-amber-500/20 via-yellow-500/15 to-lime-500/20', border: 'border-yellow-400/40 hover:border-yellow-300', icon: 'from-amber-500 to-lime-500', iconColor: 'text-white' }
                  ];
                  const gradient = cardGradients[i];
                  return (
                    <div 
                      key={i} 
                      onClick={() => setActiveVipCard(i)}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${gradient.bg} border ${gradient.border} text-center hover:bg-white/10 transition-all cursor-pointer hover:scale-105 group/card shadow-lg`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient.icon} flex items-center justify-center mx-auto mb-3 shadow-lg group-hover/card:scale-110 transition-transform`}>
                        <item.icon className={`w-6 h-6 ${gradient.iconColor}`} />
                      </div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-sm text-white/60">{item.desc}</p>
                      <p className="text-xs text-white/50 mt-2 opacity-0 group-hover/card:opacity-100 transition-opacity">Click for details</p>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => setShowVipContact(true)}
                className="relative px-10 py-4 rounded-2xl font-black text-lg shadow-xl transition-all hover:scale-105 active:scale-95 overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]" />
                <span className="relative z-10 flex items-center gap-3 text-white">
                  <Phone className="w-5 h-5" />
                  Contact Us
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

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
              
              <button 
                onClick={() => { setActiveVipCard(null); setShowVipContact(true); }}
                className="w-full relative py-4 rounded-xl font-black text-lg shadow-xl transition-all hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]" />
                <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                  <Phone className="w-5 h-5" />
                  Contact Us
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIP Contact Modal */}
      <AnimatePresence>
        {showVipContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setShowVipContact(false); setVipContactOption(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-amber-900/40 via-yellow-900/30 to-amber-900/40 border-2 border-amber-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl relative backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => { setShowVipContact(false); setVipContactOption(null); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {!vipContactOption ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/30">
                      <Phone className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Contact Us</h3>
                    <p className="text-amber-200/70">Choose how you'd like to reach us</p>
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => setVipContactOption('call')}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-amber-400/30 hover:bg-white/20 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white">Call Us</h4>
                        <p className="text-sm text-amber-200/60">Speak directly with our team</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-amber-400/50 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                      onClick={() => setVipContactOption('whatsapp')}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-amber-400/30 hover:bg-white/20 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white">WhatsApp</h4>
                        <p className="text-sm text-amber-200/60">Chat with us instantly</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-amber-400/50 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                      onClick={() => setVipContactOption('email')}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-amber-400/30 hover:bg-white/20 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white">Email</h4>
                        <p className="text-sm text-amber-200/60">Send us a detailed message</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-amber-400/50 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setVipContactOption(null)}
                    className="flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors mb-4"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span className="text-sm font-medium">Back</span>
                  </button>
                  
                  {vipContactOption === 'call' && (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Phone className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Call Us</h3>
                      <p className="text-amber-200/70 mb-6">Tap to call any of our numbers</p>
                      <div className="space-y-3">
                        <a href="tel:+919230967189" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all font-bold text-white">
                          <Phone className="w-5 h-5" />
                          +91 92309 67189
                        </a>
                        <a href="tel:+919230967187" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all font-bold text-white">
                          <Phone className="w-5 h-5" />
                          +91 92309 67187
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {vipContactOption === 'whatsapp' && (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <MessageCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                      <p className="text-amber-200/70 mb-6">Tap to chat with us on WhatsApp</p>
                      <div className="space-y-3">
                        <a href="https://wa.me/919230967189?text=Hi%2C%20I%20am%20interested%20in%20Yek7Pay%20VIP%20Franchise%2FDistributor%20partnership" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 transition-all font-bold text-white">
                          <MessageCircle className="w-5 h-5" />
                          +91 92309 67189
                        </a>
                        <a href="https://wa.me/919230967187?text=Hi%2C%20I%20am%20interested%20in%20Yek7Pay%20VIP%20Franchise%2FDistributor%20partnership" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 transition-all font-bold text-white">
                          <MessageCircle className="w-5 h-5" />
                          +91 92309 67187
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {vipContactOption === 'email' && (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Email Us</h3>
                      <p className="text-amber-200/70 mb-6">Tap to send us an email</p>
                      <a href="mailto:info@yek7pay.com?subject=VIP%20Franchise%20Enquiry" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all font-bold text-white">
                        <Mail className="w-5 h-5" />
                        info@yek7pay.com
                      </a>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Appointment Contact Modal */}
      <AnimatePresence>
        {showAppointmentContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setShowAppointmentContact(false); setAppointmentContactOption(null); setSelectedTimeSlot(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-purple-900/40 border-2 border-purple-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl relative backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => { setShowAppointmentContact(false); setAppointmentContactOption(null); setSelectedTimeSlot(null); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {!selectedTimeSlot ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Select Time Slot</h3>
                    <p className="text-purple-200/70">Choose your preferred appointment time</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTimeSlot(time)}
                        className="p-3 rounded-xl bg-white/10 border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400 transition-all text-white font-medium text-sm"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </>
              ) : !appointmentContactOption ? (
                <>
                  <button 
                    onClick={() => setSelectedTimeSlot(null)}
                    className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-4"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span className="text-sm font-medium">Change Time</span>
                  </button>
                  
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 mb-4">
                      <Clock className="w-4 h-4 text-purple-300" />
                      <span className="text-purple-200 font-bold">{selectedTimeSlot}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">How would you like to book?</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => setAppointmentContactOption('call')}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-purple-400/30 hover:bg-white/20 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white">Call Us</h4>
                        <p className="text-sm text-purple-200/60">Schedule via phone call</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-400/50 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                      onClick={() => setAppointmentContactOption('whatsapp')}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-purple-400/30 hover:bg-white/20 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white">WhatsApp</h4>
                        <p className="text-sm text-purple-200/60">Book via WhatsApp chat</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-400/50 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                      onClick={() => setAppointmentContactOption('email')}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-purple-400/30 hover:bg-white/20 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white">Email</h4>
                        <p className="text-sm text-purple-200/60">Book via email</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-400/50 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setAppointmentContactOption(null)}
                    className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-4"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span className="text-sm font-medium">Back</span>
                  </button>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 mb-4 mx-auto">
                    <Clock className="w-4 h-4 text-purple-300" />
                    <span className="text-purple-200 font-bold">{selectedTimeSlot}</span>
                  </div>
                  
                  {appointmentContactOption === 'call' && (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Phone className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Call Us</h3>
                      <p className="text-purple-200/70 mb-6">Tap to call and confirm your {selectedTimeSlot} appointment</p>
                      <div className="space-y-3">
                        <a href="tel:+919230967189" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all font-bold text-white">
                          <Phone className="w-5 h-5" />
                          +91 92309 67189
                        </a>
                        <a href="tel:+919230967187" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all font-bold text-white">
                          <Phone className="w-5 h-5" />
                          +91 92309 67187
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {appointmentContactOption === 'whatsapp' && (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <MessageCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                      <p className="text-purple-200/70 mb-6">Tap to book your {selectedTimeSlot} appointment</p>
                      <div className="space-y-3">
                        <a href={`https://wa.me/919230967189?text=Hello%2C%20I%20would%20like%20to%20make%20an%20appointment%20for%20Tax%20Audit%2FCompliance%20services%20at%20${encodeURIComponent(selectedTimeSlot)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 transition-all font-bold text-white">
                          <MessageCircle className="w-5 h-5" />
                          +91 92309 67189
                        </a>
                        <a href={`https://wa.me/919230967187?text=Hello%2C%20I%20would%20like%20to%20make%20an%20appointment%20for%20Tax%20Audit%2FCompliance%20services%20at%20${encodeURIComponent(selectedTimeSlot)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 transition-all font-bold text-white">
                          <MessageCircle className="w-5 h-5" />
                          +91 92309 67187
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {appointmentContactOption === 'email' && (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Email Us</h3>
                      <p className="text-purple-200/70 mb-6">Tap to email and book your {selectedTimeSlot} appointment</p>
                      <div className="space-y-3">
                        <a href={`mailto:info@yek7pay.com?subject=Appointment%20Request%20for%20${encodeURIComponent(selectedTimeSlot)}&body=Hello%2C%0A%0AI%20would%20like%20to%20make%20an%20appointment%20for%20Tax%20Audit%2FCompliance%20services%20at%20${encodeURIComponent(selectedTimeSlot)}.%0A%0APlease%20confirm%20the%20availability.%0A%0AThank%20you.`} className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 transition-all font-bold text-white">
                          <Mail className="w-5 h-5" />
                          info@yek7pay.com
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Still Got a Question Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="p-8 md:p-12 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">Still got a Question?</h2>
            <p className="text-sm text-white/60 mb-8 text-center">Write to us for more information</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
      <AuthDialog isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} />

      {/* Time Selection Modal */}
      <AnimatePresence>
        {showTimePicker && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowTimePicker(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#1a1a3a] border border-white/10 rounded-[2rem] p-8 shadow-2xl"
            >
              <button 
                onClick={() => setShowTimePicker(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="h-6 w-6 text-white/40" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white text-left">Select Appointment Time</h3>
                  <p className="text-sm text-white/40 text-left">Choose a 30-minute slot</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    className="h-12 bg-white/5 border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white/70 hover:text-white rounded-xl transition-all flex items-center justify-start px-4"
                    onClick={() => confirmAppointment(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-3 text-left">
                <AlertCircle className="h-5 w-5 text-blue-400 shrink-0" />
                <p className="text-xs text-blue-200/50 leading-relaxed">
                  All slots are 30 minutes. You will be redirected to WhatsApp with your chosen time.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
