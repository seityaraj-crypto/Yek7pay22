import { Navbar, Footer } from "@/components/layout";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, FileText, Scale, Building, Upload, CheckCircle2, AlertCircle, Zap, ArrowLeft, MessageCircle, Clock, X, IndianRupee, Briefcase, Shield, Award, FileCheck, Stamp, Phone, Mail, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { NetworkDots } from "@/components/network-dots";
import { Invoice } from "@/components/invoice";

const serviceCategories = [
  {
    id: "income-tax",
    title: "Income Tax Filing (ITR)",
    icon: FileText,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    services: [
      { name: "Salaried Individual", frequency: "Annual", price: "₹499", productId: "itr-salary-pension" },
      { name: "Business / Professionals", frequency: "Annual", price: "₹1,499", productId: "itr-business-professional" },
      { name: "Capital Gain / Multiple Sources", frequency: "Annual", price: "₹1,999", productId: "itr-capital-gain" },
      { name: "Previous Year's ITR (Missed ITRs - up to 5 lakh)", frequency: "Annual", price: "₹2,499", productId: "itr-previous-year" },
    ]
  },
  {
    id: "income-tax-other",
    title: "Income Tax - Other",
    icon: ClipboardCheck,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    services: [
      { name: "TDS Return Filing", frequency: "Quarterly", price: "₹2,999", productId: "tds-return" },
      { name: "Advance Tax Computation", frequency: "Quarterly", price: "₹2,999", productId: "advance-tax" },
    ]
  },
  {
    id: "gst-services",
    title: "GST Services",
    icon: Scale,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    services: [
      { name: "GST Registration", frequency: "One-time", price: "₹2,999", productId: "gst-registration" },
      { name: "GST Return Filing (GSTR-1 & GSTR 3B) - NIL Return", frequency: "Monthly", price: "₹499", productId: "gst-return-nil" },
      { name: "GST Return Filing (GSTR-1 & GSTR 3B) - Transaction based", frequency: "Monthly", price: "₹1,499", productId: "gst-return-transaction" },
      { name: "GST Annual Return (GSTR 9)", frequency: "Annual", price: "₹2,499", productId: "gst-annual-return" },
      { name: "GST Refund (Exporter)", frequency: "Quarterly", price: "₹2,999", productId: "gst-refund-exporter" },
      { name: "GST Notice Reply", frequency: "Ad-hoc", price: "Case by case", productId: null },
      { name: "E-Way Bill Generation", frequency: "Ad-hoc", price: "₹499", productId: "eway-bill" },
    ]
  },
  {
    id: "corporate",
    title: "Corporate Secretarial Services",
    icon: Building,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    services: [
      { name: "Pvt. Ltd. / LLP Incorporation", frequency: "One-time", price: "₹9,999", productId: "pvt-ltd-incorporation" },
      { name: "ROC Annual Filing (AOC-4, MGT-7)", frequency: "Annual", price: "₹9,999", productId: "roc-filing" },
      { name: "Director KYC (DIR-3)", frequency: "Annual", price: "₹499", productId: "director-kyc" },
      { name: "Other MCA Related Work", frequency: "Ad-hoc", price: "Case by case", productId: null },
    ]
  },
  {
    id: "accounting",
    title: "Accounting & Reports",
    icon: Briefcase,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    services: [
      { name: "Monthly Accounting & Bookkeeping", frequency: "Monthly", price: "₹4,999", productId: "monthly-accounting" },
      { name: "Balance Sheet & P&L Preparation", frequency: "Annual", price: "₹4,999", productId: "balance-sheet" },
      { name: "Tax Audit (u/s 44AB)", frequency: "Annual", price: "₹14,999", productId: "tax-audit" },
    ]
  },
  {
    id: "certificates",
    title: "Certificates & Registrations",
    icon: Award,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    services: [
      { name: "CA Certificate / Net Worth Certificate", frequency: "Ad-hoc", price: "₹2,999", productId: "ca-certificate" },
      { name: "Shareholding Certificate by CA", frequency: "Ad-hoc", price: "₹2,999", productId: "shareholding-certificate" },
      { name: "Project Report for Bank Loan", frequency: "Ad-hoc", price: "₹2,999", productId: "project-report" },
      { name: "Turnover Certificate", frequency: "Ad-hoc", price: "₹2,999", productId: "turnover-certificate" },
      { name: "Projected Financials", frequency: "Ad-hoc", price: "₹2,999", productId: "projected-financials" },
    ]
  },
  {
    id: "digital-legal",
    title: "Digital & Legal",
    icon: Shield,
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
    services: [
      { name: "Digital Signature Certificate (DSC)", frequency: "One-time", price: "₹1,999", productId: "dsc" },
      { name: "PAN / TAN Application", frequency: "One-time", price: "₹499", productId: "pan-tan-application" },
      { name: "PAN / TAN Correction", frequency: "One-time", price: "₹499", productId: "pan-tan-correction" },
    ]
  },
  {
    id: "licenses",
    title: "Other Licences",
    icon: Stamp,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    services: [
      { name: "Shop Act / Gumasta License", frequency: "One-time", price: "₹2,499", productId: null },
      { name: "FSSAI Registration (Food License)", frequency: "One-time", price: "₹2,499", productId: "fssai-registration" },
      { name: "Import Export Code (IEC)", frequency: "One-time", price: "₹999", productId: "import-export-code" },
      { name: "UDYAM / MSME Registration", frequency: "One-time", price: "₹999", productId: "udyam-registration" },
      { name: "Trade License (Municipal)", frequency: "One-time", price: "₹2,499", productId: null },
      { name: "Labour License (Contractor/Establishment)", frequency: "One-time", price: "₹2,999", productId: null },
      { name: "Professional Tax Registration", frequency: "One-time", price: "₹1,999", productId: null },
      { name: "ISO Certification", frequency: "One-time", price: "₹6,999", productId: null },
      { name: "Trademark Registration", frequency: "One-time", price: "₹4,999", productId: null },
      { name: "Copyright Registration", frequency: "One-time", price: "₹4,999", productId: null },
      { name: "PF / ESIC Registration", frequency: "One-time", price: "₹2,499", productId: null },
      { name: "Startup India / DPIIT Registration", frequency: "One-time", price: "₹4,999", productId: null },
      { name: "GEM Portal Registration", frequency: "One-time", price: "₹1,499", productId: null },
      { name: "Pollution Control NOC (SPCB)", frequency: "One-time", price: "₹5,999", productId: null },
      { name: "Fire Safety NOC", frequency: "One-time", price: "₹3,999", productId: null },
      { name: "Drug License", frequency: "One-time", price: "₹5,999", productId: null },
      { name: "Liquor License", frequency: "One-time", price: "₹24,999", productId: null },
      { name: "Trade Mark Objection / Reply Handling", frequency: "One-time", price: "₹2,499", productId: null },
      { name: "Patent Registration", frequency: "One-time", price: "₹9,999", productId: null },
    ]
  }
];

