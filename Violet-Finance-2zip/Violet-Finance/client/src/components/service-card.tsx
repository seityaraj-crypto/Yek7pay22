import { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  variant?: "default" | "featured";
  features?: string[];
  externalUrl?: string;
}

export function ServiceCard({ icon: Icon, title, description, delay = 0, variant = "default", features, externalUrl }: ServiceCardProps) {
  const isFeatured = variant === "featured";
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (externalUrl) {
      window.location.href = externalUrl;
    } else {
      setIsOpen(true);
    }
  };

  const defaultFeatures = [
    "Instant real-time processing",
    "Secure bank-grade encryption",
    "24/7 technical support"
  ];

  const displayFeatures = features || defaultFeatures;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.5, 
          delay,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        whileHover={{ 
          y: -20, 
          scale: 1.05,
          rotate: 1,
          boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`group relative p-8 rounded-3xl border transition-all duration-300 overflow-hidden cursor-pointer
          ${isFeatured 
            ? "bg-blue-950/40 border-white/10 shadow-2xl shadow-blue-950/20 backdrop-blur-sm" 
            : "bg-[#000d33] border-white/5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10"}`}
      >
        <div className={`
          mb-6 h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500
          ${isFeatured ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110"}
        `}>
          <Icon className="h-7 w-7" />
        </div>
        
        <h3 className="text-2xl font-display font-bold mb-3 transition-all bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          {title}
        </h3>
        
        <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
          {description}
        </p>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gradient-to-br from-[#0a0a2e] via-[#1a0a3a] to-[#2a0a4a] border-white/10 text-white sm:max-w-[500px] rounded-3xl backdrop-blur-3xl shadow-[0_0_50px_rgba(59,130,246,0.3)]">
          <DialogHeader>
            <div className="mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-400 to-purple-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] mx-auto animate-pulse">
              <Icon className="h-8 w-8" />
            </div>
            <DialogTitle className="text-3xl font-display font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 mb-4 drop-shadow-sm">
              {title}
            </DialogTitle>
            <div className="text-white/80 text-lg leading-relaxed text-center font-medium">
              {description}
              <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 text-left backdrop-blur-sm shadow-inner">
                <h4 className="text-sm font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Core Features</h4>
                <ul className="space-y-3">
                  {displayFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-white/90 font-medium group/item">
                      <div className={`h-2 w-2 rounded-full ${index % 2 === 0 ? "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" : "bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]"} transition-transform group-hover/item:scale-125`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
