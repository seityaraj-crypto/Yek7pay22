import Razorpay from "razorpay";
import crypto from "crypto";
import type { Express } from "express";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn("Warning: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not configured");
}

const razorpay = RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET ? new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
}) : null;

const AUTHORIZED_PRODUCTS: Record<string, { price: number; name: string }> = {
  "premium-activation": { price: 999, name: "Premium Membership Activation" },
  "gst-registration": { price: 3538.82, name: "GST Registration" },
  "gst-return-nil": { price: 589.82, name: "GST Return Filing - NIL" },
  "gst-return-transaction": { price: 1768.82, name: "GST Return Filing - Transaction" },
  "gst-annual-return": { price: 2948.82, name: "GST Annual Return (GSTR 9)" },
  "gst-refund-exporter": { price: 3538.82, name: "GST Refund (Exporter)" },
  "eway-bill": { price: 589.82, name: "E-Way Bill Generation" },
  "itr-salary-pension": { price: 589.82, name: "ITR - Salaried/Pension" },
  "itr-business-professional": { price: 1768.82, name: "ITR - Business/Professional Income" },
  "itr-capital-gain": { price: 2358.82, name: "ITR - Capital Gain / Multiple Sources" },
  "itr-previous-year": { price: 2948.82, name: "Previous Year's ITR" },
  "tds-return": { price: 3538.82, name: "TDS Return Filing" },
  "advance-tax": { price: 3538.82, name: "Advance Tax Computation" },
  "pvt-ltd-incorporation": { price: 11798.82, name: "Pvt. Ltd. / LLP Incorporation" },
  "roc-filing": { price: 11798.82, name: "ROC Annual Filing" },
  "director-kyc": { price: 589.82, name: "Director KYC (DIR-3)" },
  "monthly-accounting": { price: 5898.82, name: "Monthly Accounting & Bookkeeping" },
  "balance-sheet": { price: 5898.82, name: "Balance Sheet & P&L Preparation" },
  "tax-audit": { price: 17698.82, name: "Tax Audit (u/s 44AB)" },
  "ca-certificate": { price: 3538.82, name: "CA Certificate / Net Worth Certificate" },
  "shareholding-certificate": { price: 3538.82, name: "Shareholding Certificate by CA" },
  "project-report": { price: 3538.82, name: "Project Report for Bank Loan" },
  "turnover-certificate": { price: 3538.82, name: "Turnover Certificate" },
  "projected-financials": { price: 3538.82, name: "Projected Financials" },
  "dsc": { price: 2358.82, name: "Digital Signature Certificate (DSC)" },
  "pan-tan-application": { price: 589.82, name: "PAN / TAN Application" },
  "pan-tan-correction": { price: 589.82, name: "PAN / TAN Correction" },
  "udyam-registration": { price: 1178.82, name: "Udyam Registration" },
  "fssai-registration": { price: 2948.82, name: "FSSAI Registration" },
  "import-export-code": { price: 2358.82, name: "Import Export Code (IEC)" },
};

const SUBSCRIPTION_PLANS: Record<string, { amount: number; name: string; period: string; interval: number; description: string }> = {
  "basic-monthly": {
    amount: 99900,
    name: "Basic Plan",
    period: "monthly",
    interval: 1,
    description: "Core DMT, AEPS, UPI QR — perfect for getting started"
  },
  "professional-monthly": {
    amount: 199900,
    name: "Professional Plan",
    period: "monthly",
    interval: 1,
    description: "All services + priority support + higher limits"
  },
  "enterprise-monthly": {
    amount: 499900,
    name: "Enterprise Plan",
    period: "monthly",
    interval: 1,
    description: "Unlimited everything + dedicated manager + white-label"
  },
  "basic-yearly": {
    amount: 999900,
    name: "Basic Plan (Annual)",
    period: "yearly",
    interval: 1,
    description: "Core DMT, AEPS, UPI QR — save 2 months"
  },
  "professional-yearly": {
    amount: 1999900,
    name: "Professional Plan (Annual)",
    period: "yearly",
    interval: 1,
    description: "All services + priority support — save 2 months"
  },
  "enterprise-yearly": {
    amount: 4999900,
    name: "Enterprise Plan (Annual)",
    period: "yearly",
    interval: 1,
    description: "Unlimited everything + dedicated manager — save 2 months"
  },
};

