import { UsersProfile } from "@/app/api/users/profiles/route";
import { StandardizeResponse } from "../utils/createResponse";

export const fetchUserProfile = async (
  id: string
): Promise<StandardizeResponse<UsersProfile>> => {
  try {
    const response = await fetch(`/api/users/profiles/?id=${id}`);

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  } catch (error) {
    throw error;
  }
};
