import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";
import { registerRazorpayRoutes } from "./razorpay";
import { registerInvoiceRoutes } from "./invoice";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api
  registerChatRoutes(app);
  registerImageRoutes(app);
  registerRazorpayRoutes(app);
  registerInvoiceRoutes(app);

  // Contact form endpoint - sends inquiries to info@yek7pay.com via email and WhatsApp
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

      const formattedDate = new Date().toLocaleString('en-IN', { 
        dateStyle: 'medium', 
        timeStyle: 'short' 
      });

      // Generate WhatsApp message for business
      const whatsappMessage = `*🔔 New Customer Inquiry*

━━━━━━━━━━━━━━━━━
📋 *Inquiry Details*
━━━━━━━━━━━━━━━━━
👤 Name: ${name}
📞 Phone: ${countryCode}${phone}
📧 Email: ${email}
🏷️ Service: ${service}
📅 Date: ${formattedDate}

_Sent via Yek7Pay Website Contact Form_`;

      const encodedWhatsappMsg = encodeURIComponent(whatsappMessage);
      const businessWhatsApp = "919230967187";
      const whatsappUrl = `https://wa.me/${businessWhatsApp}?text=${encodedWhatsappMsg}`;

      // Generate email HTML for business notification
      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Customer Inquiry - Yek7Pay</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 30px; background: linear-gradient(135deg, #1a1a3a 0%, #2d2d5a 100%);">
        <h1 style="margin: 0; color: #ffffff; font-size: 24px;">🔔 New Customer Inquiry</h1>
        <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.7); font-size: 14px;">Received via Yek7Pay Website</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <table width="100%" style="background: #f9f9f9; border-radius: 12px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 20px;">
              <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">Customer Details</h3>
              <table width="100%">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 100px;">👤 Name:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">📞 Phone:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600;">${countryCode}${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">📧 Email:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">🏷️ Service:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600;">${service}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">📅 Date:</td>
                  <td style="padding: 8px 0; color: #333;">${formattedDate}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="margin: 0; text-align: center;">
          <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; margin-right: 10px;">Reply via Email</a>
          <a href="https://wa.me/${(countryCode + phone).replace(/\D/g, '')}" style="display: inline-block; padding: 12px 24px; background: #25D366; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Reply via WhatsApp</a>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; background: #f0f0f0; text-align: center;">
        <p style="margin: 0; color: #666; font-size: 12px;">Yek7Pay Solutions Private Limited</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

      // Try to send email notification
      const RESEND_API_KEY = process.env.RESEND_API_KEY;
      let emailSent = false;
      
      if (RESEND_API_KEY) {
        try {
          const emailResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Yek7Pay Website <noreply@yek7pay.com>",
              to: "info@yek7pay.com",
              subject: `New Inquiry: ${service} - ${name}`,
              html: emailHtml,
            }),
          });
          emailSent = emailResponse.ok;
        } catch (emailError) {
          console.error("Email notification failed:", emailError);
        }
      }

      console.log("New Contact Inquiry:", inquiry);
      console.log("Email sent:", emailSent);

      res.json({ 
        success: true, 
        message: "Thank you! Your inquiry has been received. We will contact you soon.",
        inquiry,
        whatsappUrl,
        emailSent
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
