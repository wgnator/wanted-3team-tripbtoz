import styled from 'styled-components';
import { theme } from '../styles/theme';
import { getLocalStorage } from '../utils/storage';
import { UserDataType } from '../interfaces/types';
import ReservationHotel from '../components/ReservationStatusPage/ReservationHotel';

export default function ReservationStatusPage() {
  const ReservationHotels = getLocalStorage('userHotels', []);

  if (!ReservationHotels.length) {
    return (
      <Container>
        <Content>아직 준비된 예약이 없어요. 함께 새로운 스테이를 찾아봐요.</Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        {ReservationHotels?.map((reservationHotel: UserDataType, i: number) => {
          return <ReservationHotel key={i} reservationData={reservationHotel} />;
        })}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  padding: 1.5rem 0;
  background-color: ${theme.onHoverBackgroundColor};
`;

const Content = styled.div`
  width: 696px;
  min-height: 482px;
  margin: 0 auto;
  padding: 1rem;
  background-color: white;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
