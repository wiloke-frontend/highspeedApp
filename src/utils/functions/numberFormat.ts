const SI_SYMBOL = ['', 'k', 'm', 'g', 't', 'p', 'e'];

export default function numberFormat(num: number) {
  // what tier? (determines SI symbol)
  const tier = (Math.log10(num) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier === 0) return num;

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  // scale the num
  const scaled = num / scale;

  // format num and add suffix
  return scaled.toFixed(1) + suffix;
}
