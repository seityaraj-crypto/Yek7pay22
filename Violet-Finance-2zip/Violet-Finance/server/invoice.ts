import type { Express, Request, Response } from "express";

interface InvoiceData {
  invoiceNumber: string;
  title: string;
  amount: string;
  items: { name: string; price: string }[];
  date: string;
  paymentId?: string;
  orderId?: string;
  customerEmail?: string;
  customerPhone?: string;
}

function generateInvoiceHtml(data: InvoiceData): string {
  const itemRows = data.items
    .map(item => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">${item.name}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: 600;">${item.price}</td>
      </tr>
    `)
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice from Yek7Pay</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 40px 30px; background: linear-gradient(135deg, #1a1a3a 0%, #2d2d5a 100%);">
        <table width="100%">
          <tr>
            <td>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800;">Yek7Pay</h1>
              <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.6); font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Solutions Private Limited</p>
            </td>
            <td style="text-align: right;">
              <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 14px;">Invoice</p>
              <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 18px; font-weight: 700;">${data.invoiceNumber}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <tr>
      <td style="padding: 30px;">
        <table width="100%" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; margin-bottom: 30px;">
          <tr>
            <td style="padding: 25px; text-align: center;">
              <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 15px; line-height: 60px; font-size: 30px;">✓</div>
              <h2 style="margin: 0; color: #ffffff; font-size: 24px;">Payment Successful!</h2>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Thank you for your payment</p>
            </td>
          </tr>
        </table>
        
        <table width="100%" style="margin-bottom: 20px;">
          <tr>
            <td>
              <p style="margin: 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service</p>
              <p style="margin: 5px 0 0 0; color: #333; font-size: 16px; font-weight: 600;">${data.title}</p>
            </td>
            <td style="text-align: right;">
              <p style="margin: 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Date</p>
              <p style="margin: 5px 0 0 0; color: #333; font-size: 14px;">${data.date}</p>
            </td>
          </tr>
        </table>
        
        <table width="100%" style="background: #f9f9f9; border-radius: 12px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 20px;">
              <table width="100%">
                <thead>
                  <tr>
                    <th style="text-align: left; padding-bottom: 12px; border-bottom: 2px solid #e0e0e0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Description</th>
                    <th style="text-align: right; padding-bottom: 12px; border-bottom: 2px solid #e0e0e0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows}
                </tbody>
                <tfoot>
                  <tr>
                    <td style="padding: 15px 0 0 0; font-size: 18px; font-weight: 700; color: #333;">Total Paid</td>
                    <td style="padding: 15px 0 0 0; text-align: right; font-size: 24px; font-weight: 800; color: #10b981;">${data.amount}</td>
                  </tr>
                </tfoot>
              </table>
            </td>
          </tr>
        </table>
        
        ${data.paymentId ? `
        <table width="100%" style="background: #f0f9ff; border-radius: 8px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 15px;">
              <p style="margin: 0; color: #0369a1; font-size: 12px;">Transaction ID</p>
              <p style="margin: 5px 0 0 0; color: #0c4a6e; font-size: 14px; font-family: monospace;">${data.paymentId}</p>
            </td>
          </tr>
        </table>
        ` : ""}
      </td>
    </tr>
    
    <tr>
      <td style="padding: 30px; background: #1a1a3a; text-align: center;">
        <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px; font-weight: 600;">With Warm Greetings from Yek7Pay!</p>
        <p style="margin: 0 0 20px 0; color: rgba(255,255,255,0.6); font-size: 13px;">Thank you for choosing us. We appreciate your trust in our services.</p>
        <table width="100%">
          <tr>
            <td style="text-align: center;">
              <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 11px;">
                Yek7Pay Solutions Private Limited<br>
                Email: info@yek7pay.com | Support: grievance@yek7pay.com<br>
                WhatsApp: +91 92309 67187
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function generateWhatsAppMessage(data: InvoiceData): string {
  const itemsList = data.items.map(item => `• ${item.name}: ${item.price}`).join("\n");
  
  return `*🎉 Payment Successful!*

*With Warm Greetings from Yek7Pay!* 🙏

📄 *Invoice Details*
━━━━━━━━━━━━━━━━━
Invoice No: ${data.invoiceNumber}
Date: ${data.date}
Service: ${data.title}

💰 *Payment Summary*
${itemsList}
━━━━━━━━━━━━━━━━━
*Total Paid: ${data.amount}*

${data.paymentId ? `🔗 Transaction ID: ${data.paymentId}` : ""}

Thank you for choosing Yek7Pay! We appreciate your trust in our services. 💙

For any queries:
📧 info@yek7pay.com
📞 +91 92309 67187

_Yek7Pay Solutions Private Limited_`;
}

export function registerInvoiceRoutes(app: Express): void {
  app.post("/api/invoice/send", async (req: Request, res: Response) => {
    try {
      const data: InvoiceData = req.body;

      if (!data.invoiceNumber || !data.title || !data.amount) {
        return res.status(400).json({ error: "Missing required invoice data" });
      }

      if (!data.customerEmail && !data.customerPhone) {
        return res.status(400).json({ error: "Email or phone number is required" });
      }

      if (data.customerEmail) {
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        
        if (!RESEND_API_KEY) {
          console.log("Email sending not configured - logging invoice for:", data.customerEmail);
          console.log("Invoice HTML would be sent to:", data.customerEmail);
          
          return res.json({ 
            success: true, 
            method: "email",
            message: "Invoice logged (email service pending configuration)",
            note: "Email service will be configured for production"
          });
        }

        const emailHtml = generateInvoiceHtml(data);
        
        try {
          const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Yek7Pay <noreply@yek7pay.com>",
              to: data.customerEmail,
              subject: `Invoice ${data.invoiceNumber} - Payment Successful | Yek7Pay`,
              html: emailHtml,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to send email via Resend");
          }

          console.log("Invoice email sent to:", data.customerEmail);
          return res.json({ success: true, method: "email" });
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
          return res.status(500).json({ error: "Failed to send email" });
        }
      }

      if (data.customerPhone) {
        const whatsappMessage = generateWhatsAppMessage(data);
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const phoneNumber = data.customerPhone.replace(/\D/g, "");
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        console.log("WhatsApp invoice link generated for:", data.customerPhone);
        
        return res.json({ 
          success: true, 
          method: "whatsapp",
          whatsappUrl,
          message: "WhatsApp link generated"
        });
      }

      res.status(400).json({ error: "No valid contact method provided" });
    } catch (error) {
      console.error("Invoice send error:", error);
      res.status(500).json({ error: "Failed to send invoice" });
    }
  });
}
