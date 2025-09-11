ALTER TABLE "user_management"."profiles" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_management"."profiles" ADD CONSTRAINT "profiles_email_unique" UNIQUE("email");