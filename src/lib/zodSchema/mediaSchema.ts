import { z } from "zod";

// Regex patterns for latitude and longitude
export const latitudeRegex = /^$|^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
export const longitudeRegex =
  /^$|^-?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

export const mediaSchema = z.object({
  mediaName: z
    .string()
    .min(20, "Media name must be at least 20 characters")
    .max(120, "Media name must be 120 characters or fewer"),

  mediaSource: z
    .string()
    .min(1, "Media source cannot be empty")
    .max(120, "Media source must be 120 characters or fewer"),

  mediaAttribute: z
    .string()
    .min(20, "Media attribute must be at least 20 characters")
    .max(120, "Media attribute must be 120 characters or fewer"),

  mediaAlt: z
    .string()
    .min(20, "Alt text must be at least 20 characters")
    .max(120, "Alt text must be 120 characters or fewer"),

  mediaLocation: z
    .string()
    .min(7, "Media location must be at least 7 characters")
    .max(120, "Media location must be 120 characters or fewer"),

  latitude: z
    .string()
    .regex(latitudeRegex, {
      message: "Invalid latitude. Must be a number between -90 and 90.",
    })
    .optional(),

  longitude: z
    .string()
    .regex(longitudeRegex, {
      message: "Invalid longitude. Must be a number between -180 and 180.",
    })
    .optional(),
  isPublic: z.boolean(),
  isNSFW: z.boolean(),
  isAI: z.boolean(),
});
