DROP POLICY "Only Service role have total control" ON "post"."articles" CASCADE;--> statement-breakpoint
DROP POLICY "Only Service role have total control" ON "post"."channels" CASCADE;--> statement-breakpoint
DROP POLICY "Only Service role have total control" ON "post"."comments" CASCADE;--> statement-breakpoint
DROP POLICY "Only Service role have total control" ON "post"."event_actors" CASCADE;--> statement-breakpoint
DROP POLICY "Only Service role have total control" ON "post"."events" CASCADE;--> statement-breakpoint
DROP POLICY "Only Service role have total control" ON "post"."figures" CASCADE;--> statement-breakpoint
DROP POLICY "Only Service role have total control" ON "history"."figures" CASCADE;--> statement-breakpoint
DROP POLICY "Only Service role have total control" ON "post"."movement_memberships" CASCADE;--> statement-breakpoint
DROP POLICY "Only Service role have total control" ON "post"."movements" CASCADE;--> statement-breakpoint
DROP POLICY "Only Service role have total control" ON "organization"."organization_memberships" CASCADE;--> statement-breakpoint
DROP POLICY "Only Service role have total control" ON "organization"."organizations" CASCADE;--> statement-breakpoint
DROP POLICY "Only Service role have total control" ON "user_management"."profiles" CASCADE;--> statement-breakpoint
DROP POLICY "Only Service role have total control" ON "post"."threads" CASCADE;--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."articles" AS PERMISSIVE FOR ALL TO "service_role";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."channels" AS PERMISSIVE FOR ALL TO "service_role";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."comments" AS PERMISSIVE FOR ALL TO "service_role";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."event_actors" AS PERMISSIVE FOR ALL TO "service_role";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."events" AS PERMISSIVE FOR ALL TO "service_role";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."figures" AS PERMISSIVE FOR ALL TO "service_role";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "history"."figures" AS PERMISSIVE FOR ALL TO "service_role";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."movement_memberships" AS PERMISSIVE FOR ALL TO "service_role";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."movements" AS PERMISSIVE FOR ALL TO "service_role";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "organization"."organization_memberships" AS PERMISSIVE FOR ALL TO "service_role";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "organization"."organizations" AS PERMISSIVE FOR ALL TO "service_role";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "user_management"."profiles" AS PERMISSIVE FOR ALL TO "service_role";--> statement-breakpoint
CREATE POLICY "Only Service role have total control" ON "post"."threads" AS PERMISSIVE FOR ALL TO "service_role";