import React from "react";
import styled from "styled-components";
import MainHotelCard from "../components/MainHotelCard";
import useHotels from "../hooks/useHotels";
import { Hotel } from "../interfaces/types";

export default function MainPage() {
  const pageRef = React.useRef(1);
  const {isLoading,hotels,getAllByPage} = useHotels();

  React.useEffect(()=>{
      getAllByPage(pageRef.current);
  },[isLoading])

  React.useEffect(()=>{
    window.addEventListener("scroll", infiniteScroll);
    return () => {window.removeEventListener('scroll', infiniteScroll)}
  })

  function infiniteScroll () {
    const { scrollHeight,scrollTop,clientHeight  } = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight && scrollTop + clientHeight > innerWidth){
      pageRef.current = pageRef.current + 1
      getAllByPage(pageRef.current);
    }else{
      return
    }
  }

  return (
    <Container>
      <HotelCards>
        {hotels?.map((hotel:Hotel,index:number)=> {
             return <MainHotelCard key={"hotel"+index} hotel={hotel} />
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
const HotelCards = styled.ul``;
