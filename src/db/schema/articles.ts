import {
  index,
  json,
  jsonb,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import {
  moderationLevel,
  policy_AnyoneCanRead,
  policy_ServiceRoleTotalControl,
  postSchema,
} from ".";
import { authUsers } from "drizzle-orm/supabase";
import { organizations } from "./organizations";
import { channels } from "./channels";
import { sql } from "drizzle-orm";

export const articles = postSchema
  .table(
    "articles",
    {
      id: uuid("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
      slug: text("slug").notNull(),

      // Historic Events
      author: uuid("author")
        .references(() => authUsers.id)
        .notNull(),
      organization: uuid("organization").references(() => organizations.id), // can be standalone
      publisher: uuid("publisher")
        .references(() => authUsers.id)
        .notNull(),
      draftedAt: timestamp("drafted_at", { withTimezone: true }),
      publishedAt: timestamp("published_at", { withTimezone: true }),
      takenDownBy: uuid("taken_down_by").references(() => authUsers.id),
      takenDownAt: timestamp("taken_down_at", { withTimezone: true }),

      // Metadata
      title: text("title").notNull(),
      subtitle: text("subtitle").notNull(),
      overview: text("overview").notNull(),
      language: text("language").notNull(),
      thumbnail: text("thumbnail").notNull(),
      keywords: json("keywords").notNull(),

      // Content
      content: jsonb("content").notNull(),

      // Channel
      channel: uuid("channel")
        .references(() => channels.id)
        .notNull(),

      // Status
      status: text("status", {
        enum: ["not_ready", "ready", "live", "archived"],
      })
        .notNull()
        .default("not_ready"),
      organizationMessage: text("organization_message"),
      moderatorMessage: text("moderator_message"),
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
      uniqueIndex("UIDX_POST_ARTICLES_SLUG").on(t.slug),
      index("IDX_POST_ARTICLES_AUTHOR").on(t.author),
      index("IDX_POST_ARTICLES_ORGANIZATION").on(t.organization),
      index("IDX_POST_ARTICLES_PUBLISHER").on(t.publisher),
      index("IDX_POST_ARTICLES_TITLE").using(
        "gin",
        sql`to_tsvector('english', ${t.title})`
      ),
      index("IDX_POST_ARTICLES_CHANNEL").on(t.channel),
    ]
  )
  .enableRLS();
