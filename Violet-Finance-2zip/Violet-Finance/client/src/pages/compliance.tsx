import { Navbar, Footer } from "@/components/layout";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, FileText, Scale, Building, Upload, CheckCircle2, AlertCircle, Zap, ArrowLeft, MessageCircle, Clock, X, IndianRupee, Briefcase, Shield, Award, FileCheck, Stamp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const serviceCategories = [
  {
    id: "income-tax",
    title: "Income Tax Filing (ITR)",
    icon: FileText,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    services: [
      { name: "Salaried Individual", frequency: "Annual", price: "₹499" },
      { name: "Business / Professionals", frequency: "Annual", price: "₹1,499" },
      { name: "Capital Gain / Multiple Sources", frequency: "Annual", price: "₹1,999" },
      { name: "Previous Year's ITR (Missed ITRs - up to 5 lakh)", frequency: "Annual", price: "₹2,499" },
    ]
  },
  {
    id: "income-tax-other",
    title: "Income Tax - Other",
    icon: ClipboardCheck,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    services: [
      { name: "TDS Return Filing", frequency: "Quarterly", price: "₹2,999" },
      { name: "Advance Tax Computation", frequency: "Quarterly", price: "₹2,999" },
    ]
  },
  {
    id: "gst-services",
    title: "GST Services",
    icon: Scale,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    services: [
      { name: "GST Registration", frequency: "One-time", price: "₹2,999" },
      { name: "GST Return Filing (GSTR-1 & GSTR 3B) - NIL Return", frequency: "Monthly", price: "₹499" },
      { name: "GST Return Filing (GSTR-1 & GSTR 3B) - Transaction based", frequency: "Monthly", price: "₹1,499" },
      { name: "GST Annual Return (GSTR 9)", frequency: "Annual", price: "₹2,499" },
      { name: "GST Refund (Exporter)", frequency: "Quarterly", price: "₹2,999" },
      { name: "GST Notice Reply", frequency: "Ad-hoc", price: "Case to case" },
      { name: "E-Way Bill Generation", frequency: "Ad-hoc", price: "₹499" },
    ]
  },
  {
    id: "corporate",
    title: "Corporate Secretarial Services",
    icon: Building,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    services: [
      { name: "Pvt. Ltd. / LLP Incorporation", frequency: "One-time", price: "₹9,999" },
      { name: "ROC Annual Filing (AOC-4, MGT-7)", frequency: "Annual", price: "₹9,999" },
      { name: "Director KYC (DIR-3)", frequency: "Annual", price: "₹499" },
      { name: "Other MCA Related Work", frequency: "Ad-hoc", price: "Case to case" },
    ]
  },
  {
    id: "accounting",
    title: "Accounting & Reports",
    icon: Briefcase,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    services: [
      { name: "Monthly Accounting & Bookkeeping", frequency: "Monthly", price: "₹4,999" },
      { name: "Balance Sheet & P&L Preparation", frequency: "Annual", price: "₹4,999" },
      { name: "Tax Audit (u/s 44AB)", frequency: "Annual", price: "₹14,999" },
    ]
  },
  {
    id: "certificates",
    title: "Certificates & Registrations",
    icon: Award,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    services: [
      { name: "CA Certificate / Net Worth Certificate", frequency: "Ad-hoc", price: "₹2,999" },
      { name: "Shareholding Certificate by CA", frequency: "Ad-hoc", price: "₹2,999" },
      { name: "Project Report for Bank Loan", frequency: "Ad-hoc", price: "₹2,999" },
      { name: "Turnover Certificate", frequency: "Ad-hoc", price: "₹2,999" },
      { name: "Projected Financials", frequency: "Ad-hoc", price: "₹2,999" },
    ]
  },
  {
    id: "digital-legal",
    title: "Digital & Legal",
    icon: Shield,
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
    services: [
      { name: "Digital Signature Certificate (DSC)", frequency: "One-time", price: "₹1,999" },
      { name: "PAN / TAN Application", frequency: "One-time", price: "₹499" },
      { name: "PAN / TAN Correction", frequency: "One-time", price: "₹499" },
    ]
  },
  {
    id: "licenses",
    title: "Other Licences",
    icon: Stamp,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    services: [
      { name: "Shop Act / Gumasta License", frequency: "One-time", price: "₹2,499" },
      { name: "FSSAI Registration (Food License)", frequency: "One-time", price: "₹2,499" },
      { name: "Import Export Code (IEC)", frequency: "One-time", price: "₹999" },
      { name: "UDYAM / MSME Registration", frequency: "One-time", price: "₹999" },
      { name: "Trade License (Municipal)", frequency: "One-time", price: "₹2,499" },
      { name: "Labour License (Contractor/Establishment)", frequency: "One-time", price: "₹2,999" },
      { name: "Professional Tax Registration", frequency: "One-time", price: "₹1,999" },
      { name: "ISO Certification", frequency: "One-time", price: "₹6,999" },
      { name: "Trademark Registration", frequency: "One-time", price: "₹4,999" },
      { name: "Copyright Registration", frequency: "One-time", price: "₹4,999" },
      { name: "PF / ESIC Registration", frequency: "One-time", price: "₹2,499" },
      { name: "Startup India / DPIIT Registration", frequency: "One-time", price: "₹4,999" },
      { name: "GEM Portal Registration", frequency: "One-time", price: "₹1,499" },
      { name: "Pollution Control NOC (SPCB)", frequency: "One-time", price: "₹5,999" },
      { name: "Fire Safety NOC", frequency: "One-time", price: "₹3,999" },
      { name: "Drug License", frequency: "One-time", price: "₹5,999" },
      { name: "Liquor License", frequency: "One-time", price: "₹24,999" },
      { name: "Trade Mark Objection / Reply Handling", frequency: "One-time", price: "₹2,499" },
      { name: "Patent Registration", frequency: "One-time", price: "₹9,999" },
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
  const [files, setFiles] = useState<File[]>([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeNumber, setActiveNumber] = useState<string | null>(null);
  const { toast } = useToast();

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
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b3b] via-[#0d0d2b] to-[#0a1a3a] text-white">
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
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline"
                className="bg-purple-400/10 hover:bg-purple-400/20 text-white rounded-full px-8 h-12 font-bold shadow-lg shadow-purple-500/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 border border-purple-500/20"
                onClick={() => handleWhatsAppAppointment("919230967187")}
              >
                <MessageCircle className="h-5 w-5 fill-[#25D366] text-[#25D366]" />
                <span className="text-sm">Make an Appointment 1</span>
              </Button>
              <Button 
                variant="outline"
                className="bg-purple-400/10 hover:bg-purple-400/20 text-white rounded-full px-8 h-12 font-bold shadow-lg shadow-purple-500/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 border border-purple-500/20"
                onClick={() => handleWhatsAppAppointment("919230967189")}
              >
                <MessageCircle className="h-5 w-5 fill-[#25D366] text-[#25D366]" />
                <span className="text-sm">Make an Appointment 2</span>
              </Button>
            </div>
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
                              onClick={() => {
                                const message = encodeURIComponent(`Hi, I'm interested in ${service.name} (${category.title}) - ${service.price}. Please provide more details.`);
                                window.open(`https://wa.me/919230967187?text=${message}`, '_blank');
                              }}
                            >
                              Enquire Now
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

      <Footer />
    </div>
  );
}