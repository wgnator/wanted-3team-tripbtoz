import styled from 'styled-components';
import { format } from 'date-fns';
import { UserDataType } from '../../interfaces/types';
import { theme } from '../../styles/theme';

interface Props {
  reservationData: UserDataType;
}
export default function ReservationHotel({ reservationData }: Props) {
  return (
    <Container>
      <HotelName>{reservationData.hotelName}</HotelName>
      <Nights>
        <div>{format(new Date(reservationData.checkInDate), 'yyyy/MM/dd')}~</div>
        <div>{format(new Date(reservationData.checkOutDate), 'yyyy/MM/dd')}</div>
      </Nights>
      <Occupancy>숙박 인원 : {reservationData.numberOfGuests}</Occupancy>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid ${theme.borderColor}; ;
`;

const HotelName = styled.div``;

const Nights = styled.div`
  display: flex;
`;

const Occupancy = styled.div``;