export function registerRazorpayRoutes(app: Express) {
  app.get("/api/razorpay/key", (req, res) => {
    if (!RAZORPAY_KEY_ID) {
      return res.status(500).json({ error: "Razorpay not configured" });
    }
    res.json({ key: RAZORPAY_KEY_ID });
  });

  app.post("/api/razorpay/create-order", async (req, res) => {
    try {
      if (!razorpay) {
        return res.status(500).json({ error: "Razorpay not configured" });
      }

      const { productId, currency = "INR", notes } = req.body;

      if (!productId || !AUTHORIZED_PRODUCTS[productId]) {
        return res.status(400).json({ error: "Valid product ID required" });
      }

      const amount = AUTHORIZED_PRODUCTS[productId].price;
      const productName = AUTHORIZED_PRODUCTS[productId].name;

      const options = {
        amount: Math.round(amount * 100),
        currency,
        receipt: `rcpt_${Date.now()}`,
        notes: { ...notes, productId, productName },
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error: any) {
      console.error("Razorpay order creation error:", error);
      res.status(500).json({ error: error.message || "Failed to create order" });
    }
  });

  app.post("/api/razorpay/verify-payment", async (req, res) => {
    try {
      if (!RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ error: "Razorpay not configured" });
      }

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ error: "Missing payment verification data" });
      }

      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      const isAuthentic = expectedSignature === razorpay_signature;

      if (isAuthentic) {
        console.log("Payment verified successfully:", {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
        });
        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        res.status(400).json({ success: false, error: "Payment verification failed" });
      }
    } catch (error: any) {
      console.error("Payment verification error:", error);
      res.status(500).json({ error: error.message || "Payment verification failed" });
    }
  });

  app.get("/api/razorpay/subscription-plans", (req, res) => {
    res.json(SUBSCRIPTION_PLANS);
  });

  app.post("/api/razorpay/create-subscription", async (req, res) => {
    try {
      if (!razorpay) {
        return res.status(500).json({ error: "Razorpay not configured" });
      }

      const { planKey, planId, customerName, customerEmail, customerPhone } = req.body;

      let resolvedPlanId: string;
      let planLabel = planKey || "premium";

      if (planId) {
        resolvedPlanId = planId;
      } else if (planKey && SUBSCRIPTION_PLANS[planKey]) {
        const plan = SUBSCRIPTION_PLANS[planKey];
        const razorpayPlan = await (razorpay as any).plans.create({
          period: plan.period,
          interval: plan.interval,
          item: {
            name: plan.name,
            amount: plan.amount,
            currency: "INR",
            description: plan.description,
          },
          notes: { planKey },
        });
        resolvedPlanId = razorpayPlan.id;
      } else {
        return res.status(400).json({ error: "Valid planId or planKey required" });
      }

      try {
        const subscription = await (razorpay as any).subscriptions.create({
          plan_id: resolvedPlanId,
          total_count: 5,
          quantity: 1,
          customer_notify: 1,
          notes: {
            planLabel,
            customerName: customerName || "",
            customerEmail: customerEmail || "",
            customerPhone: customerPhone || "",
          },
        });
        console.log("Subscription created:", { subscriptionId: subscription.id, planId: resolvedPlanId });
        return res.json({ subscription, planId: resolvedPlanId, mode: "subscription" });
      } catch (subError: any) {
        const rzpMsg = subError?.error?.description || subError?.message || "Subscription API error";
        console.warn("Subscription API failed, falling back to order:", rzpMsg);

        const fallbackOrder = await razorpay.orders.create({
          amount: 99900,
          currency: "INR",
          receipt: `rcpt_premium_${Date.now()}`,
          notes: {
            planLabel,
            type: "premium-yearly-activation",
            customerName: customerName || "",
            customerEmail: customerEmail || "",
            customerPhone: customerPhone || "",
          },
        });
        console.log("Fallback order created:", fallbackOrder.id);
        return res.json({ fallbackOrder, planId: resolvedPlanId, mode: "order" });
      }
    } catch (error: any) {
      const errMsg = error?.error?.description || error?.message || "Failed to create subscription";
      console.error("Subscription creation error:", error);
      res.status(500).json({ error: errMsg });
    }
  });

  app.post("/api/razorpay/verify-subscription", async (req, res) => {
    try {
      if (!RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ error: "Razorpay not configured" });
      }

      const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;

      if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
        return res.status(400).json({ error: "Missing subscription verification data" });
      }

      const body = razorpay_payment_id + "|" + razorpay_subscription_id;
      const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

      const isAuthentic = expectedSignature === razorpay_signature;

      if (isAuthentic) {
        console.log("Subscription verified:", { razorpay_subscription_id, razorpay_payment_id });
        res.json({ success: true, message: "Subscription activated successfully" });
      } else {
        res.status(400).json({ success: false, error: "Subscription verification failed" });
      }
    } catch (error: any) {
      console.error("Subscription verification error:", error);
      res.status(500).json({ error: error.message || "Subscription verification failed" });
    }
  });
}
