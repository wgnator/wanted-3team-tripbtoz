import { useState } from 'react';
import { hotelsService } from '../api/axiosInstance';
import { Hotel, UserDataType } from '../interfaces/types';
import { getExceptedHotelsQueryString } from '../utils/getQueryString';

export default function useHotels() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  async function getAllByPage(page: number = 1) {
    setIsLoading(true);
    setTimeout(async () => {
      const data = await hotelsService.get(`?_page=${page}`);
      page === 1 ? setHotels(data) : setHotels([...hotels, ...data]);
      setIsLoading(false);
    }, 500);
  }

  async function getResultsByPage(searchParameter: UserDataType, page: number = 1) {
    setIsLoading(true);
    const searchString = searchParameter.hotelName?.split(' ').join('+') || '';
    const neQueryString = getExceptedHotelsQueryString(searchParameter.checkInDate, searchParameter.checkOutDate);
    setTimeout(async () => {
      const data = await hotelsService.get(
        `?occupancy.max_gte=${searchParameter.numberOfGuests}&q=${searchString}${neQueryString}&_page=${page}`,
      );
      page === 1 ? setHotels(data) : setHotels([...hotels, ...data]);
      setIsLoading(false);
    }, 500);
  }

  return { isLoading, hotels, getAllByPage, getResultsByPage };
}
