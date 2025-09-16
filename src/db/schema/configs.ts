import { sql } from "drizzle-orm";
import { pgEnum, pgPolicy, pgSchema } from "drizzle-orm/pg-core";
import { anonRole, authenticatedRole, serviceRole } from "drizzle-orm/supabase";

// Schemas
export const userManagement = pgSchema("user_management");
export const organizationSchema = pgSchema("organization");
export const postSchema = pgSchema("post");
export const historySchema = pgSchema("history");

// Enums Type
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

export const mediaType = ["picture", "video"] as const;
export const mediaStatus = [
  "secure",
  "review",
  "archived",
  "suspended",
] as const;
export const mediaPublicity = ["public", "restricted"] as const;

// Enums Type
export const mediaTypeEnum = pgEnum("media_type", mediaType);
export const mediaStatusEnum = pgEnum("media_status", mediaStatus);
export const mediaPublicityEnum = pgEnum("media_publicity", mediaPublicity);

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
    as: "permissive",
    for: "all",
    to: serviceRole,
    using: sql``,
    withCheck: sql``,
  }
);
