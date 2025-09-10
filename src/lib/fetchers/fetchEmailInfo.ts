import { UsersEmailInfo } from "@/app/api/users/email/info/get";

export const fetchEmailInfo = async (
  email: string
): Promise<UsersEmailInfo> => {
  try {
    const response = await fetch(`/api/users/email/info?email=${email}`);

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  } catch (error) {
    throw error;
  }
};
