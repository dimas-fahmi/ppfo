import { registrationPhases } from "@/src/db/schema/profiles";
import { UserMetadata } from "@supabase/supabase-js";

export interface OurUserMetadata extends UserMetadata {
  registration_phase: (typeof registrationPhases)[number];
}
