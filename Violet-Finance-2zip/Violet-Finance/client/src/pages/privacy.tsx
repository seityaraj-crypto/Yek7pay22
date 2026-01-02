import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";

export default function Privacy() {
  const sections = [
    {
      id: 1,
      title: "Information We Collect",
      content: "We collect information you provide directly to us when you create an account, use our services, or communicate with us. This includes personal identification information, contact details, and financial information necessary for banking and remittance services."
    },
    {
      id: 2,
      title: "How We Use Information",
      content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send technical notices, and provide customer support. We also use information to detect, investigate, and prevent fraudulent transactions and other illegal activities."
    },
    {
      id: 3,
      title: "Information Sharing",
      content: "We do not share your personal information with third parties except as described in this policy. We may share information with service providers who perform services on our behalf, or when required by law to protect our rights or the safety of others."
    },
    {
      id: 4,
      title: "Data Security",
      content: "We implement a variety of security measures to maintain the safety of your personal information. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems."
    },
    {
      id: 5,
      title: "Your Choices",
      content: "You may access, update, or correct your account information at any time by logging into your online account. You can also request the deletion of your personal data, subject to legal and contractual obligations."
    },
    {
      id: 6,
      title: "Contact Us",
      content: (
        <p>
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:privacy@yek7pay.com" className="text-blue-400 hover:underline">
            privacy@yek7pay.com
          </a>.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b3b] via-[#0d0d2b] to-[#0a1a3a] text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-5xl font-display font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Privacy Policy
            </h1>
            <p className="text-white/60 font-medium">
              Effective Date: 27-05-2025 | Last Updated: 27-05-2025
            </p>
          </div>
          
          <div className="space-y-8 text-white/80 leading-relaxed">
            <section className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl">
              <p className="text-lg mb-8">
                At Yek7Pay, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
              </p>

              <div className="space-y-12">
                {sections.map((section) => (
                  <div key={section.id}>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${section.id % 2 === 0 ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'} text-sm`}>
                        {section.id}
                      </span>
                      {section.title}
                    </h2>
                    <div className="text-white/70">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
