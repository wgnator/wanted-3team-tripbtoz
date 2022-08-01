import styled from "styled-components";
import MainHotelCard from "../components/MainHotelCard";

export default function MainPage() {
  return (
    <Container>
      <MainHotelCard/>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 976px;
  height: 100vh;
  margin: 0 auto;
  border: 1px solid;
`;