import { pgPolicy, pgSchema } from "drizzle-orm/pg-core";

// Enum values
const moderationLevel = [
  "secure",
  "review",
  "advised",
  "warned",
  "scheduled",
] as const;

// Import Models
import { profiles } from "./profiles";
import { anonRole, authenticatedRole, serviceRole } from "drizzle-orm/supabase";
import { sql } from "drizzle-orm";

// Schemas
const userManagement = pgSchema("user_management");
const organizationSchema = pgSchema("organization");
const postSchema = pgSchema("post");

// Preset Policies
const policy_AuthenticatedCanInsert = pgPolicy("Authenticated can insert", {
  as: "permissive",
  to: authenticatedRole,
  for: "insert",
  using: sql``,
  withCheck: sql``,
});

const policy_OnlyServiceCanUpdate = pgPolicy("Only Service can update", {
  as: "restrictive",
  to: serviceRole,
  for: "all",
  using: sql``,
  withCheck: sql``,
});

const policy_AnyoneCanRead = pgPolicy("Anyone can read", {
  as: "permissive",
  to: anonRole,
  for: "select",
  using: sql``,
  withCheck: sql``,
});

// Export
export {
  // Enum Presets
  moderationLevel,

  // Schemas
  userManagement,
  organizationSchema,
  postSchema,

  // Models
  profiles,

  // Policies
  policy_AuthenticatedCanInsert,
  policy_OnlyServiceCanUpdate,
  policy_AnyoneCanRead,
};
