import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  CheckCircle2, XCircle, Clock, LogOut, Users, RefreshCw,
  ChevronDown, ChevronUp, ShieldCheck, AlertCircle, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface FundRequest {
  id: number;
  yek7payUserId: string;
  fullName: string;
  utr: string;
  receiptUrl: string | null;
  remarks: string | null;
  status: "pending" | "approved" | "rejected";
  reviewedBy: number | null;
  reviewedAt: string | null;
  reviewNotes: string | null;
  createdAt: string;
}

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
  mustResetPassword: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  approved: "bg-green-500/15 text-green-400 border border-green-500/30",
  rejected: "bg-red-500/15 text-red-400 border border-red-500/30",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Clock className="h-3.5 w-3.5" />,
  approved: <CheckCircle2 className="h-3.5 w-3.5" />,
  rejected: <XCircle className="h-3.5 w-3.5" />,
};

function getToken() { return localStorage.getItem("admin_token") || ""; }

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [requests, setRequests] = useState<FundRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [reviewNotes, setReviewNotes] = useState<Record<number, string>>({});
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin_user");
    if (!stored || !getToken()) { navigate("/admin/login"); return; }
    const u = JSON.parse(stored);
    if (u.mustResetPassword) { navigate("/admin/change-password"); return; }
    setUser(u);
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/fund-requests", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.status === 401) { navigate("/admin/login"); return; }
      const data = await res.json();
      setRequests(data);
    } catch {
      toast({ title: "Error", description: "Failed to load requests", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: "approved" | "rejected") => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/fund-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ status, reviewNotes: reviewNotes[id] || "" }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      const updated = await res.json();
      setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
      setExpanded(null);
      toast({ title: `Request ${status === "approved" ? "Approved" : "Rejected"}`, description: `Fund request #${id} has been ${status}.` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setUpdating(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  const filtered = requests.filter((r) => {
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch = !q || r.fullName.toLowerCase().includes(q) || r.yek7payUserId.toLowerCase().includes(q) || r.utr.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-black text-white">Yek7Pay Admin</span>
              {user && <span className="text-xs text-gray-500 ml-2">· {user.name}</span>}
            </div>
            {user?.role === "super_admin" && (
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20 ml-1">Super Admin</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchRequests} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
            {user?.role === "super_admin" && (
              <button onClick={() => navigate("/admin/users")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Users className="h-3.5 w-3.5" /> Manage Users
              </button>
            )}
            <button onClick={logout} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(["all", "pending", "approved", "rejected"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`rounded-xl border p-4 text-left transition-all ${filterStatus === s ? "border-violet-500/40 bg-violet-500/10" : "border-gray-800 bg-gray-900 hover:bg-gray-800"}`}>
              <p className="text-2xl font-black text-white">{counts[s]}</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5 capitalize">{s}</p>
            </button>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, user ID, or UTR..."
              className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-10 rounded-xl focus:border-violet-500 focus:ring-0" />
          </div>
        </div>

        {/* Requests */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-3" />
            <p>Loading requests...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <AlertCircle className="h-8 w-8 mx-auto mb-3 opacity-40" />
            <p>No fund requests found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((req) => (
              <div key={req.id}
                className={`rounded-xl border transition-all ${
                  req.status === "pending" ? "border-amber-500/30 bg-amber-500/5" :
                  req.status === "approved" ? "border-green-500/20 bg-green-500/5" :
                  "border-red-500/20 bg-red-500/5"
                }`}>
                {/* Row */}
                <div className="flex items-center gap-4 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm">{req.fullName}</span>
                      <span className="text-xs text-gray-500 font-mono">{req.yek7payUserId}</span>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${STATUS_STYLES[req.status]}`}>
                        {STATUS_ICONS[req.status]} {req.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-gray-400">UTR: <span className="font-mono text-gray-300">{req.utr}</span></span>
                      <span className="text-xs text-gray-600">{new Date(req.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                    </div>
                    {req.remarks && <p className="text-xs text-gray-500 mt-1 truncate">{req.remarks}</p>}
                  </div>
                  <button onClick={() => setExpanded(expanded === req.id ? null : req.id)}
                    className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition-colors shrink-0">
                    {expanded === req.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>

                {/* Expanded */}
                {expanded === req.id && (
                  <div className="border-t border-white/5 px-4 pb-4 pt-4 space-y-4">
                    {req.status !== "pending" && req.reviewNotes && (
                      <div className="bg-gray-800/50 rounded-xl px-4 py-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Review Notes</p>
                        <p className="text-sm text-gray-300">{req.reviewNotes}</p>
                      </div>
                    )}
                    {req.status === "pending" && (
                      <>
                        <div>
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
                            Review Notes <span className="text-gray-600 normal-case font-normal">(optional)</span>
                          </label>
                          <Textarea value={reviewNotes[req.id] || ""} onChange={(e) => setReviewNotes((p) => ({ ...p, [req.id]: e.target.value }))}
                            placeholder="Add notes about this fund request..."
                            rows={2}
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 rounded-xl resize-none focus:border-violet-500 focus:ring-0 text-sm" />
                        </div>
                        <div className="flex gap-3">
                          <Button onClick={() => updateStatus(req.id, "approved")} disabled={updating === req.id}
                            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-black h-10 rounded-xl text-sm">
                            {updating === req.id ? <RefreshCw className="h-4 w-4 animate-spin" /> : <><CheckCircle2 className="h-4 w-4 mr-1.5" /> Approve</>}
                          </Button>
                          <Button onClick={() => updateStatus(req.id, "rejected")} disabled={updating === req.id}
                            className="flex-1 bg-red-600/80 hover:bg-red-600 text-white font-black h-10 rounded-xl text-sm">
                            {updating === req.id ? <RefreshCw className="h-4 w-4 animate-spin" /> : <><XCircle className="h-4 w-4 mr-1.5" /> Reject</>}
                          </Button>
                        </div>
                      </>
                    )}
                    {req.status !== "pending" && (
                      <Button onClick={() => updateStatus(req.id, "approved")} disabled={updating === req.id} variant="outline"
                        className="text-xs border-gray-700 text-gray-400 hover:text-white h-8 rounded-lg">
                        Re-open as Pending
                      </Button>
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
