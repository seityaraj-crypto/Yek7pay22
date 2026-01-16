import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";
import { registerRazorpayRoutes } from "./razorpay";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api
  registerChatRoutes(app);
  registerImageRoutes(app);
  registerRazorpayRoutes(app);

  // Contact form endpoint - stores inquiries for info@yek7pay.com
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, countryCode, phone, email, service } = req.body;
      
      if (!name || !phone || !email || !service) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const inquiry = {
        id: Date.now().toString(),
        name,
        countryCode: countryCode || "+91",
        phone,
        email,
        service,
        createdAt: new Date().toISOString(),
        notifyEmail: "info@yek7pay.com"
      };

      // Log the inquiry (in production, this would be stored in database)
      console.log("New Contact Inquiry for info@yek7pay.com:", inquiry);

      res.json({ 
        success: true, 
        message: "Thank you! Your inquiry has been received. We will contact you soon.",
        inquiry 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to submit inquiry" });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
