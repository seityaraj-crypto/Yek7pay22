import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Terms() {
  const [activeTab, setActiveTab] = useState<'terms' | 'refund' | 'disclaimer'>('terms');

  const tabs = [
    { id: 'terms', label: 'Terms & Conditions', icon: '📋' },
    { id: 'refund', label: 'Refund & Cancellation', icon: '💰' },
    { id: 'disclaimer', label: 'General Disclaimer', icon: '⚠️' }
  ];

  const termsContent = [
    {
      id: 1,
      title: "Definitions",
      content: (
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p><strong className="text-white">"User", "you", or "your"</strong> refers to any person or entity using the Platform.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p><strong className="text-white">"Company", "we", "us", or "our"</strong> refers to Yek7Pay, a company incorporated in India.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p><strong className="text-white">"Services"</strong> refers to the OTA services flight and hotel bookings, mobile recharges, bill payments, and insurance services offered through the Platform.</p>
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

  const refundContent = [
    {
      id: 1,
      title: "Overview",
      content: "This Refund and Cancellation Policy explains the terms under which users of Yek7Pay may cancel transactions and receive refunds for services such as flight and hotel bookings, mobile recharges, bill payments, and insurance purchases. By using our services, you agree to the terms outlined below."
    },
    {
      id: 2,
      title: "General Conditions",
      content: (
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>All cancellations and refunds are subject to the policies of the respective third-party service providers (e.g., airlines, hotels, telecom operators, insurance companies).</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Yek7Pay acts as a facilitator and is not directly responsible for service delivery or refund decisions made by these providers.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Processing fees, gateway charges, and applicable taxes may be deducted from any refund amount.</p>
          </li>
        </ul>
      )
    },
    {
      id: 3,
      title: "Flight Bookings",
      content: (
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Cancellations are subject to airline fare rules and Yek7Pay service charges.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Refund eligibility and amount depend on the airline's cancellation policy and timing.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Refunds may take 7–10 business days to reflect in your account after processing.</p>
          </li>
        </ul>
      )
    },
    {
      id: 4,
      title: "Hotel Bookings",
      content: (
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Hotel cancellation terms vary by property and room type (e.g., refundable vs. non-refundable).</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Refunds for eligible cancellations are processed as per hotel partner policies.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>No-shows are generally non-refundable.</p>
          </li>
        </ul>
      )
    },
    {
      id: 5,
      title: "Mobile Recharge and Bill Payments",
      content: (
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Recharges and bill payments are processed instantly and cannot be canceled or refunded once initiated.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>In case of transaction failure or incorrect deduction, a refund will be processed automatically to your original payment method within 3–5 business days.</p>
          </li>
        </ul>
      )
    },
    {
      id: 6,
      title: "Insurance Policies",
      content: (
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Cancellation and refund of insurance premiums are subject to the terms of the respective IRDAI-licensed insurance provider.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Cooling-off or free-look periods apply as per regulatory guidelines (typically 15 days for life insurance).</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Yek7Pay does not take responsibility for claim-related or refund decisions.</p>
          </li>
        </ul>
      )
    },
    {
      id: 7,
      title: "Refund Process",
      content: (
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Refunds, when applicable, will be processed to the original mode of payment.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Users must retain transaction IDs and provide proof of payment to assist in the refund process.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>In certain cases, users may be asked to share their bank details (if required by partner systems).</p>
          </li>
        </ul>
      )
    },
    {
      id: 8,
      title: "Timeframe for Refunds",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/10">
                <th className="border border-white/20 px-4 py-3 text-left text-white">Service Type</th>
                <th className="border border-white/20 px-4 py-3 text-left text-white">Estimated Refund Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-white/20 px-4 py-3">Flight/Hotel Bookings</td>
                <td className="border border-white/20 px-4 py-3">7–10 business days</td>
              </tr>
              <tr className="bg-white/5">
                <td className="border border-white/20 px-4 py-3">Failed Recharges/Bills</td>
                <td className="border border-white/20 px-4 py-3">3–5 business days</td>
              </tr>
              <tr>
                <td className="border border-white/20 px-4 py-3">Insurance Cancellations</td>
                <td className="border border-white/20 px-4 py-3">10–15 business days (subject to provider)</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-sm text-white/50 italic">Note: These are standard timelines. Actual processing times may vary based on partner and banking infrastructure.</p>
        </div>
      )
    },
    {
      id: 9,
      title: "Non-Refundable Transactions",
      content: (
        <div className="space-y-4">
          <p>Refunds will not be provided in the following cases:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-red-400 font-bold">✗</span>
              <p>Services marked "non-refundable" or "non-cancellable" at the time of booking</p>
            </li>
            <li className="flex gap-4">
              <span className="text-red-400 font-bold">✗</span>
              <p>Transactions cancelled due to user error or incorrect information</p>
            </li>
            <li className="flex gap-4">
              <span className="text-red-400 font-bold">✗</span>
              <p>No-show for flight or hotel check-in without prior cancellation</p>
            </li>
            <li className="flex gap-4">
              <span className="text-red-400 font-bold">✗</span>
              <p>Mobile recharges or bill payments initiated with incorrect details</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 10,
      title: "Cancellation Fees",
      content: (
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Yek7Pay may charge a nominal cancellation processing fee for flight or hotel booking cancellations in addition to charges levied by the service provider.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Exact fees will be displayed during the cancellation process or informed via email.</p>
          </li>
        </ul>
      )
    },
    {
      id: 11,
      title: "Disputes and Escalations",
      content: (
        <div className="space-y-4">
          <p>If you face any issue with refunds or cancellations, you may:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">📧</span>
              <p>Contact our customer support at <a href="mailto:info@yek7pay.com" className="text-blue-400 hover:underline">info@yek7pay.com</a></p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">📧</span>
              <p>Escalate to our Grievance Officer at <a href="mailto:grievance@yek7pay.com" className="text-blue-400 hover:underline">grievance@yek7pay.com</a></p>
            </li>
          </ul>
          <p className="p-4 bg-green-500/10 border-l-4 border-green-500 rounded-r-xl">
            We are committed to resolving refund-related issues within 10 working days of receiving a formal complaint.
          </p>
        </div>
      )
    },
    {
      id: 12,
      title: "Contact Us",
      content: (
        <div className="space-y-4">
          <p className="font-bold text-white">Yek7Pay Solutions Private Limited</p>
          <ul className="space-y-2">
            <li className="flex gap-2 items-center">
              <span>📧</span>
              <p>Email: <a href="mailto:info@yek7pay.com" className="text-blue-400 hover:underline">info@yek7pay.com</a></p>
            </li>
            <li className="flex gap-2 items-center">
              <span>📞</span>
              <p>Phone: <a href="tel:+919230967187" className="text-blue-400 hover:underline">9230967187</a></p>
            </li>
            <li className="flex gap-2 items-start">
              <span>📍</span>
              <p>Address: GN-38/5, ANAYA CHAMBERS, 9TH FLOOR, SECTOR-5, SALT LAKE, Sech Bhawan, North 24 Parganas, Salt Lake, West Bengal, India, 700091</p>
            </li>
          </ul>
        </div>
      )
    }
  ];

  const disclaimerContent = [
    {
      id: 1,
      title: "Introduction",
      content: "This General Disclaimer (\"Disclaimer\") applies to your access and use of the Yek7Pay website, mobile application, and all associated services (collectively, \"Platform\"). By accessing or using the Platform, you acknowledge and agree to the terms of this Disclaimer. If you do not agree, please do not use the Platform."
    },
    {
      id: 2,
      title: "No Warranties",
      content: (
        <div className="space-y-4">
          <p>While Yek7Pay strives to provide accurate and timely information, all services and content on the Platform are provided on an "as-is" and "as-available" basis without warranties of any kind, either express or implied. Yek7Pay makes no representations or warranties regarding:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>The accuracy, completeness, or reliability of the information, content, or services offered</p>
            </li>
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>The uninterrupted or error-free operation of the Platform</p>
            </li>
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>The suitability, availability, or quality of third-party products and services offered via the Platform</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      title: "Third-Party Services and Liability",
      content: (
        <div className="space-y-4">
          <p>Yek7Pay operates as a technology aggregator and digital facilitator. Many services offered on the Platform, including flight bookings, hotel reservations, insurance policies, and utility bill payments, are fulfilled by third-party providers.</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>Yek7Pay does not own or operate airlines, hotels, telecom operators, insurance companies, or utility services.</p>
            </li>
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>Responsibility for service delivery, quality, availability, cancellations, and refunds lies solely with the respective third-party providers.</p>
            </li>
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>Any disputes, claims, or liabilities must be addressed directly with the concerned service provider.</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 4,
      title: "Payments and Transactions",
      content: (
        <div className="space-y-4">
          <p>Yek7Pay uses secure third-party payment gateways. However, it does not guarantee:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>Uninterrupted or error-free transaction processing</p>
            </li>
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>The recovery of funds in case of failed transactions initiated due to user error, technical issues, or third-party failures</p>
            </li>
          </ul>
          <p className="p-4 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-r-xl">
            Users are advised to retain transaction details and receipts for all payments made through the Platform.
          </p>
        </div>
      )
    },
    {
      id: 5,
      title: "Insurance Products",
      content: (
        <div className="space-y-4">
          <p>Insurance policies made available on Yek7Pay are underwritten and issued by IRDAI-licensed insurance companies. Yek7Pay does not:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>Offer advice on the suitability of specific insurance products</p>
            </li>
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>Bear responsibility for claims, approvals, rejections, or delays in policy issuance</p>
            </li>
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>Act as an insurer or claims handler</p>
            </li>
          </ul>
          <p className="italic text-white/60">All policy-related queries, disputes, and claims must be addressed to the respective insurance company.</p>
        </div>
      )
    },
    {
      id: 6,
      title: "No Financial or Legal Advice",
      content: "The content on the Platform, including blogs, articles, product comparisons, or policy summaries, is for informational purposes only and does not constitute financial, legal, or professional advice. Users are encouraged to seek independent advice before making any financial or insurance-related decisions."
    },
    {
      id: 7,
      title: "Limitation of Liability",
      content: (
        <div className="space-y-4">
          <p>To the fullest extent permitted by law, Yek7Pay, its directors, employees, agents, or affiliates shall not be liable for any:</p>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>Direct, indirect, incidental, consequential, or special damages</p>
            </li>
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>Loss of data, profits, goodwill, or business interruption</p>
            </li>
            <li className="flex gap-4">
              <span className="text-yellow-400 font-bold">•</span>
              <p>Any damages arising out of the use or inability to use the Platform or third-party services</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 8,
      title: "External Links",
      content: "The Platform may contain links to third-party websites or apps. Yek7Pay does not control or endorse the content, privacy practices, or policies of these external sites and disclaims any liability associated with their use."
    },
    {
      id: 9,
      title: "Changes to the Disclaimer",
      content: "Yek7Pay reserves the right to modify, update, or replace this Disclaimer at any time without prior notice. Continued use of the Platform following any changes indicates acceptance of the revised Disclaimer."
    },
    {
      id: 10,
      title: "Contact Us",
      content: (
        <div className="space-y-4">
          <p>For any questions regarding this Disclaimer or to report misuse or violations:</p>
          <p className="font-bold text-white">Yek7Pay Solutions Private Limited</p>
          <ul className="space-y-2">
            <li className="flex gap-2 items-center">
              <span>📧</span>
              <p>Email: <a href="mailto:info@yek7pay.com" className="text-blue-400 hover:underline">info@yek7pay.com</a></p>
            </li>
            <li className="flex gap-2 items-start">
              <span>📍</span>
              <p>Address: GN-38/5, ANAYA CHAMBERS, 9TH FLOOR, SECTOR-5, SALT LAKE, Sech Bhawan, North 24 Parganas, Salt Lake, West Bengal, India, 700091</p>
            </li>
          </ul>
        </div>
      )
    }
  ];

  const getContent = () => {
    switch (activeTab) {
      case 'terms':
        return termsContent;
      case 'refund':
        return refundContent;
      case 'disclaimer':
        return disclaimerContent;
      default:
        return termsContent;
    }
  };

  const getIntroText = () => {
    switch (activeTab) {
      case 'terms':
        return "Welcome to Yek7Pay. Please read these Terms and Conditions (\"Terms\") carefully before accessing or using the Yek7Pay platform, including its website, mobile application, and services (collectively referred to as the \"Platform\"). By accessing or using the Platform, you agree to be bound by these Terms and our Privacy Policy.";
      case 'refund':
        return "This policy explains the terms under which users of Yek7Pay may cancel transactions and receive refunds for various services. Understanding these policies helps ensure a smooth experience when managing your bookings and payments.";
      case 'disclaimer':
        return "This General Disclaimer applies to your access and use of the Yek7Pay platform. Please read it carefully to understand the limitations and terms of our services.";
      default:
        return "";
    }
  };

  const getWarningText = () => {
    switch (activeTab) {
      case 'terms':
        return "If you do not agree to these Terms, you may not access or use the Platform.";
      case 'refund':
        return "All refunds are subject to the policies of respective third-party service providers. Please review service-specific terms before booking.";
      case 'disclaimer':
        return "By using our Platform, you acknowledge and accept the terms of this Disclaimer.";
      default:
        return "";
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'terms':
        return "Terms & Conditions";
      case 'refund':
        return "Refund & Cancellation Policy";
      case 'disclaimer':
        return "General Disclaimer";
      default:
        return "Terms & Conditions";
    }
  };

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
          <div className="text-center mb-8">
            <h1 className="text-5xl font-display font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Legal Policies
            </h1>
            <p className="text-white/60 font-medium">
              Effective Date: 27-05-2025 | Last Updated: 27-05-2025
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'terms' | 'refund' | 'disclaimer')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
          
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 text-white/80 leading-relaxed"
          >
            <section className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-white mb-6">{getTitle()}</h2>
              
              <p className="text-lg mb-8">
                {getIntroText()}
              </p>
              
              <p className="text-lg font-bold text-white mb-12 p-6 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-xl">
                {getWarningText()}
              </p>

              <div className="space-y-12">
                {getContent().map((section) => (
                  <div key={section.id}>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${section.id % 2 === 0 ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'} text-sm`}>
                        {section.id}
                      </span>
                      {section.title}
                    </h3>
                    <div className="text-white/70">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
