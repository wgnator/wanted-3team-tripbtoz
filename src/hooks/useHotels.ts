import { useState, useEffect } from 'react';
import { hotelsService } from '../api/axiosInstance';
import { Hotel, UserDataType } from '../interfaces/types';
import { getSearchQueryString } from '../utils/getQueryString';

export default function useHotels() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchQueryString, setSearchQueryString] = useState<string>('');

  const userHotels = Object.values(window.localStorage)
    .map((value) => JSON.parse(value))
    .filter(
      (value) =>
        Object.keys(value).includes('hotelName') &&
        Object.keys(value).includes('checkInDate') &&
        Object.keys(value).includes('checkOutDate') &&
        Object.keys(value).includes('numberOfGuests'),
    );

  function getResultsByPage(searchParameter: UserDataType | null, page: number = 1) {
    setIsLoading(true);
    if (page === 1) {
      const searchQueryString = searchParameter ? getSearchQueryString(searchParameter, userHotels) : '';
      setSearchQueryString(searchQueryString);
      setTimeout(async () => {
        const data = await hotelsService.get(`?${searchQueryString}&_page=${page}`);
        setHotels(data);
        setIsLoading(false);
      }, 500);
    } else {
      setTimeout(async () => {
        const data = await hotelsService.get(`?${searchQueryString}&_page=${page}`);
        setHotels([...hotels, ...data]);
        setIsLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    getResultsByPage(null);
  }, []);

  return { isLoading, hotels, userHotels, getResultsByPage };
}
