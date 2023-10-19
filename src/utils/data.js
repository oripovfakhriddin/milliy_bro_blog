export const trueDate = (date) => {
  const time = new Date(date);
  const sana = time.toLocaleDateString("en-Us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return sana;
};
