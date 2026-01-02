import { Navbar, Footer } from "@/components/layout";
import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { SectionHeader } from "@/components/section-header";
import { AuthDialog } from "@/components/auth-dialog";
import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Send, Globe, Fingerprint, 
  Plane, Train, Briefcase, Building2, 
  Zap, Receipt, Landmark, Banknote, CreditCard,
  CheckCircle2, QrCode, Smartphone, Mail, Phone, MapPin,
  ShieldCheck, UserCheck, Coins, ArrowRight, ClipboardCheck, FileText, Scale, Building, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-rose-500/30">
      <Navbar />
      
      <Hero />

      {/* Quick Actions Bar */}
      <section className="relative -mt-16 z-20">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: 'Sent Money', icon: Send, color: 'text-rose-400', action: () => setIsAuthOpen(true) },
                 { label: 'AEPS', icon: Fingerprint, color: 'text-purple-400', action: () => setIsAuthOpen(true) },
                 { label: 'Credit Card', icon: CreditCard, color: 'text-rose-400', action: () => setIsAuthOpen(true) },
                 { label: 'Nepal Remit', icon: Globe, color: 'text-purple-400', action: () => setIsAuthOpen(true) }
               ].map((action, i) => (
                  <Button key={i} variant="ghost" className="h-20 bg-white/5 backdrop-blur-md shadow-xl border border-white/10 hover:border-rose-500/30 hover:bg-rose-500/5 rounded-2xl flex flex-col gap-2 transition-all group" onClick={action.action}>
                     <div className={`p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform ${action.color}`}>
                        <action.icon className="h-5 w-5" />
                     </div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{action.label}</span>
                  </Button>
               ))}
            </div>
         </div>
      </section>

      {/* Large Booking Section (Hero of the Theme) */}
      <section id="travel-booking" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-purple-500/20 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl p-12 md:p-20 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-30 group-hover:opacity-50 transition-all duration-700">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateX: [0, 15, 0],
                  rotateY: [-10, 10, -10],
                  z: [0, 50, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{ perspective: "1000px" }}
              >
                <Plane className="h-64 w-64 text-rose-400 filter drop-shadow-[0_20px_50px_rgba(225,29,72,0.4)]" />
              </motion.div>
            </div>
            
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold mb-8 border border-rose-500/20">
                ✈️ Travel & Lifestyle
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-8 leading-tight">
                Book <span className="text-rose-400">Flights, Hotels</span> & <span className="text-purple-400">Buses</span> Instantly
              </h2>
              <p className="text-xl text-white/50 mb-12 font-medium leading-relaxed">
                Experience the world with Yek7pay. Get exclusive deals on domestic and international bookings with the lowest convenience fees in the industry.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                {[
                  { label: 'Flights', icon: Plane, desc: 'Domestic & International' },
                  { label: 'Hotels', icon: Building2, desc: '500,000+ Worldwide' },
                  { label: 'Bus', icon: Smartphone, desc: 'All Major Operators' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-3 group/item cursor-default">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 group-hover/item:bg-rose-500 group-hover/item:text-white transition-all">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-bold text-white group-hover/item:text-rose-400 transition-colors">{item.label}</h4>
                    <p className="text-xs text-white/30">{item.desc}</p>
                  </div>
                ))}
              </div>
              
              <Button 
                className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-full px-12 h-16 text-lg font-bold shadow-xl shadow-rose-900/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                onClick={() => window.location.href = "https://yek7pay.in"}
              >
                Go to Booking Portal <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Banking Section */}
      <section id="banking" className="py-24 relative bg-[#050505]">
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
                "24/7 Instant DMT to any bank in India",
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
      <section id="bharat-connect" className="py-24 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="rounded-[2.5rem] bg-white/5 border border-white/10 p-10 md:p-16 relative overflow-hidden shadow-2xl backdrop-blur-3xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-purple-500/5 pointer-events-none" />
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              <div className="max-w-xl">
                <div className="inline-block p-3 rounded-2xl bg-rose-500/10 text-rose-400 mb-6 border border-rose-500/20">
                  <Receipt className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-purple-400 to-rose-300">Bharat Connect</h2>
                <p className="text-lg text-white/70 mb-8 leading-relaxed">
                  Pay all your utility bills—Electricity, Gas, Water, Broadband, and more—instantly via Yek7pay's universal payout system.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {['Utilities', 'Recharge', 'Insurance', 'Fastag'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white/40 group-hover:text-white/70 transition-colors">
                      <Zap className="h-4 w-4 text-rose-500 animate-pulse" />
                      {item}
                    </div>
                  ))}
                </div>
                  <Button className="bg-rose-600 hover:bg-rose-500 text-white rounded-full px-10 h-14 font-bold shadow-lg shadow-rose-900/40 transition-all hover:scale-105 active:scale-95" onClick={() => window.location.href = "/bbps"}>
                  Pay Bills Now
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center shadow-inner group-hover:bg-white/10 transition-colors">
                  <div className="text-3xl font-bold text-rose-500 mb-2">24/7</div>
                  <div className="text-xs uppercase tracking-widest text-white/30">Support</div>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center mt-6 shadow-inner group-hover:bg-white/10 transition-colors">
                  <div className="text-3xl font-bold text-purple-400 mb-2">Instant</div>
                  <div className="text-xs uppercase tracking-widest text-white/30">Settlement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loans & Bookings Section */}
      <section id="booking" className="py-24 bg-[#050505]">
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
              icon={Plane}
              title="Flight Booking"
              description="The smartest way to book domestic and international flights."
              delay={0.3}
              externalUrl="https://yek7pay.in"
              features={[
                "Domestic & international flights on one platform",
                "Best fares with smart price comparison",
                "Instant booking & real-time confirmation",
                "Easy cancellations and rescheduling support"
              ]}
            />
            <ServiceCard 
              icon={Train}
              title="Train Booking"
              description="Quick IRCTC bookings with real-time seat tracking and updates."
              delay={0.4}
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
              delay={0.5}
              variant="featured"
              onClick={() => window.location.href = "/insurance"}
              features={[
                "Comprehensive Car & Bike Insurance",
                "Cashless claims at 5000+ garages",
                "Instant policy issuance & renewal",
                "24/7 Roadside assistance support"
              ]}
            />
          </div>
        </div>
      </section>

      {/* GST & Compliance Section */}
      <section id="compliance" className="py-24 relative overflow-hidden bg-[#050505]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-rose-500/5 blur-[120px] pointer-events-none" />
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
                "24/7 technical support"
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
              title="Tax Audit"
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

          <div className="mt-16 text-center">
            <Link href="/compliance">
              <Button className="bg-rose-600 hover:bg-rose-500 text-white rounded-full px-12 h-14 font-bold shadow-lg shadow-rose-900/40 transition-all hover:scale-105 active:scale-95">
                Explore All Compliance Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Statistics Section */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-12 text-white border border-white/10 shadow-2xl mb-24 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="relative z-10">
               <div className="flex flex-col items-center text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-100 text-xs font-bold mb-6">
                    <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                    Our Impact in Numbers
                  </div>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: 'Daily Transactions', value: '50 Cr+' },
                    { label: 'Active Merchants', value: '1 Lakh+' },
                    { label: 'Cities Covered', value: '500+' },
                    { label: 'Customer Satisfaction', value: '98%' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group/stat">
                      <div className="text-3xl md:text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-400 group-hover/stat:scale-110 transition-transform">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-rose-100 font-bold opacity-70">{stat.label}</div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-400">Yek7pay?</span>
            </h2>
            <p className="text-lg text-white/40 font-medium">
              Experience the best-in-class fintech services with unmatched reliability and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: ShieldCheck, title: 'Secure Transactions', desc: 'Bank-grade security with end-to-end encryption for all transactions.' },
              { icon: UserCheck, title: '24/7 Support', desc: 'Round-the-clock customer support to assist you anytime, anywhere.' },
              { icon: Zap, title: 'Instant Settlement', desc: 'Get your money instantly with our fast settlement system.' },
              { icon: Coins, title: 'Low Charges', desc: 'Industry-best pricing with transparent and minimal charges.' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 mb-6 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-rose-400 transition-colors">{feature.title}</h4>
                <p className="text-sm text-white/30 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Solutions Section */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold mb-6 border border-rose-500/20">
               🛒 For Merchants & Businesses
             </div>
             <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
               Powerful <span className="text-rose-400">Payment Solutions</span> for Your Business
             </h2>
             <p className="text-lg text-white/40 max-w-2xl font-medium">
               Accept payments seamlessly with our cutting-edge QR and mPOS solutions tailored for your growth.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[3rem] shadow-2xl border border-white/10 flex flex-col items-center text-center group">
               <div className="w-20 h-20 rounded-3xl bg-rose-600 flex items-center justify-center text-white mb-8 shadow-xl shadow-rose-500/20">
                  <QrCode className="h-10 w-10" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-4">QR Payment Collection</h3>
               <p className="text-white/40 mb-8 max-w-sm leading-relaxed">Accept payments via QR codes with instant settlement and soundbox alerts.</p>
               <ul className="space-y-3 mb-10 w-full max-w-xs">
                  {['Soundbox included', 'Instant alerts', 'All UPI apps supported'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-white/70">
                       <CheckCircle2 className="h-5 w-5 text-green-500" /> {item}
                    </li>
                  ))}
               </ul>
               <Button className="w-full bg-rose-600 hover:bg-rose-500 text-white h-14 rounded-2xl font-bold transition-all shadow-lg shadow-rose-900/40" onClick={() => setIsAuthOpen(true)}>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>

            <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[3rem] shadow-2xl border border-white/10 flex flex-col items-center text-center group">
               <div className="w-20 h-20 rounded-3xl bg-purple-600 flex items-center justify-center text-white mb-8 shadow-xl shadow-purple-500/20">
                  <Smartphone className="h-10 w-10" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-4">mPOS Solutions</h3>
               <p className="text-white/40 mb-8 max-w-sm leading-relaxed">Portable card payment solutions for your store with instant settlement.</p>
               <ul className="space-y-3 mb-10 w-full max-w-xs">
                  {['All card types', 'Portable device', 'Instant settlement'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-white/70">
                       <CheckCircle2 className="h-5 w-5 text-green-500" /> {item}
                    </li>
                  ))}
               </ul>
               <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white h-14 rounded-2xl font-bold transition-all shadow-lg shadow-purple-900/40" onClick={() => setIsAuthOpen(true)}>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Yek7pay Feature Grid */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-4">
           <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/10 shadow-xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-lg">
                       <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Why Choose Yek7pay for Your Business?</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-auto">
                    {[
                      { label: 'Setup Fee', value: '0%', color: 'text-rose-400' },
                      { label: 'Support Available', value: '24/7', color: 'text-purple-400' },
                      { label: 'Settlement', value: 'Instant', color: 'text-rose-400' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition-colors">
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
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-rose-600/60 to-purple-600/60 backdrop-blur-3xl rounded-[2.5rem] p-12 text-white border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              <div className="max-w-2xl text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Ready to Get Started?</h2>
                <p className="text-xl text-white/80 mb-10 font-medium">Join thousands of merchants and millions of users who trust Yek7pay for their financial needs. Create your account in minutes.</p>
                <div className="flex flex-col sm:flex-row gap-6">
                   <Button className="bg-white text-rose-600 hover:bg-rose-50 rounded-full px-12 h-14 text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-xl" onClick={() => setIsAuthOpen(true)}>
                      Register Now
                   </Button>
                   <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-12 h-14 text-lg font-bold backdrop-blur-md transition-all">
                      Contact Sales
                   </Button>
                </div>
              </div>
              <div className="hidden lg:block relative">
                 <div className="w-80 h-80 rounded-full bg-white/10 blur-[80px] absolute inset-0 -z-10 animate-pulse" />
                 <Shield className="h-64 w-64 text-white/20 animate-float" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AuthDialog isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </div>
  );
}
