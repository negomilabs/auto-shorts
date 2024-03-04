import yahooFinance from "yahoo-finance2";
import { pickRandom } from "../math";
import getStockDetails from "./get-stock-details";

// Selects a random stock from the specified Yahoo Finance Screener
export default async (screenerId) => {
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