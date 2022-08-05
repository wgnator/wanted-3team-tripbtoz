import React from "react";
import { Spinner } from "@chakra-ui/spinner"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Hotel } from "../interfaces/types";
interface props {
  hotel:Hotel,
}
export default function MainHotelCard({hotel}:props) {
  const navigate = useNavigate();
  const {hotel_name,occupancy} = hotel;
  const hotel1 = hotel_name.split(" ")[0].length;
  const score = ["1","1","1","1","0.5"]
  const hotelClick = () => {
    navigate(`details/${hotel_name}`)
  }
  return (
    <Container  onClick={hotelClick}>
      <ImgWrap>
        <img src={`src/images/hotel${hotel1 < 11 ? hotel1 : 10}.png`} />
      </ImgWrap>
      <ContentWrap>
        <HotelRating>5.0성급</HotelRating>
        <HotelName size={hotel_name.length < 12 ? true : false} >{hotel_name}</HotelName>
        <HotelAddress>대한민국 , 서울</HotelAddress>
        <HotelValue>
          <i></i>
          <ValueScore>
            {score.map((score:string,index:number)=>{
              return <div key={"score"+index}></div>
            })}
          </ValueScore>
          <ValueReview>총 {hotel1 * 123}건의 리뷰</ValueReview>
        </HotelValue>
        <HotelPrice>
          <p>100,000 원</p>
        </HotelPrice>
        <HotelNotPrice>세금 및 수수료 불포함</HotelNotPrice>
      </ContentWrap>
    </Container>
  );
  
}

const Container = styled.li`
  position: relative;
  cursor: pointer;

  @media (max-width:2560px) {
    width: 100%;
    border-radius: 4px;
    transition: all 0.3s ease;
    margin: 1rem auto;
    box-shadow: rgb(94 94 94 / 20%) 0px 1px 5px 0px;
  };

  @media (max-width: 768px) {
    border-radius: 0;
    width: 99%;
    margin: 0.2rem auto;
  };

  :hover{
    box-shadow: rgb(94 94 94 / 80%) 0px 1px 5px 0px;
  }
`;
const ImgWrap = styled.div`
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 25%;
  height: 100%;
  @media (max-width:2560px) {};
  @media (max-width: 768px) {
    width: 40%;
  }
  img{
    @media (min-width: 768px) {
      border-radius: 4px 0 0 4px;
    }
    width: 100%;
    height: 100%;
  }
`;
const ContentWrap = styled.div`
  display: inline-block;
  @media (max-width:2560px) {
    margin-left: 25%;
    width: 75%;
    height: 13.5rem;
    padding: 1rem 0.8rem;
   line-height: 18px;
  };
  @media (max-width: 768px) {
    margin-left: 40%;
    width: 60%;
    height: 10rem;
    padding: 0.5rem 0.3rem;
    line-height: 18px;
  }
`;
const HotelRating = styled.em`
  border: 1px solid black;
  @media (max-width:2560px) {
    font-size: 12px;
    font-style: normal;
    padding: 0px 4.5px;
  };
  @media (max-width: 768px) {
    font-size: 10px;
    font-style: normal;
    padding: 0px 3.5px;
  }
`;
const HotelName = styled.h2<{size:boolean}>`
  @media (max-width:2560px) {
    margin: 7px 0;
    font-size: 16px;
    line-height: 24px;
  };
  @media (max-width: 768px) {
    margin: 7px 0;
    font-size: ${props => props.size ? "14px" : "12px"};
    line-height: 12px;
  }
`;

