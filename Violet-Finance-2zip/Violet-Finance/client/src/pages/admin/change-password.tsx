import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, Loader2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AdminChangePassword() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirm) {
      toast({ title: "Mismatch", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    if (newPass.length < 8) {
      toast({ title: "Too short", description: "Password must be at least 8 characters.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: current, newPassword: newPass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const user = JSON.parse(localStorage.getItem("admin_user") || "{}");
      localStorage.setItem("admin_user", JSON.stringify({ ...user, mustResetPassword: false }));
      toast({ title: "Password Updated", description: "You can now access the admin portal." });
      navigate("/admin/dashboard");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg mb-4">
            <KeyRound className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Set New Password</h1>
          <p className="text-sm text-gray-500 mt-1">You must change your temporary password to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Current Password</label>
            <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} required placeholder="••••••••"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 h-11 rounded-xl focus:border-amber-500 focus:ring-0" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">New Password</label>
            <div className="relative">
              <Input type={showNew ? "text" : "password"} value={newPass} onChange={(e) => setNewPass(e.target.value)} required placeholder="Min. 8 characters"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 h-11 rounded-xl focus:border-amber-500 focus:ring-0 pr-11" />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Confirm New Password</label>
            <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required placeholder="Repeat new password"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 h-11 rounded-xl focus:border-amber-500 focus:ring-0" />
          </div>
          <Button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black h-11 rounded-xl mt-2">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Updating...</> : "Update Password & Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
