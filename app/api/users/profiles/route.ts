import { NextRequest } from "next/server";
import { createResponse } from "@/src/lib/utils/createResponse";
import { createServiceClient } from "@/src/lib/supabase/utils/service";
import { SelectProfiles } from "@/src/db/schema/profiles";

export interface UsersProfileGetRequest {
  id?: string;
}

export interface UsersProfile extends Omit<SelectProfiles, "email"> {
  email?: string;
}

const path = "API_USERS_PROFILE_GET";

export async function GET(request: NextRequest) {
  // Extract Parameters
  const url = request.nextUrl;
  const { id }: UsersProfileGetRequest = Object.fromEntries(
    url.searchParams.entries()
  );

  // Validate Request
  if (!id) {
    return createResponse(
      400,
      "bad_request",
      "Missing ID",
      undefined,
      true,
      path
    );
  }

  // Create Supabase Client
  const supabase = await createServiceClient();
  const { data, error } = await supabase
    .schema("user_management")
    .from("profiles")
    .select("*")
    .eq("user_id", id);

  if (error) {
    return createResponse(
      500,
      error.code,
      error.message,
      undefined,
      true,
      path
    );
  }

  const result: UsersProfile = {
    ...data[0],
  };
  result.email = undefined;

  return createResponse(200, "success", "fetched", result);
}
