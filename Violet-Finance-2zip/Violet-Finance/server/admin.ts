import type { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./db";
import { adminUsers, fundRequests } from "../shared/schema";
import { eq, desc, ne, and } from "drizzle-orm";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "yek7pay-admin-secret-fallback";
const TEMP_PASSWORD = "Khoirom@yek7pay";

// ── JWT helpers ──────────────────────────────────────────────────────────────
function signToken(payload: { id: number; email: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
}

function verifyToken(token: string): { id: number; email: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

// ── Auth middleware ───────────────────────────────────────────────────────────
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
  const payload = verifyToken(auth.slice(7));
  if (!payload) return res.status(401).json({ error: "Invalid or expired token" });
  (req as any).adminUser = payload;
  next();
}

export function requireSuperAdmin(req: Request, res: Response, next: NextFunction) {
  requireAdmin(req, res, () => {
    if ((req as any).adminUser?.role !== "super_admin") {
      return res.status(403).json({ error: "Super Administrator access required" });
    }
    next();
  });
}

// ── Seed super admins ─────────────────────────────────────────────────────────
export async function seedAdminUsers() {
  try {
    const superAdmins = [
      { email: "netraj@yek7pay.com", name: "Netraj" },
      { email: "seityaraj@yek7pay.com", name: "Seityaraj" },
    ];

    for (const sa of superAdmins) {
      const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, sa.email));
      if (existing.length === 0) {
        const hash = await bcrypt.hash(TEMP_PASSWORD, 12);
        await db.insert(adminUsers).values({
          email: sa.email,
          passwordHash: hash,
          name: sa.name,
          role: "super_admin",
          mustResetPassword: true,
          isActive: true,
        });
        console.log(`[admin] Seeded super admin: ${sa.email}`);
      }
    }
  } catch (err) {
    console.error("[admin] Seed error:", err);
  }
}

