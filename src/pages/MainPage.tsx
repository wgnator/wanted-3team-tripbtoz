import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CardSkeleton from '../components/CardSkeleton';
import MainHotelCard from '../components/MainHotelCard';
import useHotels from '../hooks/useHotels';
import { Hotel } from '../interfaces/types';

export default function MainPage() {
  const navigate = useNavigate();
  const [viewTarget, setVeiwTarget] = React.useState<Element | null>(null);
  const pageRef = React.useRef<number | null>(null);
  const { isLoading, hotels, getResultsByPage } = useHotels();
  const clcikHotel = (hotelName: string) => {
    navigate(`details/${hotelName}`);
  };
  const fetchData = () => {
    pageRef.current = pageRef.current === null ? 0 : pageRef.current + 1;
    getResultsByPage(pageRef.current);
  };

  const observerCallback = (entries: any) => {
    const [entry] = entries;
    if (entry.isIntersecting) fetchData();
  };
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);

    if (viewTarget) observer.observe(viewTarget);
  }, [viewTarget]);

  return (
    <Container id="컨테이너">
      <HotelCards>
        {isLoading
          ? new Array(10).fill(1).map((i) => {
              return <CardSkeleton />;
            })
          : hotels.map((hotel: Hotel, index: number) => {
              const lastIndex = index === hotels.length - 1;
              return (
                <MainHotelCard
                  key={hotel.hotel_name + index}
                  hotel={hotel}
                  targetRef={lastIndex ? setVeiwTarget : null}
                />
              );
            })}
      </HotelCards>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  max-width: 976px;
  height: 100vh;
  margin: 0 auto;
`;
const HotelCards = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
