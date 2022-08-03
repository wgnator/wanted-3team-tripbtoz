import React from "react";
import styled from "styled-components";
import { Hotel } from "../interfaces/types";
interface props {
  hotel:Hotel,
}
export default function MainHotelCard({hotel}:props) {
  // const [loaded, setLoaded] = React.useState(true);
  const {hotel_name,occupancy} = hotel;
  const score = ["1","1","1","1","0.5"]
  const random = Number(Math.random().toFixed(1)) * 10;
  // React.useEffect(()=>{
  //   setTimeout(()=>{
  //     setLoaded(false)
  //   },300)
  // },[])
  // if(loaded){
  //   return <div></div>
  // }
  return (
    <Container >
      <ImgWrap>
        <img src={`src/images/hotel0.png`} />
      </ImgWrap>
      <ContentWrap>
        <HotelRating>5.0성급</HotelRating>
        <HotelName>{hotel_name}</HotelName>
        <HotelAddress>주소지 불명</HotelAddress>
        <HotelValue>
          {/* <img src="src/images/tripadvisor.png"/> */}
          {/* <span /> */}
          <i></i>
          <ValueScore>
            {score.map((score:string,index:number)=>{
              return <div key={"score"+index}></div>
            })}
          </ValueScore>
          <ValueReview>총 111건의 리뷰</ValueReview>
{/* {Math.floor(123 * Number(Math.random().toFixed(1)) * 10)} */}
        </HotelValue>
        <HotelPrice>
          <p>{Math.floor(123456 * Number(Math.random().toFixed(1)) * 10).toLocaleString('ko-KR')} 원</p>
        </HotelPrice>
        <HotelNotPrice>세금 및 수수료 불포함</HotelNotPrice>
      </ContentWrap>
    </Container>
  );
  
}

