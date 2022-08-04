import React from "react";
import styled from "styled-components";

export default function CardSkeleton() {

  return (
    <Container>
      <ImgWrap/>
      <ContentWrap>
        <HotelRating/>
        <HotelName/>
        <HotelAddress/>
        <HotelValue/>
        <HotelPrice><p/></HotelPrice>
        <HotelNotPrice><p/></HotelNotPrice>
      </ContentWrap>
    </Container>
  );
  
}

const Container = styled.li`
  position: relative;
  width: 100%;
  height: 13rem;
  margin: 1rem auto;
  color: white;
  @media print, screen and (min-width: 1024px){
    border-radius: 4px;
    box-shadow: rgb(94 94 94 / 20%) 0px 1px 5px 0px;
  }
`;
const ImgWrap = styled.div`
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 25%;
  height: 100%;
  background: linear-gradient(
    -250deg,
    #ddd3d3fb,
    #a59e9efa
    /* white,
    black */
  );
  background-size: 800% 400%;
  animation: backgroundChange0 5s ease infinite;
  @keyframes backgroundChange0 {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
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
const HotelRating = styled.div`
  @media print, screen and (min-width: 768px){
    margin-bottom: 7px;
    padding: 0px 4.5px;
  }
  width: 10%;
  height: 1.3rem;
  background: linear-gradient(
    -250deg,
    #ddd3d3fb,
    #a59e9efa
  );
  background-size: 800% 400%;
  animation: backgroundChange0 5s ease infinite;
  @keyframes backgroundChange0 {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
const HotelName = styled.h2`
  width: 40%;
  height: 1.4rem;
  @media print, screen and (min-width: 768px){
    margin: 7px 0;
  }
  background: linear-gradient(
    -250deg,
    #ddd3d3fb,
    #a59e9efa
  );
  background-size: 800% 400%;
  animation: backgroundChange0 5s ease infinite;
  @keyframes backgroundChange0 {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const HotelAddress = styled.div`
  width: 40%;
  height: 1rem;
  color: rgb(104, 104, 136);
  background: linear-gradient(
    -250deg,
    #ddd3d3fb,
    #a59e9efa
  );
  background-size: 800% 400%;
  animation: backgroundChange0 5s ease infinite;
  @keyframes backgroundChange0 {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
const HotelValue = styled.div`
  display: flex;
  width: 30%;
  height: 1.2rem;
  margin-top: 1rem;
  background: linear-gradient(
    -250deg,
    #ddd3d3fb,
    #a59e9efa
  );
  background-size: 800% 400%;
  animation: backgroundChange0 5s ease infinite;
  @keyframes backgroundChange0 {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
const HotelPrice = styled.div`
  @media print, screen and (min-width: 768px){
    margin-top: 40px;
    line-height: 16px;
  }
  p{
    @media print, screen and (min-width: 768px){
      float: right;
      width: 15%;
      height: 1.1rem;
  background: linear-gradient(
    -250deg,
    #ddd3d3fb,
    #a59e9efa
  );
  background-size: 800% 400%;
  animation: backgroundChange0 5s ease infinite;
  @keyframes backgroundChange0 {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
    }
  }
`;
const HotelNotPrice = styled.div`
  width: 100%;
  height: 1rem;
  float: right;
  margin-top: 0.1rem;
  p{
    float: right;
    width: 17%;
    height: 0.7rem;
  background: linear-gradient(
    -250deg,
    #ddd3d3fb,
    #a59e9efa
  );
  background-size: 800% 400%;
  animation: backgroundChange0 5s ease infinite;
  @keyframes backgroundChange0 {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
  }
`;
