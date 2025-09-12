import { NextRequest } from "next/server";
import { createResponse } from "@/src/lib/utils/createResponse";
import { db } from "@/src/db";
import { eq } from "drizzle-orm";
import { profiles } from "@/src/db/schema/profiles";
import { UsersProfile } from "../profiles/route";

const PATH = "API_USERS_USERNAME";

export async function GET(req: NextRequest) {
  // Extract parameters
  const url = req.nextUrl;
  const params = Object.fromEntries(url.searchParams.entries());
  const { username } = params;

  // Validate
  if (!username) {
    return createResponse(
      400,
      "bad_request",
      "Missing username parameter",
      undefined,
      true,
      PATH
    );
  }

  try {
    const response = await db.query.profiles.findFirst({
      where: eq(profiles.username, username),
    });

    let result: UsersProfile | null = null;
    if (response) {
      result = {
        ...response,
      };

      result.email = undefined;
    }

    return createResponse(200, "success", "fetched", result);
  } catch (error) {
    return createResponse(
      500,
      "unknown_error",
      (error as Error)?.message ?? "Something went wrong",
      undefined,
      true,
      `${PATH}:${error}`
    );
  }
}
