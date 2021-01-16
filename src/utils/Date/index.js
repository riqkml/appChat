const getChatTime = (today) => {
  const hour = today.getHours();
  const minute = today.getMinutes();
  return `${hour}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
};
const getChatDocument = (today) => {
  const hour = today.getHours();
  const minute = today.getMinutes();
  const date = hour.toString() + minute.toString();
  const value = parseInt(date);
  return value;
};
const getDateTime = (today) => {
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  return `${year}-${month}-${date}`;
};
export {getChatTime, getDateTime, getChatDocument};