const complianceServices = serviceCategories.map(cat => ({
  id: cat.id,
  title: cat.title,
  description: `${cat.services.length} services available`,
  icon: cat.icon,
  color: cat.color,
  bgColor: cat.bgColor
}));

export default function Compliance() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeNumber, setActiveNumber] = useState<string | null>(null);
  const [showAppointmentContact, setShowAppointmentContact] = useState(false);
  const [appointmentContactOption, setAppointmentContactOption] = useState<'call' | 'whatsapp' | 'email' | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const { toast } = useToast();

  const handleServiceSelect = (service: any, category: any) => {
    if (!service.productId) {
      const message = encodeURIComponent(`Hi, I'm interested in ${service.name} (${category.title}). Please provide a quote.`);
      window.open(`https://wa.me/919230967187?text=${message}`, '_blank');
      return;
    }

    const priceStr = service.price.replace('₹', '').replace(',', '');
    const price = parseFloat(priceStr);
    const gst = price * 0.18;
    const total = price + gst;

    setInvoiceData({
      title: `${service.name} - ${category.title}`,
      amount: `₹ ${total.toLocaleString('en-IN')}`,
      productId: service.productId,
      items: [
        { name: "Service Fee", price: `₹ ${price.toLocaleString('en-IN')}` },
        { name: "GST (18%)", price: `₹ ${gst.toLocaleString('en-IN')}` }
      ]
    });
    setShowInvoice(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      toast({
        title: "Files added",
        description: `${newFiles.length} file(s) selected for upload.`,
      });
    }
  };

  const handleWhatsAppAppointment = (number: string) => {
    setActiveNumber(number);
    setShowTimePicker(true);
  };

  const confirmAppointment = (time: string) => {
    if (activeNumber) {
      const message = encodeURIComponent(`Hello, I would like to make an appointment for Tax Audit/Compliance services at ${time}.`);
      window.open(`https://wa.me/${activeNumber}?text=${message}`, '_blank');
      setShowTimePicker(false);
      setActiveNumber(null);
    }
  };

  const handleSubmit = () => {
    if (!selectedService) {
      toast({
        title: "Selection required",
        description: "Please select a service first.",
        variant: "destructive"
      });
      return;
    }
    if (files.length === 0) {
      toast({
        title: "Documents required",
        description: "Please upload the necessary documents.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Request Submitted",
      description: "Our compliance team will review your documents and contact you shortly.",
    });
    setFiles([]);
    setSelectedService(null);
  };

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b3b] via-[#0d0d2b] to-[#0a1a3a] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-screen z-0 opacity-30" style={{ maskImage: 'linear-gradient(to left, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 100%)' }}>
        <NetworkDots />
      </div>
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-24">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-white/60 hover:text-white hover:bg-white/5 gap-2 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
              GST & Compliance
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Professional tax and regulatory services to keep your business compliant and growing.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400 h-6 w-6" />
              Explore All Compliance Services
            </h2>
            <button 
              onClick={() => setShowAppointmentContact(true)}
              className="relative px-10 py-4 rounded-2xl font-black text-lg shadow-xl transition-all hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]" />
              <span className="relative z-10 flex items-center gap-3 text-white">
                <Clock className="w-5 h-5" />
                Make an Appointment
              </span>
            </button>
          </div>

          <div className="space-y-8">
            {serviceCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: catIndex * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
                  <CardHeader className="border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${category.bgColor} flex items-center justify-center ${category.color} shadow-lg`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">{category.title}</CardTitle>
                        <CardDescription className="text-white/50">{category.services.length} services available</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-white/5">
                      {category.services.map((service, serviceIndex) => (
                        <div 
                          key={serviceIndex} 
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-white/5 transition-colors gap-3"
                        >
                          <div className="flex-1">
                            <p className="text-white font-medium">{service.name}</p>
                            <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full inline-block mt-1">
                              {service.frequency}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`text-lg font-bold ${category.color}`}>
                              {service.price}
                            </span>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:opacity-90 text-white rounded-full px-4 h-8 text-xs font-bold"
                              onClick={() => handleServiceSelect(service, category)}
                            >
                              Pay Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-white font-bold">Need Custom Service?</p>
                  <p className="text-sm text-white/60">Contact us for customized compliance solutions for your business</p>
                </div>
              </div>
              <Button
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:opacity-90 text-white rounded-full px-8 h-12 font-bold"
                onClick={() => {
                  const message = encodeURIComponent(`Hi, I need a custom compliance service. Please help me with my requirements.`);
                  window.open(`https://wa.me/919230967187?text=${message}`, '_blank');
                }}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {showInvoice && invoiceData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowInvoice(false)}
            />
            <div className="relative z-[110] w-full max-w-2xl">
              <button 
                onClick={() => setShowInvoice(false)}
                className="absolute -top-12 right-0 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-8 w-8 text-white" />
              </button>
              <Invoice 
                title={invoiceData.title}
                amount={invoiceData.amount}
                productId={invoiceData.productId}
                invoiceNumber={`INV-${Math.floor(Math.random() * 90000) + 10000}`}
                date={new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                items={invoiceData.items}
                onClose={() => setShowInvoice(false)}
                onPaymentSuccess={() => {
                  console.log("Compliance service payment successful:", invoiceData.title);
                }}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Time Selection Modal */}
      <AnimatePresence>
        {showTimePicker && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowTimePicker(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#1a1a3a] border border-white/10 rounded-[2rem] p-8 shadow-2xl"
            >
              <button 
                onClick={() => setShowTimePicker(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="h-6 w-6 text-white/40" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white text-left">Select Appointment Time</h3>
                  <p className="text-sm text-white/40 text-left">Choose a 30-minute slot</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    className="h-12 bg-white/5 border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white/70 hover:text-white rounded-xl transition-all flex items-center justify-start px-4"
                    onClick={() => confirmAppointment(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-3 text-left">
                <AlertCircle className="h-5 w-5 text-blue-400 shrink-0" />
                <p className="text-xs text-blue-200/50 leading-relaxed">
                  All slots are 30 minutes. You will be redirected to WhatsApp with your chosen time.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unified Appointment Contact Modal */}
      <AnimatePresence>
        {showAppointmentContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setShowAppointmentContact(false); setAppointmentContactOption(null); setSelectedTimeSlot(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-purple-900/40 border-2 border-purple-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl relative backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => { setShowAppointmentContact(false); setAppointmentContactOption(null); setSelectedTimeSlot(null); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {!selectedTimeSlot ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Select Time Slot</h3>
                    <p className="text-purple-200/70">Choose your preferred appointment time</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTimeSlot(time)}
                        className="p-3 rounded-xl bg-white/10 border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400 transition-all text-white font-medium text-sm"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </>
              ) : !appointmentContactOption ? (
                <>
                  <button 
                    onClick={() => setSelectedTimeSlot(null)}
                    className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-4"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span className="text-sm font-medium">Change Time</span>
                  </button>
                  
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 mb-4">
                      <Clock className="w-4 h-4 text-purple-300" />
                      <span className="text-purple-200 font-bold">{selectedTimeSlot}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">How would you like to book?</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => setAppointmentContactOption('call')}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-purple-400/30 hover:bg-white/20 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white">Call Us</h4>
                        <p className="text-sm text-purple-200/60">Schedule via phone call</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-400/50 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                      onClick={() => setAppointmentContactOption('whatsapp')}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-purple-400/30 hover:bg-white/20 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white">WhatsApp</h4>
                        <p className="text-sm text-purple-200/60">Book via WhatsApp chat</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-400/50 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                      onClick={() => setAppointmentContactOption('email')}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-purple-400/30 hover:bg-white/20 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white">Email</h4>
                        <p className="text-sm text-purple-200/60">Book via email</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-400/50 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setAppointmentContactOption(null)}
                    className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-4"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span className="text-sm font-medium">Back</span>
                  </button>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 mb-4 mx-auto">
                    <Clock className="w-4 h-4 text-purple-300" />
                    <span className="text-purple-200 font-bold">{selectedTimeSlot}</span>
                  </div>
                  
                  {appointmentContactOption === 'call' && (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Phone className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Call Us</h3>
                      <p className="text-purple-200/70 mb-6">Tap to call and confirm your {selectedTimeSlot} appointment</p>
                      <div className="space-y-3">
                        <a href="tel:+919230967189" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all font-bold text-white">
                          <Phone className="w-5 h-5" />
                          +91 92309 67189
                        </a>
                        <a href="tel:+919230967187" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all font-bold text-white">
                          <Phone className="w-5 h-5" />
                          +91 92309 67187
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {appointmentContactOption === 'whatsapp' && (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <MessageCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                      <p className="text-purple-200/70 mb-6">Tap to book your {selectedTimeSlot} appointment</p>
                      <div className="space-y-3">
                        <a href={`https://wa.me/919230967189?text=Hello%2C%20I%20would%20like%20to%20make%20an%20appointment%20for%20Tax%20Audit%2FCompliance%20services%20at%20${encodeURIComponent(selectedTimeSlot)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 transition-all font-bold text-white">
                          <MessageCircle className="w-5 h-5" />
                          +91 92309 67189
                        </a>
                        <a href={`https://wa.me/919230967187?text=Hello%2C%20I%20would%20like%20to%20make%20an%20appointment%20for%20Tax%20Audit%2FCompliance%20services%20at%20${encodeURIComponent(selectedTimeSlot)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 transition-all font-bold text-white">
                          <MessageCircle className="w-5 h-5" />
                          +91 92309 67187
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {appointmentContactOption === 'email' && (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Email Us</h3>
                      <p className="text-purple-200/70 mb-6">Tap to email and book your {selectedTimeSlot} appointment</p>
                      <div className="space-y-3">
                        <a href={`mailto:info@yek7pay.com?subject=Appointment%20Request%20for%20${encodeURIComponent(selectedTimeSlot)}&body=Hello%2C%0A%0AI%20would%20like%20to%20make%20an%20appointment%20for%20Tax%20Audit%2FCompliance%20services%20at%20${encodeURIComponent(selectedTimeSlot)}.%0A%0APlease%20confirm%20the%20availability.%0A%0AThank%20you.`} className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 transition-all font-bold text-white">
                          <Mail className="w-5 h-5" />
                          info@yek7pay.com
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}