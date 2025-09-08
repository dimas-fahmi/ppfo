import { index, pgSchema, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";
import {
  policy_AnyoneCanRead,
  policy_ServiceRoleTotalControl,
} from "./configs";

const postSchema = pgSchema("post_schema");
export const channels = postSchema
  .table(
    "channels",
    {
      id: uuid("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

      // Historic Events
      createdByOrganization: uuid("created_by_organization")
        .references(() => organizations.id)
        .notNull(),
      createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),

      // Metadata
      name: text("name").notNull(),
      description: text("description"),
      logo: text("logo"),
      coverImage: text("cover_image"),

      // Soft Deletion
      deletedAt: timestamp("deleted_at", { withTimezone: true }),
    },
    (t) => [
      // Indexes
      index("IDX_POST_CHANNEL_CREATED_BY_ORGANIZATION").on(
        t.createdByOrganization
      ),
      index("IDX_POST_CHANNEL_NAME").on(t.name),

      // Policy
      policy_AnyoneCanRead,
      policy_ServiceRoleTotalControl,
    ]
  )
  .enableRLS();
