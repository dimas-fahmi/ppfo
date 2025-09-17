ALTER TABLE "organization"."organizations" ADD COLUMN "type" text DEFAULT 'regular' NOT NULL;--> statement-breakpoint
ALTER TABLE "organization"."organizations" ADD COLUMN "system_message" text;--> statement-breakpoint
ALTER TABLE "organization"."organizations" ADD COLUMN "is_verified" boolean DEFAULT false NOT NULL;