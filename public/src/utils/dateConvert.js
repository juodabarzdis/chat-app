export const dateConvert = (date) => {
  const time = new Date(date);
  const hours = time.getHours();
  const minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  return `${hours}:${minutes}`;
};
