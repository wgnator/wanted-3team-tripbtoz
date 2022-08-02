import axios from "axios";
import React from "react";
import styled from "styled-components";
import MainHotelCard from "../components/MainHotelCard";
import { Hotel,Hotels } from "../interfaces/types";

export default function MainPage() {
  const [hotelData,setHotelData] = React.useState<Hotels | []>([]);
  const [pageNum,setPageNum] = React.useState(1);
  const scrollRef = React.useRef();

  React.useEffect(()=>{
  window.addEventListener("scroll", infiniteScroll);
  return () => {window.removeEventListener('scroll', infiniteScroll)}
  })

  
  React.useEffect(()=>{
    console.log("페이지",pageNum);
    axios.get(`http://localhost:8000/hotels?_page=${pageNum}&_limit=10`).then((response)=>{
      pageNum === 1 ? setHotelData(response.data) : setHotelData([...hotelData,...response.data])
    })
  },[pageNum])

  function infiniteScroll () {
    const { scrollHeight,scrollTop,clientHeight  } = document.documentElement;
    let timer;
    console.log(Math.ceil(scrollTop + clientHeight), scrollHeight);
    clearTimeout(timer)
    timer = setTimeout(()=>{
    if(Math.ceil(scrollTop + clientHeight) >= scrollHeight && Math.ceil(scrollTop + clientHeight) > innerWidth){
      console.log("값 맞음",scrollHeight,Math.ceil(scrollTop + clientHeight));
      setPageNum(prev => prev + 1)

    }
    },300)
    
  }

  return (
    <Container>
      <HotelCards>
        {hotelData?.map((hotel:Hotel)=> <MainHotelCard key={hotel.hotel_name} hotel={hotel} /> )}
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

