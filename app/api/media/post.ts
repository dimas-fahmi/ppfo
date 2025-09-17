import { NextRequest } from "next/server";
import { createResponse } from "@/src/lib/utils/createResponse";
import { InsertMedia, media } from "@/src/db/schema/media";
import { createClient } from "@/src/lib/supabase/utils/server";
import { ALLOWED_MIME_TYPES, MAX_SIZE } from "@/src/lib/configs/app";
import sharp from "sharp";
import { db } from "@/src/db";
import { del, put, PutBlobResult } from "@vercel/blob";

const PATH = "API_MEDIA_POST";

export interface MediaPostRequest {
  mediaName: string;
  mediaSource: string;
  mediaAttribute: string;
  mediaAlt: string;
  mediaLocation: string;
  latitude: string;
  longitude: string;
  isAI: boolean;
  isNSFW: boolean;
  isPublic: boolean;
  image: Blob;
}

function parseFormData(formData: FormData): MediaPostRequest {
  const raw = Object.fromEntries(formData.entries()) as unknown as Omit<
    MediaPostRequest,
    "isAI" | "isNSFW" | "isPublic"
  > & {
    isAI: string;
    isNSFW: string;
    isPublic: string;
  };

  return {
    ...raw,
    isAI: raw?.isAI === "true",
    isNSFW: raw?.isNSFW === "true",
    isPublic: raw?.isPublic === "true",
  };
}

export async function mediaPost(req: NextRequest) {
  // Parse Body
  let body: FormData;

  try {
    body = await req.formData();
  } catch (_error) {
    return createResponse(
      400,
      "bad_request",
      "Invalid request",
      undefined,
      true,
      PATH
    );
  }

  const formValues = parseFormData(body);

  const {
    isAI,
    isNSFW,
    isPublic,
    latitude,
    longitude,
    mediaAlt,
    mediaAttribute,
    mediaLocation,
    mediaName,
    mediaSource,
    image,
  } = formValues;

  // Validate Request
  if (
    !mediaName ||
    !mediaSource ||
    !mediaLocation ||
    !mediaAlt ||
    !mediaAttribute ||
    !image
  ) {
    return createResponse(
      400,
      "bad_request",
      "Missing important parameters",
      undefined
    );
  }

  // Validate Image Type
  if (!ALLOWED_MIME_TYPES.includes(image.type)) {
    return createResponse(
      400,
      "bad_request",
      `invalid file type: ${image.type}`,
      null,
      true,
      PATH
    );
  }

  // Validate Image Size
  if (image.size > MAX_SIZE) {
    return createResponse(
      400,
      "bad_request",
      `file too large, max is ${MAX_SIZE / (1024 * 1024)}MB`,
      null,
      true,
      PATH
    );
  }

  // Convert file -> buffer
  let arrayBuffer: ArrayBuffer;
  let buffer: Buffer;

  try {
    arrayBuffer = await image.arrayBuffer();
    buffer = await Buffer.from(arrayBuffer);
  } catch (_error) {
    return createResponse(
      400,
      "bad_request",
      `Image corrupt, please send again`,
      null,
      true,
      PATH
    );
  }

  // Process Image
  let processedImage;

  try {
    processedImage = await sharp(buffer).webp({ quality: 67 }).toBuffer();
  } catch (_error) {
    return createResponse(
      400,
      "bad_request",
      "invalid image content",
      null,
      true,
      PATH
    );
  }

  // Initialize Supabase
  const supabase = await createClient();

  // Validate Session
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return createResponse(401, "unauthorized", "Invalid session", undefined);
  }

  const userId = data.user.id;

  // Execution
  try {
    const response = await db.transaction(async (tx) => {
      // Upload Image
      let uploadedImage: PutBlobResult;

      try {
        uploadedImage = await put(
          `ppfo/media/${mediaName}_${crypto.randomUUID()}.webp`,
          processedImage,
          {
            access: "public",
          }
        );
      } catch (_error) {
        throw new Error("Failed to upload, operation aborted");
      }

      // Create New Media
      const newMedia: InsertMedia = {
        // Ownership
        ownerId: userId,
        uploadedBy: userId,

        // Metadata
        mediaName,
        mediaAlt,
        mediaAttribute,
        mediaSource,
        mediaPath: uploadedImage.url,
        mediaType: "picture",

        // Categorization
        isNotSafeForWork: isNSFW,
        isAiGenerated: isAI,

        // Publicity
        publicity: isPublic ? "public" : "restricted",

        // Location
        longitude,
        latitude,
      };

      // Store new media to DB
      let stored;
      try {
        stored = await tx.insert(media).values(newMedia).returning();
      } catch (_error) {
        await del(uploadedImage.url);
        throw new Error(
          "Failed to stored image, deleting uploaded image and aborting"
        );
      }

      return stored;
    });

    return createResponse(
      200,
      "success",
      "New media is uploaded and stored",
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
