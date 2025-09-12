import { NextRequest } from "next/server";
import { createResponse } from "@/src/lib/utils/createResponse";
import { ALLOWED_MIME_TYPES, MAX_SIZE } from "@/src/lib/configs/app";
import sharp from "sharp";
import { createClient } from "@/src/lib/supabase/utils/server";
import { db } from "@/src/db";
import { eq } from "drizzle-orm";
import { profiles } from "@/src/db/schema/profiles";
import { del, put, PutBlobResult } from "@vercel/blob";

const PATH = "API_USERS_IMAGE_PATH";

export async function PATCH(req: NextRequest) {
  let body;

  // Parse Request
  try {
    body = await req.formData();
  } catch (error) {
    return createResponse(
      400,
      "bad_request",
      "invalid request",
      null,
      true,
      `${PATH}:${error}`
    );
  }

  const image = body.get("image") as File | null;

  // Validate Session
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error || !data?.session) {
    return createResponse(
      401,
      "invalid_session",
      "Unauthorized, login required.",
      null,
      true,
      `${PATH}:${error}`
    );
  }

  const userId = data.session.user.id;

  // Validate Image Existence
  if (!image) {
    return createResponse(
      400,
      "bad_request",
      "missing image",
      null,
      true,
      PATH
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

  // Conver File -> Buffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Process with sharp (resize, compress, convert to WebP)
  let processedImage;
  try {
    processedImage = await sharp(buffer)
      .webp({ quality: 50 }) // compress & convert
      .toBuffer();
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

  // Execution
  try {
    const response = await db.transaction(async (tx) => {
      // Get current profile
      const profile = await tx.query.profiles.findFirst({
        where: eq(profiles.userId, userId),
      });

      if (!profile) {
        throw new Error("Row missing in profiles table");
      }

      if (profile.avatar) {
        // Todo: Delete existing avatar
        try {
          await del(profile.avatar);
        } catch (_error) {
          throw new Error("Failed to delete old avatar");
        }
      }

      let uploadedImage: PutBlobResult;
      try {
        uploadedImage = await put(
          `/ppfo/avatars/${profile.userId}_avatar_${crypto.randomUUID()}.webp`,
          processedImage,
          {
            access: "public",
            addRandomSuffix: false,
          }
        );
      } catch (_error) {
        console.log(_error);
        throw new Error("Failed uploading image");
      }

      const newAvatar = uploadedImage.url;

      // Overwrite record
      try {
        await tx
          .update(profiles)
          .set({ avatar: newAvatar })
          .where(eq(profiles.userId, userId));
      } catch (_error) {
        throw new Error("Failed to ");
      }

      return newAvatar;
    });

    return createResponse(200, "success", "Avatar updated", response);
  } catch (error) {
    return createResponse(
      500,
      "unexpected_error",
      (error as Error)?.message ?? "Unexpected error",
      undefined,
      true,
      `${PATH}:${error}`
    );
  }
}
