import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import { UserDataType, UserData } from '../interfaces/types';

function getExceptedHotelsQueryString(searchParameter: UserDataType, userHotels: UserData): string {
  const exceptedHotels = userHotels
    .filter((reservation: UserDataType) =>
      areIntervalsOverlapping(
        { start: new Date(reservation.checkInDate), end: new Date(reservation.checkOutDate) },
        { start: searchParameter.checkInDate, end: searchParameter.checkOutDate },
      ),
    )
    .map((reservation: UserDataType) => reservation.hotelName);
  const neQueryString = exceptedHotels.map((el: string) => `&hotel_name_ne=${el}`).join('');
  return neQueryString;
}

export function getSearchQueryString(searchParameter: UserDataType, userHotels: UserData): string {
  const searchString = searchParameter.hotelName?.split(' ').join('+') || '';
  const neQueryString = getExceptedHotelsQueryString(searchParameter, userHotels);
  const searchQueyrString = `occupancy.max_gte=${searchParameter.numberOfGuests}&q=${searchString}${neQueryString}`;
  return searchQueyrString;
}
