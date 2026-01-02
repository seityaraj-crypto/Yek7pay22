import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";

export default function Terms() {
  const sections = [
    {
      id: 1,
      title: "Definitions",
      content: (
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p><strong className="text-white">“User”, “you”, or “your”</strong> refers to any person or entity using the Platform.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p><strong className="text-white">“Company”, “we”, “us”, or “our”</strong> refers to Yek7Pay, a company incorporated in India.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p><strong className="text-white">“Services”</strong> refers to the OTA services flight and hotel bookings, mobile recharges, bill payments, and insurance services offered through the Platform.</p>
          </li>
        </ul>
      )
    },
    {
      id: 2,
      title: "Eligibility",
      content: "You must be at least 18 years of age and legally capable of entering a binding contract under the Indian Contract Act, 1872. By using the Platform, you represent that you meet this requirement."
    },
    {
      id: 3,
      title: "Services Offered",
      content: (
        <div className="space-y-4">
          <p>Yek7Pay provides a unified platform that enables Users to:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Book domestic and international flights and hotels</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Perform mobile recharges and utility bill payments</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Purchase and manage various types of insurance policies (health, travel, life, etc.)</p>
            </li>
          </ul>
          <p className="p-4 bg-white/5 rounded-xl border border-white/5 italic">
            All services are provided through third-party service providers, and Yek7Pay acts only as a facilitator.
          </p>
        </div>
      )
    },
    {
      id: 4,
      title: "User Obligations",
      content: (
        <div className="space-y-4">
          <p>By using the Platform, you agree to:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Provide accurate, complete, and current information</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Maintain the confidentiality of your account credentials</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Use the Platform only for lawful purposes</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Not engage in any fraudulent, abusive, or harmful activity</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 5,
      title: "Payments and Refunds",
      content: (
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Payments made on the Platform are processed through secure payment gateways.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>For cancellations, refunds, or modifications, please refer to the specific policies applicable to the respective service (e.g., airline refund policy, hotel cancellation terms, or insurance refund clauses).</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Yek7Pay is not liable for delays in refunds or failures attributable to third-party service providers.</p>
          </li>
        </ul>
      )
    },
    {
      id: 6,
      title: "Insurance Services",
      content: (
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Insurance policies are underwritten by IRDAI-licensed insurance providers.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Yek7Pay acts only as an intermediary or corporate agent and is not responsible for claims processing or underwriting decisions.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Users must read the policy documents carefully before purchasing and acknowledge that final responsibility for choosing a policy rest with them.</p>
          </li>
        </ul>
      )
    },
    {
      id: 7,
      title: "Data Privacy",
      content: "Yek7Pay collects, uses, stores, and processes personal data in accordance with YEK7PAY Privacy Policy and applicable laws, including the Digital Personal Data Protection Act, 2023. By using the Platform, you consent to such data practices."
    },
    {
      id: 8,
      title: "Intellectual Property",
      content: "All content, trademarks, logos, software, and materials on the Platform are the intellectual property of Yek7Pay or its licensors. You may not reproduce, distribute, or exploit any part of the Platform without express written consent."
    },
    {
      id: 9,
      title: "Limitation of Liability",
      content: "To the fullest extent permitted by law, Yek7Pay shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to your use of the Platform, or any third-party services accessed through it."
    },
    {
      id: 10,
      title: "Indemnification",
      content: "You agree to indemnify, defend, and hold harmless Yek7Pay and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in connection with your use of the Platform or breach of these Terms."
    },
    {
      id: 11,
      title: "Termination",
      content: "We reserve the right to suspend or terminate your access to the Platform at our sole discretion, with or without notice, for any reason including but not limited to breach of these Terms."
    },
    {
      id: 12,
      title: "Governing Law and Jurisdiction",
      content: "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Kolkata, India."
    },
    {
      id: 13,
      title: "Amendments",
      content: "Yek7Pay reserves the right to modify or update these Terms at any time. Continued use of the Platform following the posting of changes constitutes acceptance of those changes."
    },
    {
      id: 14,
      title: "Contact Us",
      content: (
        <p>
          For any questions or grievances related to these Terms or our services, you may contact{" "}
          <a href="mailto:info@yek7pay.com" className="text-blue-400 hover:underline">
            info@yek7pay.com
          </a>{" "}
          or call us at +91 9230967187.
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
            <h1 className="text-5xl font-display font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Terms & Conditions
            </h1>
            <p className="text-white/60 font-medium">
              Effective Date: 27-05-2025 | Last Updated: 27-05-2025
            </p>
          </div>
          
          <div className="space-y-8 text-white/80 leading-relaxed">
            <section className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl">
              <p className="text-lg mb-8">
                Welcome to Yek7Pay. Please read these Terms and Conditions ("Terms") carefully before accessing or using the Yek7Pay platform, including its website, mobile application, and services (collectively referred to as the "Platform"). By accessing or using the Platform, you agree to be bound by these Terms and our Privacy Policy.
              </p>
              
              <p className="text-lg font-bold text-white mb-12 p-6 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-xl">
                If you do not agree to these Terms, you may not access or use the Platform.
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
