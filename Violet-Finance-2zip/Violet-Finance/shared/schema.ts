import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// ── Admin Users ──────────────────────────────────────────────────────────────
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"), // 'super_admin' | 'admin'
  mustResetPassword: boolean("must_reset_password").notNull().default(true),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  createdBy: integer("created_by"),
});

export type AdminUser = typeof adminUsers.$inferSelect;

// ── Fund Requests ─────────────────────────────────────────────────────────────
export const fundRequests = pgTable("fund_requests", {
  id: serial("id").primaryKey(),
  yek7payUserId: text("yek7pay_user_id").notNull(),
  fullName: text("full_name").notNull(),
  utr: text("utr").notNull(),
  receiptUrl: text("receipt_url"),
  remarks: text("remarks"),
  status: text("status").notNull().default("pending"), // 'pending' | 'approved' | 'rejected'
  reviewedBy: integer("reviewed_by"),
  reviewedAt: timestamp("reviewed_at"),
  reviewNotes: text("review_notes"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type FundRequest = typeof fundRequests.$inferSelect;
