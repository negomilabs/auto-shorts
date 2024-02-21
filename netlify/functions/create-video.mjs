import yahooFinance from "yahoo-finance2";
import { pickRandom } from "./helpers/math";
import getStockDetails from "./helpers/get-stock-details";

// Free Yahoo Finance Screeners we will use to find stocks
const SCREENERS = {
  value: "undervalued_large_caps",
  growth: "undervalued_growth_stocks",
  tech: "growth_technology_stocks",
};

// Selects a random stock from the specified Yahoo Finance Screener
async function pickStock(screener) {
  let stocks = [];

  try {
    const result = await yahooFinance.screener({
      scrIds: screener,
      count: 250,
    });
    stocks = result.quotes;
  } catch (error) {
    // Often a schema validation error, in which case quotes are still returned
    stocks = error?.result?.quotes;

    if (!stocks) {
      throw new Error("Accessing screener failed:", error);
    }
  }

  return pickRandom(stocks);
}

async function pickValueStock() {
  const stock = await pickStock(SCREENERS.value);
  const details = await getStockDetails(stock);
  return details;
}

async function pickGrowthStock() {
  const stock = await pickStock(SCREENERS.growth);
  const details = await getStockDetails(stock);
  return details;
}

async function pickTechStock() {
  const stock = await pickStock(SCREENERS.tech);
  const details = await getStockDetails(stock);
  return details;
}

export default async (req, context) => {
  const screener = pickRandom(Object.keys(SCREENERS));

  let data;

  switch (screener) {
    case "value":
      data = await pickValueStock();
      break;
    case "growth":
      data = await pickGrowthStock();
      break;
    case "tech":
      data = await pickTechStock();
      break;
    default:
      throw new Error(`${screener} screener doesn't exist`);
  }

  return new Response(JSON.stringify(data));
};
