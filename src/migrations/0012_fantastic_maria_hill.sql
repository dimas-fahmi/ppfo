ALTER TABLE "media" ALTER COLUMN "owner_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "media" ALTER COLUMN "organization_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "media" ADD COLUMN "is_ai_generated" boolean DEFAULT false NOT NULL;