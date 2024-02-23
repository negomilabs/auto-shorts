import { SEGMENT_NAMES, SEGMENT_LENGTHS } from "./constants";
import segmentBuilder from "./segment-builder";

export default async (stock, screener) => {
  const screenerSpecificSegments = [];
  const sharedSegments = [
    SEGMENT_NAMES.dividend,
    SEGMENT_NAMES.esg,
    SEGMENT_NAMES.rating,
    SEGMENT_NAMES.upside,
    SEGMENT_NAMES.outro,
  ];

  // We want to include different segments depending on the screener type
  switch (screener) {
    case "value":
      screenerSpecificSegments.push(
        SEGMENT_NAMES.peRatio,
        SEGMENT_NAMES.pegRatio,
        SEGMENT_NAMES.marketCap
      );
      break;
    case "growth":
      screenerSpecificSegments.push(
        SEGMENT_NAMES.peRatio,
        SEGMENT_NAMES.pegRatio,
        SEGMENT_NAMES.epsChange
      );
      break;
    case "tech":
      screenerSpecificSegments.push(
        SEGMENT_NAMES.revenueGrowth,
        SEGMENT_NAMES.epsChange,
        SEGMENT_NAMES.techSector
      );
      break;
    default:
      throw new Error(`${screener} screener doesn't exist`);
  }

  // Keep track of time so we know when to start each subsequent segment
  let timeCount = SEGMENT_LENGTHS.intro;

  // Dynamically generate video segments and add correct timing to each
  const segments = [...screenerSpecificSegments, ...sharedSegments].reduce(
    (acc, segment) => {
      const clips = segmentBuilder[segment]({ ...stock, screener });
      if (clips) {
        acc.push(
          clips.map((clip, trackIndex) => {
            if (clip) {
              // Calculate start time
              clip.start = timeCount;
              // Make tracks 2 & 3 start later if they exist
              if (trackIndex > 0 && trackIndex < 3) {
                clip.start = clip.start + 1.5;
                clip.length = clip.length - 1.5;
              }
            }
            return clip;
          })
        );
        timeCount += clips[0].length;
      }
      return acc;
    },
    []
  );

  // Generate intro last once we know how many 'reasons' we are including
  const reasonsCount = segments.length - 1; // Subtracting one for outro
  const intro = segmentBuilder[SEGMENT_NAMES.intro](stock.symbol, reasonsCount);

  // Convert vertical segments to horizontal tracks for Shotstack
  const tracks = [intro, ...segments].reduce(
    (acc, segment) => {
      segment.forEach((clip, index) => {
        if (clip) {
          acc[index].clips.push(clip);
        }
      });
      return acc;
    },
    Array.from({ length: 4 }, () => ({ clips: [] }))
  );

  return {
    timeline: {
      background: "#000000",
      tracks,
    },
    output: {
      format: "mp4",
      fps: 25,
      size: {
        width: 1080,
        height: 1920,
      },
      destinations: [],
    },
  };
};
