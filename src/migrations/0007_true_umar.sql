ALTER TABLE "user_management"."profiles" DROP CONSTRAINT "profiles_username_unique";--> statement-breakpoint
ALTER TABLE "user_management"."profiles" DROP CONSTRAINT "profiles_email_unique";--> statement-breakpoint
ALTER TABLE "user_management"."profiles" DROP COLUMN "email";