import {
  index,
  json,
  jsonb,
  primaryKey,
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
  postSchema,
} from "./configs";

export const movements = postSchema
  .table(
    "movements",
    {
      id: uuid("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
      slug: text("slug").notNull(),

      // Historic events
      author: uuid("author")
        .references(() => authUsers.id)
        .notNull(),
      organization: uuid("organization")
        .references(() => organizations.id)
        .notNull(),
      publisher: uuid("publisher")
        .references(() => authUsers.id)
        .notNull(),
      takenDownBy: uuid("taken_down_by").references(() => authUsers.id),
      takenDownAt: timestamp("taken_down_at", { withTimezone: true }),
      createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
      publishedAt: timestamp("published_at", { withTimezone: true }),

      // Metadata
      title: text("title").notNull(),
      subtitle: text("subtitle").notNull(),
      overview: text("overview").notNull(),
      keywords: json("keywords").notNull(),

      // Content
      content: jsonb("content").notNull(),

      // Channel
      channel: uuid("channel")
        .references(() => channels.id)
        .notNull(),

      // Moderation
      status: text("status", {
        enum: ["not_ready", "proposed", "passed", "live", "archived"],
      })
        .notNull()
        .default("not_ready"),
      organizationMessage: text("organization_message"),
      moderationMessage: text("moderation_message"),
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
      uniqueIndex("UIDX_POST_MOVEMENTS_SLUG").on(t.slug),
      index("IDX_POST_MOVEMENTS_AUTHOR").on(t.author),
      index("IDX_POST_MOVEMENTS_ORGANIZATION").on(t.organization),
      index("IDX_POST_MOVEMENTS_TITLE").using(
        "gin",
        sql`to_tsvector('english', ${t.title})`
      ),
      index("IDX_POST_MOVEMENTS_CHANNEL").on(t.channel),
    ]
  )
  .enableRLS();

export const movementMemberships = postSchema
  .table(
    "movement_memberships",
    {
      movementId: uuid("movement_id")
        .references(() => movements.id)
        .notNull(),
      userId: uuid("user_id")
        .references(() => authUsers.id)
        .notNull(),
      createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    },
    (t) => [
      // Composite Primary key
      primaryKey({
        name: "CPK_POST_MOVEMENT_MEMBERSHIPS",
        columns: [t.movementId, t.userId],
      }),

      // policy
      policy_AnyoneCanRead,
      policy_ServiceRoleTotalControl,

      // Indexes
      index("IDX_POST_MOVEMENT_MEMBERSHIPS_USER_ID").on(t.userId),
    ]
  )
  .enableRLS();
