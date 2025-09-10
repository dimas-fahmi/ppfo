import {
  foreignKey,
  index,
  integer,
  json,
  jsonb,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import {
  figureType,
  policy_AnyoneCanRead,
  policy_ServiceRoleTotalControl,
  postSchema,
} from "./configs";
import { authUsers } from "drizzle-orm/supabase";
import { sql } from "drizzle-orm";
import { figures } from "./figures";

export const events = postSchema
  .table(
    "events",
    {
      id: uuid("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

      // Versioning
      versionNumber: integer("version_number").notNull().default(0),
      updatedBy: uuid("updated_by").references(() => authUsers.id),
      updatedAt: timestamp("updated_at", {
        withTimezone: true,
      }),

      // Metadata
      author: uuid("author")
        .references(() => authUsers.id)
        .notNull(),
      createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),

      status: text("status", {
        enum: ["draft", "published", "archived"],
      })
        .notNull()
        .default("draft"),
      sources: json("sources"),
      importance: integer("importance").notNull().default(0),
      latitude: text("latitude"),
      longitude: text("longitude"),
      geo: jsonb("geo"),
      evenType: text("event_type", {
        enum: [
          "protest",
          "war",
          "election",
          "law",
          "treaty",
          "disaster",
          "genocide",
          "coup",
          "propaganda",
        ],
      }).notNull(),
      casualties_death: integer("casualties_death"),
      casualties_injured: integer("casualties_injured"),
      relatedOrganization: json("related_organizations"),
      images: json("images"),
      videos: json("videos"),
      tags: json("tags"),
      relatedEvent: uuid("related_event"),
      parentEvent: uuid("parent_event"),

      // Content
      name: text("name").notNull(),
      subtitle: text("subtitle").notNull(),
      overview: text("overview").notNull(),
      keywords: json("keywords").notNull(),
      content: jsonb("content").notNull(),
      thumbnail: text("thumbnail").notNull(),
      country: text("country").notNull(),
      dateStart: timestamp("date_start").notNull(),
      dateEnd: timestamp("date_end").notNull(),
      isDateAccurate: text("is_date_accurate", {
        enum: ["true", "false"],
      }).notNull(), // estimation or proven
      isViolationOfHumanRights: text("is_violation_of_human_rights", {
        enum: ["true", "false"],
      }).notNull(),

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
      index("IDX_POST_EVENTS_AUTHOR").on(t.author),
      index("IDX_POST_EVENTS_NAME").using(
        "gin",
        sql`to_tsvector('english', ${t.name})`
      ),

      // Foreign Key
      foreignKey({
        name: "FK_POST_EVENTS_RELATED_EVENT",
        columns: [t.relatedEvent],
        foreignColumns: [t.id],
      }),
      foreignKey({
        name: "FK_POST_EVENTS_PARENT_EVENT",
        columns: [t.parentEvent],
        foreignColumns: [t.id],
      }),
    ]
  )
  .enableRLS();

export const eventActors = postSchema
  .table(
    "event_actors",
    {
      eventId: uuid("event_id")
        .references(() => events.id)
        .notNull(),
      figureId: uuid("figure_id")
        .references(() => figures.id)
        .notNull(),
      createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
      createdBy: uuid("created_by")
        .references(() => authUsers.id)
        .notNull(),
      description: text("description"),
      type: text("type", { enum: [...figureType] }).notNull(),

      // Versioning
      versionNumber: integer("version_number").notNull().default(0),
      updatedBy: uuid("updated_by").references(() => authUsers.id),
      updatedAt: timestamp("updated_at", { withTimezone: true }),
    },
    (t) => [
      // Policy
      policy_AnyoneCanRead,
      policy_ServiceRoleTotalControl,

      // Composite primary key
      primaryKey({
        name: "CPK_POST_EVENT_ACTORS",
        columns: [t.eventId, t.figureId],
      }),

      // Indexes
      index("IDX_POST_EVENT_ACTORS_FIGURE_ID").on(t.figureId),
    ]
  )
  .enableRLS();
