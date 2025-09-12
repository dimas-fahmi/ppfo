import z from "zod";

const USERNAME_REGEX =
  /^(?!.*[_-]{2})(?!.*[_-].*[_-])^[a-z](?:[a-z0-9]*[_-]?[a-z0-9]+)*$/;

const NAME_REGEX = /^[a-zA-Z ]*$/;

export const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name is too long" })
    .regex(NAME_REGEX, {
      message: "First name can only contain letters and spaces",
    }),

  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name is too long" })
    .regex(NAME_REGEX, {
      message: "Last name can only contain letters and spaces",
    }),

  fullName: z
    .string()
    .trim()
    .min(1, { message: "Full name is required" })
    .max(100, { message: "Full name is too long" })
    .optional(),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-z]/, "Username must start with a lowercase letter")
    .regex(/[a-z0-9]$/, "Username must end with a lowercase letter or number")
    .regex(/^(?!.*[_-]{2})/, "Username cannot have consecutive symbols")
    .regex(
      /^(?!.*[_-].*[_-])/,
      "Username can only contain one symbol ('_' or '-')"
    )
    .regex(USERNAME_REGEX, "Username contains invalid characters or format"),

  email: z.email(),
});
