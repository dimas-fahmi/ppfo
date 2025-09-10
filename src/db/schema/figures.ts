import {
  foreignKey,
  index,
  integer,
  json,
  jsonb,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import {
  figureType,
  historySchema,
  policy_AnyoneCanRead,
  policy_ServiceRoleTotalControl,
  postSchema,
} from "./configs";
import { authUsers } from "drizzle-orm/supabase";
import { InferSelectModel, sql } from "drizzle-orm";

export type SelectFigure = InferSelectModel<typeof figures>;

export type FiguresDiff = Partial<
  Record<
    keyof SelectFigure,
    {
      old: unknown;
      new: unknown;
    }
  >
>;

export const figures = postSchema
  .table(
    "figures",
    {
      id: uuid("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

      // Metadata
      author: uuid("author")
        .references(() => authUsers.id)
        .notNull(),
      createdAt: timestamp("created_at", {
        withTimezone: true,
      })
        .notNull()
        .defaultNow(),
      sources: json("sources"),

      // Versioning
      versionNumber: integer("version_number").notNull().default(0),
      updatedBy: uuid("updated_by").references(() => authUsers.id),
      updatedAt: timestamp("updated_at", { withTimezone: true }),
      status: text("status", {
        enum: ["draft", "published", "archived"],
      })
        .notNull()
        .default("draft"),

      // Content
      fullName: text("full_name").notNull(),
      subtitle: text("subtitle").notNull(),
      overview: text("overview").notNull(),
      dateOfBirth: timestamp("date_of_birth").notNull(),
      dateOfDeath: timestamp("date_of_death"),
      content: jsonb("content"),
      portrait: text("portrait"),
      nationality: text("nationality").notNull(),

      // Categorization
      type: text("type", {
        enum: [...figureType],
      }).notNull(),
      isGuilty: text("is_guilty", {
        enum: [
          "official",
          "not_proven",
          "on_investigation",
          "not_guilty",
          "unrelated",
        ],
      }).notNull(),
      heroismScore: integer("heroism_score").notNull().default(0),
      evilScore: integer("evil_score").notNull().default(0),

      // Moderation
      moderatedBy: uuid("moderated_by").references(() => authUsers.id),
      moderationMessage: text("moderation_message"),

      // Soft Deletion
      deletedAt: timestamp("deleted_at", { withTimezone: true }),
    },
    (t) => [
      // Policy
      policy_AnyoneCanRead,
      policy_ServiceRoleTotalControl,

      // Indexes
      index("IDX_POST_FIGURES_AUTHOR").on(t.author),
      index("IDX_POST_FIGURES_FULL_NAME").using(
        "gin",
        sql`to_tsvector('english', ${t.fullName})`
      ),
    ]
  )
  .enableRLS();

export const figuresHistory = historySchema
  .table(
    "figures",
    {
      id: uuid("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

      // Versioning
      originalId: uuid("original_id")
        .references(() => figures.id)
        .notNull(),
      versionNumber: integer("version_number").notNull(),
      changeSummary: text("change_summary").notNull(),
      isRevertedFrom: uuid("is_reverted_from"),
      diff: jsonb("diff")
        .$type<FiguresDiff>()
        .notNull()
        .default(sql`'{}'::jsonb`),

      // Metadata
      author: uuid("author")
        .references(() => authUsers.id)
        .notNull(),
      createdAt: timestamp("created_at", {
        withTimezone: true,
      })
        .notNull()
        .defaultNow(),
      updatedBy: uuid("updated_by").references(() => authUsers.id),
      updatedAt: timestamp("updated_at", { withTimezone: true }),
      status: text("status", {
        enum: ["draft", "published", "archived"],
      })
        .notNull()
        .default("draft"),
      sources: json("sources"),

      // Content
      fullName: text("full_name").notNull(),
      subtitle: text("subtitle").notNull(),
      overview: text("overview").notNull(),
      dateOfBirth: timestamp("date_of_birth").notNull(),
      dateOfDeath: timestamp("date_of_death"),
      content: jsonb("content"),
      portrait: text("portrait"),
      nationality: text("nationality").notNull(),

      // Categorization
      type: text("type", {
        enum: [...figureType],
      }).notNull(),
      isGuilty: text("is_guilty", {
        enum: [
          "official",
          "not_proven",
          "on_investigation",
          "not_guilty",
          "unrelated",
        ],
      }).notNull(),
      heroismScore: integer("heroism_score").notNull().default(0),
      evilScore: integer("evil_score").notNull().default(0),

      // Moderation
      moderatedBy: uuid("moderated_by").references(() => authUsers.id),
      moderationMessage: text("moderation_message"),

      // Soft Deletion
      deletedAt: timestamp("deleted_at", { withTimezone: true }),
    },
    (t) => [
      // FK
      foreignKey({
        name: "FK_HISTORY_FIGURES_IS_REVERTED_FROM",
        columns: [t.isRevertedFrom],
        foreignColumns: [t.id],
      }),

      // Policy
      policy_AnyoneCanRead,
      policy_ServiceRoleTotalControl,

      // Indexes
      index("IDX_HISTORY_FIGURES_AUTHOR").on(t.author),
      index("IDX_HISTORY_FIGURES_FULL_NAME").using(
        "gin",
        sql`to_tsvector('english', ${t.fullName})`
      ),
      index("IDX_HISTORY_FIGURES_ORIGINAL").on(t.originalId),
      index("IDX_HISTORY_FIGURES_VERSION").on(t.versionNumber),
    ]
  )
  .enableRLS();
