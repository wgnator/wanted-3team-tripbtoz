import styled from "styled-components";

export default function MainHotelCard() {
  const score = ["1","1","1","1","0.5"]
  return (
    <Container>
      <ImgWrap>
        <img src="src/images/hotel.png" alt="호텔" />
      </ImgWrap>
      <ContentWrap>
        <HotelRating>5.0성급</HotelRating>
        <HotelName>호텔이름</HotelName>
        <HotelAddress>주소지 불명</HotelAddress>
        <HotelValue>
          <img src="src/images/tripadvisor.png"/>
          <ValueScore>
            {score.map(()=>{
              return <div></div>
            })}
          </ValueScore>
          <ValueReview>총 {Math.floor(Math.pow(Number(Math.random().toFixed(1)) * 10,Number(Math.random().toFixed(1))*6))}건의 리뷰</ValueReview>

        </HotelValue>
        <HotelPrice>
          <p>{Math.floor(123456 * Number(Math.random().toFixed(1)) * 10)} 원</p>
        </HotelPrice>
        <HotelNotPrice>세금 및 수수료 불포함</HotelNotPrice>
      </ContentWrap>
    </Container>
  );
}

const Container = styled.li`
  position: relative;
  transition: all 0.3s ease;
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
  img{
    @media print, screen and (min-width: 768px){
        min-width: 10px;
        min-height: 10px;
    }
  }
`;
const ValueScore = styled.div`
  display: flex;
  margin: 0 0.2rem;
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
  @media print, screen and (min-width: 768px){
    font-size: 10px;
    line-height: 14px;
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