import { MediaGetResponse } from "@/app/api/media/get";
import { MediaPostRequest } from "@/app/api/media/post";

export const mutateUploadMedia = async (
  req: MediaPostRequest
): Promise<MediaGetResponse> => {
  try {
    const formData = new FormData();

    console.log(req.image.size);

    Object.entries(req).map(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch("/api/media", {
      method: "POST",
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
