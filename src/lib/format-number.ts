export function compactFormat(value: number) {
  const formatter = new Intl.NumberFormat("pl", {
    notation: "compact",
    compactDisplay: "short",
  });

  return formatter.format(value);
}

export function standardFormat(value: number) {
  return value.toLocaleString("pl", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const setCurrencyValue = (val: number) =>
  Intl.NumberFormat("pl", {
    style: "currency",
    currency: "PLN",
  }).format(val);
