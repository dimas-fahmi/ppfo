import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";
import { organizations } from "./organizations";
import {
  mediaPublicityEnum,
  mediaStatusEnum,
  mediaTypeEnum,
  policy_AnyoneCanRead,
  policy_ServiceRoleTotalControl,
} from "./configs";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const media = pgTable(
  "media",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    ownerId: uuid("owner_id")
      .references(() => authUsers.id)
      .notNull(), // Owner ID, can change hands
    organizationId: uuid("organization_id").references(() => organizations.id), // Organization that manage the media, can change hands

    // Metadata
    mediaName: text("media_name").notNull(), // Media name
    mediaSoure: text("media_source").notNull(), // Media source (CNN, BBC, PEXELS, User itself)
    mediaAttribute: text("media_attribute").notNull(), // Example : Photo by Berkan İyili from Pexels: https://www.pexels.com/photo/tranquil-duck-gliding-on-water-in-antalya-33866528/ or Photo by Berkan Iyili from Public & Press Freedom Organization
    mediaAlt: text("media_alt").notNull(), // Media alt
    uploadedAt: timestamp("uploaded_at", { withTimezone: true })
      .notNull()
      .defaultNow(), // The time media was taken
    mediaTakenAt: timestamp("taken_at", { withTimezone: true }),
    mediaLocation: text("media_location"),
    latitude: text("latitude"),
    longitude: text("longitude"),
    geo: jsonb("geo"),
    uploadedBy: uuid("uploaded_by").references(() => authUsers.id, {
      onDelete: "set null",
    }), // User who uploaded the file, automatically set by API. Can be set null to make it anonymous
    mediaPath: text("media_path").notNull(), // Media path, can be internal bucket server or others

    // Categorization
    mediaType: mediaTypeEnum().notNull(), // Picture or Video enum
    status: mediaStatusEnum().notNull().default("review"), // Enum: Secure for moderated, review to be moderated by moderator, archived, suspended
    publicity: mediaPublicityEnum().notNull().default("restricted"), // Enum : Public to make the media search able by other users, Restricted to make it only useable by owner and organization members
    isNotSafeForWork: boolean("is_not_safe_for_work").notNull().default(false),

    // Moderation
    moderationMessage: text("moderation_message"),
    moderatedBy: uuid("moderated_by").references(() => authUsers.id),

    // Soft Deletion
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => [
    // Policy
    policy_AnyoneCanRead,
    policy_ServiceRoleTotalControl,

    // Indexes
    index("IDX_PUBLIC_MEDIA_OWNER_ID").on(t.ownerId), // Needed to query media owned
    index("IDX_PUBLIC_MEDIA_ORGANIZATION_ID").on(t.organizationId), // Needed to query media shared by organization memberships [as media can only be uploaded by organization instance]
    index("IDX_PUBLIC_MEDIA_UPLOADED_BY").on(t.uploadedBy), // Needed to query uploaded media by users,
    index("IDX_PUBLIC_MEDIA_PATH").on(t.mediaPath), // Needed to query media by path, maybe not maybe yes
    index("IDX_PUBLIC_MEDIA_STATUS").on(t.status), // Needed to filter query by status, e.g review, archived, etc
    index("IDX_PUBLIC_MEDIA_PUBLICITY").on(t.publicity), // Needed to query filter by publicity or restricted [to hide other user's restricted media]

    // Full Text Search
    index("FTS_PUBLIC_MEDIA_NAME").using(
      "gin",
      sql`to_tsvector('simple', ${t.mediaName})`
    ), // Full Name Search
    index("FTX_PUBLIC_MEDIA_ALT").using(
      "gin",
      sql`to_tsvector('simple', ${t.mediaAlt})`
    ), // Search from alt (e.g. A child smoking)
  ]
);

export type SelectMedia = typeof media.$inferSelect;
export type InsertMedia = typeof media.$inferInsert;
export const SelectMediaSchema = createSelectSchema(media);
export const InsertMediaSchema = createInsertSchema(media);
