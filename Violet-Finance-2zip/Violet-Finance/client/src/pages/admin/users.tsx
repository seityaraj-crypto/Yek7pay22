import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, Plus, Trash2, RefreshCw, KeyRound, ShieldCheck,
  Shield, ToggleLeft, ToggleRight, X, Check, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AdminUserRow {
  id: number;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  mustResetPassword: boolean;
  createdAt: string;
}

function getToken() { return localStorage.getItem("admin_token") || ""; }

export default function AdminUsers() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Create form
  const [showCreate, setShowCreate] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "super_admin">("admin");
  const [creating, setCreating] = useState(false);

  // Reset password
  const [resetId, setResetId] = useState<number | null>(null);
  const [resetPass, setResetPass] = useState("");
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("admin_user");
    if (!stored || !getToken()) { navigate("/admin/login"); return; }
    const u = JSON.parse(stored);
    if (u.role !== "super_admin") { navigate("/admin/dashboard"); return; }
    setCurrentUser(u);
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", { headers: { Authorization: `Bearer ${getToken()}` } });
      if (res.status === 401) { navigate("/admin/login"); return; }
      setUsers(await res.json());
    } catch {
      toast({ title: "Error", description: "Failed to load users", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    if (!newEmail || !newName) { toast({ title: "Required", description: "Email and name are required.", variant: "destructive" }); return; }
    setCreating(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ email: newEmail, name: newName, role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast({ title: "User Created", description: `Temp password: ${data.tempPassword}` });
      setShowCreate(false); setNewEmail(""); setNewName(""); setNewRole("admin");
      fetchUsers();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (id: number, isActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ isActive: !isActive }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, isActive: !isActive } : u));
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const resetPassword = async () => {
    if (!resetId) return;
    if (resetPass.length < 8) { toast({ title: "Too short", description: "Min 8 characters.", variant: "destructive" }); return; }
    setResetting(true);
    try {
      const res = await fetch(`/api/admin/users/${resetId}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ newPassword: resetPass }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast({ title: "Password Reset", description: "User will be required to change it on next login." });
      setResetId(null); setResetPass("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setResetting(false);
    }
  };

  const deleteUser = async (id: number, name: string) => {
    if (!confirm(`Delete admin user "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` } });
      if (!res.ok) throw new Error((await res.json()).error);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast({ title: "User Deleted" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/admin/dashboard")} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-black text-white">Manage Administrators</span>
          </div>
          <Button onClick={() => setShowCreate(true)} className="bg-violet-600 hover:bg-violet-500 text-white font-bold h-9 px-4 rounded-xl text-sm flex items-center gap-1.5">
            <Plus className="h-4 w-4" /> Add Admin
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Create form */}
        {showCreate && (
          <div className="bg-gray-900 rounded-2xl border border-violet-500/20 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-white">Create Administrator</h3>
              <button onClick={() => setShowCreate(false)} className="text-gray-500 hover:text-white"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Full Name</label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Admin name"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 h-10 rounded-xl focus:border-violet-500 focus:ring-0" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Email</label>
                <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="admin@yek7pay.com"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 h-10 rounded-xl focus:border-violet-500 focus:ring-0" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Role</label>
              <div className="flex gap-3">
                {(["admin", "super_admin"] as const).map((r) => (
                  <button key={r} onClick={() => setNewRole(r)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all ${newRole === r ? "border-violet-500/50 bg-violet-500/15 text-violet-300" : "border-gray-700 bg-gray-800 text-gray-400 hover:text-white"}`}>
                    {r === "super_admin" ? <ShieldCheck className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                    {r === "super_admin" ? "Super Admin" : "Administrator"}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-4">A temporary password <span className="font-mono text-gray-300">TempPass@123</span> will be set. The user must change it on first login.</p>
            <div className="flex gap-3">
              <Button onClick={createUser} disabled={creating} className="bg-violet-600 hover:bg-violet-500 text-white font-black h-10 px-6 rounded-xl text-sm">
                {creating ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating...</> : <><Check className="h-4 w-4 mr-1.5" /> Create User</>}
              </Button>
              <Button onClick={() => setShowCreate(false)} variant="outline" className="border-gray-700 text-gray-400 h-10 px-4 rounded-xl text-sm">Cancel</Button>
            </div>
          </div>
        )}

        {/* Reset password modal */}
        {resetId !== null && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl border border-gray-700 p-6 w-full max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-white flex items-center gap-2"><KeyRound className="h-4 w-4 text-amber-400" /> Reset Password</h3>
                <button onClick={() => { setResetId(null); setResetPass(""); }} className="text-gray-500 hover:text-white"><X className="h-4 w-4" /></button>
              </div>
              <Input value={resetPass} onChange={(e) => setResetPass(e.target.value)} type="text" placeholder="New password (min 8 chars)"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 h-10 rounded-xl focus:border-amber-500 focus:ring-0 mb-4 font-mono" />
              <Button onClick={resetPassword} disabled={resetting} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black h-10 rounded-xl text-sm">
                {resetting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reset Password"}
              </Button>
            </div>
          </div>
        )}

        {/* User list */}
        {loading ? (
          <div className="text-center py-20 text-gray-500"><RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" /><p>Loading...</p></div>
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className={`bg-gray-900 rounded-xl border p-4 flex items-center gap-4 ${u.isActive ? "border-gray-800" : "border-gray-800 opacity-60"}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${u.role === "super_admin" ? "bg-violet-500/20" : "bg-blue-500/20"}`}>
                  {u.role === "super_admin" ? <ShieldCheck className="h-4 w-4 text-violet-400" /> : <Shield className="h-4 w-4 text-blue-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm">{u.name}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${u.role === "super_admin" ? "bg-violet-500/15 text-violet-400 border border-violet-500/20" : "bg-blue-500/15 text-blue-400 border border-blue-500/20"}`}>
                      {u.role === "super_admin" ? "Super Admin" : "Admin"}
                    </span>
                    {!u.isActive && <span className="text-[10px] font-bold text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">Disabled</span>}
                    {u.mustResetPassword && <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Must Reset Password</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{u.email}</p>
                </div>
                {u.id !== currentUser?.id && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => { setResetId(u.id); setResetPass(""); }} title="Reset password"
                      className="p-2 text-gray-500 hover:text-amber-400 hover:bg-gray-800 rounded-lg transition-colors">
                      <KeyRound className="h-3.5 w-3.5" />
                    </button>
                    {u.role !== "super_admin" && (
                      <>
                        <button onClick={() => toggleActive(u.id, u.isActive)} title={u.isActive ? "Disable" : "Enable"}
                          className="p-2 text-gray-500 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors">
                          {u.isActive ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                        </button>
                        <button onClick={() => deleteUser(u.id, u.name)} title="Delete user"
                          className="p-2 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
