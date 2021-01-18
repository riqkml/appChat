const getChatTime = (today, isChat) => {
  const hour = today.getHours();
  const minute = today.getMinutes();
  const time = isChat && hour >= 12 ? 'AM' : 'PM';
  return `${hour}:${minute} ${time}`;
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
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${year}-${month}-${date}`;
};
export {getChatTime, getDateTime, getChatDocument};
