import { sql } from "drizzle-orm";
import { pgPolicy, pgSchema } from "drizzle-orm/pg-core";
import { anonRole, authenticatedRole, serviceRole } from "drizzle-orm/supabase";

// Schemas
export const userManagement = pgSchema("user_management");
export const organizationSchema = pgSchema("organization");
export const postSchema = pgSchema("post");

// Enums
export const moderationLevel = [
  "secure",
  "review",
  "advised",
  "warned",
  "scheduled",
] as const;

export const figureType = [
  "activist",
  "journalist",
  "perpetrator",
  "alleged",
  "criminal",
  "victim",
  "witness",
  "unrelated",
] as const;

// Policy Presets
export const policy_AnyoneCanRead = pgPolicy("Anyone can read", {
  as: "permissive",
  for: "select",
  to: [authenticatedRole, anonRole],
  using: sql``,
  withCheck: sql``,
});

export const policy_ServiceRoleTotalControl = pgPolicy(
  "Only Service role have total control",
  {
    as: "restrictive",
    for: "select",
    to: serviceRole,
    using: sql``,
    withCheck: sql``,
  }
);
