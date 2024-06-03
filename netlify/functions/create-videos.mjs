import createStocksVideo from "./channels/stocks/create-video";

export default async () => {
  try {
    const videos = [createStocksVideo()];
    await Promise.all(videos);
    return new Response("Success");
  } catch (error) {
    console.error("Video creation failed", error);
  }
};

// export const config = {
//   schedule: "@daily",
// };
