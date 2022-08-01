import { useState } from 'react';
import { hotelsService } from '../api/axiosInstance';
import { Hotel } from '../interfaces/types';

export default function useHotels() {
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  async function getAllByPage(page: number = 1) {
    setIsLoading(true);
    const data = await hotelsService.get(`?_page=${page}`);
    page === 1 ? setHotels(data) : setHotels([...hotels, ...data]);
    setIsLoading(false);
  }

  return { isLoading, hotels, getAllByPage };
}
