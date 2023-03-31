export const stringToDate = (date) => {
  if (!date) return date;
  return new Date(date).toLocaleDateString("en-GB", {
    timeZone: "Asia/Kolkata",
  });
};
