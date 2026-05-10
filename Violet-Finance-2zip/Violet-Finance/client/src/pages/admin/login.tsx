import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data.user));

      if (data.user.mustResetPassword) {
        navigate("/admin/change-password");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      toast({ title: "Login Failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/25 mb-4">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Yek7Pay Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Administration Portal</p>
        </div>

        <form onSubmit={handleLogin} className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yek7pay.com"
              required
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 h-11 rounded-xl focus:border-violet-500 focus:ring-0"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Password</label>
            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 h-11 rounded-xl focus:border-violet-500 focus:ring-0 pr-11"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-black h-11 rounded-xl mt-2"
          >
            {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Signing in...</> : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-6">
          Yek7Pay Solutions Private Limited · Admin Portal
        </p>
      </div>
    </div>
  );
}
