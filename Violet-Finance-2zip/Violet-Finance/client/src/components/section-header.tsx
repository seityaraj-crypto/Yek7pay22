import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ badge, title, description, align = "left", className }: SectionHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"} ${className || ""}`}
    >
      <span className="text-primary font-bold text-sm tracking-wider uppercase mb-3 block">
        {badge}
      </span>
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500">
        {title}
      </h2>
      <p className={`text-lg ${className?.includes('text-white') ? 'text-white' : 'text-muted-foreground'}`}>
        {description}
      </p>
    </motion.div>
  );
}
