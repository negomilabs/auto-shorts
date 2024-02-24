import { SEGMENT_NAMES, SEGMENT_LENGTHS, VIDEO_COLLECTIONS } from "./constants";
import { pickVideoFromCollections } from "./stock-footage";
import { textClip, videoClip } from "./clip-templates";

export default {
  [SEGMENT_NAMES.intro]: async (symbol, count) => {
    const url = await pickVideoFromCollections(
      VIDEO_COLLECTIONS.everyday,
      VIDEO_COLLECTIONS.investing
    );
    return [
      textClip(
        `${count} reasons why ${symbol} stock is interesting right now 👉`,
        SEGMENT_LENGTHS.intro
      ),
      null,
      null,
      videoClip(url, SEGMENT_LENGTHS.intro),
    ];
  },
  [SEGMENT_NAMES.peRatio]: async ({ peRatio }) => {
    if (!peRatio || peRatio > 20) {
      return;
    }
    const url = await pickVideoFromCollections(
      VIDEO_COLLECTIONS.money,
      VIDEO_COLLECTIONS.everyday,
      VIDEO_COLLECTIONS.investing
    );
    return [
      textClip(`${peRatio} P/E ratio`, SEGMENT_LENGTHS.long, "top"),
      textClip("👇", SEGMENT_LENGTHS.long),
      textClip(
        "Available at a bargain price 👍💵",
        SEGMENT_LENGTHS.long,
        "bottom"
      ),
      videoClip(url, SEGMENT_LENGTHS.long),
    ];
  },
  [SEGMENT_NAMES.pegRatio]: async ({ pegRatio, screener }) => {
    if (!pegRatio || pegRatio < 0) {
      return;
    }
    const url = await pickVideoFromCollections(
      VIDEO_COLLECTIONS.growth,
      VIDEO_COLLECTIONS.everyday
    );
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
      videoClip(url, SEGMENT_LENGTHS.long),
    ];
  },
  [SEGMENT_NAMES.marketCap]: async ({
    displayName,
    currencySymbol,
    marketCap,
  }) => {
    const url = await pickVideoFromCollections(
      VIDEO_COLLECTIONS.cities,
      VIDEO_COLLECTIONS.business
    );
    return [
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
      videoClip(url, SEGMENT_LENGTHS.long),
    ];
  },
  [SEGMENT_NAMES.epsChange]: async ({ epsGrowth }) => {
    if (!epsGrowth || epsGrowth < 0) {
      return;
    }
    const url = await pickVideoFromCollections(
      VIDEO_COLLECTIONS.money,
      VIDEO_COLLECTIONS.growth,
      VIDEO_COLLECTIONS.business
    );
    return [
      textClip(
        `${epsGrowth}% 1 year change in EPS`,
        SEGMENT_LENGTHS.long,
        "top"
      ),
      textClip("👇", SEGMENT_LENGTHS.long),
      textClip(`Solid profit growth 🚀🎯💪`, SEGMENT_LENGTHS.long, "bottom"),
      videoClip(url, SEGMENT_LENGTHS.long),
    ];
  },
  [SEGMENT_NAMES.revenueGrowth]: async ({ revenueGrowth }) => {
    const url = await pickVideoFromCollections(
      VIDEO_COLLECTIONS.money,
      VIDEO_COLLECTIONS.growth
    );
    return [
      textClip(
        `${revenueGrowth}% quarterly revenue growth YoY`,
        SEGMENT_LENGTHS.long,
        "top"
      ),
      textClip("👇", SEGMENT_LENGTHS.long),
      textClip(`Revenue is increasing 🌱📈`, SEGMENT_LENGTHS.long, "bottom"),
      videoClip(url, SEGMENT_LENGTHS.long),
    ];
  },
  [SEGMENT_NAMES.techSector]: async () => {
    const url = await pickVideoFromCollections(VIDEO_COLLECTIONS.tech);
    return [
      textClip(`Tech sector 🌐💻🤖`, SEGMENT_LENGTHS.long, "top"),
      textClip("👇", SEGMENT_LENGTHS.long),
      textClip(`Exciting growth potential`, SEGMENT_LENGTHS.long, "bottom"),
      videoClip(url, SEGMENT_LENGTHS.long),
    ];
  },
  [SEGMENT_NAMES.dividend]: async ({ dividendYield }) => {
    if (!dividendYield || dividendYield < 2) {
      return;
    }
    const url = await pickVideoFromCollections(VIDEO_COLLECTIONS.money);
    return [
      textClip(
        `Pays a ${dividendYield}% dividend 💰🙌`,
        SEGMENT_LENGTHS.default
      ),
      null,
      null,
      videoClip(url, SEGMENT_LENGTHS.default),
    ];
  },
  [SEGMENT_NAMES.rating]: async ({ symbol, averageAnalystRating }) => {
    const [_, rating] = averageAnalystRating.split(" - ");
    if (!(rating === "Buy" || rating === "Strong Buy")) {
      return;
    }
    const url = await pickVideoFromCollections(VIDEO_COLLECTIONS.business);
    return [
      textClip(
        `Analysts currently rate ${symbol} a ${rating} ✅🏆`,
        SEGMENT_LENGTHS.default
      ),
      null,
      null,
      videoClip(url, SEGMENT_LENGTHS.default),
    ];
  },
  [SEGMENT_NAMES.upside]: async ({ priceTargetUpside }) => {
    if (priceTargetUpside < 2) {
      return;
    }
    const url = await pickVideoFromCollections(
      VIDEO_COLLECTIONS.growth,
      VIDEO_COLLECTIONS.business
    );
    return [
      textClip(
        `${priceTargetUpside}% potential upside over the next year (based on analyst price targets) 💸⬆️`,
        SEGMENT_LENGTHS.default
      ),
      null,
      null,
      videoClip(url, SEGMENT_LENGTHS.default),
    ];
  },
  [SEGMENT_NAMES.esg]: async ({ esg }) => {
    if (!esg) {
      return;
    }
    const url = await pickVideoFromCollections(
      VIDEO_COLLECTIONS.sustainability
    );
    return [
      textClip(`Strong ESG profile ♻️🌍`, SEGMENT_LENGTHS.short),
      null,
      null,
      videoClip(url, SEGMENT_LENGTHS.short),
    ];
  },
  [SEGMENT_NAMES.outro]: async ({ company }) => {
    const url = await pickVideoFromCollections(VIDEO_COLLECTIONS.abstract);
    return [
      textClip(
        `Learn more about ${company} in the description 👇`,
        SEGMENT_LENGTHS.default
      ),
      null,
      null,
      videoClip(url, SEGMENT_LENGTHS.default),
    ];
  },
};
