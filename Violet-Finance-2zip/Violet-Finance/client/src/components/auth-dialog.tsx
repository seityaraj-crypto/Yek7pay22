import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ isOpen, onOpenChange }: AuthDialogProps) {
  const handleAction = (action: string) => {
    console.log(`${action} clicked`);
    // Future integration point
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            // Default to login or first action
            handleAction("Login");
          }
        }}
        className="bg-gradient-to-br from-[#0a0a2e] via-[#1a0a3a] to-[#2a0a4a] border-white/10 text-white sm:max-w-[450px] rounded-3xl backdrop-blur-3xl shadow-[0_0_50px_rgba(59,130,246,0.3)]"
      >
        <DialogHeader>
          <div className="mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-400 to-purple-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] mx-auto animate-pulse">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <DialogTitle className="text-3xl font-display font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 mb-2">
            Get Started
          </DialogTitle>
          <DialogDescription className="text-white/70 text-lg text-center mb-8">
            Choose an option to continue with Yek7Pay
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a href="https://wa.me/919230967187?text=Hi%2C%20I%20want%20to%20open%20an%20account%20with%20Yek7Pay" target="_blank" rel="noopener noreferrer" className="w-full" onClick={() => onOpenChange(false)}>
              <Button 
                className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-400 border-0 text-white rounded-2xl font-bold text-lg flex items-center justify-between px-6 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <UserPlus className="h-5 w-5" />
                  </div>
                  <span>Open Account</span>
                </div>
                <span className="text-white/40 group-hover:text-white transition-colors">→</span>
              </Button>
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline"
              className="w-full h-16 bg-white/5 border-white/10 text-white rounded-2xl font-bold text-lg flex items-center justify-between px-6 group hover:bg-white/10 hover:border-blue-500/50"
              onClick={() => {
                // Future integration point
                console.log("Login clicked");
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <LogIn className="h-5 w-5" />
                </div>
                <span>Login</span>
              </div>
              <span className="text-white/40 group-hover:text-blue-400 transition-colors">→</span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/upgrade">
              <Button 
                onClick={() => onOpenChange(false)}
                className="w-full h-16 bg-gradient-to-r from-pink-600 to-purple-600 border-0 text-white rounded-2xl font-bold text-lg flex items-center justify-between px-6 group shadow-lg shadow-pink-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-widest text-white/60 font-black">Special Offer</div>
                    <span>Upgrade Premium ₹999</span>
                  </div>
                </div>
                <span className="text-white/40 group-hover:text-white transition-colors">→</span>
              </Button>
            </Link>
          </motion.div>
        </div>

        <p className="text-center text-xs text-white/40 mt-8 leading-relaxed">
          By continuing, you agree to our <br />
          <a href="/terms" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
