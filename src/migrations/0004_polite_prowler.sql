ALTER TABLE "user_management"."profiles" ADD COLUMN "username" text;--> statement-breakpoint
CREATE INDEX "IDX_USER_MANAGEMENT_PROFILES_USERNAME" ON "user_management"."profiles" USING btree ("username");--> statement-breakpoint
ALTER TABLE "user_management"."profiles" ADD CONSTRAINT "profiles_username_unique" UNIQUE("username");