import yahooFinance from "yahoo-finance2";
import { scrape } from "../../../../helpers/scraper";
import { roundToDecimals, abbreviateNumber } from "../../../../helpers/math";

// Fetches available stock data using different methods
export default async (stock) => {
  if (!stock) {
    throw new Error("No stock found");
  }

  const data = {
    symbol: stock.symbol,
    company: stock.longName,
    displayName: stock.displayName || stock.shortName || stock.longName,
    website: null,
    description: null,
    sector: null,
    industry: null,
    currencySymbol: "",
    marketCap: abbreviateNumber(stock.marketCap),
    peRatio: roundToDecimals(stock.trailingPE, 2),
    pegRatio: null,
    epsGrowth: roundToDecimals(
      (stock.epsCurrentYear / stock.epsTrailingTwelveMonths - 1) * 100,
      2
    ),
    revenueGrowth: null,
    dividendYield: stock.dividendYield,
    averageAnalystRating: stock.averageAnalystRating || "",
    priceTargetUpside: null,
    esg: null,
  };

  try {
    console.log("Fetching full quote...");
    const quote = await yahooFinance.quoteSummary(stock.symbol, {
      modules: [
        "defaultKeyStatistics",
        "financialData",
        "price",
        "summaryProfile",
      ],
    });

    // Basic company data
    data.sector = quote?.summaryProfile?.sector;
    data.industry = quote?.summaryProfile?.industry;
    data.website = quote?.summaryProfile?.website;
    data.description = quote?.summaryProfile?.longBusinessSummary;

    // Financial data
    data.currencySymbol = quote?.price?.currencySymbol;
    data.pegRatio = quote?.defaultKeyStatistics?.pegRatio;
    data.revenueGrowth = roundToDecimals(
      quote?.financialData?.revenueGrowth * 100,
      2
    );
    const price = quote?.financialData?.currentPrice;
    const target = quote?.financialData?.targetMeanPrice;
    if (price && target) {
      data.priceTargetUpside = roundToDecimals(
        ((target - price) / price) * 100,
        1
      );
    }

    // ESG data
    console.log("Fetching ESG data...");
    const document = await scrape(
      `https://finance.yahoo.com/quote/${stock.symbol}/sustainability`
    );
    const xpath =
      '//*[@id="nimbus-app"]/section/section/section/article/section[2]/section[1]/div/section[1]/div/div/h4';
    const score = document.evaluate(xpath, document, null, 2, null).stringValue;
    data.esg = Boolean(score) && Number(score) < 20;
  } catch (error) {
    console.warn("Unable to retrieve all stock details:", error);
  }

  return data;
};
