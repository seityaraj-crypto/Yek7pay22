import { motion } from "framer-motion";
import { ShieldCheck, Download, CheckCircle2, QrCode, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRazorpay } from "@/hooks/use-razorpay";
import { useToast } from "@/hooks/use-toast";

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

export function Invoice({ title, amount, productId, items, invoiceNumber, date, onClose, onPaymentSuccess }: InvoiceProps) {
  const { initiatePayment, isLoading } = useRazorpay();
  const { toast } = useToast();

  const handlePayment = () => {
    initiatePayment({
      productId,
      name: "Yek7Pay Solutions",
      description: title,
      notes: {
        invoiceNumber,
      },
      onSuccess: (response) => {
        toast({
          title: "Payment Successful!",
          description: `Transaction ID: ${response.razorpay_payment_id}`,
        });
        onPaymentSuccess?.();
        onClose();
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

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          className="flex-1 rounded-full h-12 border-white/10 hover:bg-white/5 text-sm font-bold gap-2"
          onClick={() => window.print()}
        >
          <Download className="h-4 w-4" /> Download PDF
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full h-12 text-sm font-bold shadow-lg"
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </Button>
      </div>

      <p className="text-center mt-6 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
        Authorized Transaction • Yek7Pay Solutions
      </p>
    </motion.div>
  );
}
