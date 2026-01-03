import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { ShieldCheck, Car, Bike, ArrowLeft, CheckCircle2, AlertCircle, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const insuranceTypes = [
  {
    id: "car-insurance",
    title: "Car Insurance",
    description: "Comprehensive and third-party insurance for your four-wheeler with instant policy issuance.",
    icon: Car,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    features: ["Zero Depreciation Cover", "24/7_GRADIENT Roadside Assistance", "Cashless Garage Network", "Engine Protection"]
  },
  {
    id: "bike-insurance",
    title: "Bike Insurance",
    description: "Affordable insurance plans for your two-wheeler with quick renewals and easy claims.",
    icon: Bike,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    features: ["Personal Accident Cover", "Instant Renewal", "Third-party Liability", "No Claim Bonus"]
  }
];

export default function Insurance() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      toast({
        title: "Documents Added",
        description: `${newFiles.length} document(s) ready for review.`,
      });
    }
  };

  const handleSubmit = () => {
    if (!selectedType) {
      toast({ title: "Selection Required", description: "Please select an insurance type.", variant: "destructive" });
      return;
    }
    if (files.length === 0) {
      toast({ title: "RC Upload Required", description: "Please upload your vehicle RC copy.", variant: "destructive" });
      return;
    }

    toast({
      title: "Quote Request Sent",
      description: "Our insurance experts will call you with the best quotes within 30 minutes.",
    });
    setFiles([]);
    setSelectedType(null);
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
            <h1 className="text-4xl md:text-6xl font-display font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Vehicle Insurance
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Protect your vehicles with Yek7pay's hassle-free insurance solutions. Best quotes from top providers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className="text-blue-400 h-6 w-6" />
                Select Insurance Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insuranceTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer h-full transition-all duration-300 border-white/10 bg-white/5 backdrop-blur-xl group ${
                        selectedType === type.id ? 'ring-2 ring-blue-500 bg-white/10 border-blue-500/50' : ''
                      }`}
                      onClick={() => setSelectedType(type.id)}
                    >
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-2xl ${type.bgColor} flex items-center justify-center ${type.color} mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                          <type.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-white text-xl">{type.title}</CardTitle>
                        <CardDescription className="text-white/50">{type.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {type.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-white/40 font-medium">
                              <CheckCircle2 className="h-3 w-3 text-green-500" /> 
                              {f.includes("24/7_GRADIENT") ? (
                                <>
                                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 font-bold">24/7</span>
                                  {f.replace("24/7_GRADIENT", "")}
                                </>
                              ) : f}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Upload className="text-purple-400 h-6 w-6" />
                Upload Vehicle RC
              </h2>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 text-center border-dashed border-2 hover:border-purple-500/50 transition-colors group relative">
                <input type="file" multiple onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto text-purple-400 group-hover:scale-110 transition-transform">
                    <Upload className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white">Click to upload RC</p>
                    <p className="text-sm text-white/40">Upload a clear photo of your RC book/card</p>
                  </div>
                </div>
              </Card>

              <Button 
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 shadow-lg shadow-blue-500/20 rounded-2xl transition-all active:scale-95"
                onClick={handleSubmit}
                disabled={!selectedType || files.length === 0}
              >
                Get Best Quotes
              </Button>

              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex gap-4">
                <AlertCircle className="h-5 w-5 text-blue-400 shrink-0" />
                <p className="text-xs text-blue-200/70 leading-relaxed">
                  We compare quotes from 20+ insurance partners to find you the lowest premiums.
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
