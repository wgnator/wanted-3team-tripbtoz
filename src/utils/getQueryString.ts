import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import { UserDataType, UserData } from '../interfaces/types';

export function getExceptedHotelsQueryString(checkInDate: Date, checkOutDate: Date, userHotels: UserData): string {
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
