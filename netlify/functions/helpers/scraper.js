import { JSDOM } from "jsdom";

// Very simple scraper, returns the page as a JSDOM document object
export async function scrape(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const { document } = new JSDOM(html).window;
    return document;
  } catch (error) {
    console.warn("Scrape failed:", error);
  }
}
