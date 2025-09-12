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
  const UUID_RE =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  if (!id || !UUID_RE.test(id)) {
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

    if (!response.length) {
      return createResponse(
        404,
        "not_found",
        `profile ${id} not found`,
        undefined
      );
    }

    const { email: _omit, ...rest } = response[0] as SelectProfiles;
    const result: UsersProfile = { ...rest, email: undefined };

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
