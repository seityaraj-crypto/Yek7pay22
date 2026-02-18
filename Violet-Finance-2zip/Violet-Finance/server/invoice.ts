import type { Express, Request, Response } from "express";

interface InvoiceItem {
  name: string;
  price: string;
  qty?: number;
}

interface InvoiceData {
  invoiceNumber: string;
  title: string;
  amount: string;
  items: InvoiceItem[];
  date: string;
  paymentId?: string;
  orderId?: string;
  customerEmail?: string;
  customerPhone?: string;
}

function parseAmount(amt: string): number {
  return parseFloat(amt.replace(/[^\d.]/g, "")) || 0;
}

function formatINR(num: number): string {
  return num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function generateInvoiceHtml(data: InvoiceData): string {
  const totalAmount = parseAmount(data.amount);

  const itemRows = data.items
    .map(item => {
      const qty = item.qty || 1;
      const price = parseAmount(item.price);
      const subtotal = price * qty;
      return `
        <tr>
          <td style="padding: 10px 12px; border: 1px solid #e0e0e0; color: #444; font-size: 14px;">${item.name}</td>
          <td style="padding: 10px 12px; border: 1px solid #e0e0e0; color: #444; font-size: 14px; text-align: right;">${formatINR(price)}</td>
          <td style="padding: 10px 12px; border: 1px solid #e0e0e0; color: #444; font-size: 14px; text-align: center;">${qty}</td>
          <td style="padding: 10px 12px; border: 1px solid #e0e0e0; color: #444; font-size: 14px; text-align: right; font-weight: 600;">${formatINR(subtotal)}</td>
        </tr>
      `;
    })
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${data.invoiceNumber} - Yek7Pay</title>
</head>
<body style="margin: 0; padding: 30px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #e8e8e8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 30px 40px 20px 40px;">
        <table width="100%">
          <tr>
            <td>&nbsp;</td>
            <td style="text-align: right;">
              <p style="margin: 0; color: #444; font-size: 14px;"><strong>Sender:</strong> Yek7Pay Solutions Pvt. Ltd.</p>
            </td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #ccc; margin: 15px 0 25px 0;">
        
        <h1 style="margin: 0 0 25px 0; color: #333; font-size: 32px; font-weight: 700; letter-spacing: 2px;">INVOICE</h1>
        
        <table width="100%" style="margin-bottom: 30px;">
          <tr>
            <td style="vertical-align: top;">
              <p style="margin: 0 0 5px 0; color: #444; font-size: 14px;"><strong>Invoice:</strong> #${data.invoiceNumber}</p>
              <p style="margin: 0 0 5px 0; color: #444; font-size: 14px;"><strong>Date:</strong> ${data.date}</p>
              <p style="margin: 0; color: #444; font-size: 14px;"><strong>Payment Status:</strong> <span style="color: #16a34a; font-weight: 600;">PAID</span></p>
            </td>
            <td style="text-align: right; vertical-align: top;">
              <p style="margin: 0 0 5px 0; color: #444; font-size: 14px; font-weight: 700;">Receiver:</p>
              <p style="margin: 0 0 5px 0; color: #444; font-size: 14px;">${data.customerEmail || "Customer"}</p>
              ${data.paymentId ? `<p style="margin: 0; color: #888; font-size: 12px;">Txn: ${data.paymentId}</p>` : ""}
            </td>
          </tr>
        </table>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 25px;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 10px 12px; text-align: left; font-size: 13px; font-weight: 700; color: #555; border: 1px solid #e0e0e0;">Item Description</th>
              <th style="padding: 10px 12px; text-align: right; font-size: 13px; font-weight: 700; color: #555; border: 1px solid #e0e0e0;">Price (&#8377;)</th>
              <th style="padding: 10px 12px; text-align: center; font-size: 13px; font-weight: 700; color: #555; border: 1px solid #e0e0e0;">Quantity</th>
              <th style="padding: 10px 12px; text-align: right; font-size: 13px; font-weight: 700; color: #555; border: 1px solid #e0e0e0;">Subtotal (&#8377;)</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 12px; text-align: right; font-size: 14px; font-weight: 700; color: #333; border: 1px solid #e0e0e0;">Total (&#8377;)</td>
              <td style="padding: 12px; text-align: right; font-size: 16px; font-weight: 800; color: #222; border: 1px solid #e0e0e0;">${formatINR(totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
        
        <div style="margin-top: 30px; margin-bottom: 15px;">
          <p style="margin: 0 0 8px 0; color: #1d4ed8; font-size: 13px; font-weight: 600; text-decoration: underline;">Payment processed via Razorpay:</p>
          <p style="margin: 0 0 3px 0; color: #555; font-size: 13px;">Company: Yek7Pay Solutions Private Limited</p>
          <p style="margin: 0 0 3px 0; color: #555; font-size: 13px;">Email: info@yek7pay.com</p>
          <p style="margin: 0; color: #555; font-size: 13px;">WhatsApp: +91 92309 67187</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0 15px 0;">
        <p style="margin: 0; color: #1d4ed8; font-size: 12px; font-style: italic;">Note: This is a system-generated invoice. For queries, contact info@yek7pay.com</p>
      </td>
    </tr>
    
    <tr>
      <td style="padding: 25px 40px; background: #1a1a3a; text-align: center;">
        <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 15px; font-weight: 600;">With Warm Greetings from Yek7Pay!</p>
        <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 11px;">
          Yek7Pay Solutions Private Limited | Email: info@yek7pay.com | Support: grievance@yek7pay.com | WhatsApp: +91 92309 67187
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function generateWhatsAppMessage(data: InvoiceData): string {
  const totalAmount = parseAmount(data.amount);
  const itemsList = data.items.map(item => {
    const qty = item.qty || 1;
    const price = parseAmount(item.price);
    return `  ${item.name}: ₹${formatINR(price)} x ${qty} = ₹${formatINR(price * qty)}`;
  }).join("\n");

  return `*INVOICE - Yek7Pay*

Invoice: #${data.invoiceNumber}
Date: ${data.date}
Service: ${data.title}

*Items:*
${itemsList}

*Total Paid: ₹${formatINR(totalAmount)}*

${data.paymentId ? `Transaction ID: ${data.paymentId}` : ""}

Thank you for choosing Yek7Pay!

For queries:
Email: info@yek7pay.com
WhatsApp: +91 92309 67187

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
          console.log("Invoice data:", JSON.stringify({ invoiceNumber: data.invoiceNumber, title: data.title, amount: data.amount }));

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
              subject: `Invoice #${data.invoiceNumber} - Payment Successful | Yek7Pay`,
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
