import { pickRandom } from "../math";

export const title = (symbol) => {
  return pickRandom([
    `${symbol} stock… 👀`,
    `Is ${symbol} a buy? 🤔💡`,
    `${symbol} looking interesting today…`,
    `${symbol} stock: time to buy? 📉📈`,
    `${symbol} analysis: the scoop 🕵️‍♂️`,
    `Uncovering ${symbol} stock potential 📊`,
    `${symbol} stock: hidden gem? 💎`,
    `${symbol} stock: what to know 🤔`,
    `The lowdown on ${symbol} stock 📉`,
    `${symbol} stock: time to invest? ⏰💰`,
    `Buying ${symbol}: worth it? 🧐`,
    `Exploring ${symbol} stock 🔍`,
    `${symbol} stock: the rundown 📋`,
    `${symbol} stock: the verdict 🤔`,
    `${symbol} stock: dive in? 🏊‍♂️`,
    `${symbol} stock: a closer look 🔍`,
    `The buzz around ${symbol} stock 🐝`,
    `${symbol} stock: a hidden treasure? 💰`,
    `${symbol} stock: hot or not? 🔥❄️`,
    `Should you buy ${symbol} stock? 🤔💰`,
    `${symbol} stock: a game-changer? 🎮`,
    `${symbol} stock: the scoop 🥄`,
    `The latest on ${symbol} stock 🆕`,
    `${symbol} stock: insights to know 💡`,
    `${symbol} stock: the inside story 📖`,
    `${symbol} stock: key insights 🔑`,
    `Is ${symbol} stock worth it? 💰🤔`,
    `The truth about ${symbol} stock 🕵️‍♂️`,
    `${symbol} stock: let's talk 🗣️`,
    `${symbol} stock: the big picture 🖼️`,
    `${symbol} stock: what's next? 🤔➡️`,
    `Analyzing ${symbol} stock 📊`,
    `${symbol} stock: the essentials 📜`,
    `${symbol} stock: one to watch 👀`,
    `Should you invest in ${symbol} stock? 💰🤔`,
    `${symbol} stock: what's the deal? 💼`,
    `${symbol} stock secrets 🕵️‍♂️`,
    `The future of ${symbol} stock 🔮`,
    `What's happening with ${symbol} stock? 🤷‍♂️`,
    `${symbol} stock: smart move? 🧠`,
    `${symbol} stock: buy or pass? 🛒🚫`,
  ])
};

export const firstCaption = (symbol, count) => {
  let text = pickRandom([
    `${count} reasons why ${symbol} stock is interesting right now`,
    `${count} reasons why ${symbol} stock is interesting today`,
    `${count} reasons why ${symbol} stock is worth a look`,
    `${count} reasons why ${symbol} stock deserves your attention`,
    `${count} reasons to watch ${symbol} stock`,
    `${symbol} stock is worth your attention (${count} reasons why)`,
    `${count} reasons to consider ${symbol} stock`,
    `${count} reasons ${symbol} stock could be a buy`,
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
    `${count} reasons why ${symbol} stock deserves a closer look`,
    `Could ${symbol} be your next investment?`,
    `${count} reasons it's time to consider ${symbol} stock`,
    `Spotlight on ${symbol} stock today (${count} reasons why)`,
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

  // Extra variations
  if (!text.endsWith("?") && pickRandom([true, false])) {
    if (text.endsWith(")")) {
      text = text.slice(0, -1) + "...)";
    } else {
      text += "...";
    }
  }

  return text;
};
