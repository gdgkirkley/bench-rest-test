export const formatMoney = (amount: string) => {
  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });

  const value = Number(amount);
  return formatter.format(value);
};
