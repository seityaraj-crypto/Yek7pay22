import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Privacy() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'grievance'>('privacy');

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy', icon: '🔒' },
    { id: 'grievance', label: 'Grievance Redressal', icon: '📞' }
  ];

  const privacyContent = [
    {
      id: 1,
      title: "Who We Are",
      content: "Yek7Pay combines travel, payments, and insurance into one seamless, user-friendly experience. Whether you're booking a flight, settling bills, or buying insurance, we're your digital companion for a smoother, more connected lifestyle."
    },
    {
      id: 2,
      title: "Information We Collect",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-white mb-3">a) Personal Information</h4>
            <p className="mb-3">We may collect the various types of personal data:</p>
            <ul className="space-y-2">
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">•</span>
                <p>Full name, Email address, Mobile number</p>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">•</span>
                <p>Government-issued ID (for KYC where required)</p>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">•</span>
                <p>Address and location data, Date of birth</p>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">•</span>
                <p>Payment details and transaction history</p>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">•</span>
                <p>Travel preferences and insurance information</p>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">b) Usage and Technical Information</h4>
            <p className="mb-3">We automatically collect:</p>
            <ul className="space-y-2">
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">•</span>
                <p>IP address and device type</p>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">•</span>
                <p>Browser type and operating system</p>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">•</span>
                <p>App usage data and clickstream patterns</p>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">•</span>
                <p>Location data (if enabled)</p>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-400 font-bold">•</span>
                <p>Cookies and similar tracking technologies</p>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "How We Use Your Personal Information",
      content: (
        <div className="space-y-4">
          <p>We use your information to:</p>
          <ul className="space-y-2">
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Process flight, hotel, and insurance bookings</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Complete digital payments and bill settlements</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Verify your identity and comply with legal requirements</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Provide real-time transaction updates and confirmations</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Deliver customer support and resolve service issues</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Send promotional offers, news, or alerts (with consent)</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Improve our technology, services, and user experience</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Secure our platform and detect suspicious or fraudulent activity</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 4,
      title: "Sharing Your Information",
      content: (
        <div className="space-y-4">
          <p>We may share your information with:</p>
          <ul className="space-y-2">
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Trusted partners (e.g., airlines, hotels, payment processors, insurance providers)</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Government or law enforcement agencies (as required by law)</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Third-party service providers (e.g., cloud hosting, analytics tools)</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Entities involved in a business merger, acquisition, or asset transfer</p>
            </li>
          </ul>
          <p className="p-4 bg-green-500/10 border-l-4 border-green-500 rounded-r-xl font-bold text-white">
            We do not sell or rent your personal data.
          </p>
        </div>
      )
    },
    {
      id: 5,
      title: "Your Privacy Choices",
      content: (
        <div className="space-y-4">
          <p>You have the right to:</p>
          <ul className="space-y-2">
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">✓</span>
              <p>Access and update your information</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">✓</span>
              <p>Request deletion of your data (subject to legal limits)</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">✓</span>
              <p>Opt out of marketing communications</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">✓</span>
              <p>Withdraw consent where applicable</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">✓</span>
              <p>Request a copy of the data we store about you</p>
            </li>
          </ul>
          <p className="mt-4">For queries, please email us at <a href="mailto:info@yek7pay.com" className="text-blue-400 hover:underline">info@yek7pay.com</a>.</p>
        </div>
      )
    },
    {
      id: 6,
      title: "Data Security",
      content: "We use enterprise-grade security measures including encryption, secure servers, firewalls, and real-time fraud monitoring. While we follow best practices, no platform is 100% immune to risk. We recommend you also take precautions to protect your information (e.g., secure passwords, avoid sharing OTPs)."
    },
    {
      id: 7,
      title: "Cookies and Tracking Technologies",
      content: (
        <div className="space-y-4">
          <p>We use cookies and similar technologies to:</p>
          <ul className="space-y-2">
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Keep you logged in</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Store preferences</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Track usage for analytics and improvements</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Display relevant ads (where applicable)</p>
            </li>
          </ul>
          <p className="text-white/60 italic">You can manage or disable cookies in your browser or device settings.</p>
        </div>
      )
    },
    {
      id: 8,
      title: "Children's Privacy",
      content: "Our services are not designed for individuals under the age of 18. We do not knowingly collect personal data from minors. Yek7Pay obtains verifiable consent from a parent or legal guardian prior to the collection, use, or processing of personal data pertaining to children."
    },
    {
      id: 9,
      title: "Data Retention",
      content: "We retain your data only as long as necessary to fulfil the purposes outlined above, or as required by law (e.g., financial regulations)."
    },
    {
      id: 10,
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy periodically. Any significant changes will be communicated via our website or app. Your continued use of our services after changes indicates acceptance."
    },
    {
      id: 11,
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

  const grievanceContent = [
    {
      id: 1,
      title: "Objective",
      content: "This Grievance Redressal Policy outlines Yek7Pay's commitment to addressing and resolving customer complaints and grievances in a transparent, fair, and timely manner. Our goal is to ensure high levels of customer satisfaction and compliance with regulatory requirements, including guidelines from the Reserve Bank of India (RBI), IRDAI, and Consumer Protection Act, where applicable."
    },
    {
      id: 2,
      title: "Scope",
      content: (
        <div className="space-y-4">
          <p>This policy applies to all users of Yek7Pay's platform who avail of services such as:</p>
          <ul className="space-y-2">
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Flight bookings</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Hotel bookings</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Mobile recharge and utility bill payments</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Insurance products (via licensed partners)</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      title: "Key Principles",
      content: (
        <div className="space-y-4">
          <p>Yek7Pay's grievance redressal process is guided by the following principles:</p>
          <ul className="space-y-3">
            <li className="flex gap-4">
              <span className="text-green-400 font-bold">✓</span>
              <p><strong className="text-white">Accessibility:</strong> Multiple and easy-to-use channels for lodging complaints</p>
            </li>
            <li className="flex gap-4">
              <span className="text-green-400 font-bold">✓</span>
              <p><strong className="text-white">Transparency:</strong> Clear communication on resolution timelines and status</p>
            </li>
            <li className="flex gap-4">
              <span className="text-green-400 font-bold">✓</span>
              <p><strong className="text-white">Timeliness:</strong> Prompt acknowledgement and resolution of grievances</p>
            </li>
            <li className="flex gap-4">
              <span className="text-green-400 font-bold">✓</span>
              <p><strong className="text-white">Accountability:</strong> Dedicated redressal team and escalation process</p>
            </li>
            <li className="flex gap-4">
              <span className="text-green-400 font-bold">✓</span>
              <p><strong className="text-white">Confidentiality:</strong> All grievance details and customer data are handled with strict confidentiality</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 4,
      title: "How to Raise a Grievance",
      content: (
        <div className="space-y-6">
          <p>Customers can register a complaint through the following channels:</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <span>📧</span> Email
              </h4>
              <p>Send an email with your complaint and supporting details to:</p>
              <a href="mailto:info@yek7pay.com" className="text-blue-400 hover:underline font-bold">info@yek7pay.com</a>
            </div>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <span>📞</span> Call Support
              </h4>
              <p>Customer Care: <a href="tel:+919230967187" className="text-blue-400 hover:underline font-bold">9230967187</a></p>
              <p className="text-sm text-white/50 mt-2">Available: Monday to Saturday, 9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Grievance Redressal Process",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/10">
                <th className="border border-white/20 px-4 py-3 text-left text-white">Level</th>
                <th className="border border-white/20 px-4 py-3 text-left text-white">Description</th>
                <th className="border border-white/20 px-4 py-3 text-left text-white">Response Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-white/20 px-4 py-3 font-bold text-blue-400">L1</td>
                <td className="border border-white/20 px-4 py-3">Submit complaint via support ticket, email, or phone</td>
                <td className="border border-white/20 px-4 py-3">Within 48 working hours</td>
              </tr>
              <tr className="bg-white/5">
                <td className="border border-white/20 px-4 py-3 font-bold text-purple-400">L2</td>
                <td className="border border-white/20 px-4 py-3">If unsatisfied with Level 1, escalate to the Grievance Officer</td>
                <td className="border border-white/20 px-4 py-3">Response within 5 working days</td>
              </tr>
              <tr>
                <td className="border border-white/20 px-4 py-3 font-bold text-red-400">L3</td>
                <td className="border border-white/20 px-4 py-3">Escalate to regulatory bodies (e.g., RBI Ombudsman, IRDAI, Consumer Forum) if the issue remains unresolved</td>
                <td className="border border-white/20 px-4 py-3">As per regulatory timelines</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: 6,
      title: "Grievance Officer Details",
      content: (
        <div className="p-6 bg-purple-500/10 rounded-xl border border-purple-500/30">
          <p className="font-bold text-white mb-2">Grievance Officer Contact</p>
          <p>Email: <a href="mailto:grievance@yek7pay.com" className="text-purple-400 hover:underline font-bold">grievance@yek7pay.com</a></p>
        </div>
      )
    },
    {
      id: 7,
      title: "Categories of Grievances Covered",
      content: (
        <div className="space-y-4">
          <p>This policy covers (but is not limited to) the following complaint types:</p>
          <ul className="space-y-2">
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Failed transactions or payment processing errors</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Service not delivered despite payment (e.g., failed booking or recharge)</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Delay or non-receipt of refund</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Issues related to insurance policy issuance or claim processing</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Incorrect or misleading service information</p>
            </li>
            <li className="flex gap-4">
              <span className="text-blue-400 font-bold">•</span>
              <p>Poor customer service response or communication gaps</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 8,
      title: "Exclusions",
      content: "Grievances not related to Yek7Pay services or raised after 60 days from the date of the transaction may not be entertained unless justified by exceptional circumstances."
    },
    {
      id: 9,
      title: "Resolution and Escalation",
      content: (
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>All grievances are logged with a unique Ticket ID for tracking.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Customers will receive updates at each stage of the resolution process.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>If the issue is not resolved within the stated timelines, users may escalate directly to the Grievance Officer.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>For unresolved complaints, customers may approach external forums including the RBI Ombudsman, IRDAI Grievance Cell, or Consumer Protection Council.</p>
          </li>
        </ul>
      )
    },
    {
      id: 10,
      title: "Customer Rights",
      content: (
        <div className="space-y-4">
          <p>Customers have the right to:</p>
          <ul className="space-y-2">
            <li className="flex gap-4">
              <span className="text-green-400 font-bold">✓</span>
              <p>Receive fair and prompt resolution of genuine complaints</p>
            </li>
            <li className="flex gap-4">
              <span className="text-green-400 font-bold">✓</span>
              <p>Be treated with respect and without bias</p>
            </li>
            <li className="flex gap-4">
              <span className="text-green-400 font-bold">✓</span>
              <p>Be informed of the status and outcome of their grievance</p>
            </li>
            <li className="flex gap-4">
              <span className="text-green-400 font-bold">✓</span>
              <p>Escalate the issue as per the policy if not satisfied with the initial response</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 11,
      title: "Regulatory References",
      content: (
        <ul className="space-y-2">
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>RBI – Master Directions on Digital Payment Services</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>IRDAI – Guidelines on Insurance Distribution & Grievance Redressal</p>
          </li>
          <li className="flex gap-4">
            <span className="text-blue-400 font-bold">•</span>
            <p>Consumer Protection Act, 2019</p>
          </li>
        </ul>
      )
    },
    {
      id: 12,
      title: "Disclaimer",
      content: "Yek7Pay acts as a facilitator of services provided by third-party partners. Final liability and resolution for services such as flight bookings, hotel stays, or insurance claims rest with the respective providers, in accordance with their terms and policies."
    }
  ];

  const getContent = () => {
    switch (activeTab) {
      case 'privacy':
        return privacyContent;
      case 'grievance':
        return grievanceContent;
      default:
        return privacyContent;
    }
  };

  const getIntroText = () => {
    switch (activeTab) {
      case 'privacy':
        return "At Yek7Pay Solutions Private Limited (\"Yek7Pay\", \"we\", \"our\", or \"us\"), we are committed to protecting your privacy. As a modern fintech platform that simplifies how people travel, pay, and protect what matters, we take data protection seriously and ensure that your personal information is handled securely and transparently.";
      case 'grievance':
        return "We are committed to providing you with the highest level of service. If you have any concerns or complaints, we want to hear from you. This policy outlines how we handle grievances and ensure fair resolution.";
      default:
        return "";
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'privacy':
        return "Privacy Policy";
      case 'grievance':
        return "Grievance Redressal Policy";
      default:
        return "Privacy Policy";
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
            <h1 className="text-5xl font-display font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Privacy & Support
            </h1>
            <p className="text-white/60 font-medium">
              Effective Date: 27-05-2025 | Last Updated: 27-05-2025
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'privacy' | 'grievance')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
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
