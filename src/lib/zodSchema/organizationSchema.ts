import { z } from "zod";

const nameRegex =
  /^(?!.*([&-]){2,})(?!.*([&-])[ ]?([&-]))(?!^[&-])(?!.*[&-]$)[a-zA-Z0-9 ]+([&-][a-zA-Z0-9 ]+)*$/;

export const organizationSchema = z.object({
  name: z.string().regex(nameRegex, {
    message:
      "Name can only contain letters, numbers, spaces, '&', and '-', but not consecutively, at the start/end, or next to each other.",
  }),
  description: z
    .string()
    .min(120, {
      error:
        "Please explain in more detail what is this organization is all about",
    })
    .max(500),
});
