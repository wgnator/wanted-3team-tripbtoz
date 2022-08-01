import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import { UserDataType } from '../interfaces/types';
import { getLocalStorage } from './storage';

export function getExceptedHotelsQueryString(checkInDate: Date, checkOutDate: Date): string {
  const userHotels = getLocalStorage('userHotels', []);
  const exceptedHotels = userHotels
    .filter((reservation: UserDataType) =>
      areIntervalsOverlapping(
        { start: new Date(reservation.checkInDate), end: new Date(reservation.checkOutDate) },
        { start: checkInDate, end: checkOutDate },
      ),
    )
    .map((reservation: UserDataType) => reservation.hotelName);
  const neQueryString = exceptedHotels.map((el: string) => `&hotel_name_ne=${el}`).join('');
  return neQueryString;
}
