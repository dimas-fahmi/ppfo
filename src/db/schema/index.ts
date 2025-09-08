// Imports module
import { pgPolicy, pgSchema } from "drizzle-orm/pg-core";

// Import Models
import { profiles } from "./profiles";
import { anonRole, authenticatedRole, serviceRole } from "drizzle-orm/supabase";
import { sql } from "drizzle-orm";

// Enum values
const moderationLevel = [
  "secure",
  "review",
  "advised",
  "warned",
  "scheduled",
] as const;

// Preset Policy
const policy_AnyoneCanRead = pgPolicy("Anyone can read", {
  as: "permissive",
  for: "select",
  to: [authenticatedRole, anonRole],
  using: sql``,
  withCheck: sql``,
});

const policy_ServiceRoleTotalControl = pgPolicy(
  "Only Service role have total control",
  {
    as: "restrictive",
    for: "select",
    to: serviceRole,
    using: sql``,
    withCheck: sql``,
  }
);

// Schemas
const userManagement = pgSchema("user_management");
const organizationSchema = pgSchema("organization");
const postSchema = pgSchema("post");

// Export
export {
  // Enum Presets
  moderationLevel,

  // Policy
  policy_AnyoneCanRead,
  policy_ServiceRoleTotalControl,

  // Schemas
  userManagement,
  organizationSchema,
  postSchema,

  // Models
  profiles,
};
