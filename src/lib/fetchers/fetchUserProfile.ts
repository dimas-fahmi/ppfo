import { UsersProfile } from "@/app/api/users/profiles/get";

export const fetchUserProfile = async (id: string): Promise<UsersProfile> => {
  try {
    const response = await fetch(`/api/users/profiles/?id=${id}`);

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result?.result;
  } catch (error) {
    throw error;
  }
};
