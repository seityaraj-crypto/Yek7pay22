import type { Express, Request, Response } from "express";
import { chatStorage } from "./storage";

const responses: Record<string, string> = {
  "hello": "Hello! Welcome to Yek7pay. I'm your virtual assistant. How can I help you today with money transfers, bill payments, loans, or other financial services?",
  "hi": "Hi there! I'm Yek7pay AI Assistant. I can help you with information about our services like DMT, AEPS, bill payments, loans, and travel bookings. What would you like to know?",
  "money transfer": "Yek7pay offers instant money transfers across India! You can send money to any bank account 24/7. For large transfers, consider upgrading to Premium for unlimited daily limits. Contact us on WhatsApp: +91 9230967187",
  "dmt": "Our Domestic Money Transfer (DMT) service allows you to send money instantly to any bank account in India. Transfers are processed within seconds with competitive rates. Need help getting started?",
  "aeps": "AEPS (Aadhaar Enabled Payment System) allows you to withdraw cash, check balance, and transfer money using just your Aadhaar number and fingerprint. No debit card needed! Visit any Yek7pay agent near you.",
  "loan": "Yek7pay offers various loan products including Personal Loans, Business Loans, and Gold Loans with quick approval. Premium members get priority processing. Contact our loan team on WhatsApp: +91 9230967187",
  "bill": "Pay all your bills through Yek7pay - electricity, gas, water, mobile recharge, DTH, and more! Fast, secure, and earn cashback on every payment.",
  "insurance": "We offer comprehensive insurance solutions - Health Insurance, Life Insurance, Motor Insurance, and Travel Insurance. Protect yourself and your family today!",
  "travel": "Book flights, trains, buses, and hotels at the best prices with Yek7pay Travel! Earn rewards on every booking and enjoy exclusive discounts.",
  "premium": "Upgrade to Yek7pay Premium for just ₹999! Get unlimited transaction limits, highest commission rates, VIP support, mPOS device, QR payments, and much more. WhatsApp us at +91 9230967187 to upgrade!",
  "upgrade": "Want to maximize your earnings? Upgrade to Premium for ₹999 and unlock Neo Bank Unlimited, PPI Wallet, Premium Loans, mPOS, QR Payments, and Elite Commission rates! Contact: +91 9230967187",
  "contact": "Reach us anytime!\n📧 Email: info@yek7pay.com\n📞 Phone: +91 9230967187\n💬 WhatsApp: +91 9230967187\nWe're here to help 24/7!",
  "help": "I can help you with:\n• Money Transfer (DMT)\n• AEPS Services\n• Bill Payments\n• Loans\n• Insurance\n• Travel Bookings\n• Premium Upgrade\n\nJust ask me about any of these services!",
  "whatsapp": "Connect with us on WhatsApp for quick support:\n📱 +91 9230967187\n📱 +91 9230967189\nWe're available 24/7!",
  "gst": "Yek7pay Compliance Suite offers complete GST services - GST Registration, Monthly/Quarterly Filing, Annual Returns, and GST Audit. Premium members get priority processing!",
  "itr": "File your Income Tax Returns hassle-free with Yek7pay! We offer ITR filing for individuals and businesses with expert CA support. Contact us for assistance.",
  "account": "Opening a Yek7pay account is easy! Click 'Open Account' on our website, complete KYC with Aadhaar and PAN, and start transacting within 24 hours.",
  "kyc": "For KYC verification, you'll need:\n• Valid Aadhaar Card (front & back)\n• PAN Card\n• Passport Photo\n• Mobile Number linked to Aadhaar\n\nUpload these documents when registering.",
  "commission": "Earn attractive commissions on every transaction! Premium members get the highest commission slabs in the industry. Upgrade today to maximize your earnings!",
  "mpos": "Get a portable mPOS device with Premium membership! Accept card payments anywhere - Visa, Mastercard, RuPay. Perfect for retailers and merchants.",
  "qr": "Accept UPI payments instantly with Yek7pay QR! Get soundbox alerts for every payment. Available for Premium members.",
  "default": "Thank you for your message! I'm Yek7pay AI Assistant. I can help you with:\n\n• Money Transfer & DMT\n• AEPS Withdrawals\n• Bill Payments\n• Loans & Insurance\n• Travel Bookings\n• GST & Compliance\n• Premium Upgrade\n\nFor immediate assistance, WhatsApp us at +91 9230967187. How can I help you today?"
};

function getAIResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  for (const [keyword, response] of Object.entries(responses)) {
    if (keyword !== "default" && message.includes(keyword)) {
      return response;
    }
  }
  
  if (message.includes("thank")) {
    return "You're welcome! Feel free to ask if you have any more questions. We're here to help 24/7!";
  }
  
  if (message.includes("bye") || message.includes("goodbye")) {
    return "Thank you for chatting with Yek7pay! Have a great day. Remember, we're just a WhatsApp message away at +91 9230967187!";
  }
  
  return responses["default"];
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

      const aiResponse = getAIResponse(content);
      
      const words = aiResponse.split(" ");
      let fullResponse = "";
      
      for (const word of words) {
        fullResponse += (fullResponse ? " " : "") + word;
        res.write(`data: ${JSON.stringify({ content: word + " " })}\n\n`);
        await new Promise(resolve => setTimeout(resolve, 30));
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
