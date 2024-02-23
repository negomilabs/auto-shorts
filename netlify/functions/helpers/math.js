export function pickRandom(array = []) {
  return array[Math.floor(Math.random() * array.length)];
}

export function roundToDecimals(value, decimals) {
  if (!value) {
    return null;
  }
  return +value.toFixed(decimals);
}

export function abbreviateNumber(value = 0) {
  const suffixes = ["", "K", "M", "B", "T"];
  let newValue = value;
  let suffixNum = 0;
  while (newValue >= 1000) {
    newValue /= 1000;
    suffixNum++;
  }
  newValue = newValue.toPrecision(3);
  newValue += suffixes[suffixNum];
  return newValue;
}
