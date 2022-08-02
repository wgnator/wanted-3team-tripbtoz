import axios from "axios";
import React from "react";
import styled from "styled-components";
import MainHotelCard from "../components/MainHotelCard";
import useHotels from "../hooks/useHotels";
import { Hotel,Hotels } from "../interfaces/types";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { hotelsService } from "../api/axiosInstance";

export default function MainPage() {
  React.useEffect(()=>{
    window.addEventListener("scroll", infiniteScroll);
    return () => {window.removeEventListener('scroll', infiniteScroll)}
  })
  function infiniteScroll () {
    const { scrollHeight,scrollTop,clientHeight  } = document.documentElement;
    let timer;
    clearTimeout(timer)
    timer = setTimeout(()=>{
    if(Math.ceil(scrollTop + clientHeight) >= scrollHeight && Math.ceil(scrollTop + clientHeight) > innerWidth){
      pageRef.current = pageRef.current + 1
      handleSubmit()
    }
    },300)
  }
  

  
  const [isLoading , setIsLoading] = React.useState(true);
  const queryClient = useQueryClient();
  const pageRef = React.useRef(1);
  const {hotels,getAllByPage} = useHotels();
  React.useEffect(()=>{
    setIsLoading(false)
    if(!isLoading) handleSubmit()
    
  },[isLoading])

  const { status:queryStatus, data:queryData, error } = useQuery("hoteldata")

  const mutation = useMutation(()=> hotelsService.get(`?_page=${pageRef.current}`),{
    onMutate: () => {
      const previousValue:Hotels|undefined = queryClient.getQueryData('hoteldata');
      return previousValue;
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData('hoteldata', (old: any) => {
        return old === undefined ? result : [...old, ...result];
      });
    },
  });

  const handleSubmit = React.useCallback(
    () => {
      mutation.mutate();
    },
    [mutation],
  )

  
  React.useEffect(()=>{
  console.log("쿼리는?",queryStatus, queryData, error);
  },[queryData])



  return (
    <Container>
      <HotelCards>

        {queryData?.map((hotel:Hotel,index)=> {
          console.log(hotel.hotel_name + index);
          if(index+1 === queryData?.length) console.log("------------끝--------------");
          
          return <MainHotelCard key={hotel.hotel_name} hotel={hotel} />
        } )}
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

`;

function fetchHotels(arg0: string, fetchHotels: any, arg2: { refetchOnWindowFocus: boolean; retry: number; onSuccess: (data: any) => void; onError: (error: any) => void; }): { isLoading: any; isError: any; data: any; error: any; } {
  throw new Error("Function not implemented.");
}