const Container = styled.li`
  position: relative;
  transition: all 0.3s ease;
  margin: 1rem auto;
  cursor: pointer;
  @media print, screen and (min-width: 1024px){
    border-radius: 4px;
    box-shadow: rgb(94 94 94 / 20%) 0px 1px 5px 0px;
    :hover{
    box-shadow: rgb(94 94 94 / 80%) 0px 1px 5px 0px;
    }
}
`;
const ImgWrap = styled.div`
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 25%;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
  }
`;
const ContentWrap = styled.div`
  display: inline-block;
  margin-left: 25%;
  width: 75%;
  height: 100%;
  padding: 1rem 0.8rem;
  line-height: 18px;
`;
const HotelName = styled.h2`
  @media print, screen and (min-width: 768px){
    margin: 7px 0;
    font-size: 16px;
    line-height: 24px;
  }
  
`;
const HotelRating = styled.em`
  @media print, screen and (min-width: 768px){
    margin-bottom: 7px;
    padding: 0px 4.5px;
  }
  font-size: 12px;
  font-style: normal;
  border: 1px solid black;
`;
const HotelAddress = styled.em`
  font-style: normal;
  font-size: 12px;
  color: rgb(104, 104, 136);
`;
const HotelValue = styled.div`
  display: flex;
  margin-top: 0.7rem;
  i{
    @media print, screen and (min-width: 768px){
      min-width: 24px;
      min-height: 24px;
    }
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IlBhcnRuZXIgLyBpY190cmlwYWR2aXNlciI+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMiA2Ljk4NjI5TDIwLjM2NDggOC43ODcxMkMyMS40MDQ2IDkuNzQ0ODEgMjEuOTk2NSAxMS4xMDI1IDIxLjk5NDggMTIuNTI1NUMyMS45OTQ4IDE1LjMxOTIgMTkuNzU1NiAxNy41ODM5IDE2Ljk5NTkgMTcuNTgzOUMxNS43MzY3IDE3LjU4NTcgMTQuNTIzNyAxNy4xMDQzIDEzLjYwMTEgMTYuMjM2OEwxMi4wMDAxIDE4TDEwLjM5ODEgMTYuMjM1NkM5LjA4NDEyIDE3LjQ2MTMgNy4yMjM2OCAxNy44ODM1IDUuNTE4NiAxNy4zNDI5QzMuODEzNTIgMTYuODAyNCAyLjUyMzMgMTUuMzgxNCAyLjEzNDY4IDEzLjYxNkMxLjc0NjA1IDExLjg1MDUgMi4zMTgxNyAxMC4wMDk0IDMuNjM1MiA4Ljc4NzEyTDIgNi45ODYyOUg1LjYzNDE5QzkuNDc4MzMgNC4zMzc5IDE0LjUzMTIgNC4zMzc5IDE4LjM3NTMgNi45ODYyOUgyMlpNMy42MjA1MSAxMi41MjU1QzMuNjIwNTEgMTQuNDE2MSA1LjEzNDQ5IDE1Ljk0ODcgNy4wMDIwOSAxNS45NDg3QzcuODk4OTQgMTUuOTQ4NyA4Ljc1OTA2IDE1LjU4ODEgOS4zOTMyMyAxNC45NDYxQzEwLjAyNzQgMTQuMzA0MSAxMC4zODM3IDEzLjQzMzQgMTAuMzgzNyAxMi41MjU1QzEwLjM4MzcgMTAuNjM0OSA4Ljg2OTY4IDkuMTAyMzIgNy4wMDIwOSA5LjEwMjMyQzUuMTM0NDkgOS4xMDIzMiAzLjYyMDUxIDEwLjYzNDkgMy42MjA1MSAxMi41MjU1Wk0xMi4wMDAxIDEyLjQyN0MxMi4wMDAxIDEwLjE3NDIgMTAuMzgxNCA4LjI0MTI3IDguMjQ2NzEgNy40MTQ2M0MxMC42NDg3IDYuNDAxNjggMTMuMzUwOCA2LjQwMTY4IDE1Ljc1MjcgNy40MTQ2M0MxMy42MTgzIDguMjQxNTYgMTIuMDAwMSAxMC4xNzQ1IDEyLjAwMDEgMTIuNDI3Wk0xNi45OTU5IDkuMTAyMzJDMTUuMTI4MyA5LjEwMjMyIDEzLjYxNDMgMTAuNjM0OSAxMy42MTQzIDEyLjUyNTVDMTMuNjE0MyAxNC40MTYxIDE1LjEyODMgMTUuOTQ4NyAxNi45OTU5IDE1Ljk0ODdDMTguODYzNSAxNS45NDg3IDIwLjM3NzUgMTQuNDE2MSAyMC4zNzc1IDEyLjUyNTVDMjAuMzc3NSAxMC42MzQ5IDE4Ljg2MzUgOS4xMDIzMiAxNi45OTU5IDkuMTAyMzJaTTE2Ljk5NTkgMTAuNzMxMUMxNi4yNzg4IDEwLjczMTEgMTUuNjMyMyAxMS4xNjg0IDE1LjM1NzkgMTEuODM5MUMxNS4wODM1IDEyLjUwOTcgMTUuMjM1MyAxMy4yODE3IDE1Ljc0MjQgMTMuNzk1QzE2LjI0OTUgMTQuMzA4MiAxNy4wMTIxIDE0LjQ2MTcgMTcuNjc0NSAxNC4xODM4QzE4LjMzNyAxMy45MDU5IDE4Ljc2ODkgMTMuMjUxNCAxOC43Njg4IDEyLjUyNTVDMTguNzY4OCAxMi4wNDk2IDE4LjU4MiAxMS41OTMxIDE4LjI0OTUgMTEuMjU2NkMxNy45MTcgMTAuOTIgMTcuNDY2MSAxMC43MzEgMTYuOTk1OSAxMC43MzExWk03LjY4MDc0IDE0LjE4MzhDOC4zNDMyMSAxMy45MDU5IDguNzc1MDkgMTMuMjUxNCA4Ljc3NDk3IDEyLjUyNTVDOC43NzQ4MSAxMS41MzQ0IDcuOTgxMTEgMTAuNzMxMSA3LjAwMjA5IDEwLjczMTFDNi4yODUgMTAuNzMxMSA1LjYzODUyIDExLjE2ODQgNS4zNjQxMyAxMS44MzkxQzUuMDg5NzQgMTIuNTA5NyA1LjI0MTQ3IDEzLjI4MTcgNS43NDg1NyAxMy43OTVDNi4yNTU2NyAxNC4zMDgyIDcuMDE4MjcgMTQuNDYxNyA3LjY4MDc0IDE0LjE4MzhaIiBmaWxsPSIjMjIyMjIyIi8+CjwvZz4KPC9zdmc+Cg==");
  }
`;
const ValueScore = styled.div`
  position: relative;
  display: flex;
  margin: 0 0.2rem;
  justify-content: center;
  align-items : center;
  div{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 1px;
    background: rgb(0, 170, 108);
    border: 1px solid rgb(0, 170, 108);
    border-radius: 50%;
  }
`;
const ValueReview = styled.div`
  justify-content : center;
  align-items : center;
  @media print, screen and (min-width: 768px){
    display: inline-block;
    font-size: 10px;
    line-height: 16px;
    :before {
      content: ""; display: inline-block;
      width: 1px; height: 100%;
      margin-right: 0; vertical-align: middle;
    } 

  }
`;
const HotelPrice = styled.div`
  @media print, screen and (min-width: 768px){
    margin-top: 35px;
    line-height: 16px;

  }
  p{
    @media print, screen and (min-width: 768px){
      width: 100%;
      text-align: right;
    }
  }
`;
const HotelNotPrice = styled.div`
  text-align: right;
  width: 100%;
  font-size: 10px;
  line-height: 14px;
  color: rgb(205, 205, 205);
`;