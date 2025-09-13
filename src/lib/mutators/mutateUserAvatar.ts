import { StandardizeResponse } from "../utils/createResponse";

export const mutateUserAvatar = async (
  blob: Blob
): Promise<StandardizeResponse<string>> => {
  try {
    const formData = new FormData();
    formData.append("image", blob);

    const response = await fetch("/api/users/avatar", {
      method: "PATCH",
      body: formData,
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
