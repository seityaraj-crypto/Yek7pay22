import type { Express, Request, Response } from "express";
import { chatStorage } from "./storage";

const serviceInfo = {
  banking: {
    dmt: {
      name: "Domestic Money Transfer (DMT)",
      description: "Send money instantly to any bank account in India 24/7",
      features: ["Instant transfers", "All banks supported", "Low fees", "24/7 availability"],
      limits: "Standard: ₹25,000/month | Premium: Unlimited"
    },
    aeps: {
      name: "AEPS (Aadhaar Enabled Payment System)",
      description: "Cash withdrawal using Aadhaar and fingerprint",
      features: ["No debit card needed", "Biometric authentication", "Cash withdrawal", "Balance enquiry", "Mini statement"],
      requirements: "Aadhaar number linked to bank account"
    },
    microAtm: {
      name: "Micro ATM",
      description: "Portable ATM device for cash withdrawals",
      features: ["Card-based withdrawals", "Balance check", "Portable device", "Works anywhere"],
      forAgents: "Available for Premium members"
    },
    nepalRemit: {
      name: "Indo-Nepal Remittance",
      description: "Send money from India to Nepal instantly",
      features: ["Fast transfers to Nepal", "Competitive rates", "Safe & secure"],
      limits: "As per RBI guidelines"
    },
    ppiWallet: {
      name: "PPI Wallet",
      description: "Prepaid digital wallet for transactions",
      features: ["Store money digitally", "Pay merchants", "Transfer to bank", "Recharge & bills"],
      forPremium: true
    }
  },
  payments: {
    bbps: {
      name: "Bharat Connect (BBPS)",
      description: "Pay all utility bills through Bharat Bill Payment System",
      categories: ["Electricity", "Gas", "Water", "Broadband", "Landline", "Insurance Premium", "FASTag", "LPG Gas", "Municipal Tax"],
      features: ["Instant confirmation", "All billers", "Secure payments"]
    },
    upiQr: {
      name: "UPI QR Collection",
      description: "Accept UPI payments with QR code",
      features: ["Instant payments", "Sound box alerts", "Daily settlement", "No MDR charges"],
      forPremium: true
    },
    mpos: {
      name: "mPOS Card Solutions",
      description: "Accept card payments with portable device",
      features: ["All cards accepted", "Visa, Mastercard, RuPay", "Portable", "Instant settlement"],
      forPremium: true
    },
    recharge: {
      name: "Mobile Recharge & DTH",
      description: "Recharge any mobile or DTH connection",
      operators: ["Jio", "Airtel", "Vi", "BSNL", "Tata Sky", "Dish TV", "D2H", "Sun Direct"],
      features: ["Instant recharge", "All operators", "Cashback rewards"]
    }
  },
  travel: {
    flights: {
      name: "Flight Bookings",
      description: "Book domestic and international flights",
      features: ["Best prices", "All airlines", "Easy booking", "24/7 support"],
      airlines: "IndiGo, Air India, SpiceJet, Vistara, and more"
    },
    trains: {
      name: "Train Bookings (IRCTC)",
      description: "Book train tickets across India",
      features: ["Tatkal booking", "All classes", "Real-time availability", "Instant confirmation"]
    },
    buses: {
      name: "Bus Bookings",
      description: "Book bus tickets for any route",
      features: ["All operators", "Sleeper & AC buses", "Easy cancellation"]
    },
    hotels: {
      name: "Hotel Bookings",
      description: "Book hotels across India and abroad",
      features: ["Budget to luxury", "Best prices", "Verified reviews", "Free cancellation options"]
    }
  },
  compliance: {
    gst: {
      name: "GST Services",
      services: ["GST Registration", "Monthly Filing (GSTR-1, GSTR-3B)", "Quarterly Filing", "Annual Returns", "GST Audit"],
      turnaround: "3-7 business days for registration"
    },
    itr: {
      name: "Income Tax Filing",
      services: ["ITR-1 (Salaried)", "ITR-2 (Capital Gains)", "ITR-3 (Business)", "ITR-4 (Presumptive)"],
      support: "Expert CA assistance available"
    },
    company: {
      name: "Company Registration",
      services: ["Private Limited", "LLP Registration", "One Person Company", "Partnership Firm"],
      includes: "PAN, TAN, GST registration"
    },
    trademark: {
      name: "Trademark & IP",
      services: ["Trademark Registration", "Logo Protection", "Brand Name Registration"],
      validity: "10 years, renewable"
    }
  },
  loans: {
    business: {
      name: "Business Loans",
      description: "Quick business loans for growth",
      features: ["Minimal documentation", "Quick approval", "Flexible tenure"],
      amount: "₹50,000 to ₹50 Lakhs"
    },
    personal: {
      name: "Personal Loans",
      description: "Instant personal loans",
      features: ["No collateral", "Quick disbursal", "Competitive rates"],
      eligibility: "Salaried and self-employed"
    }
  },
  insurance: {
    health: "Health Insurance - Protect your family's health with comprehensive coverage",
    life: "Life Insurance - Secure your family's future",
    motor: "Motor Insurance - Car and bike insurance with easy claims",
    travel: "Travel Insurance - Coverage for domestic and international travel"
  },
  premium: {
    price: "₹999 one-time",
    benefits: [
      "Unlimited transaction limits",
      "Highest commission rates (up to 3x)",
      "mPOS card device",
      "UPI QR with soundbox",
      "PPI Wallet access",
      "Priority loan processing",
      "VIP customer support",
      "Business growth tools"
    ]
  },
  contact: {
    email: "info@yek7pay.com",
    phone: "+91 92309 67187",
    whatsapp: "+91 92309 67187",
    grievance: "grievance@yek7pay.com",
    support: "24/7 available"
  }
};

