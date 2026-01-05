import * as React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Shield, Bell, ChevronDown, Landmark, Send, Globe, Fingerprint, CreditCard, Banknote, Briefcase, Zap, Receipt, Plane, Train, Building2, ClipboardCheck, Smartphone, TabletSmartphone } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthDialog } from "@/components/auth-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import logoImg from "@assets/Logo_Yek7pay_PNG_1767107682421.png";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [authView, setAuthView] = React.useState<"menu" | "login">("menu");
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
  const [, setLocation] = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setLocation('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const openLogin = () => {
    setAuthView("login");
    setIsAuthOpen(true);
  };

  const openMenu = () => {
    setAuthView("menu");
    setIsAuthOpen(true);
  };

  const services = [
    {
      label: "Banking & Remittance",
      items: [
        { name: "Advance DMT", icon: Send, href: "/#banking" },
        { name: "Neo Bank Unlimited", icon: Landmark, href: "/#banking" },
        { name: "Indo-Nepal Remit", icon: Globe, href: "/#banking" },
        { name: "AEPS Withdrawal", icon: Fingerprint, href: "/#banking" },
        { name: "Micro ATM", icon: Smartphone, href: "/#banking" },
        { name: "PPI Wallet", icon: Briefcase, href: "/#banking" },
      ]
    },
    {
      label: "Payments & Collection",
      items: [
        { name: "Bharat Connect (BBPS)", icon: Receipt, href: "/bbps" },
        { name: "UPI QR Collection", icon: Zap, iconColor: "text-yellow-500", href: "/#services" },
        { name: "mPOS Card Solutions", icon: TabletSmartphone, href: "/#services" },
        { name: "Credit Card Bill Pay", icon: CreditCard, iconColor: "text-purple-400", href: "/bbps" },
        { name: "Utility Payments", icon: Zap, iconColor: "text-green-400", href: "/bbps" },
        { name: "Recharge & DTH", icon: Smartphone, iconColor: "text-blue-400", href: "/bbps" },
      ]
    },
    {
      label: "Growth & Travel",
      items: [
        { name: "Business Loans", icon: Building2, href: "/#booking" },
        { name: "Flight Bookings", icon: Plane, href: "/#booking" },
        { name: "Train Bookings", icon: Train, href: "/#booking" },
        { name: "Bus Bookings", icon: Train, iconColor: "text-orange-400", href: "/#booking" },
        { name: "Hotel Bookings", icon: Building2, iconColor: "text-pink-400", href: "/#booking" },
        { name: "GST & Compliance", icon: ClipboardCheck, href: "/compliance" },
      ]
    }
  ];

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-slate-300/30 bg-gradient-to-r from-[#f8f7f4] via-[#e2e0dc] via-15% via-[#1e293b] via-40% via-[#1e3a5f] via-70% to-[#312e81] backdrop-blur-2xl h-16 flex items-center shadow-[0_4px_30px_rgba(14,165,233,0.2)]">
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-indigo-900/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-slate-300/50 via-blue-400/50 to-purple-500/60" />
      <div className="container mx-auto px-4 flex items-center justify-between relative">
        <button onClick={goHome} className="flex items-center group cursor-pointer">
          <div className="relative">
             <div className="absolute -inset-3 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500" />
             <img 
               src={logoImg} 
               alt="Yek7pay" 
               className="h-10 w-auto relative transition-all duration-300 group-hover:scale-105 [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.2))_drop-shadow(0_0_12px_rgba(99,102,241,0.5))]" 
             />
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          <button onClick={goHome} className="text-sm font-semibold text-white hover:text-cyan-300 active:text-purple-300 transition-all uppercase tracking-wider px-5 h-10 flex items-center rounded-xl hover:bg-white/10 cursor-pointer relative group">
            <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Home</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all" />
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-cyan-300 active:text-purple-300 transition-all uppercase tracking-wider outline-none px-5 h-10 rounded-xl hover:bg-white/10 relative group">
              <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Services</span> <ChevronDown className="h-4 w-4 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[600px] p-6 bg-[#0d0d2b]/95 backdrop-blur-2xl border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-3xl mt-2">
              <div className="grid grid-cols-3 gap-8">
                {services.map((group, idx) => (
                  <div key={idx} className="space-y-4">
                    <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black px-0">
                      {group.label}
                    </DropdownMenuLabel>
                    <div className="space-y-1">
                      {group.items.map((item, i) => (
                        <DropdownMenuItem key={i} asChild className="focus:bg-white/5 focus:text-purple-400 rounded-xl cursor-pointer p-2 transition-colors">
                          <a href={item.href} className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 group-focus:border-purple-500/30">
                              <item.icon className={`h-4 w-4 ${item.iconColor || 'text-blue-400'}`} />
                            </div>
                            <span className="text-xs font-bold leading-tight text-white/80 group-focus:text-white">{item.name}</span>
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <a href="/bbps" className="text-sm font-semibold text-white hover:text-cyan-300 transition-all uppercase tracking-wider px-5 h-10 flex items-center rounded-xl hover:bg-white/10 relative group">
            <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Bharat Connect</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all" />
          </a>
          <Link href="/about" className="text-sm font-semibold text-white hover:text-cyan-300 transition-all uppercase tracking-wider px-5 h-10 flex items-center rounded-xl hover:bg-white/10 relative group">
            <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">About Us</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all" />
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Button className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-500 hover:via-blue-600 hover:to-purple-600 text-white border-0 shadow-[0_4px_20px_rgba(59,130,246,0.35)] rounded-full px-5 md:px-7 h-10 md:h-11 text-xs md:text-sm font-bold transition-all hover:scale-105 active:scale-95 relative overflow-hidden group" onClick={openMenu}>
            <span className="relative z-10">Open Account / Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
          </Button>

          <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" className="text-white relative hover:text-blue-200 hover:bg-white/10 hidden sm:flex rounded-xl">
               <Bell className="h-5 w-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
             </Button>
             
             {/* Mobile Nav Toggle */}
             <Sheet open={isOpen} onOpenChange={setIsOpen}>
               <SheetTrigger asChild className="lg:hidden">
                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-xl">
                   <Menu className="h-6 w-6" />
                 </Button>
               </SheetTrigger>
               <SheetContent className="bg-gradient-to-br from-[#0a0f1a] via-[#0d1525] to-[#0a1628] border-l border-cyan-500/20 w-[320px] text-white">
                 <div className="flex flex-col gap-8 mt-12">
                   <div className="flex items-center justify-center mb-4">
                     <img src={logoImg} alt="Yek7pay" className="h-10 w-auto" />
                   </div>
                   
                   <div className="grid grid-cols-1 gap-4">
                     <Button variant="outline" className="w-full border-cyan-500/30 text-white font-bold hover:bg-white/10 hover:border-cyan-400 h-12 rounded-xl" onClick={() => { openLogin(); setIsOpen(false); }}>
                       Login
                     </Button>
                     <Button className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 border-0 hover:opacity-90 text-white rounded-full font-bold h-12 shadow-lg shadow-cyan-500/30" onClick={() => { openMenu(); setIsOpen(false); }}>
                       Create Account
                     </Button>
                   </div>

                   <div className="space-y-2 pt-4 border-t border-white/10 max-h-[60vh] overflow-y-auto">
                     {[
                       {
                         label: "Banking & Remittance",
                         items: [
                           { name: "Advance DMT", href: "/#banking" },
                           { name: "Neo Bank", href: "/#banking" },
                           { name: "Indo-Nepal Remit", href: "/#banking" },
                           { name: "AEPS", href: "/#banking" },
                           { name: "Micro ATM", href: "/#banking" },
                           { name: "PPI Wallet", href: "/#banking" },
                         ]
                       },
                       {
                         label: "Payments & Collection",
                         items: [
                           { name: "Bharat Connect", href: "/bbps" },
                           { name: "UPI QR", href: "/#services" },
                           { name: "mPOS Solutions", href: "/#services" },
                           { name: "Credit Card Pay", href: "/bbps" },
                           { name: "Utility Bills", href: "/bbps" },
                           { name: "Recharge & DTH", href: "/bbps" },
                         ]
                       },
                       {
                         label: "Growth & Travel",
                         items: [
                           { name: "Business Loans", href: "/#booking" },
                           { name: "Flight Booking", href: "/#booking" },
                           { name: "Train Booking", href: "/#booking" },
                           { name: "Bus Booking", href: "/#booking" },
                           { name: "Hotel Booking", href: "/#booking" },
                           { name: "Insurance", href: "/insurance" },
                           { name: "GST & Compliance", href: "/compliance" },
                           { name: "Premium Upgrade", href: "/upgrade" },
                         ]
                       }
                     ].map((category) => (
                       <div key={category.label} className="border border-white/10 rounded-xl overflow-hidden">
                         <button
                           onClick={() => setExpandedCategory(expandedCategory === category.label ? null : category.label)}
                           className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors"
                         >
                           <span className="text-sm font-bold text-white">{category.label}</span>
                           <ChevronDown className={`h-4 w-4 text-cyan-400 transition-transform ${expandedCategory === category.label ? 'rotate-180' : ''}`} />
                         </button>
                         {expandedCategory === category.label && (
                           <div className="grid grid-cols-2 gap-2 p-3 bg-white/5">
                             {category.items.map((link) => (
                               <a key={link.name} href={link.href} className="text-sm text-white/70 hover:text-cyan-400 py-1 transition-colors" onClick={() => setIsOpen(false)}>
                                 {link.name}
                               </a>
                             ))}
                           </div>
                         )}
                       </div>
                     ))}
                   </div>
                 </div>
               </SheetContent>
             </Sheet>
          </div>
        </div>
      </div>
      <AuthDialog isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} defaultView={authView} />
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0a0a2e] via-[#1a0a3a] to-[#2a0a4a] py-24 mt-20 relative overflow-hidden text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center gap-3">
              <img 
                src={logoImg} 
                alt="Yek7pay" 
                className="h-16 w-auto brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
              />
            </div>
            <p className="text-white leading-relaxed text-sm max-w-xs mx-auto md:mx-0">
              Your trusted partner for all financial services. Secure, fast, and reliable solutions for individuals and businesses.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
               <div className="flex gap-3">
                  <a href="https://www.facebook.com/yek7pay" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#1877F2] border border-white/20 flex items-center justify-center transition-all duration-300 cursor-pointer group/social hover:scale-110">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/yek7pay" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#1DA1F2] border border-white/20 flex items-center justify-center transition-all duration-300 cursor-pointer group/social hover:scale-110">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/yek7pay" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] border border-white/20 flex items-center justify-center transition-all duration-300 cursor-pointer group/social hover:scale-110">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/yek7pay" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#0A66C2] border border-white/20 flex items-center justify-center transition-all duration-300 cursor-pointer group/social hover:scale-110">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
               </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <a href="mailto:info@yek7pay.com" className="flex items-center justify-center md:justify-start gap-4 group cursor-pointer">
                 <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-blue-500/30 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                 </div>
                 <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">info@yek7pay.com</span>
              </a>
              <a href="tel:+919230967187" className="flex items-center justify-center md:justify-start gap-4 group cursor-pointer">
                 <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white group-hover:bg-green-500/30 group-hover:border-green-500/50 group-hover:text-green-400 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                 </div>
                 <span className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">+91 9230967187</span>
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-display font-bold text-white mb-10 text-sm tracking-wider uppercase opacity-70">Banking & Remittance</h4>
            <ul className="space-y-3 text-sm text-white">
              <li><a href="/#banking" className="hover:text-blue-400 transition-all">Advance DMT</a></li>
              <li><a href="/#banking" className="hover:text-blue-400 transition-all">Neo Bank Unlimited</a></li>
              <li><a href="/#banking" className="hover:text-blue-400 transition-all">Indo-Nepal Remit</a></li>
              <li><a href="/#banking" className="hover:text-blue-400 transition-all">AEPS Withdrawal</a></li>
              <li><a href="/#banking" className="hover:text-blue-400 transition-all">Micro ATM</a></li>
              <li><a href="/#banking" className="hover:text-blue-400 transition-all">PPI Wallet</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-display font-bold text-white mb-10 text-sm tracking-wider uppercase opacity-70">Payments & Collection</h4>
            <ul className="space-y-3 text-sm text-white">
              <li><a href="/bbps" className="hover:text-blue-400 transition-all">Bharat Connect (BBPS)</a></li>
              <li><a href="/#services" className="hover:text-blue-400 transition-all">UPI QR Collection</a></li>
              <li><a href="/#services" className="hover:text-blue-400 transition-all">mPOS Card Solutions</a></li>
              <li><a href="/bbps" className="hover:text-blue-400 transition-all">Credit Card Bill Pay</a></li>
              <li><a href="/bbps" className="hover:text-blue-400 transition-all">Utility Payments</a></li>
              <li><a href="/bbps" className="hover:text-blue-400 transition-all">Recharge & DTH</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-display font-bold text-white mb-10 text-sm tracking-wider uppercase opacity-70">Growth & Travel</h4>
            <ul className="space-y-3 text-sm text-white">
              <li><a href="/#booking" className="hover:text-blue-400 transition-all">Business Loans</a></li>
              <li><a href="/#booking" className="hover:text-blue-400 transition-all">Flight Bookings</a></li>
              <li><a href="/#booking" className="hover:text-blue-400 transition-all">Train Bookings</a></li>
              <li><a href="/#booking" className="hover:text-blue-400 transition-all">Bus Bookings</a></li>
              <li><a href="/#booking" className="hover:text-blue-400 transition-all">Hotel Bookings</a></li>
              <li><a href="/compliance" className="hover:text-blue-400 transition-all">GST & Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col items-center mb-8">
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Download Our App</h4>
            <a 
              href="https://play.google.com/store/apps/details?id=com.yek7pay" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-green-500/20"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
              </svg>
              Get it on Google Play
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm text-white/70">
            <Link href="/about" className="hover:text-blue-400 transition-all">About Us</Link>
            <Link href="/terms" className="hover:text-blue-400 transition-all">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-blue-400 transition-all">Privacy Policy</Link>
            <a href="/upgrade" className="hover:text-blue-400 transition-all">Premium Upgrade</a>
          </div>
          <div className="mb-8">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest text-center">Our Trusted Partners</h4>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex flex-col items-center gap-2 px-6 py-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-12 h-12">
                    <circle cx="50" cy="50" r="45" fill="#97144D"/>
                    <path d="M30 65 L50 25 L70 65 L60 65 L50 45 L40 65 Z" fill="white"/>
                  </svg>
                </div>
                <span className="text-xs text-white/70 font-medium">Axis Bank</span>
              </div>
              <div className="flex flex-col items-center gap-2 px-6 py-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-12 h-12">
                    <rect width="100" height="100" fill="#ED1C24"/>
                    <path d="M20 70 Q50 20 80 70" stroke="white" strokeWidth="8" fill="none"/>
                    <circle cx="50" cy="35" r="8" fill="white"/>
                  </svg>
                </div>
                <span className="text-xs text-white/70 font-medium">Airtel</span>
              </div>
              <div className="flex flex-col items-center gap-2 px-6 py-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-12 h-12">
                    <rect width="100" height="100" fill="#1E3A8A"/>
                    <text x="50" y="60" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold" fontFamily="Arial">fino</text>
                  </svg>
                </div>
                <span className="text-xs text-white/70 font-medium">Fino Bank</span>
              </div>
              <div className="flex flex-col items-center gap-2 px-6 py-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-xl">N</span>
                </div>
                <span className="text-xs text-white/70 font-medium">Neo Bank</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-white tracking-[0.2em] font-medium uppercase text-center">
             © 2025 Yek7pay. All rights reserved. | Powering <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 font-black">India's</span> Financial Future
          </p>
        </div>
      </div>
    </footer>
  );
}
