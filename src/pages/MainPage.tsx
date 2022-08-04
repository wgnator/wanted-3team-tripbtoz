import React from "react";
import styled from "styled-components";
import MainHotelCard from "../components/MainHotelCard";
import useHotels from "../hooks/useHotels";

 export default function MainPage() {
  const [viewTarget,setVeiwTarget] = React.useState<Element | null>(null);
  const pageRef = React.useRef(0);
  const {hotels,getAllByPage} = useHotels();  

  const fetchData = () => {
    pageRef.current = pageRef.current + 1;
    getAllByPage(pageRef.current)
  }

  React.useEffect(()=>{
    fetchData()
  },[])
  
  const observerCallback = (entries:any) => {
    const [entry] = entries
    if(entry.isIntersecting) fetchData()
  }
  const options = {
    root:null,
    rootMargin:"0px",
    threshold: 0,
  };

  React.useEffect(()=>{
    const observer = new IntersectionObserver(observerCallback, options);

    if (viewTarget) observer.observe(viewTarget)
    
    return () => { if (viewTarget) observer.unobserve(viewTarget) }

  },[viewTarget])
  // React.useEffect(()=>{
  //   console.log(hotels);
  // },[hotels])
  return (
    <Container id="컨테이너">
      <HotelCards >
        {hotels.map((hotel,index)=>{
          const lastIndex = index === hotels.length-1;
          return (<MainHotelCard key={"hotel"+index} hotel={hotel} targetRef={lastIndex ? setVeiwTarget : null} />)
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
`;
