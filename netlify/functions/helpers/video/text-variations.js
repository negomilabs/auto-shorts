import { pickRandom } from "../math";

export const title = (symbol) => {
  return symbol;
};

export const firstCaption = (symbol, count) => {
  let text = pickRandom([
    `${count} reasons why ${symbol} stock is interesting right now`,
    `${count} reasons why ${symbol} stock is worth a look`,
    `${count} reasons why ${symbol} stock deserves your attention`,
    `${count} reasons to watch ${symbol} stock`,
    `${symbol} stock is worth your attention (${count} reasons why)`,
    `${count} reasons to consider ${symbol} stock`,
    `${count} reasons why ${symbol} stock has potential`,
    `${count} reasons why ${symbol} stock is showing promising signs`,
    `${count} reasons to invest in ${symbol} stock`,
    `Is ${symbol} stock a buy? Here are ${count} reasons why`,
    `${count} reasons to add ${symbol} stock to your watchlist`,
    `${count} reasons why ${symbol} stock belongs in your portfolio`,
    `${count} reasons why  ${symbol} stock stands out today`,
    `${count} things that set ${symbol} stock apart right now`,
    `${count} reasons why ${symbol} stock is sparking interest`,
    `${count} opportunities with ${symbol} stock right now`,
    `Why ${symbol} stock deserves a closer look`,
    `Could ${symbol} be your next investment?`,
    `Is it time to consider ${symbol} stock?`,
    `Spotlight on ${symbol} stock (here's why)`,
    `${symbol}: A stock worth noticing`,
    `Is ${symbol} stock on your radar?`,
    `${symbol} stock: worth keeping an eye on`,
    `Is ${symbol} stock a hidden gem?`,
    `Why investors are eyeing ${symbol} stock today`,
    `Could ${symbol} stock be a game-changer?`,
    `${symbol} stock: an opportunity knocking?`,
    `Is ${symbol} stock a potential winner?`,
    `Is ${symbol} stock worth a closer look?`,
    `${symbol} stock: what's the buzz about?`,
    `What's driving the interest in ${symbol} stock today?`,
    `${symbol} stock: is it time to buy?`,
    `Should ${symbol} stock be on your watchlist?`,
    `Is ${symbol} stock a hidden opportunity?`,
  ]);

  // Extra variation
  if (!text.endsWith("?") && pickRandom([true, false])) {
    text += "...";
  }
  if (text.includes("look")) {
    text += " 👀";
  } else if (text.includes("gem")) {
    text += " 💎";
  } else if (!text.includes("...") && pickRandom([true, false])) {
    text += " 👉";
  }

  return text;
};
