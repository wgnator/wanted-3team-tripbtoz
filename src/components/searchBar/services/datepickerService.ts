import { DaySelectTypes } from '../Datepicker';

export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const getFirstDate = (date: Date) => {
  // const firstDate = date;
  const firstDate = new Date(date);
  firstDate.setDate(1);
  return firstDate;
};

const getSunday = (date: Date) => {
  const sunday = new Date(date);
  sunday.setDate(sunday.getDate() - sunday.getDay());
  return sunday;
};

const getWeekDate = (date: Date) => {
  const weekDate: Date[] = [];
  const sunday = getSunday(date);

  let dayIndex = 0;
  while (dayIndex < 7) {
    const day = new Date(sunday);
    day.setDate(day.getDate() + dayIndex);
    dayIndex += 1;
    weekDate.push(day);
  }
  return weekDate;
};

export const getMonthDate = (date: Date) => {
  date.setHours(0, 0, 0, 0);
  const baseDate = getSunday(getFirstDate(date));
  const nextMonth = date.getMonth() === 11 ? 0 : date.getMonth() + 1;

  let baseDates: Date[] = [new Date(baseDate)];
  baseDate.setDate(baseDate.getDate() + 7);

  while (baseDate.getMonth() !== nextMonth) {
    baseDates.push(new Date(baseDate));
    baseDate.setDate(baseDate.getDate() + 7);
  }

  return baseDates.map((date) => getWeekDate(date)).flat(1);
};

export const getDayGap = (pastDate: Date, futureDate: Date | null) => {
  if (!futureDate) return 0;
  const duration = futureDate.getTime() - pastDate.getTime();
  return Math.floor(duration / 1000 / 60 / 60 / 24);
};

// 이하 boolean 확인 함수
export const isSameDate = (firstDate: Date, secondDate: Date) => {
  const first = new Date(firstDate);
  const second = new Date(secondDate);
  first.setHours(0, 0, 0, 0);
  second.setHours(0, 0, 0, 0);
  return first.getTime() === second.getTime();
};

interface CheckSelectedInput {
  inputValue: Number;
  checkIn: Number;
  checkOut?: Number;
}
interface IsStartPointInput extends Pick<CheckSelectedInput, 'inputValue' | 'checkIn'> {}
interface IsEndPointInput extends Pick<CheckSelectedInput, 'inputValue' | 'checkOut'> {}

export const isAlonePoint = ({ inputValue, checkIn, checkOut }: CheckSelectedInput) =>
  !checkOut && inputValue === checkIn;

export const isStartPoint = ({ inputValue, checkIn }: IsStartPointInput) => inputValue === checkIn;

export const isEndPoint = ({ inputValue, checkOut }: IsEndPointInput) => inputValue === checkOut;

export const isBetweenPoint = ({ inputValue, checkIn, checkOut }: CheckSelectedInput) =>
  inputValue > checkIn && checkOut && inputValue < checkOut;

export const isStartOrEndPoint = (selectType?: DaySelectTypes) =>
  selectType === 'startPoint' || selectType === 'endPotint' || selectType === 'alonePoint';

export const isPastDate = (today: Date, inputDate: Date) => inputDate.getTime() < today.getTime();