function findBestMatch(message: string): string {
  const msg = message.toLowerCase().trim();
  
  if (msg.match(/^(hi|hello|hey|namaste|hii+)[\s!.,?]*$/i)) {
    return `Hello! Welcome to Yek7pay 🙏

I'm your AI assistant and I can help you with:
• Banking Services (DMT, AEPS, Micro ATM)
• Bill Payments (Bharat Connect/BBPS)
• Travel Bookings (Flights, Trains, Buses, Hotels)
• GST & Compliance Services
• Business & Personal Loans
• Premium Membership

What would you like to know about?`;
  }

  if (msg.match(/help|what can you do|services|menu/i)) {
    return `Here's everything I can help you with:

💰 BANKING & REMITTANCE
• DMT (Money Transfer)
• AEPS (Aadhaar Withdrawal)
• Indo-Nepal Remittance
• Micro ATM
• PPI Wallet

💳 PAYMENTS
• Bharat Connect (BBPS) - All bills
• UPI QR Collection
• mPOS Card Payments
• Mobile Recharge & DTH

✈️ TRAVEL BOOKINGS
• Flights, Trains, Buses, Hotels

📋 COMPLIANCE
• GST Registration & Filing
• ITR Filing
• Company Registration

💼 LOANS & INSURANCE
• Business & Personal Loans
• Health, Life, Motor Insurance

⭐ PREMIUM UPGRADE (₹999)
• Unlimited limits, highest commissions

Just ask about any service!`;
  }

  if (msg.match(/dmt|money transfer|send money|transfer money|remit/i)) {
    const info = serviceInfo.banking.dmt;
    return `${info.name}

${info.description}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

📊 Limits: ${info.limits}

To start DMT service, create your Yek7pay account and complete KYC. Premium members enjoy unlimited transfers!

Need help getting started? Contact us: ${serviceInfo.contact.phone}`;
  }

  if (msg.match(/aeps|aadhaar|aadhar|fingerprint withdrawal|biometric/i)) {
    const info = serviceInfo.banking.aeps;
    return `${info.name}

${info.description}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

📋 Requirement: ${info.requirements}

Visit any Yek7pay agent to use AEPS services. No debit card needed - just your Aadhaar and fingerprint!`;
  }

  if (msg.match(/micro ?atm|portable atm/i)) {
    const info = serviceInfo.banking.microAtm;
    return `${info.name}

${info.description}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

⭐ ${info.forAgents}

Upgrade to Premium to get your own Micro ATM device and serve customers anywhere!`;
  }

  if (msg.match(/nepal|indo.?nepal|remittance to nepal/i)) {
    const info = serviceInfo.banking.nepalRemit;
    return `${info.name}

${info.description}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

📋 ${info.limits}

Send money safely to your family and friends in Nepal through Yek7pay!`;
  }

  if (msg.match(/wallet|ppi|prepaid/i)) {
    const info = serviceInfo.banking.ppiWallet;
    return `${info.name}

${info.description}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

⭐ Available for Premium members

Upgrade to Premium (₹999) to access PPI Wallet and enjoy cashless transactions!`;
  }

  if (msg.match(/bbps|bharat connect|bill payment|electricity|gas|water|utility|bills/i)) {
    const info = serviceInfo.payments.bbps;
    return `${info.name}

${info.description}

📋 Bill Categories:
${info.categories.map(c => `• ${c}`).join('\n')}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

Pay all your bills instantly through Yek7pay with confirmation receipts!`;
  }

  if (msg.match(/upi|qr|qr code|accept payment/i)) {
    const info = serviceInfo.payments.upiQr;
    return `${info.name}

${info.description}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

⭐ Available for Premium members

Get your UPI QR with soundbox alerts! Upgrade to Premium for just ₹999.`;
  }

  if (msg.match(/mpos|card payment|accept card|pos|swipe/i)) {
    const info = serviceInfo.payments.mpos;
    return `${info.name}

${info.description}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

⭐ Available for Premium members

Get your portable mPOS device with Premium membership!`;
  }

  if (msg.match(/recharge|mobile recharge|dth|prepaid|postpaid/i)) {
    const info = serviceInfo.payments.recharge;
    return `${info.name}

${info.description}

📱 Operators: ${info.operators.join(', ')}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

Recharge any number instantly and earn cashback!`;
  }

  if (msg.match(/flight|air|plane|domestic flight|international flight/i)) {
    const info = serviceInfo.travel.flights;
    return `${info.name}

${info.description}

✈️ Airlines: ${info.airlines}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

Book your flights at the best prices through Yek7pay!`;
  }

  if (msg.match(/train|railway|irctc|rail/i)) {
    const info = serviceInfo.travel.trains;
    return `${info.name}

${info.description}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

Book train tickets easily, including Tatkal bookings!`;
  }

  if (msg.match(/bus|road travel/i)) {
    const info = serviceInfo.travel.buses;
    return `${info.name}

${info.description}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

Book bus tickets to any destination across India!`;
  }

  if (msg.match(/hotel|stay|accommodation|room/i)) {
    const info = serviceInfo.travel.hotels;
    return `${info.name}

${info.description}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

Find and book the perfect hotel for your trip!`;
  }

  if (msg.match(/travel|book|booking|trip/i)) {
    return `✈️ Yek7pay Travel Services

Book all your travel needs in one place:

🛫 Flight Bookings
• Domestic & International
• All major airlines

🚆 Train Bookings (IRCTC)
• Tatkal available
• All classes

🚌 Bus Bookings
• All operators
• AC & Non-AC options

🏨 Hotel Bookings
• Budget to luxury
• Pan India & abroad

Visit our Travel section or contact us: ${serviceInfo.contact.phone}`;
  }

  if (msg.match(/gst|goods and service|gstr/i)) {
    const info = serviceInfo.compliance.gst;
    return `${info.name}

📋 Services:
${info.services.map(s => `• ${s}`).join('\n')}

⏱️ Turnaround: ${info.turnaround}

Our expert team handles all your GST requirements. Visit the Compliance section to get started!`;
  }

  if (msg.match(/itr|income tax|tax filing|tax return/i)) {
    const info = serviceInfo.compliance.itr;
    return `${info.name}

📋 ITR Types:
${info.services.map(s => `• ${s}`).join('\n')}

👨‍💼 ${info.support}

File your ITR hassle-free with Yek7pay's expert CA team!`;
  }

  if (msg.match(/company|pvt ltd|llp|registration|incorporate/i)) {
    const info = serviceInfo.compliance.company;
    return `${info.name}

📋 Services:
${info.services.map(s => `• ${s}`).join('\n')}

✅ ${info.includes}

Start your business journey with proper registration through Yek7pay!`;
  }

  if (msg.match(/trademark|logo|brand|ip|intellectual/i)) {
    const info = serviceInfo.compliance.trademark;
    return `${info.name}

📋 Services:
${info.services.map(s => `• ${s}`).join('\n')}

✅ Validity: ${info.validity}

Protect your brand with trademark registration!`;
  }

  if (msg.match(/compliance|legal|documentation/i)) {
    return `📋 Yek7pay Compliance Services

We handle all your business compliance needs:

🧾 GST Services
• Registration, Filing, Returns, Audit

📊 Income Tax
• ITR Filing for all types

🏢 Company Registration
• Pvt Ltd, LLP, OPC, Partnership

™️ Trademark & IP
• Brand protection, Logo registration

Visit our Compliance page or contact: ${serviceInfo.contact.phone}`;
  }

  if (msg.match(/business loan|loan for business/i)) {
    const info = serviceInfo.loans.business;
    return `${info.name}

${info.description}

💰 Amount: ${info.amount}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

Apply for a business loan today! Premium members get priority processing.`;
  }

  if (msg.match(/personal loan/i)) {
    const info = serviceInfo.loans.personal;
    return `${info.name}

${info.description}

✅ Features:
${info.features.map(f => `• ${f}`).join('\n')}

👤 Eligibility: ${info.eligibility}

Get instant personal loans with minimal documentation!`;
  }

  if (msg.match(/loan|credit|borrow|finance/i)) {
    return `💼 Yek7pay Loan Services

We offer quick loans with easy approval:

🏢 Business Loans
• ₹50,000 to ₹50 Lakhs
• Minimal documentation

👤 Personal Loans
• No collateral required
• Quick disbursal

✅ Benefits:
• Quick approval
• Competitive rates
• Flexible tenure

Premium members get priority processing! Contact: ${serviceInfo.contact.phone}`;
  }

  if (msg.match(/insurance|health insurance|life insurance|motor insurance|travel insurance/i)) {
    const ins = serviceInfo.insurance;
    return `🛡️ Yek7pay Insurance Services

Protect what matters most:

❤️ ${ins.health}

👨‍👩‍👧 ${ins.life}

🚗 ${ins.motor}

✈️ ${ins.travel}

Get the best insurance plans at competitive premiums. Contact us: ${serviceInfo.contact.phone}`;
  }

  if (msg.match(/premium|upgrade|vip|₹999|999/i)) {
    const info = serviceInfo.premium;
    return `⭐ Yek7pay Premium Membership

💰 Price: ${info.price}

🎁 Benefits:
${info.benefits.map(b => `• ${b}`).join('\n')}

Upgrade now and maximize your earnings! This is a one-time investment that unlocks unlimited potential.

To upgrade, visit our Upgrade page or WhatsApp: ${serviceInfo.contact.whatsapp}`;
  }

  if (msg.match(/commission|earn|income|earnings/i)) {
    return `💰 Earn with Yek7pay

As a Yek7pay agent, earn commissions on:
• Every DMT transaction
• AEPS withdrawals
• Bill payments
• Recharges
• Travel bookings
• Loan referrals

⭐ Premium members earn up to 3x higher commission!

Upgrade to Premium for ₹999 and maximize your income potential.`;
  }

  if (msg.match(/account|register|sign up|open account|join/i)) {
    return `📝 Open Your Yek7pay Account

Getting started is easy:

1️⃣ Click "Open Account" on our website
2️⃣ Fill your basic details
3️⃣ Complete KYC with:
   • Aadhaar Card (front & back)
   • PAN Card
   • Passport Photo
4️⃣ Get verified within 24 hours
5️⃣ Start transacting!

Need help? Contact: ${serviceInfo.contact.phone}`;
  }

  if (msg.match(/kyc|verification|document|aadhaar|pan/i)) {
    return `📄 KYC Documents Required

To complete your Yek7pay verification:

1. Aadhaar Card (front & back)
2. PAN Card
3. Recent Passport Photo
4. Mobile number linked to Aadhaar

📧 Upload during registration or email to: ${serviceInfo.contact.email}

Verification completes within 24 hours!`;
  }

  if (msg.match(/contact|phone|email|whatsapp|support|call/i)) {
    const c = serviceInfo.contact;
    return `📞 Contact Yek7pay

📧 Email: ${c.email}
📱 Phone: ${c.phone}
💬 WhatsApp: ${c.whatsapp}
📨 Grievance: ${c.grievance}

🕐 ${c.support}

We're always here to help!`;
  }

  if (msg.match(/thank|thanks|thx/i)) {
    return `You're welcome! 🙏

I'm glad I could help. If you have any more questions about Yek7pay services, feel free to ask anytime.

For immediate assistance:
📱 WhatsApp: ${serviceInfo.contact.whatsapp}

Have a great day!`;
  }

  if (msg.match(/bye|goodbye|see you/i)) {
    return `Thank you for chatting with Yek7pay! 👋

We hope to serve you soon. Remember, we're available 24/7:

📱 WhatsApp: ${serviceInfo.contact.whatsapp}
📧 Email: ${serviceInfo.contact.email}

Take care and have a wonderful day!`;
  }

  if (msg.match(/price|cost|fee|charge|how much/i)) {
    return `💰 Yek7pay Pricing

Our services are designed to be affordable:

• Account Opening: FREE
• DMT: Low transaction fees
• AEPS: Nominal charges per withdrawal
• Bill Payments: Zero convenience fee
• Recharges: At MRP + cashback

⭐ Premium Membership: ₹999 (one-time)
• Unlocks all premium features
• Highest commission rates
• mPOS & QR devices included

For detailed pricing, contact: ${serviceInfo.contact.phone}`;
  }

  if (msg.match(/agent|become agent|retailer|distributor|franchise/i)) {
    return `🤝 Become a Yek7pay Agent

Start your fintech business with Yek7pay:

📋 Requirements:
• Valid Aadhaar & PAN
• Smartphone with internet
• Shop/outlet (preferred)

💼 Benefits:
• Multiple income streams
• Low investment
• Full training provided
• 24/7 support

⭐ Premium Agents earn:
• Higher commissions
• mPOS device
• UPI QR soundbox
• Priority support

Register now or call: ${serviceInfo.contact.phone}`;
  }

  return `I understand you're asking about "${message}"

I can only help with Yek7pay services:

💰 Banking: DMT, AEPS, Micro ATM, Nepal Remit
💳 Payments: BBPS, UPI QR, mPOS, Recharges
✈️ Travel: Flights, Trains, Buses, Hotels
📋 Compliance: GST, ITR, Company Registration
💼 Loans: Business & Personal Loans
🛡️ Insurance: Health, Life, Motor, Travel
⭐ Premium: Upgrade for ₹999

Please ask about any of these services, or contact us:
📱 ${serviceInfo.contact.phone}
📧 ${serviceInfo.contact.email}`;
}

