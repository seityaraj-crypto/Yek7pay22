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
  ShieldCheck, UserCheck, Coins, ArrowRight, ClipboardCheck, FileText, Scale, Building,
  Hotel, Bus
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b3b] via-[#0d0d2b] to-[#0a1a3a] text-white">
      <Navbar />
      
      <Hero />

      {/* Quick Actions Bar */}
      <section className="relative -mt-16 z-20">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-rose-600/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="rounded-[3rem] bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] border border-white/10 backdrop-blur-xl p-12 md:p-20 shadow-2xl overflow-hidden group">
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
                <Plane className="h-64 w-64 -rotate-12 drop-shadow-2xl" />
              </motion.div>
            </div>
            
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold mb-8 border border-pink-500/20">
                ✈️ Travel & Lifestyle
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-8 leading-tight">
                Book <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-300">Flights, Hotels</span> & <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-pink-500">Buses</span> Instantly
              </h2>
              <p className="text-xl text-white/50 mb-12 font-medium leading-relaxed">
                Experience the world with Yek7pay. Get exclusive deals on domestic and international bookings with the lowest convenience fees in the industry.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                {[
                  { label: 'Flights', icon: Plane, desc: 'Domestic & International', color: 'text-pink-400' },
                  { label: 'Hotels', icon: Hotel, desc: '500,000+ Worldwide', color: 'text-pink-400' },
                  { label: 'Bus', icon: Bus, desc: 'All Major Operators', color: 'text-pink-400' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <div className={`w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color} group-hover/item:bg-pink-500/20 transition-colors`}>
                      <item.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{item.label}</h4>
                      <p className="text-sm text-white/30">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 hover:from-pink-400 hover:to-pink-600 text-white rounded-full px-12 h-16 text-lg font-bold shadow-xl shadow-pink-900/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 border border-white/10"
                onClick={() => window.location.href = "https://yek7pay.in"}
              >
                Go to Booking Portal <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Banking Section */}
      <section id="banking" className="py-24 relative bg-black/40">
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
      <section id="bharat-connect" className="py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-black to-violet-950/20 border border-white/5 p-10 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              <div className="max-w-xl">
                <div className="inline-block p-3 rounded-2xl bg-violet-500/10 text-violet-400 mb-6">
                  <Receipt className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500">Bharat Connect</h2>
                <p className="text-lg text-white mb-8">
                  Pay all your utility bills—Electricity, Gas, Water, Broadband, and more—instantly via Yek7pay's universal payout system.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {['Utilities', 'Recharge', 'Insurance', 'Fastag'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white">
                      <Zap className="h-4 w-4 text-violet-500" />
                      {item}
                    </div>
                  ))}
                </div>
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 font-bold shadow-lg shadow-blue-900/40" onClick={() => window.location.href = "/bbps"}>
                  Pay Bills Now
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
                <div className="p-8 bg-white/5 border border-white/5 rounded-3xl text-center shadow-inner">
                  <div className="text-3xl font-bold text-violet-500 mb-2">24/7</div>
                  <div className="text-xs uppercase tracking-widest text-white/30">Support</div>
                </div>
                <div className="p-8 bg-white/5 border border-white/5 rounded-3xl text-center mt-6 shadow-inner">
                  <div className="text-3xl font-bold text-blue-400 mb-2">Instant</div>
                  <div className="text-xs uppercase tracking-widest text-white/30">Settlement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loans & Bookings Section */}
      <section id="booking" className="py-24 bg-black/40">
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
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-12 h-14 font-bold shadow-lg shadow-emerald-900/40 transition-all hover:scale-105 active:scale-95">
                Explore All Compliance Services
              </Button>
            </Link>
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
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs font-bold mb-6">
                    <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
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
              { icon: UserCheck, title: '24/7 Support', desc: 'Round-the-clock customer support to assist you anytime, anywhere.' },
              { icon: Zap, title: 'Instant Settlement', desc: 'Get your money instantly with our fast settlement system.' },
              { icon: Coins, title: 'Low Charges', desc: 'Industry-best pricing with transparent and minimal charges.' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{feature.title}</h4>
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
                  <Smartphone className="h-10 w-10" />
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
                      { label: 'Support Available', value: '24/7', color: 'text-blue-400' },
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

      <Footer />
      <AuthDialog isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </div>
  );
}
