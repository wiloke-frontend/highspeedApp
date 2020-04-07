interface NumberFormatOptions {
  notation?: string;
  localeMatcher?: string;
  style?: string;
  currency?: string;
  currencyDisplay?: string;
  useGrouping?: boolean;
  minimumIntegerDigits?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
}

const numberFormatInstance = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
} as NumberFormatOptions);

export default function numberFormat(num: number) {
  if (!num) {
    return 0;
  }
  return numberFormatInstance.format(num).toLowerCase();
}
