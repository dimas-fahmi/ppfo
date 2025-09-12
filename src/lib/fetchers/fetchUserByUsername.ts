import type { UsersProfile } from "@/app/api/users/profiles/get";
import { StandardizeResponse } from "../utils/createResponse";

export const fetchUserByUsername = async (
  username: string
): Promise<StandardizeResponse<UsersProfile>> => {
  try {
    const response = await fetch(`/api/users/username?username=${username}`);

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  } catch (error) {
    throw error;
  }
};
