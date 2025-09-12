import { NextRequest } from "next/server";
import { createResponse } from "@/src/lib/utils/createResponse";
import { profiles, SelectProfiles } from "@/src/db/schema/profiles";
import { db } from "@/src/db";
import { eq } from "drizzle-orm";

export interface UsersProfileGetRequest {
  id?: string;
}

export interface UsersProfile extends Omit<SelectProfiles, "email"> {
  email?: string;
}

const path = "API_USERS_PROFILE_GET";

export async function usersProfileGet(request: NextRequest) {
  // Extract Parameters
  const url = request.nextUrl;
  const { id }: UsersProfileGetRequest = Object.fromEntries(
    url.searchParams.entries()
  );

  // Validate Request
  if (!id || id.length < 5) {
    return createResponse(
      400,
      "bad_request",
      "Missing ID",
      undefined,
      true,
      path
    );
  }

  try {
    const response = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, id));

    const result: UsersProfile = {
      ...response[0],
    };
    result.email = undefined;

    return createResponse(200, "success", `fetched ${id}`, result);
  } catch (error) {
    if (error instanceof Error) {
      return createResponse(
        500,
        "unknown_error",
        error.message,
        undefined,
        true,
        path
      );
    }
  }
}
