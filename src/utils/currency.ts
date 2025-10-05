// TO REMOVE AFTER MOVE TO DB
export const CURRENCY = 'EUR';

const formatter = new Intl.NumberFormat(undefined, { style: "currency", currency: CURRENCY, maximumFractionDigits: 2 });
export const formatAmount = (n: number, short: boolean = false): string => {
  if (short) {
    if (Math.abs(n) >= 1_000_000) {
      return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (Math.abs(n) >= 1_000) {
      return (n / 1_000).toFixed(0) + "K";
    }
    return n.toString();
  }

  return formatter.format(n);
};