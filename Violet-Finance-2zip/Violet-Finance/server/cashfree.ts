import { Cashfree, CFEnvironment } from "cashfree-pg";
import type { Express, Request, Response } from "express";
import crypto from "crypto";

export function registerCashfreeRoutes(app: Express) {
  app.post("/api/cashfree/create-order", async (req: Request, res: Response) => {
    try {
      const { amount, customerName, customerEmail, customerPhone } = req.body;
      
      if (!amount || !customerPhone) {
        return res.status(400).json({ error: "Amount and phone are required" });
      }

      const clientId = process.env.CASHFREE_APP_ID;
      const clientSecret = process.env.CASHFREE_SECRET_KEY;

      if (!clientId || !clientSecret) {
        return res.status(500).json({ error: "Cashfree credentials not configured" });
      }

      const cashfree = new Cashfree(
        process.env.NODE_ENV === "production" ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
        clientId,
        clientSecret
      );

      const orderId = `order_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
      const customerId = `cust_${crypto.randomBytes(6).toString("hex")}`;

      const baseUrl = process.env.REPLIT_DEV_DOMAIN 
        ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
        : "http://localhost:5000";

      const request = {
        order_amount: parseFloat(amount),
        order_currency: "INR",
        order_id: orderId,
        customer_details: {
          customer_id: customerId,
          customer_name: customerName || "Customer",
          customer_email: customerEmail || "",
          customer_phone: customerPhone
        },
        order_meta: {
          return_url: `${baseUrl}/upgrade/success?order_id={order_id}`,
          notify_url: `${baseUrl}/api/cashfree/webhook`
        }
      };

      const response = await cashfree.PGCreateOrder(request);
      
      res.json({
        orderId: response.data.order_id,
        paymentSessionId: response.data.payment_session_id,
        orderAmount: response.data.order_amount
      });
    } catch (error: any) {
      console.error("Cashfree order creation error:", error?.response?.data || error);
      res.status(500).json({ 
        error: "Failed to create payment order",
        details: error?.response?.data?.message || error.message
      });
    }
  });

  app.get("/api/cashfree/order/:orderId", async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      
      const clientId = process.env.CASHFREE_APP_ID;
      const clientSecret = process.env.CASHFREE_SECRET_KEY;

      if (!clientId || !clientSecret) {
        return res.status(500).json({ error: "Cashfree credentials not configured" });
      }

      const cashfree = new Cashfree(
        process.env.NODE_ENV === "production" ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
        clientId,
        clientSecret
      );

      const response = await cashfree.PGFetchOrder(orderId);
      
      res.json({
        orderId: response.data.order_id,
        orderStatus: response.data.order_status,
        orderAmount: response.data.order_amount
      });
    } catch (error: any) {
      console.error("Cashfree fetch order error:", error?.response?.data || error);
      res.status(500).json({ 
        error: "Failed to fetch order status",
        details: error?.response?.data?.message || error.message
      });
    }
  });

  app.post("/api/cashfree/webhook", async (req: Request, res: Response) => {
    try {
      console.log("Cashfree webhook received:", req.body);
      res.status(200).json({ status: "received" });
    } catch (error: any) {
      console.error("Cashfree webhook error:", error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  });
}
