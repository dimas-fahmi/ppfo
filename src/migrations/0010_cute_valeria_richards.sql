CREATE TYPE "public"."media_publicity" AS ENUM('public', 'restricted');--> statement-breakpoint
CREATE TYPE "public"."media_status" AS ENUM('secure', 'review', 'archived', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('picture', 'video');--> statement-breakpoint
CREATE TABLE "media" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_id" uuid,
	"organization_id" uuid NOT NULL,
	"media_name" text NOT NULL,
	"media_source" text NOT NULL,
	"media_attribute" text NOT NULL,
	"media_alt" text NOT NULL,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL,
	"taken_at" timestamp with time zone,
	"media_location" text,
	"latitude" text,
	"longitude" text,
	"geo" jsonb,
	"uploaded_by" uuid,
	"media_path" text NOT NULL,
	"mediaType" "media_type" NOT NULL,
	"status" "media_status" DEFAULT 'review' NOT NULL,
	"publicity" "media_publicity" DEFAULT 'restricted' NOT NULL,
	"is_not_safe_for_work" boolean DEFAULT false NOT NULL,
	"moderation_message" text,
	"moderated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "media" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organization"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "auth"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_moderated_by_users_id_fk" FOREIGN KEY ("moderated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IDX_PUBLIC_MEDIA_OWNER_ID" ON "media" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "IDX_PUBLIC_MEDIA_ORGANIZATION_ID" ON "media" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "IDX_PUBLIC_MEDIA_UPLOADED_BY" ON "media" USING btree ("uploaded_by");--> statement-breakpoint
CREATE INDEX "IDX_PUBLIC_MEDIA_PATH" ON "media" USING btree ("media_path");--> statement-breakpoint
CREATE INDEX "IDX_PUBLIC_MEDIA_STATUS" ON "media" USING btree ("status");--> statement-breakpoint
CREATE INDEX "IDX_PUBLIC_MEDIA_PUBLICITY" ON "media" USING btree ("publicity");--> statement-breakpoint
CREATE INDEX "FTS_PUBLIC_MEDIA_NAME" ON "media" USING gin (to_tsvector('simple', "media_name"));--> statement-breakpoint
CREATE INDEX "FTX_PUBLIC_MEDIA_ALT" ON "media" USING gin (to_tsvector('simple', "media_alt"));--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "media" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "media" AS PERMISSIVE FOR ALL TO "service_role";