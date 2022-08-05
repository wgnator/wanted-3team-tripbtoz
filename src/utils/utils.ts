import { formatISO } from 'date-fns';

export const convertToDateString = (date: Date) => {
  return formatISO(date, { representation: 'date' });
};

export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getDayGap = (pastDate: Date, futureDate: Date | null) => {
  if (!futureDate) return 0;
  const duration = futureDate.getTime() - pastDate.getTime();
  return Math.floor(duration / 1000 / 60 / 60 / 24);
};
