import yahooFinance from "yahoo-finance2";
import { pickRandom } from "./helpers/math";
import getStockDetails from "./helpers/get-stock-details";
import jsonBuilder from "./helpers/video/json-builder";

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
  const stock = await pickStock(SCREENERS[screener]);
  const json = await jsonBuilder(stock, screener);

  return new Response(JSON.stringify(json));
};