export function registerChatRoutes(app: Express): void {

  app.get("/api/conversations", async (req: Request, res: Response) => {
    try {
      const conversations = await chatStorage.getAllConversations();
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.get("/api/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const conversation = await chatStorage.getConversation(id);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      const messages = await chatStorage.getMessagesByConversation(id);
      res.json({ ...conversation, messages });
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  app.post("/api/conversations", async (req: Request, res: Response) => {
    try {
      const { title } = req.body;
      const conversation = await chatStorage.createConversation(title || "New Chat");
      res.status(201).json(conversation);
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  app.delete("/api/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await chatStorage.deleteConversation(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting conversation:", error);
      res.status(500).json({ error: "Failed to delete conversation" });
    }
  });

  app.post("/api/conversations/:id/messages", async (req: Request, res: Response) => {
    try {
      const conversationId = parseInt(req.params.id);
      const { content } = req.body;

      await chatStorage.createMessage(conversationId, "user", content);

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const aiResponse = findBestMatch(content);
      
      const words = aiResponse.split(" ");
      let fullResponse = "";
      
      for (const word of words) {
        fullResponse += (fullResponse ? " " : "") + word;
        res.write(`data: ${JSON.stringify({ content: word + " " })}\n\n`);
        await new Promise(resolve => setTimeout(resolve, 25));
      }

      await chatStorage.createMessage(conversationId, "assistant", aiResponse);

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      console.error("Error sending message:", error);
      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: "Failed to send message" })}\n\n`);
        res.end();
      } else {
        res.status(500).json({ error: "Failed to send message" });
      }
    }
  });
}
