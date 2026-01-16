import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Download, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRazorpay } from "@/hooks/use-razorpay";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface InvoiceProps {
  title: string;
  amount: string;
  productId: string;
  items: { name: string; price: string }[];
  invoiceNumber: string;
  date: string;
  onClose: () => void;
  onPaymentSuccess?: () => void;
}

interface PaymentDetails {
  paymentId: string;
  orderId: string;
}

export function Invoice({ title, amount, productId, items, invoiceNumber, date, onClose, onPaymentSuccess }: InvoiceProps) {
  const { initiatePayment, isLoading } = useRazorpay();
  const { toast } = useToast();
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [isSendingInvoice, setIsSendingInvoice] = useState(false);
  const [invoiceSent, setInvoiceSent] = useState(false);

  const handlePayment = () => {
    initiatePayment({
      productId,
      name: "Yek7Pay Solutions",
      description: title,
      notes: {
        invoiceNumber,
      },
      onSuccess: (response) => {
        setPaymentDetails({
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
        });
        setPaymentComplete(true);
        toast({
          title: "Payment Successful!",
          description: `Transaction ID: ${response.razorpay_payment_id}`,
        });
        onPaymentSuccess?.();
      },
      onError: (error) => {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleSendInvoice = async () => {
    if (!customerEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to receive the invoice.",
        variant: "destructive",
      });
      return;
    }

    setIsSendingInvoice(true);
    try {
      const response = await fetch("/api/invoice/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber,
          title,
          amount,
          items,
          date,
          paymentId: paymentDetails?.paymentId,
          orderId: paymentDetails?.orderId,
          customerEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setInvoiceSent(true);
        toast({
          title: "Invoice Sent!",
          description: `Invoice sent to ${customerEmail}`,
        });
      } else {
        throw new Error(data.error || "Failed to send invoice");
      }
    } catch (error) {
      toast({
        title: "Send Failed",
        description: "Could not send invoice. Please download it instead.",
        variant: "destructive",
      });
    } finally {
      setIsSendingInvoice(false);
    }
  };

  const handleDownloadInvoice = () => {
    window.print();
  };

  if (paymentComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#1a1a3a] border border-white/10 rounded-[2rem] p-8 shadow-2xl max-w-2xl w-full relative overflow-hidden text-white"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="text-center mb-8 relative z-10">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 mb-4"
          >
            <CheckCircle2 className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-display font-black mb-2">Payment Successful!</h2>
          <p className="text-white/60">Thank you for your payment. Your invoice is ready.</p>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Invoice</p>
              <p className="text-lg font-bold">{invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Amount Paid</p>
              <p className="text-2xl font-black text-emerald-400">{amount}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-white/10">
            <p className="text-sm text-white/60 mb-1">Service</p>
            <p className="font-bold">{title}</p>
          </div>
          {paymentDetails && (
            <div className="pt-4 mt-4 border-t border-white/10 text-sm">
              <p className="text-white/40">Transaction ID: {paymentDetails.paymentId}</p>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 mb-6 border border-white/10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-4 flex items-center gap-2">
            <Send className="h-4 w-4" />
            Receive Your Invoice
          </h3>
          
          {!invoiceSent ? (
            <>
              <div className="mb-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-12"
                  />
                </div>
              </div>
              <Button
                onClick={handleSendInvoice}
                disabled={isSendingInvoice || !customerEmail}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white rounded-xl h-12 font-bold"
              >
                {isSendingInvoice ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending Invoice...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Invoice to Email
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="text-center py-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-emerald-400 font-bold">Invoice Sent Successfully!</p>
              <p className="text-white/40 text-sm mt-1">Check your email</p>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1 rounded-full h-12 border-white/10 hover:bg-white/5 text-sm font-bold gap-2"
            onClick={handleDownloadInvoice}
          >
            <Download className="h-4 w-4" /> Download Invoice
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full h-12 text-sm font-bold"
            onClick={onClose}
          >
            Done
          </Button>
        </div>

        <p className="text-center mt-6 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
          With Warm Greetings from Yek7Pay • Thank You for Your Trust
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-[#1a1a3a] border border-white/10 rounded-[2rem] p-8 shadow-2xl max-w-2xl w-full relative overflow-hidden text-white"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <h2 className="text-3xl font-display font-black mb-2">Invoice</h2>
          <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Yek7Pay Solutions Private Limited</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold">No: {invoiceNumber}</p>
          <p className="text-sm text-white/40">{date}</p>
        </div>
      </div>

      <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
        <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">{title}</h3>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-white/60">{item.name}</span>
              <span className="font-bold">{item.price}</span>
            </div>
          ))}
          <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-center">
            <span className="text-lg font-bold">Total Amount</span>
            <span className="text-2xl font-black text-pink-500">{amount}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Payment Method</h4>
          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="font-medium">Razorpay Secure Payment</span>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3 rounded-xl border border-white/10">
            <ShieldCheck className="h-12 w-12 text-emerald-400" />
          </div>
        </div>
      </div>

      <Button 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full h-14 text-base font-bold shadow-lg"
        onClick={handlePayment}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          `Pay ${amount} Now`
        )}
      </Button>

      <p className="text-center mt-6 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
        Authorized Transaction • Yek7Pay Solutions
      </p>
    </motion.div>
  );
}