const HotelAddress = styled.em`
  font-style: normal;
  color: rgb(104, 104, 136);
  @media (max-width:2560px) {
    font-size: 12px;
  };
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
const HotelValue = styled.div`
  display: flex;
  align-items: center;
  @media (max-width:2560px) {
    margin-top: 0.7rem;
  };
  @media (max-width: 768px) {
    margin-top: 0.2rem;
  }
  i{
    @media (max-width:2560px) {
      min-width: 24px;
      min-height: 24px;
    };
    @media (max-width: 768px) {
      min-width: 24px;
      max-height: 12px;
    }
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IlBhcnRuZXIgLyBpY190cmlwYWR2aXNlciI+CjxwYXRoIGlkPSJTaGFwZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMiA2Ljk4NjI5TDIwLjM2NDggOC43ODcxMkMyMS40MDQ2IDkuNzQ0ODEgMjEuOTk2NSAxMS4xMDI1IDIxLjk5NDggMTIuNTI1NUMyMS45OTQ4IDE1LjMxOTIgMTkuNzU1NiAxNy41ODM5IDE2Ljk5NTkgMTcuNTgzOUMxNS43MzY3IDE3LjU4NTcgMTQuNTIzNyAxNy4xMDQzIDEzLjYwMTEgMTYuMjM2OEwxMi4wMDAxIDE4TDEwLjM5ODEgMTYuMjM1NkM5LjA4NDEyIDE3LjQ2MTMgNy4yMjM2OCAxNy44ODM1IDUuNTE4NiAxNy4zNDI5QzMuODEzNTIgMTYuODAyNCAyLjUyMzMgMTUuMzgxNCAyLjEzNDY4IDEzLjYxNkMxLjc0NjA1IDExLjg1MDUgMi4zMTgxNyAxMC4wMDk0IDMuNjM1MiA4Ljc4NzEyTDIgNi45ODYyOUg1LjYzNDE5QzkuNDc4MzMgNC4zMzc5IDE0LjUzMTIgNC4zMzc5IDE4LjM3NTMgNi45ODYyOUgyMlpNMy42MjA1MSAxMi41MjU1QzMuNjIwNTEgMTQuNDE2MSA1LjEzNDQ5IDE1Ljk0ODcgNy4wMDIwOSAxNS45NDg3QzcuODk4OTQgMTUuOTQ4NyA4Ljc1OTA2IDE1LjU4ODEgOS4zOTMyMyAxNC45NDYxQzEwLjAyNzQgMTQuMzA0MSAxMC4zODM3IDEzLjQzMzQgMTAuMzgzNyAxMi41MjU1QzEwLjM4MzcgMTAuNjM0OSA4Ljg2OTY4IDkuMTAyMzIgNy4wMDIwOSA5LjEwMjMyQzUuMTM0NDkgOS4xMDIzMiAzLjYyMDUxIDEwLjYzNDkgMy42MjA1MSAxMi41MjU1Wk0xMi4wMDAxIDEyLjQyN0MxMi4wMDAxIDEwLjE3NDIgMTAuMzgxNCA4LjI0MTI3IDguMjQ2NzEgNy40MTQ2M0MxMC42NDg3IDYuNDAxNjggMTMuMzUwOCA2LjQwMTY4IDE1Ljc1MjcgNy40MTQ2M0MxMy42MTgzIDguMjQxNTYgMTIuMDAwMSAxMC4xNzQ1IDEyLjAwMDEgMTIuNDI3Wk0xNi45OTU5IDkuMTAyMzJDMTUuMTI4MyA5LjEwMjMyIDEzLjYxNDMgMTAuNjM0OSAxMy42MTQzIDEyLjUyNTVDMTMuNjE0MyAxNC40MTYxIDE1LjEyODMgMTUuOTQ4NyAxNi45OTU5IDE1Ljk0ODdDMTguODYzNSAxNS45NDg3IDIwLjM3NzUgMTQuNDE2MSAyMC4zNzc1IDEyLjUyNTVDMjAuMzc3NSAxMC42MzQ5IDE4Ljg2MzUgOS4xMDIzMiAxNi45OTU5IDkuMTAyMzJaTTE2Ljk5NTkgMTAuNzMxMUMxNi4yNzg4IDEwLjczMTEgMTUuNjMyMyAxMS4xNjg0IDE1LjM1NzkgMTEuODM5MUMxNS4wODM1IDEyLjUwOTcgMTUuMjM1MyAxMy4yODE3IDE1Ljc0MjQgMTMuNzk1QzE2LjI0OTUgMTQuMzA4MiAxNy4wMTIxIDE0LjQ2MTcgMTcuNjc0NSAxNC4xODM4QzE4LjMzNyAxMy45MDU5IDE4Ljc2ODkgMTMuMjUxNCAxOC43Njg4IDEyLjUyNTVDMTguNzY4OCAxMi4wNDk2IDE4LjU4MiAxMS41OTMxIDE4LjI0OTUgMTEuMjU2NkMxNy45MTcgMTAuOTIgMTcuNDY2MSAxMC43MzEgMTYuOTk1OSAxMC43MzExWk03LjY4MDc0IDE0LjE4MzhDOC4zNDMyMSAxMy45MDU5IDguNzc1MDkgMTMuMjUxNCA4Ljc3NDk3IDEyLjUyNTVDOC43NzQ4MSAxMS41MzQ0IDcuOTgxMTEgMTAuNzMxMSA3LjAwMjA5IDEwLjczMTFDNi4yODUgMTAuNzMxMSA1LjYzODUyIDExLjE2ODQgNS4zNjQxMyAxMS44MzkxQzUuMDg5NzQgMTIuNTA5NyA1LjI0MTQ3IDEzLjI4MTcgNS43NDg1NyAxMy43OTVDNi4yNTU2NyAxNC4zMDgyIDcuMDE4MjcgMTQuNDYxNyA3LjY4MDc0IDE0LjE4MzhaIiBmaWxsPSIjMjIyMjIyIi8+CjwvZz4KPC9zdmc+Cg==");
    background-repeat: no-repeat
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

    margin: 1px;
    background: rgb(0, 170, 108);
    border: 1px solid rgb(0, 170, 108);
    border-radius: 50%;
    @media (max-width:2560px) {
      width: 12px;
      height: 12px;
    };
    @media (max-width: 768px) {
      width: 10px;
      height: 10px;
    }
  }
`;
const ValueReview = styled.div`
  display: inline-block;
  font-size: 10px;
  :before {
    content: ""; display: inline-block;
    width: 1px; height: 100%;
    margin-right: 0; vertical-align: middle;
  } 
`;
const HotelPrice = styled.div`
  p{
    width: 100%;
    text-align: right;
    font-weight: bold;
    @media (max-width:2560px) {
      margin-top: 2.2rem;
      font-size: 16px;
      line-height: 16px;
    };
    @media (max-width: 768px) {
      margin-top: 0.9rem;
      font-size: 14px;
      line-height: 16px;
    }
  }
`;
const HotelNotPrice = styled.div`
  text-align: right;
  color: rgb(205, 205, 205);
  font-size: 10px;
`;
