DROP INDEX "user_management"."IDX_USER_MANAGEMENT_PROFILES_FULL_NAME";--> statement-breakpoint
ALTER TABLE "user_management"."profiles" DROP COLUMN "full_name";