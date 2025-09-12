DROP INDEX "user_management"."IDX_USER_MANAGEMENT_PROFILES_USERNAME";--> statement-breakpoint
DROP INDEX "user_management"."UIDX_USER_MANAGEMENT_PROFILES_DISPLAY_NAME";--> statement-breakpoint
CREATE UNIQUE INDEX "UIDX_USER_MANAGEMENT_PROFILES_USERNAME" ON "user_management"."profiles" USING btree ("username");--> statement-breakpoint
ALTER TABLE "user_management"."profiles" DROP COLUMN "display_name";