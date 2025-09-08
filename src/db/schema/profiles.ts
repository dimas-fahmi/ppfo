import { index, pgSchema, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";
import {
  policy_AnyoneCanRead,
  policy_ServiceRoleTotalControl,
} from "./configs";

const userManagement = pgSchema("user_management");

export const profiles = userManagement
  .table(
    "profiles",
    {
      userId: uuid("user_id")
        .references(() => authUsers.id)
        .primaryKey(),
      fullName: text("full_name"),
      first_name: text("first_name"),
      last_name: text("last_name"),
      display_name: text("display_name"),
      avatar: text("avatar"),
      coverImage: text("cover_image"),
    },
    (t) => [
      // Policy
      policy_AnyoneCanRead,
      policy_ServiceRoleTotalControl,

      // Indexes
      index("IDX_USER_MANAGEMENT_PROFILES_FULL_NAME").on(t.fullName),
      uniqueIndex("UIDX_USER_MANAGEMENT_PROFILES_DISPLAY_NAME").on(
        t.display_name
      ),
    ]
  )
  .enableRLS();
