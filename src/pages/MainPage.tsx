import { Spinner } from '@chakra-ui/spinner';
import React from 'react';
import styled from 'styled-components';
import CardSkeleton from '../components/CardSkeleton';
import MainHotelCard from '../components/MainHotelCard';
import { useAppSelector } from '../hooks/reduxHooks';
import useHotels from '../hooks/useHotels';
import { Hotel } from '../interfaces/types';

 export default function MainPage() {
  const [dataLoading,setDataLoading] = React.useState<boolean>(true);
  const [viewTarget,setVeiwTarget] = React.useState<Element | null>(null);
  const [isLastData,setIsLastData] = React.useState<boolean>(false);
  const pageRef = React.useRef<number>(1);
  const {isLoading,hotels,getResultsByPage} = useHotels();
  const searchQuery = useAppSelector((state) => state.searchQuery.determined);

  const fetchData = () => {
    getResultsByPage(pageRef.current, searchQuery);
  };
  
  React.useEffect(()=>{
    window.scrollTo(0, 0);
    pageRef.current = 1
    setIsLastData(false)
    if(searchQuery.checkInDate !== ''){
      fetchData()
    }
  }, [searchQuery]);

  const observerCallback = (entries: any) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      if (hotels.length < pageRef.current * 10) {
        setIsLastData(true);
      }
      pageRef.current = pageRef.current + 1
      fetchData()
    }
  };
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);
    if (viewTarget) observer.observe(viewTarget);
    return () => {
      if (viewTarget) observer.unobserve(viewTarget);
    };
  }, [viewTarget]);

  React.useEffect(() => {
    hotels.length && setDataLoading(false);
    window.scrollTo({
      top: window.pageYOffset - window.pageYOffset / 500,
      behavior: 'smooth',
    });
  }, [hotels]);

  return (
    <Container id="컨테이너">
      <HotelCards>
        {dataLoading ? (
          new Array(10).fill(1).map((data, i) => {
            return <CardSkeleton key={'skel' + data + i} />;
          })
        ) : hotels.length > 0 ? (
          hotels.map((hotel: Hotel, index: number) => {
            const isLastIndex = index === hotels.length - 1;
            return (
              <div key={hotel.hotel_name + index}>
                <MainHotelCard hotel={hotel} />
                {isLastIndex && (
                  <Target ref={isLastData ? null : hotels.length > 9 ? setVeiwTarget : null}>
                    {isLastData ? (
                      <LastData>
                        <hr />
                      </LastData>
                    ) : (
                      isLoading && <Spinner size="xl" />
                    )}
                  </Target>
                )}
              </div>
            );
          })
        ) : (
          <Div>검색 결과가 없습니다</Div>
        )}
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
const Target = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  div {
    margin: 1rem auto;
    padding: 1rem;
  }
`;
const LastData = styled.div`
  width: 100%;
  padding: 2rem;
  text-align: center;
`;

const Div = styled.div`
  margin-top: 32px;
`;
