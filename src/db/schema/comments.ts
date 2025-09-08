import { check, foreignKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import {
  policy_AnyoneCanRead,
  policy_ServiceRoleTotalControl,
  postSchema,
} from "./configs";
import { articles } from "./articles";
import { threads } from "./threads";
import { movements } from "./movements";
import { sql } from "drizzle-orm";
import { authUsers } from "drizzle-orm/supabase";

export const comments = postSchema
  .table(
    "comments",
    {
      id: uuid("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

      // Targets
      article: uuid("article_id").references(() => articles.id),
      thread: uuid("thread_id").references(() => threads.id),
      movement: uuid("movement_id").references(() => movements.id),

      // Metadata
      author: uuid("author")
        .references(() => authUsers.id)
        .notNull(),
      parentId: uuid("parent_id"),
      content: text("content"),
      createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),

      // Moderation
      status: text("status", {
        enum: ["secure", "hidden", "deleted"],
      })
        .notNull()
        .default("secure"),
      moderatedBy: uuid("moderated_by").references(() => authUsers.id),

      // Soft Deletion
      deletedAt: timestamp("deleted_at", { withTimezone: true }),
    },
    (t) => [
      // Check
      check(
        "at_least_one",
        sql`${t.article} IS NOT NULL OR ${t.movement} IS NOT NULL OR ${t.thread} IS NOT NULL`
      ),

      // Foreign Key
      foreignKey({
        name: "FK_POST_COMMENTS_PARENT_ID",
        columns: [t.parentId],
        foreignColumns: [t.id],
      }),

      // Policy
      policy_AnyoneCanRead,
      policy_ServiceRoleTotalControl,
    ]
  )
  .enableRLS();
