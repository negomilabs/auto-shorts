import { pickRandom } from "../../helpers/math";
import { description, title } from "./helpers/text";
import { writeToSheet } from "../../helpers/google-sheets";
import pickStock from "./helpers/yahoo-finance/pick-stock";
import buildShotstackJSON from "./helpers/shotstack/json-builder";

// Free Yahoo Finance Screeners we will use to find stocks
const SCREENERS = {
  value: "undervalued_large_caps",
  growth: "undervalued_growth_stocks",
  tech: "growth_technology_stocks",
};

export default async () => {
  const screener = pickRandom(Object.keys(SCREENERS));
  let stock;
  let json;

  // Pick a stock and generate JSON required by Shotstack
  try {
    stock = await pickStock(SCREENERS[screener]);
    json = await buildShotstackJSON(stock, screener);
  } catch (error) {
    // Some stocks might have only one reason, in which case try one more time
    if (error.message === "Not enough reasons") {
      console.warn(
        `Minimum reasons requirement not met for ${stock}, retrying...`
      );
      stock = await pickStock(SCREENERS[screener]);
      json = await buildShotstackJSON(stock, screener);
    } else {
      console.error(error);
      throw new Error("Error picking stock or generating JSON");
    }
  }

  // Generate title/description & write to Google Sheet
  try {
    await writeToSheet("A2:B2", [title(stock.symbol), description(stock)]);
  } catch (error) {
    console.error(error);
    throw new Error("Error writing title/description to Google Sheet");
  }

  // Send JSON to Shotstack to render as a video
  try {
    const response = await fetch("https://api.shotstack.io/v1/render", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.SHOTSTACK_API_KEY,
      },
      body: JSON.stringify(json),
    });
    const data = await response.json();
    console.log("Video render initiated...");
    console.log(data);
  } catch (error) {
    console.error("Video render failed", error);
  }
};