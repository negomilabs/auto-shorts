import { SEGMENT_NAMES, SEGMENT_LENGTHS } from "./constants";
import segmentBuilder from "./segment-builder";

export default async (stock, screener) => {
  const segmentList = [
    SEGMENT_NAMES.dividend,
    SEGMENT_NAMES.esg,
    SEGMENT_NAMES.rating,
    SEGMENT_NAMES.upside,
    SEGMENT_NAMES.outro,
  ];

  // We want to start with different segments depending on the screener type
  switch (screener) {
    case "value":
      segmentList.unshift(
        SEGMENT_NAMES.peRatio,
        SEGMENT_NAMES.pegRatio,
        SEGMENT_NAMES.marketCap
      );
      break;
    case "growth":
      segmentList.unshift(
        SEGMENT_NAMES.peRatio,
        SEGMENT_NAMES.pegRatio,
        SEGMENT_NAMES.epsChange
      );
      break;
    case "tech":
      segmentList.unshift(
        SEGMENT_NAMES.revenueGrowth,
        SEGMENT_NAMES.epsChange,
        SEGMENT_NAMES.techSector
      );
      break;
    default:
      throw new Error(`${screener} screener doesn't exist`);
  }

  // Dynamically generate clips for video segments
  let segments;
  try {
    segments = await Promise.all(
      segmentList.map((segment) =>
        segmentBuilder[segment]({ ...stock, screener })
      )
    );
  } catch (error) {
    console.error(error);
    throw new Error("Error generating segments");
  }

  // Keep track of time so we know when to start each subsequent segment
  let timeCount = SEGMENT_LENGTHS.intro;

  // Convert vertical segments to horizontal tracks, and add correct timing
  const tracks = segments.reduce(
    (acc, clips) => {
      if (clips) {
        clips.forEach((clip, trackIndex) => {
          if (clip) {
            // Calculate start time
            clip.start = timeCount;
            // Make tracks 2 & 3 start later if they exist
            if (trackIndex > 0 && trackIndex < 3) {
              clip.start = clip.start + 1.5;
              clip.length = clip.length - 1.5;
            }
            acc[trackIndex].clips.push(clip);
          }
        });
        timeCount += clips[0].length;
      }
      return acc;
    },
    Array.from({ length: 4 }, () => ({ clips: [] }))
  );

  // Check we have enough reasons to pick the stock
  const reasonsCount = tracks[0].clips.length - 1; // Subtracting one for outro
  if (reasonsCount < 2) {
    throw new Error("Not enough reasons");
  }

  // Generate intro now we know how many reasons we are including
  const intro = await segmentBuilder[SEGMENT_NAMES.intro](
    stock.symbol,
    reasonsCount
  );
  intro.forEach((clip, index) => clip && tracks[index].clips.unshift(clip));

  return {
    timeline: {
      background: "#000000",
      tracks,
    },
    output: {
      format: "mp4",
      fps: 25,
      size: {
        width: 720,
        height: 1280,
      },
      destinations: [],
    },
  };
};
