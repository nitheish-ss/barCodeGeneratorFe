export const numberToRupee = (num) => {
  if (!num) return num;
  const curr = num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return curr;
};
