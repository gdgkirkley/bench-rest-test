export const formatMoney = (amount: string) => {
  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });

  return formatter.format(Number(amount));
};
