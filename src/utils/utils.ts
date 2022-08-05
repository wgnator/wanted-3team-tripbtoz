import { formatISO } from 'date-fns';

export const convertToDateString = (date: Date) => {
  return formatISO(date, { representation: 'date' });
};
