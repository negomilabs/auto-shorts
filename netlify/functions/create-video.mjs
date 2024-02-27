import yahooFinance from "yahoo-finance2";
import { pickRandom } from "./helpers/math";
import getStockDetails from "./helpers/get-stock-details";
import buildShotstackJSON from "./helpers/video/json-builder";

// Free Yahoo Finance Screeners we will use to find stocks
const SCREENERS = {
  value: "undervalued_large_caps",
  growth: "undervalued_growth_stocks",
  tech: "growth_technology_stocks",
};

// Selects a random stock from the specified Yahoo Finance Screener
async function pickStock(screenerId) {
  let stocks = [];

  try {
    const result = await yahooFinance.screener({
      scrIds: screenerId,
      count: 250,
    });
    stocks = result.quotes;
  } catch (error) {
    // Often a schema validation error, in which case quotes are still returned
    stocks = error?.result?.quotes;

    if (!stocks) {
      console.error(error);
      throw new Error("Accessing screener failed");
    }
  }

  const stock = await pickRandom(stocks);
  return getStockDetails(stock);
}

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
    }
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
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error("Video render failed", error);
  }
};
