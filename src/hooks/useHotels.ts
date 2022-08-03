import { useState, useEffect } from 'react';
import { hotelsService } from '../api/axiosInstance';
import { Hotel, UserDataType } from '../interfaces/types';
import { getExceptedHotelsQueryString, getSearchQueryString } from '../utils/getQueryString';

export default function useHotels() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const userHotels = Object.values(window.localStorage)
    .map((value) => JSON.parse(value))
    .filter(
      (value) =>
        Object.keys(value).includes('hotelName') &&
        Object.keys(value).includes('checkInDate') &&
        Object.keys(value).includes('checkOutDate') &&
        Object.keys(value).includes('numberOfGuests'),
    );

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
    const searchQueryString = getSearchQueryString(searchParameter, userHotels);
    setTimeout(async () => {
      const data = await hotelsService.get(`?${searchQueryString}&_page=${page}`);
      page === 1 ? setHotels(data) : setHotels([...hotels, ...data]);
      setIsLoading(false);
    }, 500);
  }

  useEffect(() => {
    getAllByPage();
  }, []);

  return { isLoading, hotels, userHotels, getAllByPage, getResultsByPage };
}
