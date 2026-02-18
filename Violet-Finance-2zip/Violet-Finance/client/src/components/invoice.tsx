import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Download, CheckCircle2, Loader2, Phone, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRazorpay } from "@/hooks/use-razorpay";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface InvoiceProps {
  title: string;
  amount: string;
  productId: string;
  items: { name: string; price: string; qty?: number }[];
  invoiceNumber: string;
  date: string;
  onClose: () => void;
  onPaymentSuccess?: () => void;
}

interface PaymentDetails {
  paymentId: string;
  orderId: string;
}

function buildWhatsAppInvoiceMsg(data: { invoiceNumber: string; title: string; amount: string; items: { name: string; price: string; qty?: number }[]; paymentId?: string; customerPhone?: string }) {
  const parseAmt = (a: string) => parseFloat(a.replace(/[^\d.]/g, "")) || 0;
  const fmtINR = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const totalAmount = parseAmt(data.amount);
  const itemsList = data.items.map(item => {
    const qty = item.qty || 1;
    const price = parseAmt(item.price);
    return `  ${item.name}: ₹${fmtINR(price)} x ${qty} = ₹${fmtINR(price * qty)}`;
  }).join("\n");

  return `*INVOICE - Yek7Pay*

Invoice: #${data.invoiceNumber}
Service: ${data.title}

*Items:*
${itemsList}

*Total Paid: ₹${fmtINR(totalAmount)}*

${data.paymentId ? `Transaction ID: ${data.paymentId}` : ""}

Thank you for choosing Yek7Pay!

For queries:
WhatsApp: +91 92309 67187

_Yek7Pay Solutions Private Limited_`;
}

