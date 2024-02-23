import { SEGMENT_NAMES, SEGMENT_LENGTHS } from "./constants";
import { textClip, videoClip } from "./clip-templates";

export default {
  [SEGMENT_NAMES.intro]: (symbol, count) => [
    textClip(
      `${count} reasons why ${symbol} stock is interesting right now 👉`,
      SEGMENT_LENGTHS.intro
    ),
    null,
    null,
    videoClip(
      `https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/sdpzx9g7vu/zzy8na10-3rmx-ae17-aclp-0iollv00exgy/source.mp4`,
      SEGMENT_LENGTHS.intro
    ),
  ],
  [SEGMENT_NAMES.peRatio]: ({ peRatio }) => {
    if (!peRatio || peRatio > 20) {
      return;
    }
    return [
      textClip(`${peRatio} P/E ratio`, SEGMENT_LENGTHS.long, "top"),
      textClip("👇", SEGMENT_LENGTHS.long),
      textClip(
        "Available at a bargain price 👍💵",
        SEGMENT_LENGTHS.long,
        "bottom"
      ),
      videoClip(
        "https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/sdpzx9g7vu/zzy8na10-3rmx-ae17-aclp-0iollv00exgy/source.mp4",
        SEGMENT_LENGTHS.long
      ),
    ];
  },
  [SEGMENT_NAMES.pegRatio]: ({ pegRatio, screener }) => {
    if (!pegRatio || pegRatio < 0) {
      return;
    }
    return [
      textClip(
        `${pegRatio} Price/Earnings to Growth (P/E/G) ratio`,
        SEGMENT_LENGTHS.long,
        "top"
      ),
      textClip("👇", SEGMENT_LENGTHS.long),
      textClip(
        `Undervalued ${screener === "growth" ? "growth " : ""}stock 👌🤑`,
        SEGMENT_LENGTHS.long,
        "bottom"
      ),
      videoClip(
        "https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/sdpzx9g7vu/zzy8na10-3rmx-ae17-aclp-0iollv00exgy/source.mp4",
        SEGMENT_LENGTHS.long
      ),
    ];
  },
  [SEGMENT_NAMES.marketCap]: ({ displayName, currencySymbol, marketCap }) => [
    textClip(
      `${displayName} has a ${currencySymbol}${marketCap} market cap`,
      SEGMENT_LENGTHS.long,
      "top"
    ),
    textClip("👇", SEGMENT_LENGTHS.long),
    textClip(
      `Large, stable & well-established company 💼🤝🏢`,
      SEGMENT_LENGTHS.long,
      "bottom"
    ),
    videoClip(
      `https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/sdpzx9g7vu/zzy8na10-3rmx-ae17-aclp-0iollv00exgy/source.mp4`,
      SEGMENT_LENGTHS.long
    ),
  ],
  [SEGMENT_NAMES.epsChange]: ({ epsGrowth }) => {
    if (!epsGrowth || epsGrowth < 0) {
      return;
    }
    return [
      textClip(
        `${epsGrowth}% 1 year change in EPS`,
        SEGMENT_LENGTHS.long,
        "top"
      ),
      textClip("👇", SEGMENT_LENGTHS.long),
      textClip(`Solid profit growth 🚀🎯💪`, SEGMENT_LENGTHS.long, "bottom"),
      videoClip(
        `https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/sdpzx9g7vu/zzy8na10-3rmx-ae17-aclp-0iollv00exgy/source.mp4`,
        SEGMENT_LENGTHS.long
      ),
    ];
  },
  [SEGMENT_NAMES.revenueGrowth]: ({ revenueGrowth }) => [
    textClip(
      `${revenueGrowth}% quarterly revenue growth YoY`,
      SEGMENT_LENGTHS.long,
      "top"
    ),
    textClip("👇", SEGMENT_LENGTHS.long),
    textClip(`Revenue is increasing 🌱📈`, SEGMENT_LENGTHS.long, "bottom"),
    videoClip(
      `https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/sdpzx9g7vu/zzy8na10-3rmx-ae17-aclp-0iollv00exgy/source.mp4`,
      SEGMENT_LENGTHS.long
    ),
  ],
  [SEGMENT_NAMES.techSector]: () => [
    textClip(`Tech sector 🌐💻🤖`, SEGMENT_LENGTHS.long, "top"),
    textClip("👇", SEGMENT_LENGTHS.long),
    textClip(`Exciting growth potential`, SEGMENT_LENGTHS.long, "bottom"),
    videoClip(
      `https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/sdpzx9g7vu/zzy8na10-3rmx-ae17-aclp-0iollv00exgy/source.mp4`,
      SEGMENT_LENGTHS.long
    ),
  ],
  [SEGMENT_NAMES.dividend]: ({ dividendYield }) => {
    if (!dividendYield || dividendYield < 2) {
      return;
    }
    return [
      textClip(
        `Pays a ${dividendYield}% dividend 💰🙌`,
        SEGMENT_LENGTHS.default
      ),
      null,
      null,
      videoClip(
        `https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/sdpzx9g7vu/zzy8na10-3rmx-ae17-aclp-0iollv00exgy/source.mp4`,
        SEGMENT_LENGTHS.default
      ),
    ];
  },
  [SEGMENT_NAMES.rating]: ({ symbol, averageAnalystRating }) => {
    const [_, rating] =
      averageAnalystRating && averageAnalystRating.split(" - ");
    if (!(rating === "Buy" || rating === "Strong Buy")) {
      return;
    }
    return [
      textClip(
        `Analysts currently rate ${symbol} a ${rating} ✅🏆`,
        SEGMENT_LENGTHS.default
      ),
      null,
      null,
      videoClip(
        `https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/sdpzx9g7vu/zzy8na10-3rmx-ae17-aclp-0iollv00exgy/source.mp4`,
        SEGMENT_LENGTHS.default
      ),
    ];
  },
  [SEGMENT_NAMES.upside]: ({ priceTargetUpside }) => {
    if (priceTargetUpside < 2) {
      return;
    }
    return [
      textClip(
        `${priceTargetUpside}% potential upside over the next year (based on analyst price targets) 💸⬆️`,
        SEGMENT_LENGTHS.default
      ),
      null,
      null,
      videoClip(
        `https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/sdpzx9g7vu/zzy8na10-3rmx-ae17-aclp-0iollv00exgy/source.mp4`,
        SEGMENT_LENGTHS.default
      ),
    ];
  },
  [SEGMENT_NAMES.esg]: ({ esg }) => {
    if (!esg) {
      return;
    }
    return [
      textClip(`Strong ESG profile ♻️🌍`, SEGMENT_LENGTHS.short),
      null,
      null,
      videoClip(
        `https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/sdpzx9g7vu/zzy8na10-3rmx-ae17-aclp-0iollv00exgy/source.mp4`,
        SEGMENT_LENGTHS.short
      ),
    ];
  },
  [SEGMENT_NAMES.outro]: ({ company }) => [
    textClip(
      `Learn more about ${company} in the description 👇`,
      SEGMENT_LENGTHS.default
    ),
    null,
    null,
    videoClip(
      `https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/sdpzx9g7vu/zzy8na10-3rmx-ae17-aclp-0iollv00exgy/source.mp4`,
      SEGMENT_LENGTHS.default
    ),
  ],
};
