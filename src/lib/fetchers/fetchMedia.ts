import { MediaGetRequest, MediaGetResponse } from "@/app/api/media/get";
import { objectToQueryString } from "../utils/objectToQueryString";

const fetchMedia = async (
  query: MediaGetRequest
): Promise<MediaGetResponse> => {
  try {
    const queryString = objectToQueryString({ ...query });
    const response = await fetch(`/api/media?${queryString}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
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

export default fetchMedia;
