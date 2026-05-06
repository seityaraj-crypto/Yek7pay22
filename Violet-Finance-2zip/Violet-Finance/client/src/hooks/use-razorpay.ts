import { useState, useCallback } from "react";

interface RazorpayOptions {
  productId?: string;
  amount?: number;
  currency?: string;
  name: string;
  description: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  onSuccess?: (response: RazorpayResponse) => void;
  onError?: (error: Error) => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function useRazorpay() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRazorpayScript = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(async (options: RazorpayOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay SDK");
      }

      const keyResponse = await fetch("/api/razorpay/key");
      const { key } = await keyResponse.json();

      const isCustomAmount = typeof options.amount === "number" && options.amount > 0;
      const orderResponse = await fetch(isCustomAmount ? "/api/razorpay/create-custom-order" : "/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: options.productId,
          amount: options.amount,
          currency: options.currency || "INR",
          notes: {
            ...(options.notes || {}),
            productName: options.description,
          },
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      const order = await orderResponse.json();

      const razorpayOptions = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: options.name,
        description: options.description,
        order_id: order.id,
        prefill: options.prefill || {},
        notes: options.notes || {},
        theme: {
          color: "#6366f1",
        },
        method: {
          card: true,
          upi: true,
          netbanking: true,
          wallet: true,
        },
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyResponse = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            if (verifyResponse.ok) {
              options.onSuccess?.(response);
            } else {
              const errorData = await verifyResponse.json();
              throw new Error(errorData.error || "Payment verification failed");
            }
          } catch (err: any) {
            options.onError?.(err);
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.on("payment.failed", (response: any) => {
        options.onError?.(new Error(response.error.description));
      });
      razorpay.open();
    } catch (err: any) {
      setError(err.message);
      options.onError?.(err);
    } finally {
      setIsLoading(false);
    }
  }, [loadRazorpayScript]);

  return { initiatePayment, isLoading, error };
}
