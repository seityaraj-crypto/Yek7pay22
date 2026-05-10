import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, Loader2, KeyRound, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Rule {
  label: string;
  test: (p: string) => boolean;
}

const RULES: Rule[] = [
  { label: "At least 12 characters",        test: (p) => p.length >= 12 },
  { label: "One uppercase letter (A–Z)",    test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter (a–z)",    test: (p) => /[a-z]/.test(p) },
  { label: "One number (0–9)",              test: (p) => /[0-9]/.test(p) },
  { label: "One special character (!@#…)",  test: (p) => /[^A-Za-z0-9]/.test(p) },
];

function strengthScore(p: string) {
  return RULES.filter((r) => r.test(p)).length;
}

const STRENGTH_LABELS = ["", "Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
const STRENGTH_COLORS = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];
const STRENGTH_TEXT   = ["", "text-red-400", "text-orange-400", "text-yellow-400", "text-blue-400", "text-green-400"];

export default function AdminChangePassword() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const score = strengthScore(newPass);
  const allPassed = score === RULES.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allPassed) {
      toast({ title: "Password too weak", description: "Please satisfy all password requirements.", variant: "destructive" });
      return;
    }
    if (newPass !== confirm) {
      toast({ title: "Mismatch", description: "New passwords do not match.", variant: "destructive" });
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

        <form onSubmit={handleSubmit} autoComplete="off" className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-4">
          {/* Current password */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Current Password</label>
            <Input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 h-11 rounded-xl focus:border-amber-500 focus:ring-0"
            />
          </div>

          {/* New password */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">New Password</label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
                placeholder="Create a strong password"
                autoComplete="new-password"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 h-11 rounded-xl focus:border-amber-500 focus:ring-0 pr-11"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Strength bar */}
            {newPass.length > 0 && (
              <div className="mt-2 space-y-2">
                <div className="flex gap-1">
                  {RULES.map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? STRENGTH_COLORS[score] : "bg-gray-700"}`} />
                  ))}
                </div>
                <p className={`text-xs font-bold ${STRENGTH_TEXT[score]}`}>{STRENGTH_LABELS[score]}</p>
              </div>
            )}

            {/* Rules checklist */}
            {newPass.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {RULES.map((rule) => {
                  const passed = rule.test(newPass);
                  return (
                    <li key={rule.label} className={`flex items-center gap-2 text-xs transition-colors ${passed ? "text-green-400" : "text-gray-500"}`}>
                      {passed
                        ? <Check className="h-3.5 w-3.5 shrink-0 text-green-400" />
                        : <X className="h-3.5 w-3.5 shrink-0 text-gray-600" />}
                      {rule.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Confirm New Password</label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                placeholder="Repeat new password"
                autoComplete="new-password"
                className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 h-11 rounded-xl focus:ring-0 pr-11 transition-colors ${
                  confirm.length > 0
                    ? newPass === confirm
                      ? "border-green-600 focus:border-green-500"
                      : "border-red-700 focus:border-red-500"
                    : "focus:border-amber-500"
                }`}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {confirm.length > 0 && newPass !== confirm && (
              <p className="text-xs text-red-400 mt-1.5">Passwords do not match</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || !allPassed || newPass !== confirm}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black h-11 rounded-xl mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Updating...</> : "Update Password & Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
