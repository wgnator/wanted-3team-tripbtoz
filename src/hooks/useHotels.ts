import { useState } from 'react';
import { hotelsService } from '../api/axiosInstance';
import { Hotel, UserDataType } from '../interfaces/types';

export default function useHotels() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  async function getAllByPage(page: number = 1) {
    setIsLoading(true);
    const data = await hotelsService.get(`?_page=${page}`);
    page === 1 ? setHotels(data) : setHotels([...hotels, ...data]);
    setIsLoading(false);
  }

  async function getResultsByPage(searchParameter: UserDataType, page: number = 1) {
    setIsLoading(true);
    const searchString = searchParameter.hotelName?.split(' ').join('+') || '';
    const data = await hotelsService.get(
      `?occupancy.max_gte=${searchParameter.numberOfGuests}&q=${searchString}&_page=${page}`,
    );
    page === 1 ? setHotels(data) : setHotels([...hotels, ...data]);
    setIsLoading(false);
  }

  return { isLoading, hotels, getAllByPage, getResultsByPage };
}
