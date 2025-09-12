import { UsersProfilePatchRequest } from "@/app/api/users/profiles/patch";
import { StandardizeResponse } from "../utils/createResponse";

export const mutateProfile = async (
  req: UsersProfilePatchRequest
): Promise<StandardizeResponse<undefined>> => {
  try {
    const response = await fetch("/api/users/profiles", {
      method: "PATCH",
      body: JSON.stringify(req),
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  } catch (error) {
    throw error;
  }
};
