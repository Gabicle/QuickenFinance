export const formatPercent = (
  value: number,
  options?: Intl.NumberFormatOptions,
): string => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
    ...options,
  });

  return formatter.format(value);
};