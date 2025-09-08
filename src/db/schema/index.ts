// Imports module
import { pgSchema } from "drizzle-orm/pg-core";

// Import Models
import { profiles } from "./profiles";

// Enum values
const moderationLevel = [
  "secure",
  "review",
  "advised",
  "warned",
  "scheduled",
] as const;

// Schemas
const userManagement = pgSchema("user_management");
const organizationSchema = pgSchema("organization");
const postSchema = pgSchema("post");

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
};
