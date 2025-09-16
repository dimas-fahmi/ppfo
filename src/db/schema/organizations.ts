import { index, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";
import {
  organizationSchema,
  policy_AnyoneCanRead,
  policy_ServiceRoleTotalControl,
} from "./configs";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const organizations = organizationSchema
  .table(
    "organizations",
    {
      id: uuid("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

      // Event History
      createdBy: uuid("created_by")
        .references(() => authUsers.id)
        .notNull(),

      // Basic Metadata
      name: text("name").notNull(),
      description: text("description").notNull(),
      logo: text("logo"),
      coverImage: text("cover_image"),
      createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),

      // Soft-Delete
      deletedAt: timestamp("deleted_at", { withTimezone: true }),
    },
    (t) => [
      // Policy
      policy_AnyoneCanRead,
      policy_ServiceRoleTotalControl,

      // Indexes
      index("IDX_ORGANIZATION_ORGANIZATIONS_CREATED_BY").on(t.createdBy),
      index("IDX_ORGANIZATION_ORGANIZATIONS_NAME").on(t.name),
    ]
  )
  .enableRLS();

export type SelectOrganizations = typeof organizations.$inferSelect;
export type InsertOrganization = typeof organizations.$inferInsert;
export const SelectOrganization = createSelectSchema(organizations);
export const InsertOrganizationSchema = createInsertSchema(organizations);

// Memberships
export const organizationMemberships = organizationSchema
  .table(
    "organization_memberships",
    {
      organizationId: uuid("organization_id")
        .references(() => organizations.id)
        .notNull(),
      userId: uuid("user_id")
        .references(() => authUsers.id)
        .notNull(),

      // Categorization
      type: text("type", {
        enum: ["regular", "system"],
      })
        .notNull()
        .default("regular"),

      systemMessage: text("system_message"),

      // Metadata
      role: text("role", {
        enum: ["administrator", "editor", "writer", "member"],
      })
        .notNull()
        .default("member"),
      membershipStatus: text("membership_status", {
        enum: ["active", "suspended", "approval"],
      }),
      userMessage: text("user_message"),
      organizationMessage: text("organization_message"),
      createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
      activatedAt: timestamp("activated_at", { withTimezone: true }),

      // Soft Deletion
      deletedAt: timestamp("deleted_at", {
        withTimezone: true,
      }),
    },
    (t) => [
      // Composite pimary key
      primaryKey({
        name: "CPK_ORGANIZATION_ORGANIZATION_MEMBERSHIPS",
        columns: [t.organizationId, t.userId],
      }),

      // Indexes
      index("IDX_ORGANIZATION_ORGANIZATION_MEMBERSHIPS_USER_ID").on(t.userId),

      // Policy
      policy_AnyoneCanRead,
      policy_ServiceRoleTotalControl,
    ]
  )
  .enableRLS();

export type SelectOrganizationMemberships =
  typeof organizationMemberships.$inferSelect;
export type InsertOrganizationMemberships =
  typeof organizationMemberships.$inferInsert;
export const SelectOrganizationMembershipsSchema = createSelectSchema(
  organizationMemberships
);
export const InsertOrganizationMembershipsSchema = createInsertSchema(
  organizationMemberships
);
