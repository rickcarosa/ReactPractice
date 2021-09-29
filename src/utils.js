export const dollarFormatter = (amount, digit) => {
  return Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digit,
  });
};
