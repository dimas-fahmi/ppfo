CREATE SCHEMA "history";
--> statement-breakpoint
CREATE SCHEMA "organization";
--> statement-breakpoint
CREATE SCHEMA "post";
--> statement-breakpoint
CREATE SCHEMA "user_management";
--> statement-breakpoint
CREATE TABLE "post"."articles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"author" uuid NOT NULL,
	"organization" uuid,
	"publisher" uuid NOT NULL,
	"drafted_at" timestamp with time zone,
	"published_at" timestamp with time zone,
	"taken_down_by" uuid,
	"taken_down_at" timestamp with time zone,
	"title" text NOT NULL,
	"subtitle" text NOT NULL,
	"overview" text NOT NULL,
	"language" text NOT NULL,
	"thumbnail" text NOT NULL,
	"keywords" json NOT NULL,
	"content" jsonb NOT NULL,
	"channel" uuid NOT NULL,
	"status" text DEFAULT 'not_ready' NOT NULL,
	"organization_message" text,
	"moderator_message" text,
	"moderation_level" text DEFAULT 'secure' NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "post"."articles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "post"."channels" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_by_organization" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"name" text NOT NULL,
	"description" text,
	"logo" text,
	"cover_image" text,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "post"."channels" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "post"."comments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"article_id" uuid,
	"thread_id" uuid,
	"movement_id" uuid,
	"event_id" uuid,
	"figure_id" uuid,
	"author" uuid NOT NULL,
	"parent_id" uuid,
	"content" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"status" text DEFAULT 'secure' NOT NULL,
	"moderated_by" uuid,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "CHECK_POST_COMMENTS_TARGET_AT_LEAST_ONE" CHECK ("post"."comments"."article_id" IS NOT NULL OR "post"."comments"."movement_id" IS NOT NULL OR "post"."comments"."thread_id" IS NOT NULL OR "post"."comments"."event_id" IS NOT NULL OR "post"."comments"."figure_id" IS NOT NULL)
);
--> statement-breakpoint
ALTER TABLE "post"."comments" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "post"."event_actors" (
	"event_id" uuid NOT NULL,
	"figure_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL,
	"description" text,
	"type" text NOT NULL,
	"version_number" integer DEFAULT 0 NOT NULL,
	"updated_by" uuid,
	"updated_at" timestamp with time zone,
	CONSTRAINT "CPK_POST_EVENT_ACTORS" PRIMARY KEY("event_id","figure_id")
);
--> statement-breakpoint
ALTER TABLE "post"."event_actors" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "post"."events" (
	"id" uuid PRIMARY KEY NOT NULL,
	"version_number" integer DEFAULT 0 NOT NULL,
	"updated_by" uuid,
	"updated_at" timestamp with time zone,
	"author" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"sources" json,
	"importance" integer DEFAULT 0 NOT NULL,
	"latitude" text,
	"longitude" text,
	"geo" jsonb,
	"event_type" text NOT NULL,
	"casualties_death" integer,
	"casualties_injured" integer,
	"related_organizations" json,
	"images" json,
	"videos" json,
	"tags" json,
	"related_event" uuid,
	"parent_event" uuid,
	"name" text NOT NULL,
	"subtitle" text NOT NULL,
	"overview" text NOT NULL,
	"keywords" json NOT NULL,
	"content" jsonb NOT NULL,
	"thumbnail" text NOT NULL,
	"country" text NOT NULL,
	"date_start" timestamp NOT NULL,
	"date_end" timestamp NOT NULL,
	"is_date_accurate" text NOT NULL,
	"is_violation_of_human_rights" text NOT NULL,
	"moderated_by" uuid,
	"moderation_message" text,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "post"."events" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "post"."figures" (
	"id" uuid PRIMARY KEY NOT NULL,
	"author" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"sources" json,
	"version_number" integer DEFAULT 0 NOT NULL,
	"updated_by" uuid,
	"updated_at" timestamp with time zone,
	"status" text DEFAULT 'draft' NOT NULL,
	"full_name" text NOT NULL,
	"subtitle" text NOT NULL,
	"overview" text NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"date_of_death" timestamp,
	"content" jsonb,
	"portrait" text,
	"nationality" text NOT NULL,
	"type" text NOT NULL,
	"is_guilty" text NOT NULL,
	"heroism_score" integer DEFAULT 0 NOT NULL,
	"evil_score" integer DEFAULT 0 NOT NULL,
	"moderated_by" uuid,
	"moderation_message" text,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "post"."figures" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "history"."figures" (
	"id" uuid PRIMARY KEY NOT NULL,
	"original_id" uuid NOT NULL,
	"version_number" integer NOT NULL,
	"change_summary" text NOT NULL,
	"is_reverted_from" uuid,
	"diff" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"author" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" uuid,
	"updated_at" timestamp with time zone,
	"status" text DEFAULT 'draft' NOT NULL,
	"sources" json,
	"full_name" text NOT NULL,
	"subtitle" text NOT NULL,
	"overview" text NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"date_of_death" timestamp,
	"content" jsonb,
	"portrait" text,
	"nationality" text NOT NULL,
	"type" text NOT NULL,
	"is_guilty" text NOT NULL,
	"heroism_score" integer DEFAULT 0 NOT NULL,
	"evil_score" integer DEFAULT 0 NOT NULL,
	"moderated_by" uuid,
	"moderation_message" text,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "history"."figures" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "post"."movement_memberships" (
	"movement_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "CPK_POST_MOVEMENT_MEMBERSHIPS" PRIMARY KEY("movement_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "post"."movement_memberships" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "post"."movements" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"author" uuid NOT NULL,
	"organization" uuid NOT NULL,
	"publisher" uuid NOT NULL,
	"taken_down_by" uuid,
	"taken_down_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone,
	"title" text NOT NULL,
	"subtitle" text NOT NULL,
	"overview" text NOT NULL,
	"keywords" json NOT NULL,
	"content" jsonb NOT NULL,
	"channel" uuid NOT NULL,
	"status" text DEFAULT 'not_ready' NOT NULL,
	"organization_message" text,
	"moderation_message" text,
	"moderation_level" text DEFAULT 'secure' NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "post"."movements" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "organization"."organization_memberships" (
	"organization_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"membership_status" text,
	"user_message" text,
	"organization_message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"activated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "CPK_ORGANIZATION_ORGANIZATION_MEMBERSHIPS" PRIMARY KEY("organization_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "organization"."organization_memberships" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "organization"."organizations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_by" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"logo" text,
	"cover_image" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "organization"."organizations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "user_management"."profiles" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"full_name" text,
	"first_name" text,
	"last_name" text,
	"display_name" text,
	"avatar" text,
	"cover_image" text
);
--> statement-breakpoint
ALTER TABLE "user_management"."profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "post"."threads" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"author" uuid NOT NULL,
	"organization" uuid,
	"publisher" uuid,
	"taken_down_by" uuid,
	"taken_down_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"overview" text,
	"keywords" json NOT NULL,
	"content" jsonb,
	"channel" uuid NOT NULL,
	"status" text DEFAULT 'live' NOT NULL,
	"moderation_message" text,
	"organization_message" text,
	"moderation_level" text DEFAULT 'secure' NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "post"."threads" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "post"."articles" ADD CONSTRAINT "articles_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."articles" ADD CONSTRAINT "articles_organization_organizations_id_fk" FOREIGN KEY ("organization") REFERENCES "organization"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."articles" ADD CONSTRAINT "articles_publisher_users_id_fk" FOREIGN KEY ("publisher") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."articles" ADD CONSTRAINT "articles_taken_down_by_users_id_fk" FOREIGN KEY ("taken_down_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."articles" ADD CONSTRAINT "articles_channel_channels_id_fk" FOREIGN KEY ("channel") REFERENCES "post"."channels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."channels" ADD CONSTRAINT "channels_created_by_organization_organizations_id_fk" FOREIGN KEY ("created_by_organization") REFERENCES "organization"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."comments" ADD CONSTRAINT "comments_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "post"."articles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."comments" ADD CONSTRAINT "comments_thread_id_threads_id_fk" FOREIGN KEY ("thread_id") REFERENCES "post"."threads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."comments" ADD CONSTRAINT "comments_movement_id_movements_id_fk" FOREIGN KEY ("movement_id") REFERENCES "post"."movements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."comments" ADD CONSTRAINT "comments_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "post"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."comments" ADD CONSTRAINT "comments_figure_id_figures_id_fk" FOREIGN KEY ("figure_id") REFERENCES "post"."figures"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."comments" ADD CONSTRAINT "comments_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."comments" ADD CONSTRAINT "comments_moderated_by_users_id_fk" FOREIGN KEY ("moderated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."comments" ADD CONSTRAINT "FK_POST_COMMENTS_PARENT_ID" FOREIGN KEY ("parent_id") REFERENCES "post"."comments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."event_actors" ADD CONSTRAINT "event_actors_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "post"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."event_actors" ADD CONSTRAINT "event_actors_figure_id_figures_id_fk" FOREIGN KEY ("figure_id") REFERENCES "post"."figures"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."event_actors" ADD CONSTRAINT "event_actors_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."event_actors" ADD CONSTRAINT "event_actors_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."events" ADD CONSTRAINT "events_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."events" ADD CONSTRAINT "events_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."events" ADD CONSTRAINT "events_moderated_by_users_id_fk" FOREIGN KEY ("moderated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."events" ADD CONSTRAINT "FK_POST_EVENTS_RELATED_EVENT" FOREIGN KEY ("related_event") REFERENCES "post"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."events" ADD CONSTRAINT "FK_POST_EVENTS_PARENT_EVENT" FOREIGN KEY ("parent_event") REFERENCES "post"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."figures" ADD CONSTRAINT "figures_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."figures" ADD CONSTRAINT "figures_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."figures" ADD CONSTRAINT "figures_moderated_by_users_id_fk" FOREIGN KEY ("moderated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "history"."figures" ADD CONSTRAINT "figures_original_id_figures_id_fk" FOREIGN KEY ("original_id") REFERENCES "post"."figures"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "history"."figures" ADD CONSTRAINT "figures_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "history"."figures" ADD CONSTRAINT "figures_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "history"."figures" ADD CONSTRAINT "figures_moderated_by_users_id_fk" FOREIGN KEY ("moderated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "history"."figures" ADD CONSTRAINT "FK_HISTORY_FIGURES_IS_REVERTED_FROM" FOREIGN KEY ("is_reverted_from") REFERENCES "history"."figures"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."movement_memberships" ADD CONSTRAINT "movement_memberships_movement_id_movements_id_fk" FOREIGN KEY ("movement_id") REFERENCES "post"."movements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."movement_memberships" ADD CONSTRAINT "movement_memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."movements" ADD CONSTRAINT "movements_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."movements" ADD CONSTRAINT "movements_organization_organizations_id_fk" FOREIGN KEY ("organization") REFERENCES "organization"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."movements" ADD CONSTRAINT "movements_publisher_users_id_fk" FOREIGN KEY ("publisher") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."movements" ADD CONSTRAINT "movements_taken_down_by_users_id_fk" FOREIGN KEY ("taken_down_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."movements" ADD CONSTRAINT "movements_channel_channels_id_fk" FOREIGN KEY ("channel") REFERENCES "post"."channels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization"."organization_memberships" ADD CONSTRAINT "organization_memberships_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organization"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization"."organization_memberships" ADD CONSTRAINT "organization_memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization"."organizations" ADD CONSTRAINT "organizations_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_management"."profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."threads" ADD CONSTRAINT "threads_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."threads" ADD CONSTRAINT "threads_organization_organizations_id_fk" FOREIGN KEY ("organization") REFERENCES "organization"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."threads" ADD CONSTRAINT "threads_publisher_users_id_fk" FOREIGN KEY ("publisher") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."threads" ADD CONSTRAINT "threads_taken_down_by_users_id_fk" FOREIGN KEY ("taken_down_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post"."threads" ADD CONSTRAINT "threads_channel_channels_id_fk" FOREIGN KEY ("channel") REFERENCES "post"."channels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "UIDX_POST_ARTICLES_SLUG" ON "post"."articles" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "IDX_POST_ARTICLES_AUTHOR" ON "post"."articles" USING btree ("author");--> statement-breakpoint
CREATE INDEX "IDX_POST_ARTICLES_ORGANIZATION" ON "post"."articles" USING btree ("organization");--> statement-breakpoint
CREATE INDEX "IDX_POST_ARTICLES_PUBLISHER" ON "post"."articles" USING btree ("publisher");--> statement-breakpoint
CREATE INDEX "IDX_POST_ARTICLES_TITLE" ON "post"."articles" USING gin (to_tsvector('english', "title"));--> statement-breakpoint
CREATE INDEX "IDX_POST_ARTICLES_CHANNEL" ON "post"."articles" USING btree ("channel");--> statement-breakpoint
CREATE INDEX "IDX_POST_CHANNEL_CREATED_BY_ORGANIZATION" ON "post"."channels" USING btree ("created_by_organization");--> statement-breakpoint
CREATE INDEX "IDX_POST_CHANNEL_NAME" ON "post"."channels" USING btree ("name");--> statement-breakpoint
CREATE INDEX "IDX_POST_EVENT_ACTORS_FIGURE_ID" ON "post"."event_actors" USING btree ("figure_id");--> statement-breakpoint
CREATE INDEX "IDX_POST_EVENTS_AUTHOR" ON "post"."events" USING btree ("author");--> statement-breakpoint
CREATE INDEX "IDX_POST_EVENTS_NAME" ON "post"."events" USING gin (to_tsvector('english', "name"));--> statement-breakpoint
CREATE INDEX "IDX_POST_FIGURES_AUTHOR" ON "post"."figures" USING btree ("author");--> statement-breakpoint
CREATE INDEX "IDX_POST_FIGURES_FULL_NAME" ON "post"."figures" USING gin (to_tsvector('english', "full_name"));--> statement-breakpoint
CREATE INDEX "IDX_HISTORY_FIGURES_AUTHOR" ON "history"."figures" USING btree ("author");--> statement-breakpoint
CREATE INDEX "IDX_HISTORY_FIGURES_FULL_NAME" ON "history"."figures" USING gin (to_tsvector('english', "full_name"));--> statement-breakpoint
CREATE INDEX "IDX_HISTORY_FIGURES_ORIGINAL" ON "history"."figures" USING btree ("original_id");--> statement-breakpoint
CREATE INDEX "IDX_HISTORY_FIGURES_VERSION" ON "history"."figures" USING btree ("version_number");--> statement-breakpoint
CREATE INDEX "IDX_POST_MOVEMENT_MEMBERSHIPS_USER_ID" ON "post"."movement_memberships" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "UIDX_POST_MOVEMENTS_SLUG" ON "post"."movements" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "IDX_POST_MOVEMENTS_AUTHOR" ON "post"."movements" USING btree ("author");--> statement-breakpoint
CREATE INDEX "IDX_POST_MOVEMENTS_ORGANIZATION" ON "post"."movements" USING btree ("organization");--> statement-breakpoint
CREATE INDEX "IDX_POST_MOVEMENTS_TITLE" ON "post"."movements" USING gin (to_tsvector('english', "title"));--> statement-breakpoint
CREATE INDEX "IDX_POST_MOVEMENTS_CHANNEL" ON "post"."movements" USING btree ("channel");--> statement-breakpoint
CREATE INDEX "IDX_ORGANIZATION_ORGANIZATION_MEMBERSHIPS_USER_ID" ON "organization"."organization_memberships" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "IDX_ORGANIZATION_ORGANIZATIONS_CREATED_BY" ON "organization"."organizations" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "IDX_ORGANIZATION_ORGANIZATIONS_NAME" ON "organization"."organizations" USING btree ("name");--> statement-breakpoint
CREATE INDEX "IDX_USER_MANAGEMENT_PROFILES_FULL_NAME" ON "user_management"."profiles" USING btree ("full_name");--> statement-breakpoint
CREATE UNIQUE INDEX "UIDX_USER_MANAGEMENT_PROFILES_DISPLAY_NAME" ON "user_management"."profiles" USING btree ("display_name");--> statement-breakpoint
CREATE UNIQUE INDEX "UIDX_POST_THREADS_SLUG" ON "post"."threads" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "IDX_POST_THREADS_AUTHOR" ON "post"."threads" USING btree ("author");--> statement-breakpoint
CREATE INDEX "IDX_POST_THREADS_ORGANIZATION" ON "post"."threads" USING btree ("organization");--> statement-breakpoint
CREATE INDEX "IDX_POST_THREADS_CHANNEL" ON "post"."threads" USING btree ("channel");--> statement-breakpoint
CREATE INDEX "IDX_POST_THREADS_TITLE" ON "post"."threads" USING gin (to_tsvector('english', "title"));--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "post"."articles" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."articles" AS RESTRICTIVE FOR SELECT TO "service_role";--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "post"."channels" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."channels" AS RESTRICTIVE FOR SELECT TO "service_role";--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "post"."comments" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."comments" AS RESTRICTIVE FOR SELECT TO "service_role";--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "post"."event_actors" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."event_actors" AS RESTRICTIVE FOR SELECT TO "service_role";--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "post"."events" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."events" AS RESTRICTIVE FOR SELECT TO "service_role";--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "post"."figures" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."figures" AS RESTRICTIVE FOR SELECT TO "service_role";--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "history"."figures" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "history"."figures" AS RESTRICTIVE FOR SELECT TO "service_role";--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "post"."movement_memberships" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."movement_memberships" AS RESTRICTIVE FOR SELECT TO "service_role";--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "post"."movements" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."movements" AS RESTRICTIVE FOR SELECT TO "service_role";--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "organization"."organization_memberships" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "organization"."organization_memberships" AS RESTRICTIVE FOR SELECT TO "service_role";--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "organization"."organizations" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "organization"."organizations" AS RESTRICTIVE FOR SELECT TO "service_role";--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "user_management"."profiles" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "user_management"."profiles" AS RESTRICTIVE FOR SELECT TO "service_role";--> statement-breakpoint
CREATE POLICY "Anyone can read" ON "post"."threads" AS PERMISSIVE FOR SELECT TO "anon", "authenticated";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."threads" AS RESTRICTIVE FOR SELECT TO "service_role";