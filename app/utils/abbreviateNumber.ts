export function abbreviateNumber(num: number, decimals = 1): string {
  if (num < 1000) return num.toString();

  const units = ["", "K", "M", "B", "T", "P", "E"];
  const exponent = Math.min(Math.floor(Math.log10(num) / 3), units.length - 1);
  const reducedNum = num / 10 ** (exponent * 3);

  return `${parseFloat(reducedNum.toFixed(decimals))}${units[exponent]}`;
}