export function Invoice({ title, amount, productId, items, invoiceNumber, date, onClose, onPaymentSuccess }: InvoiceProps) {
  const { initiatePayment, isLoading } = useRazorpay();
  const { toast } = useToast();
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [customerPhone, setCustomerPhone] = useState("");
  const [phoneForInvoice, setPhoneForInvoice] = useState("");
  const [invoiceSent, setInvoiceSent] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const parseAmount = (amt: string): number => {
    return parseFloat(amt.replace(/[^\d.]/g, "")) || 0;
  };

  const openWhatsAppInvoice = (phone: string, paymentId?: string) => {
    const msg = buildWhatsAppInvoiceMsg({ invoiceNumber, title, amount, items, paymentId, customerPhone: phone });
    const cleanPhone = phone.replace(/\D/g, "");
    const fullPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
    const waUrl = `https://api.whatsapp.com/send?phone=${fullPhone}&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  const handlePayment = () => {
    if (!customerPhone) {
      toast({
        title: "Phone Number Required",
        description: "Please enter the customer's phone number before proceeding to payment.",
        variant: "destructive",
      });
      return;
    }
    setPhoneForInvoice(customerPhone);

    initiatePayment({
      productId,
      name: "Yek7Pay Solutions",
      description: title,
      prefill: {
        contact: customerPhone,
      },
      notes: {
        invoiceNumber,
        customerPhone,
      },
      onSuccess: async (response) => {
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

        openWhatsAppInvoice(customerPhone, response.razorpay_payment_id);
        setInvoiceSent(true);
        toast({
          title: "Invoice Sent via WhatsApp!",
          description: `Invoice opened in WhatsApp for ${customerPhone}`,
        });
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

  const handleSendInvoice = () => {
    const phoneToUse = phoneForInvoice || customerPhone;
    if (!phoneToUse) {
      toast({
        title: "Phone Number Required",
        description: "Please enter the phone number to send the invoice.",
        variant: "destructive",
      });
      return;
    }

    openWhatsAppInvoice(phoneToUse, paymentDetails?.paymentId);
    setInvoiceSent(true);
    toast({
      title: "Invoice Sent via WhatsApp!",
      description: `Invoice opened in WhatsApp for ${phoneToUse}`,
    });
  };

  const handleDownloadInvoice = useCallback(async () => {
    if (!invoiceRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const a4Width = 210;
      const a4Height = 297;
      const margin = 0;
      const contentWidth = a4Width - margin * 2;
      const scaledHeight = (imgHeight * contentWidth) / imgWidth;

      if (scaledHeight <= a4Height) {
        pdf.addImage(imgData, "PNG", margin, margin, contentWidth, scaledHeight);
      } else {
        let yOffset = 0;
        let page = 0;
        const sourceSliceHeight = (a4Height * imgWidth) / contentWidth;

        while (yOffset < imgHeight) {
          if (page > 0) pdf.addPage();

          const sliceH = Math.min(sourceSliceHeight, imgHeight - yOffset);
          const sliceCanvas = document.createElement("canvas");
          sliceCanvas.width = imgWidth;
          sliceCanvas.height = sliceH;
          const ctx = sliceCanvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(canvas, 0, yOffset, imgWidth, sliceH, 0, 0, imgWidth, sliceH);
            const sliceData = sliceCanvas.toDataURL("image/png");
            const slicePageH = (sliceH * contentWidth) / imgWidth;
            pdf.addImage(sliceData, "PNG", margin, margin, contentWidth, slicePageH);
          }

          yOffset += sliceH;
          page++;
        }
      }

      pdf.save(`Yek7Pay_Invoice_${invoiceNumber}.pdf`);

      toast({
        title: "Invoice Downloaded!",
        description: `Saved as Yek7Pay_Invoice_${invoiceNumber}.pdf`,
      });
    } catch (err) {
      console.error("Download failed:", err);
      toast({
        title: "Download Failed",
        description: "Could not generate invoice PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  }, [invoiceNumber, toast]);

  const totalAmount = parseAmount(amount);

  if (paymentComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-[600px] w-full relative overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b">
          <span className="text-xs text-gray-500 font-medium">Invoice Preview</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={invoiceRef} className="bg-white p-8" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
          <div className="flex justify-end mb-1">
            <p className="text-sm text-gray-700"><span className="font-semibold">Sender:</span> Yek7Pay Solutions Pvt. Ltd.</p>
          </div>
          <hr className="border-gray-300 mb-6" />

          <h1 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide">INVOICE</h1>

          <div className="flex justify-between mb-8">
            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="font-bold">Invoice:</span> #{invoiceNumber}</p>
              <p><span className="font-bold">Date:</span> {date}</p>
              <p><span className="font-bold">Payment Status:</span> <span className="text-green-600 font-semibold">PAID</span></p>
            </div>
            <div className="text-sm text-gray-700 text-right space-y-1">
              <p className="font-bold">Receiver:</p>
              <p>{phoneForInvoice || customerPhone || "Customer"}</p>
              {paymentDetails && (
                <p className="text-xs text-gray-500">Txn: {paymentDetails.paymentId}</p>
              )}
            </div>
          </div>

          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 border border-gray-200">Item Description</th>
                <th className="text-right py-3 px-4 text-sm font-bold text-gray-700 border border-gray-200">Price (₹)</th>
                <th className="text-center py-3 px-4 text-sm font-bold text-gray-700 border border-gray-200">Quantity</th>
                <th className="text-right py-3 px-4 text-sm font-bold text-gray-700 border border-gray-200">Subtotal (₹)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const qty = item.qty || 1;
                const price = parseAmount(item.price);
                const subtotal = price * qty;
                return (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-3 px-4 text-sm text-gray-700 border border-gray-200">{item.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700 text-right border border-gray-200">{price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="py-3 px-4 text-sm text-gray-700 text-center border border-gray-200">{qty}</td>
                    <td className="py-3 px-4 text-sm text-gray-700 text-right font-semibold border border-gray-200">{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="py-3 px-4 text-sm font-bold text-gray-800 text-right border border-gray-200">Total (₹)</td>
                <td className="py-3 px-4 text-base font-bold text-gray-900 text-right border border-gray-200">{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
              </tr>
            </tfoot>
          </table>

          <div className="mt-8 mb-4">
            <p className="text-sm text-blue-700 font-semibold underline mb-2">Payment processed via Razorpay:</p>
            <p className="text-sm text-gray-600">Company: Yek7Pay Solutions Private Limited</p>
            <p className="text-sm text-gray-600">Email: info@yek7pay.com</p>
            <p className="text-sm text-gray-600">WhatsApp: +91 92309 67187</p>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-blue-700 italic">Note: This is a system-generated invoice. For queries, contact info@yek7pay.com</p>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t space-y-3">
          {!invoiceSent ? (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="Enter phone to resend invoice via WhatsApp"
                  value={phoneForInvoice || customerPhone}
                  onChange={(e) => setPhoneForInvoice(e.target.value)}
                  className="pl-10 h-10 text-sm text-gray-900 bg-white"
                  style={{ color: '#111827' }}
                />
              </div>
              <Button
                onClick={handleSendInvoice}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white h-10 px-4"
              >
                <MessageCircle className="h-4 w-4 mr-1" /> Send
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium justify-center py-1">
              <CheckCircle2 className="h-4 w-4" /> Invoice sent via WhatsApp to {phoneForInvoice || customerPhone}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-10 text-sm font-bold gap-2"
              onClick={handleDownloadInvoice}
              disabled={isDownloading}
            >
              {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Download Invoice
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-10 text-sm font-bold"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-2xl shadow-2xl max-w-[600px] w-full relative overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b">
        <span className="text-xs text-gray-500 font-medium">Payment Invoice</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-8" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div className="flex justify-end mb-1">
          <p className="text-sm text-gray-700"><span className="font-semibold">From:</span> Yek7Pay Solutions Pvt. Ltd.</p>
        </div>
        <hr className="border-gray-300 mb-6" />

        <h1 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide">INVOICE</h1>

        <div className="flex justify-between mb-8">
          <div className="text-sm text-gray-700 space-y-1">
            <p><span className="font-bold">Invoice:</span> #{invoiceNumber}</p>
            <p><span className="font-bold">Date:</span> {date}</p>
            <p><span className="font-bold">Payment Status:</span> <span className="text-amber-600 font-semibold">PENDING</span></p>
          </div>
          <div className="text-sm text-gray-700 text-right">
            <p className="font-bold">Service:</p>
            <p>{title}</p>
          </div>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-700 border border-gray-200">Item Description</th>
              <th className="text-right py-3 px-4 text-sm font-bold text-gray-700 border border-gray-200">Price (₹)</th>
              <th className="text-center py-3 px-4 text-sm font-bold text-gray-700 border border-gray-200">Quantity</th>
              <th className="text-right py-3 px-4 text-sm font-bold text-gray-700 border border-gray-200">Subtotal (₹)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => {
              const qty = item.qty || 1;
              const price = parseAmount(item.price);
              const subtotal = price * qty;
              return (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-sm text-gray-700 border border-gray-200">{item.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 text-right border border-gray-200">{price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 text-center border border-gray-200">{qty}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 text-right font-semibold border border-gray-200">{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="py-3 px-4 text-sm font-bold text-gray-800 text-right border border-gray-200">Total (₹)</td>
              <td className="py-3 px-4 text-base font-bold text-gray-900 text-right border border-gray-200">{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
            </tr>
          </tfoot>
        </table>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <span>Secured by Razorpay Payment Gateway</span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number (for invoice delivery)</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="tel"
              placeholder="Enter WhatsApp number (e.g. 9230967187)"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="pl-10 h-11 text-sm border-gray-300 text-gray-900 bg-white"
              style={{ color: '#111827' }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Invoice will be automatically sent via WhatsApp after payment</p>
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-bold shadow-lg rounded-lg"
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Processing Payment...
            </>
          ) : (
            `Pay ₹${totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })} Now`
          )}
        </Button>

        <p className="text-center mt-4 text-[10px] text-gray-400 uppercase tracking-[0.15em] font-medium">
          Yek7Pay Solutions Private Limited • Authorized Transaction
        </p>
      </div>
    </motion.div>
  );
}
