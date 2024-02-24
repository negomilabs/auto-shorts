import pexels from "pexels";
import { pickRandom } from "../math";

const pexelsAPI = pexels.createClient(process.env.PEXELS_API_KEY);

export const pickVideoFromCollections = async (...collectionIds) => {
  const id = pickRandom(collectionIds);
  try {
    const collection = await pexelsAPI.collections.media({
      id,
      per_page: 80,
    });
    const video = pickRandom(collection.media);
    return video.video_files[0].link;
  } catch (error) {
    console.warn("Error getting video from collection:", id, error);
  }
};
