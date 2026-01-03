import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { ClipboardCheck, FileText, Scale, Building, Upload, CheckCircle2, AlertCircle, Zap, ArrowLeft, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const complianceServices = [
  {
    id: "gst-filing",
    title: "GST Filing & Return",
    description: "Monthly and quarterly GST return filing for regular and composition taxpayers.",
    icon: FileText,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10"
  },
  {
    id: "itr-filing",
    title: "ITR Filing",
    description: "Income Tax Return filing for individuals, professionals, and business entities.",
    icon: ClipboardCheck,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10"
  },
  {
    id: "tax-audit",
    title: "Tax Audit",
    description: "Comprehensive statutory tax audit services by certified professionals. We provide deep tax analysis, compliance verification, and risk assessment to ensure your business stays ahead of regulatory requirements.",
    icon: Scale,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10"
  },
  {
    id: "company-formation",
    title: "Company Formation",
    description: "End-to-end assistance with PVT LTD, LLP, and OPC registration and incorporation.",
    icon: Building,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10"
  },
  {
    id: "other",
    title: "Other Services",
    description: "Need something else? Upload your documents and tell us your requirements.",
    icon: Zap,
    color: "text-rose-400",
    bgColor: "bg-rose-400/10"
  }
];

export default function Compliance() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
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
    const message = encodeURIComponent("Hello, I would like to make an appointment for Tax Audit/Compliance services.");
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Service Selection */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400 h-6 w-6" />
                  Select Service
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline"
                    className="bg-green-500/10 border-green-500/20 hover:bg-green-500/20 text-green-400 gap-2"
                    onClick={() => handleWhatsAppAppointment("919230967187")}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Appointment 1
                  </Button>
                  <Button 
                    variant="outline"
                    className="bg-green-500/10 border-green-500/20 hover:bg-green-500/20 text-green-400 gap-2"
                    onClick={() => handleWhatsAppAppointment("919230967189")}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Appointment 2
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complianceServices.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.05, translateY: -10 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card 
                      className={`cursor-pointer h-full transition-all duration-300 border-white/10 hover:border-emerald-500/50 bg-white/5 backdrop-blur-xl group ${
                        selectedService === service.id ? 'ring-2 ring-emerald-500 bg-white/10 border-emerald-500/50' : ''
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-2xl ${service.bgColor} flex items-center justify-center ${service.color} mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                          <service.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                        <CardDescription className="text-white/50">{service.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upload Section */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Upload className="text-blue-400 h-6 w-6" />
                Document Upload
              </h2>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 text-center border-dashed border-2 hover:border-blue-500/50 transition-colors group relative">
                <input 
                  type="file" 
                  multiple 
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto text-blue-400 group-hover:scale-110 transition-transform">
                    <Upload className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white">Click or drag files here</p>
                    <p className="text-sm text-white/40">Upload PAN, Aadhaar, and other relevant documents</p>
                  </div>
                </div>
              </Card>

              {files.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-bold text-white/60 uppercase tracking-widest">Selected Files ({files.length})</p>
                  <div className="space-y-2">
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 text-white/40 hover:text-red-400"
                          onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-500 to-blue-500 hover:opacity-90 shadow-lg shadow-emerald-500/20 rounded-2xl transition-all active:scale-95"
                onClick={handleSubmit}
                disabled={!selectedService || files.length === 0}
              >
                Submit Request
              </Button>

              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex gap-4">
                <AlertCircle className="h-5 w-5 text-blue-400 shrink-0" />
                <p className="text-xs text-blue-200/70 leading-relaxed">
                  Our compliance experts typically respond within 24-48 business hours after document verification.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
