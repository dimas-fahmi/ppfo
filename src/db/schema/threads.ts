import {
  index,
  json,
  jsonb,
  pgSchema,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";
import { organizations } from "./organizations";
import { channels } from "./channels";
import { sql } from "drizzle-orm";
import {
  moderationLevel,
  policy_AnyoneCanRead,
  policy_ServiceRoleTotalControl,
} from "./configs";

export const postSchema = pgSchema("post_schema");

export const threads = postSchema
  .table(
    "threads",
    {
      id: uuid("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
      slug: text("slug").notNull(),

      // Historic Events
      author: uuid("author")
        .references(() => authUsers.id)
        .notNull(),
      organization: uuid("organization").references(() => organizations.id),
      publisher: uuid("publisher").references(() => authUsers.id),
      takenDownBy: uuid("taken_down_by").references(() => authUsers.id),
      takenDownAt: timestamp("taken_down_at", { withTimezone: true }),
      createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),

      // Metadata
      title: text("title").notNull(),
      subtitle: text("subtitle"),
      overview: text("overview"),
      keywords: json("keywords").notNull(),

      // Content
      content: jsonb("content"),

      // Channel
      channel: uuid("channel")
        .references(() => channels.id)
        .notNull(),

      // Moderation
      status: text("status", {
        enum: ["live", "archived", "closed"],
      })
        .notNull()
        .default("live"),
      moderationMessage: text("moderation_message"),
      organizationMessage: text("organization_message"),
      moderationLevel: text("moderation_level", {
        enum: [...moderationLevel],
      })
        .notNull()
        .default("secure"),

      // Soft Deletion
      deletedAt: timestamp("deleted_at", { withTimezone: true }),
    },
    (t) => [
      // Policy
      policy_AnyoneCanRead,
      policy_ServiceRoleTotalControl,

      // Indexes
      uniqueIndex("UIDX_POST_THREADS_SLUG").on(t.slug),
      index("IDX_POST_THREADS_AUTHOR").on(t.author),
      index("IDX_POST_THREADS_ORGANIZATION").on(t.organization),
      index("IDX_POST_THREADS_CHANNEL").on(t.channel),
      index("IDX_POST_THREADS_TITLE").using(
        "gin",
        sql`to_tsvector('english', ${t.title})`
      ),
    ]
  )
  .enableRLS();
