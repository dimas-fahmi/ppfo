import { text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";
import {
  policy_AnyoneCanRead,
  policy_ServiceRoleTotalControl,
  userManagement,
} from "./configs";
import { createInsertSchema } from "drizzle-zod";

export const registrationPhases = [
  "name",
  "avatar",
  "confirmation",
  "completed",
] as const;

export const profiles = userManagement
  .table(
    "profiles",
    {
      userId: uuid("user_id")
        .references(() => authUsers.id, { onDelete: "cascade" })
        .primaryKey(),
      username: text("username"),
      firstName: text("first_name"),
      lastName: text("last_name"),
      avatar: text("avatar"),
      coverImage: text("cover_image"),
    },
    (t) => [
      // Policy
      policy_AnyoneCanRead,
      policy_ServiceRoleTotalControl,

      // Indexes
      uniqueIndex("UIDX_USER_MANAGEMENT_PROFILES_USERNAME").on(t.username),
    ]
  )
  .enableRLS();

export type SelectProfiles = typeof profiles.$inferSelect;
export type InsertProfiles = typeof profiles.$inferInsert;

export const InsertProfiles_Schema = createInsertSchema(profiles);
