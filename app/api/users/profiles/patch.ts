import { NextRequest } from "next/server";
import { createResponse } from "@/src/lib/utils/createResponse";
import {
  InsertProfiles,
  InsertProfiles_Schema,
  profiles,
} from "@/src/db/schema/profiles";
import { db } from "@/src/db";
import { createClient } from "@/src/lib/supabase/utils/server";
import { prettifyError } from "zod";
import { profileSchema } from "@/src/lib/zodSchema/profileSchema";
import { eq } from "drizzle-orm";

const PATH = "API_USERS_PROFILES_PATCH";

export interface UsersProfilePatchRequest {
  id: string;
  newValues: Partial<InsertProfiles>;
}

export async function usersProfilePatch(req: NextRequest) {
  // Parse Body
  let body: UsersProfilePatchRequest;

  try {
    body = await req.json();
  } catch (_error) {
    return createResponse(
      400,
      "bad_request",
      "Invalid JSON body",
      undefined,
      true,
      PATH
    );
  }

  const { id, newValues } = body;

  //  Validate Session
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error || !data?.session) {
    return createResponse(401, "unauthorized", "Invalid session", undefined);
  }

  // Prevent patching other user's data
  if (data?.session?.user?.id !== id) {
    return createResponse(
      403,
      "access_denied",
      "Can't patch other's profile",
      undefined
    );
  }

  // Validate new values
  const validation = InsertProfiles_Schema.partial().safeParse(newValues);

  if (validation.error) {
    return createResponse(
      400,
      "failed_validation_phase",
      prettifyError(validation.error),
      undefined
    );
  }

  // Format Check
  const formatValidation = profileSchema.partial().safeParse(newValues);

  if (formatValidation.error) {
    return createResponse(
      400,
      "failed_validation_phase",
      prettifyError(formatValidation.error),
      undefined
    );
  }

  // Prevent updating forbiden fields
  if (newValues?.email) {
    return createResponse(
      403,
      "access_denied",
      "Can't update email with this endpoint",
      undefined
    );
  }

  // Execute
  try {
    const response = await db
      .update(profiles)
      .set(newValues)
      .where(eq(profiles.userId, id))
      .returning();

    if (response?.length < 1) {
      throw new Error("Unexpected and unknown error");
    }

    return createResponse(
      200,
      "success",
      `Row successfully updated`,
      undefined
    );
  } catch (error) {
    return createResponse(
      500,
      "unknown_error",
      (error as Error)?.message ?? "Unknown Error",
      undefined,
      true,
      `${PATH}:${error}`
    );
  }
}
