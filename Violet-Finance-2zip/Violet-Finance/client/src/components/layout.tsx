import * as React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Shield, Bell, ChevronDown, Landmark, Send, Globe, Fingerprint, CreditCard, Banknote, Briefcase, Zap, Receipt, Plane, Train, Building2, ClipboardCheck, Smartphone } from "lucide-react";
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

  const services = [
    {
      label: "Banking",
      items: [
        { name: "Advance DMT", icon: Send, href: "/#banking" },
        { name: "Neo Bank Unlimited", icon: Landmark, href: "/#banking" },
        { name: "Indo-Nepal Remit", icon: Globe, href: "/#banking" },
        { name: "AEPS Withdrawal", icon: Fingerprint, href: "/#banking" },
        { name: "Micro ATM", icon: Smartphone, href: "/#banking" },
      ]
    },
    {
      label: "Payments",
      items: [
        { name: "Bharat Connect (BBPS)", icon: Receipt, href: "/bbps" },
        { name: "UPI QR Collection", icon: Zap, iconColor: "text-yellow-500", href: "/#services" },
        { name: "mPOS Card Solutions", icon: CreditCard, href: "/#services" },
        { name: "PPI Wallet", icon: Briefcase, href: "/#banking" },
      ]
    },
    {
      label: "Growth & Travel",
      items: [
        { name: "Business Loans", icon: Building2, href: "/#booking" },
        { name: "Flight Bookings", icon: Plane, href: "/#booking" },
        { name: "Train Bookings", icon: Train, href: "/#booking" },
        { name: "GST & Compliance", icon: ClipboardCheck, href: "/compliance" },
      ]
    }
  ];

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-[#f5f5f7]/95 backdrop-blur-xl h-14 flex items-center shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <div className="relative">
             <img 
               src={logoImg} 
               alt="Yek7pay" 
               className="h-14 w-auto transition-all duration-500 group-hover:scale-110 brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
             />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/" className="text-sm font-bold text-slate-700 hover:text-blue-600 active:text-purple-600 transition-all uppercase tracking-widest px-4 h-9 flex items-center rounded-lg hover:bg-blue-50/50">Home</Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-bold text-slate-700 hover:text-blue-600 active:text-purple-600 transition-all uppercase tracking-widest outline-none px-4 h-9 rounded-lg hover:bg-blue-50/50">
              Services <ChevronDown className="h-4 w-4" />
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

          <a href="/bbps" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-all uppercase tracking-widest px-4 h-9 flex items-center rounded-lg hover:bg-slate-200/50">Bharat Connect</a>
          <Link href="/about" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-all uppercase tracking-widest px-4 h-9 flex items-center rounded-lg hover:bg-slate-200/50">About Us</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-slate-500">
            <div className="flex flex-col items-end">
              <span>info@yek7pay.com</span>
              <span>+91 9230967187</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
             <Button variant="ghost" className="text-sm text-slate-700 font-bold hover:text-blue-600 hover:bg-slate-200/50" onClick={() => setIsAuthOpen(true)}>
               Login
             </Button>
             <Button className="bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500 hover:opacity-90 text-white border-0 shadow-[0_0_20px_rgba(59,130,246,0.3)] rounded-full px-4 md:px-8 h-10 md:h-11 text-xs md:text-sm font-bold transition-all hover:scale-105 active:scale-95" onClick={() => setIsAuthOpen(true)}>
               Open Account
             </Button>
          </div>

          <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" className="text-blue-400 relative hover:text-primary hover:bg-blue-50 hidden sm:flex">
               <Bell className="h-5 w-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
             </Button>
             
             {/* Mobile Nav Toggle */}
             <Sheet open={isOpen} onOpenChange={setIsOpen}>
               <SheetTrigger asChild className="lg:hidden">
                 <Button variant="ghost" size="icon" className="text-blue-900">
                   <Menu className="h-6 w-6" />
                 </Button>
               </SheetTrigger>
               <SheetContent className="bg-blue-50 border-l border-blue-100 w-[320px] text-blue-950">
                 <div className="flex flex-col gap-8 mt-12">
                   <div className="flex items-center justify-center mb-4">
                     <img src={logoImg} alt="Yek7pay" className="h-10 w-auto" />
                   </div>
                   
                   <div className="grid grid-cols-1 gap-4">
                     <Button variant="outline" className="w-full border-blue-200 text-blue-900 font-bold hover:bg-blue-100/50 h-12" onClick={() => { setIsAuthOpen(true); setIsOpen(false); }}>
                       Login
                     </Button>
                     <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 border-0 hover:opacity-90 text-white rounded-full font-bold h-12 shadow-lg shadow-blue-500/10" onClick={() => { setIsAuthOpen(true); setIsOpen(false); }}>
                       Open Account
                     </Button>
                   </div>

                   <div className="space-y-4 pt-4 border-t border-blue-100">
                     {[
                       { name: "Banking", href: "/#banking" },
                       { name: "Services", href: "/#services" },
                       { name: "Bharat Connect", href: "/bbps" },
                       { name: "Insurance", href: "/insurance" },
                       { name: "Booking", href: "/#booking" },
                     ].map((link) => (
                       <a 
                         key={link.name} 
                         href={link.href}
                         className="block text-lg font-bold text-blue-900 hover:text-primary transition-all tracking-wide"
                         onClick={() => setIsOpen(false)}
                       >
                         {link.name}
                       </a>
                     ))}
                   </div>
                 </div>
               </SheetContent>
             </Sheet>
          </div>
        </div>
      </div>
      <AuthDialog isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} />
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
                  {[
                    { icon: 'f', color: 'bg-[#1877F2]', label: 'Facebook' },
                    { icon: 't', color: 'bg-[#1DA1F2]', label: 'Twitter' },
                    { icon: 'i', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', label: 'Instagram' },
                    { icon: 'in', color: 'bg-[#0A66C2]', label: 'LinkedIn' }
                  ].map((social, i) => (
                    <div key={i} className={`w-10 h-10 rounded-xl ${social.color} border border-white/20 flex items-center justify-center transition-all duration-300 cursor-pointer group/social`}>
                       <span className="text-sm font-bold uppercase text-white group-hover/social:scale-110 transition-transform">{social.icon}</span>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-center md:justify-start gap-4 group cursor-pointer">
                 <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-blue-500/30 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all">
                    <span className="text-lg">✉</span>
                 </div>
                 <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">info@yek7pay.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 group cursor-pointer">
                 <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white group-hover:bg-blue-500/30 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all">
                    <span className="text-lg">📞</span>
                 </div>
                 <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">+91 9230967187</span>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-display font-bold text-white mb-10 text-sm tracking-wider uppercase opacity-70">Services</h4>
            <ul className="space-y-4 text-sm text-white">
              <li><a href="#" className="hover:text-blue-400 transition-all">Money Transfer</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">AEPS Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">Loans</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">Travel Bookings</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-display font-bold text-white mb-10 text-sm tracking-wider uppercase opacity-70">Company</h4>
            <ul className="space-y-4 text-sm text-white">
              <li><Link href="/about" className="hover:text-blue-400 transition-all">About Us</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">Contact</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-display font-bold text-white mb-10 text-sm tracking-wider uppercase opacity-70">Support</h4>
            <ul className="space-y-4 text-sm text-white">
              <li><a href="#" className="hover:text-blue-400 transition-all">Help Center</a></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-all">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-all">Privacy Policy</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">FAQs</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-12 text-center">
          <p className="text-[11px] text-white tracking-[0.2em] font-medium uppercase">
             © 2025 Yek7pay. All rights reserved. | Powering India's Financial Future
          </p>
        </div>
      </div>
    </footer>
  );
}