// ── Register routes ───────────────────────────────────────────────────────────
export function registerAdminRoutes(app: Express) {

  // ── Auth ──────────────────────────────────────────────────────────────────

  app.post("/api/admin/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: "Email and password required" });

      const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email.toLowerCase().trim()));
      if (!user) return res.status(401).json({ error: "Invalid credentials" });
      if (!user.isActive) return res.status(403).json({ error: "Account is disabled" });

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return res.status(401).json({ error: "Invalid credentials" });

      const token = signToken({ id: user.id, email: user.email, role: user.role });
      res.json({
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role, mustResetPassword: user.mustResetPassword },
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/auth/me", requireAdmin, async (req, res) => {
    try {
      const { id } = (req as any).adminUser;
      const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ id: user.id, email: user.email, name: user.name, role: user.role, mustResetPassword: user.mustResetPassword });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/auth/change-password", requireAdmin, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const { id } = (req as any).adminUser;
      if (!currentPassword || !newPassword) return res.status(400).json({ error: "Both passwords required" });
      if (newPassword.length < 8) return res.status(400).json({ error: "New password must be at least 8 characters" });

      const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
      const valid = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!valid) return res.status(401).json({ error: "Current password is incorrect" });

      const hash = await bcrypt.hash(newPassword, 12);
      await db.update(adminUsers).set({ passwordHash: hash, mustResetPassword: false }).where(eq(adminUsers.id, id));
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ── Fund Requests ─────────────────────────────────────────────────────────

  app.post("/api/fund-requests", async (req, res) => {
    try {
      const { yek7payUserId, fullName, utr, receiptUrl, remarks } = req.body;
      if (!yek7payUserId || !fullName || !utr) return res.status(400).json({ error: "User ID, name, and UTR are required" });

      const [request] = await db.insert(fundRequests).values({
        yek7payUserId: yek7payUserId.trim(),
        fullName: fullName.trim(),
        utr: utr.trim(),
        receiptUrl: receiptUrl || null,
        remarks: remarks?.trim() || null,
        status: "pending",
      }).returning();

      res.json({ success: true, id: request.id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/fund-requests", requireAdmin, async (req, res) => {
    try {
      const requests = await db.select().from(fundRequests).orderBy(desc(fundRequests.createdAt));
      res.json(requests);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/admin/fund-requests/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, reviewNotes } = req.body;
      if (!["approved", "rejected", "pending"].includes(status)) return res.status(400).json({ error: "Invalid status" });

      const adminId = (req as any).adminUser.id;
      const [updated] = await db.update(fundRequests)
        .set({ status, reviewNotes: reviewNotes || null, reviewedBy: adminId, reviewedAt: new Date() })
        .where(eq(fundRequests.id, id))
        .returning();

      if (!updated) return res.status(404).json({ error: "Request not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ── Admin User Management (Super Admin only) ──────────────────────────────

  app.get("/api/admin/users", requireSuperAdmin, async (req, res) => {
    try {
      const users = await db.select({
        id: adminUsers.id,
        email: adminUsers.email,
        name: adminUsers.name,
        role: adminUsers.role,
        isActive: adminUsers.isActive,
        mustResetPassword: adminUsers.mustResetPassword,
        createdAt: adminUsers.createdAt,
      }).from(adminUsers).orderBy(adminUsers.createdAt);
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/users", requireSuperAdmin, async (req, res) => {
    try {
      const { email, name, role, password } = req.body;
      if (!email || !name || !role) return res.status(400).json({ error: "Email, name and role are required" });
      if (!["admin", "super_admin"].includes(role)) return res.status(400).json({ error: "Invalid role" });

      const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, email.toLowerCase().trim()));
      if (existing.length > 0) return res.status(409).json({ error: "Email already exists" });

      const tempPass = password || "TempPass@123";
      const hash = await bcrypt.hash(tempPass, 12);
      const creatorId = (req as any).adminUser.id;

      const [user] = await db.insert(adminUsers).values({
        email: email.toLowerCase().trim(),
        passwordHash: hash,
        name: name.trim(),
        role,
        mustResetPassword: true,
        isActive: true,
        createdBy: creatorId,
      }).returning({ id: adminUsers.id, email: adminUsers.email, name: adminUsers.name, role: adminUsers.role });

      res.json({ success: true, user, tempPassword: tempPass });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/admin/users/:id", requireSuperAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const requesterId = (req as any).adminUser.id;
      const { name, isActive, role } = req.body;

      const [target] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
      if (!target) return res.status(404).json({ error: "User not found" });
      if (target.role === "super_admin" && requesterId !== id) {
        return res.status(403).json({ error: "Cannot modify another Super Administrator" });
      }

      const updates: any = {};
      if (name !== undefined) updates.name = name.trim();
      if (isActive !== undefined) updates.isActive = isActive;
      if (role !== undefined && ["admin", "super_admin"].includes(role)) updates.role = role;

      const [updated] = await db.update(adminUsers).set(updates).where(eq(adminUsers.id, id)).returning();
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/users/:id/reset-password", requireSuperAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { newPassword } = req.body;

      const [target] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
      if (!target) return res.status(404).json({ error: "User not found" });
      if (target.role === "super_admin" && (req as any).adminUser.id !== id) {
        return res.status(403).json({ error: "Cannot reset another Super Administrator's password" });
      }

      const tempPass = newPassword || "TempPass@123";
      const hash = await bcrypt.hash(tempPass, 12);
      await db.update(adminUsers).set({ passwordHash: hash, mustResetPassword: true }).where(eq(adminUsers.id, id));
      res.json({ success: true, tempPassword: tempPass });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/admin/users/:id", requireSuperAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const requesterId = (req as any).adminUser.id;
      if (id === requesterId) return res.status(400).json({ error: "Cannot delete your own account" });

      const [target] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
      if (!target) return res.status(404).json({ error: "User not found" });
      if (target.role === "super_admin") return res.status(403).json({ error: "Cannot delete a Super Administrator" });

      await db.delete(adminUsers).where(eq(adminUsers.id, id));
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
}
