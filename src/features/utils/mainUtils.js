// src/utils/dateUtils.js
import { format, isToday, isYesterday, differenceInMinutes, differenceInHours } from 'date-fns';

export const formatPostDate = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);

  const minutesAgo = differenceInMinutes(now, postDate);
  const hoursAgo = differenceInHours(now, postDate);

  if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (hoursAgo < 24 && isToday(postDate)) {
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else if (isYesterday(postDate)) {
    return 'Yesterday';
  } else if (postDate.getFullYear() === now.getFullYear()) {
    return format(postDate, 'dd MMM');
  } else {
    return format(postDate, 'dd MMM yyyy');
  }
};


export const formatLargeNumber = (num) => {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(1)}T`; // 1 trillion or more (e.g., 1T, 1.1T)
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(1)}B`; // 1 billion or more (e.g., 1B, 1.1B)
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`; // 1 million or more (e.g., 1M, 1.2M)
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1)}k`; // 1 thousand or more (e.g., 1k, 1.1k)
  } else {
    return num.toString(); // Less than 1 thousand, show the number as it is
  }
};