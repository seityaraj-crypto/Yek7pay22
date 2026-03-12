import { useState, useCallback } from "react";

interface SubscriptionOptions {
  planKey?: string;
  planId?: string;
  name: string;
  description: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess?: (response: SubscriptionResponse) => void;
  onError?: (error: Error) => void;
}

interface SubscriptionResponse {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function useRazorpaySubscription() {
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

  const initiateSubscription = useCallback(async (options: SubscriptionOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Failed to load Razorpay SDK");

      const keyResponse = await fetch("/api/razorpay/key");
      if (!keyResponse.ok) throw new Error("Failed to fetch Razorpay key");
      const { key } = await keyResponse.json();

      const subResponse = await fetch("/api/razorpay/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planKey: options.planKey,
          planId: options.planId,
          customerName: options.prefill?.name || "",
          customerEmail: options.prefill?.email || "",
          customerPhone: options.prefill?.contact || "",
        }),
      });

      if (!subResponse.ok) {
        const errorData = await subResponse.json();
        throw new Error(errorData.error || "Failed to create subscription");
      }

      const { subscription } = await subResponse.json();

      const razorpayOptions = {
        key,
        subscription_id: subscription.id,
        name: options.name,
        description: options.description,
        prefill: options.prefill || {},
        theme: { color: "#f59e0b" },
        handler: async (response: SubscriptionResponse) => {
          try {
            const verifyResponse = await fetch("/api/razorpay/verify-subscription", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            if (verifyResponse.ok) {
              options.onSuccess?.(response);
            } else {
              const errorData = await verifyResponse.json();
              throw new Error(errorData.error || "Subscription verification failed");
            }
          } catch (err: any) {
            options.onError?.(err);
          }
        },
        modal: {
          ondismiss: () => setIsLoading(false),
        },
      };

      const rzp = new window.Razorpay(razorpayOptions);
      rzp.on("payment.failed", (response: any) => {
        options.onError?.(new Error(response.error.description));
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message);
      options.onError?.(err);
    } finally {
      setIsLoading(false);
    }
  }, [loadRazorpayScript]);

  return { initiateSubscription, isLoading, error };
}
