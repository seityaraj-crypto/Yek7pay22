import { Navbar, Footer } from "@/components/layout";
import { motion } from "framer-motion";
import { UserPlus, User, Mail, Phone, Lock, Eye, EyeOff, MapPin, Calendar, CreditCard, Upload, FileText, ArrowRight, CheckCircle2, Shield, Image, Camera, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { NetworkDots } from "@/components/network-dots";

export default function NewAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [aadhaarFront, setAadhaarFront] = useState<File | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<File | null>(null);
  const [panPhoto, setPanPhoto] = useState<File | null>(null);
  const [agentPhoto, setAgentPhoto] = useState<File | null>(null);
  const [gpsLocation, setGpsLocation] = useState<string | null>(null);
  const [isCapturingLocation, setIsCapturingLocation] = useState(false);
  
  const aadhaarFrontRef = useRef<HTMLInputElement>(null);
  const aadhaarBackRef = useRef<HTMLInputElement>(null);
  const panPhotoRef = useRef<HTMLInputElement>(null);
  const agentPhotoRef = useRef<HTMLInputElement>(null);

  const captureGpsLocation = () => {
    setIsCapturingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGpsLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setIsCapturingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setGpsLocation("Location access denied");
          setIsCapturingLocation(false);
        }
      );
    } else {
      setGpsLocation("GPS not supported");
      setIsCapturingLocation(false);
    }
  };

  const handleAgentPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAgentPhoto(e.target.files[0]);
      captureGpsLocation();
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const benefits = [
    "Unlimited Money Transfers Daily",
    "Zero Registration Fee",
    "Instant Account Activation",
    "High Commission Rates",
    "24/7 Customer Support",
    "Secure & RBI Compliant"
  ];

  return (
    <div className="min-h-screen bg-[#0a0a2e] text-white relative">
      <NetworkDots className="absolute top-24 right-0 w-64 h-64 opacity-40" />
      <NetworkDots className="absolute bottom-40 left-0 w-56 h-56 opacity-30" />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black mb-4">
                Create Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Account</span>
              </h1>
              <p className="text-white/60 text-lg max-w-xl mx-auto">
                Complete your KYC to join 100,000+ partners earning with Yek7Pay
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
              >
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  KYC Details
                </h2>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-white/60 mb-2">Full Name *</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                          <User className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white/60 mb-2">Date of Birth *</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <input
                          type="date"
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-white/60 mb-2">Mobile Number *</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                          <Phone className="w-5 h-5" />
                        </div>
                        <input
                          type="tel"
                          placeholder="Enter 10-digit mobile number"
                          maxLength={10}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white/60 mb-2">Email Address *</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/60 mb-2">Full Address *</label>
                    <div className="relative">
                      <div className="absolute left-4 top-4 text-white/40">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <textarea
                        placeholder="Enter your complete address"
                        rows={3}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-white/60 mb-2">PIN Code *</label>
                      <input
                        type="text"
                        placeholder="6-digit PIN"
                        maxLength={6}
                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white/60 mb-2">City *</label>
                      <input
                        type="text"
                        placeholder="Enter city"
                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white/60 mb-2">State *</label>
                      <select
                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none"
                        required
                      >
                        <option value="" className="bg-[#0a0a2e]">Select State</option>
                        <option value="Andhra Pradesh" className="bg-[#0a0a2e]">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh" className="bg-[#0a0a2e]">Arunachal Pradesh</option>
                        <option value="Assam" className="bg-[#0a0a2e]">Assam</option>
                        <option value="Bihar" className="bg-[#0a0a2e]">Bihar</option>
                        <option value="Chhattisgarh" className="bg-[#0a0a2e]">Chhattisgarh</option>
                        <option value="Goa" className="bg-[#0a0a2e]">Goa</option>
                        <option value="Gujarat" className="bg-[#0a0a2e]">Gujarat</option>
                        <option value="Haryana" className="bg-[#0a0a2e]">Haryana</option>
                        <option value="Himachal Pradesh" className="bg-[#0a0a2e]">Himachal Pradesh</option>
                        <option value="Jharkhand" className="bg-[#0a0a2e]">Jharkhand</option>
                        <option value="Karnataka" className="bg-[#0a0a2e]">Karnataka</option>
                        <option value="Kerala" className="bg-[#0a0a2e]">Kerala</option>
                        <option value="Madhya Pradesh" className="bg-[#0a0a2e]">Madhya Pradesh</option>
                        <option value="Maharashtra" className="bg-[#0a0a2e]">Maharashtra</option>
                        <option value="Manipur" className="bg-[#0a0a2e]">Manipur</option>
                        <option value="Meghalaya" className="bg-[#0a0a2e]">Meghalaya</option>
                        <option value="Mizoram" className="bg-[#0a0a2e]">Mizoram</option>
                        <option value="Nagaland" className="bg-[#0a0a2e]">Nagaland</option>
                        <option value="Odisha" className="bg-[#0a0a2e]">Odisha</option>
                        <option value="Punjab" className="bg-[#0a0a2e]">Punjab</option>
                        <option value="Rajasthan" className="bg-[#0a0a2e]">Rajasthan</option>
                        <option value="Sikkim" className="bg-[#0a0a2e]">Sikkim</option>
                        <option value="Tamil Nadu" className="bg-[#0a0a2e]">Tamil Nadu</option>
                        <option value="Telangana" className="bg-[#0a0a2e]">Telangana</option>
                        <option value="Tripura" className="bg-[#0a0a2e]">Tripura</option>
                        <option value="Uttar Pradesh" className="bg-[#0a0a2e]">Uttar Pradesh</option>
                        <option value="Uttarakhand" className="bg-[#0a0a2e]">Uttarakhand</option>
                        <option value="West Bengal" className="bg-[#0a0a2e]">West Bengal</option>
                        <option value="Delhi" className="bg-[#0a0a2e]">Delhi</option>
                        <option value="Jammu & Kashmir" className="bg-[#0a0a2e]">Jammu & Kashmir</option>
                        <option value="Ladakh" className="bg-[#0a0a2e]">Ladakh</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-white/60 mb-2">Country *</label>
                      <input
                        type="text"
                        value="India"
                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white/70 focus:outline-none cursor-not-allowed"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white/60 mb-2">Create Password *</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                          <Lock className="w-5 h-5" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6 mt-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-purple-400" />
                      Aadhaar Details
                    </h3>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-bold text-white/60 mb-2">Aadhaar Number *</label>
                        <input
                          type="text"
                          placeholder="Enter 12-digit Aadhaar number"
                          maxLength={12}
                          className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-white/60 mb-2">Aadhaar Front Photo *</label>
                          <input
                            type="file"
                            ref={aadhaarFrontRef}
                            onChange={(e) => handleFileChange(e, setAadhaarFront)}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => aadhaarFrontRef.current?.click()}
                            className={`w-full p-6 rounded-xl border-2 border-dashed transition-all flex flex-col items-center gap-3 ${
                              aadhaarFront 
                                ? 'border-green-500/50 bg-green-500/10' 
                                : 'border-white/20 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/10'
                            }`}
                          >
                            {aadhaarFront ? (
                              <>
                                <CheckCircle2 className="w-8 h-8 text-green-400" />
                                <span className="text-sm text-green-400 font-medium">{aadhaarFront.name}</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-8 h-8 text-white/40" />
                                <span className="text-sm text-white/50">Click to upload front side</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-white/60 mb-2">Aadhaar Back Photo *</label>
                          <input
                            type="file"
                            ref={aadhaarBackRef}
                            onChange={(e) => handleFileChange(e, setAadhaarBack)}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => aadhaarBackRef.current?.click()}
                            className={`w-full p-6 rounded-xl border-2 border-dashed transition-all flex flex-col items-center gap-3 ${
                              aadhaarBack 
                                ? 'border-green-500/50 bg-green-500/10' 
                                : 'border-white/20 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/10'
                            }`}
                          >
                            {aadhaarBack ? (
                              <>
                                <CheckCircle2 className="w-8 h-8 text-green-400" />
                                <span className="text-sm text-green-400 font-medium">{aadhaarBack.name}</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-8 h-8 text-white/40" />
                                <span className="text-sm text-white/50">Click to upload back side</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-orange-400" />
                      PAN Details
                    </h3>
                    
                    <div className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-white/60 mb-2">PAN Number *</label>
                          <input
                            type="text"
                            placeholder="Enter 10-character PAN"
                            maxLength={10}
                            className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all uppercase"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-white/60 mb-2">PAN Card Photo *</label>
                          <input
                            type="file"
                            ref={panPhotoRef}
                            onChange={(e) => handleFileChange(e, setPanPhoto)}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => panPhotoRef.current?.click()}
                            className={`w-full p-4 rounded-xl border-2 border-dashed transition-all flex items-center justify-center gap-3 ${
                              panPhoto 
                                ? 'border-green-500/50 bg-green-500/10' 
                                : 'border-white/20 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/10'
                            }`}
                          >
                            {panPhoto ? (
                              <>
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <span className="text-sm text-green-400 font-medium truncate">{panPhoto.name}</span>
                              </>
                            ) : (
                              <>
                                <Image className="w-5 h-5 text-white/40" />
                                <span className="text-sm text-white/50">Upload PAN photo</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Camera className="w-5 h-5 text-cyan-400" />
                      Agent Photo with GPS (KYC)
                    </h3>
                    
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-600/10 to-blue-600/10 border border-cyan-500/20">
                      <p className="text-sm text-white/60 mb-4">
                        Please take a clear photo of yourself for KYC verification. Your GPS location will be automatically captured.
                      </p>
                      
                      <input
                        type="file"
                        ref={agentPhotoRef}
                        onChange={handleAgentPhotoChange}
                        accept="image/*"
                        capture="user"
                        className="hidden"
                      />
                      
                      <button
                        type="button"
                        onClick={() => agentPhotoRef.current?.click()}
                        className={`w-full p-8 rounded-xl border-2 border-dashed transition-all flex flex-col items-center gap-4 ${
                          agentPhoto 
                            ? 'border-green-500/50 bg-green-500/10' 
                            : 'border-cyan-400/30 bg-cyan-500/5 hover:border-cyan-400/50 hover:bg-cyan-500/10'
                        }`}
                      >
                        {agentPhoto ? (
                          <>
                            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                              <CheckCircle2 className="w-10 h-10 text-green-400" />
                            </div>
                            <div className="text-center">
                              <span className="text-sm text-green-400 font-bold block">{agentPhoto.name}</span>
                              {gpsLocation && (
                                <div className="flex items-center justify-center gap-2 mt-2 text-xs text-cyan-400">
                                  <Navigation className="w-3 h-3" />
                                  <span>{gpsLocation}</span>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center">
                              <Camera className="w-10 h-10 text-cyan-400" />
                            </div>
                            <div className="text-center">
                              <span className="text-white font-bold block mb-1">Take Photo</span>
                              <span className="text-sm text-white/40">GPS location will be captured automatically</span>
                            </div>
                          </>
                        )}
                      </button>
                      
                      {isCapturingLocation && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-cyan-400 text-sm">
                          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                          <span>Capturing GPS location...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-4">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/20" required />
                    <span className="text-sm text-white/50">
                      I confirm that all the information provided is accurate and I agree to the{" "}
                      <a href="/terms" className="text-blue-400 hover:text-blue-300">Terms & Conditions</a>
                      {" "}and{" "}
                      <a href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                    </span>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 text-white rounded-xl text-lg font-bold shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Create Account Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-white/50 text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
                      Login
                    </a>
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    Why Join Yek7Pay?
                  </h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3 text-white/70">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/20">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-yellow-400" />
                    Documents Required
                  </h3>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      Full Name & Date of Birth
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      Mobile Number & Email
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      Full Address with PIN, City, State
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      Aadhaar Card (Front & Back Photo)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      PAN Card with Photo
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Agent Photo with GPS Location
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-600/20 to-teal-600/20 border border-green-500/20">
                  <h3 className="text-lg font-bold mb-3">Need Assistance?</h3>
                  <p className="text-white/60 text-sm mb-4">
                    Our team is here to help you get started
                  </p>
                  <div className="space-y-3">
                    <a 
                      href="tel:+919230967187"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm"
                    >
                      <Phone className="w-4 h-4 text-green-400" />
                      <span className="text-white/70">+91 92309 67187</span>
                    </a>
                    <a 
                      href="https://wa.me/919230967187?text=Hi%2C%20I%20need%20help%20with%20account%20registration"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-green-500/20 hover:bg-green-500/30 transition-all text-sm font-bold text-green-400"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
