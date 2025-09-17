import { db } from "@/src/db";
import { media, SelectMedia } from "@/src/db/schema/media";
import {
  createResponse,
  StandardizeResponse,
} from "@/src/lib/utils/createResponse";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

const PATH = "API_MEDIA_GET";

export interface MediaGetRequest {
  mediaOwner?: string;
  organization?: string;
  mediaName?: string;
  mediaPath?: string;
  includePublic?: string;
  status?: SelectMedia["status"];
}

export type MediaGetResponse = StandardizeResponse<SelectMedia[]>;

export async function mediaGet(req: NextRequest) {
  // Extract parameters
  const url = req.nextUrl;
  const params = Object.fromEntries(
    url.searchParams.entries()
  ) as MediaGetRequest;

  const {
    mediaName,
    mediaOwner,
    mediaPath,
    organization,
    status,
    includePublic,
  } = params;

  // Query Builder
  const queries = [];

  if (mediaName) {
    queries.push(eq(media.mediaName, mediaName));
  }

  if (mediaOwner && includePublic !== "true") {
    queries.push(eq(media.ownerId, mediaOwner));
  }

  if (mediaPath) {
    queries.push(eq(media.mediaPath, mediaPath));
  }

  if (organization) {
    queries.push(eq(media.organizationId, organization));
  }

  if (status) {
    queries.push(eq(media.status, status));
  }

  if (includePublic !== "true") {
    queries.push(eq(media.publicity, "restricted"));
  }

  // Query
  try {
    const response = await db.query.media.findMany({
      where: and(...queries),
    });

    const isFound = response?.length > 0;

    return createResponse(
      isFound ? 200 : 404,
      isFound ? "success" : "not_found",
      isFound ? `Fetched ${response?.length} rows` : "No media is found",
      response
    );
  } catch (error) {
    return createResponse(
      500,
      "fatal_error",
      (error as Error)?.message ?? "Unknown error",
      undefined,
      true,
      `${PATH}:${error}`
    );
  }
}
