import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import DatePicker from './Datepicker';
import { Container, ModalBackground, Printer } from './OptionSelector';
import { getDayGap, getToday } from './services/datepickerService';

interface DateSelectionProps {}
export interface CheckInAndOut {
  checkIn: Date;
  checkOut: Date | null;
}

export type DaySelectTypes = 'startPoint' | 'endPotint' | 'betweenPoint' | 'alonePoint';
interface DayProps {
  isBlur?: boolean;
  color?: string;
  hasPointer?: boolean;
  isSelect?: DaySelectTypes;
  isToday?: boolean;
  isPastDate?: boolean;
}

export default function DateSelection({}: DateSelectionProps) {
  const today = getToday();

  const [checkInAndOut, setCheckInAndOut] = useState<CheckInAndOut>(() => {
    const checkIn = new Date(today);
    checkIn.setDate(checkIn.getDate() + 7);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 1);
    return { checkIn, checkOut };
  });

  const [isOpen, setIsOpen] = useState(false);

  const openDatepicker = () => {
    setIsOpen((state) => !state);
  };
  const closeDatepicker = () => {
    setIsOpen(false);
  };

  return (
    <Container style={{ position: 'inherit' }}>
      <DatepickerPrinter onClick={openDatepicker}>
        <Icon />
        <CheckIn>
          <span>체크인</span>
          <span>{checkInAndOut.checkIn.toLocaleDateString()}</span>
        </CheckIn>
        <CheckOut>
          <span>체크아웃</span>
          <span>{checkInAndOut.checkOut?.toLocaleDateString() || ''}</span>
        </CheckOut>
        <Sum>
          {getDayGap(checkInAndOut.checkIn, checkInAndOut.checkOut)}박
          {getDayGap(checkInAndOut.checkIn, checkInAndOut.checkOut) + 1}일
        </Sum>
      </DatepickerPrinter>
      {isOpen && (
        <>
          <DatePicker initialDates={checkInAndOut} setCheckInAndOut={setCheckInAndOut} />
          <ModalBackground onClick={closeDatepicker} />
        </>
      )}
    </Container>
  );
}

const DatepickerPrinter = styled(Printer)`
  min-width: 375px;
  max-width: 480px;
  gap: 0;
`;
const Icon = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 1rem;
  background: rgba(0, 0, 0, 0)
    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTcuNSA1djIuNjU2SDV2MTUuOTM4aDIwVjcuNjU2aC0yLjVWNWg1djIxLjI1aC0yNVY1aDV6bTEwIDIuNjU2aC01VjVoNXYyLjY1NnoiLz48cGF0aCBmaWxsPSIjMjIyIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik05Ljg4NyAxNi4zMThjLjQ0MyAwIC43NzMuMzYzLjc5Mi43OTQuMDE4LjQyOC0uMzc4Ljc5My0uNzkyLjc5M0g3LjcyMmMtLjQ0NCAwLS43NzQtLjM2NS0uNzkyLS43OTMtLjAxOS0uNDI5LjM3Ny0uNzk0Ljc5Mi0uNzk0aDIuMTY1em02LjI1IDBjLjQ0MyAwIC43NzMuMzYzLjc5Mi43OTQuMDE4LjQyOC0uMzc4Ljc5My0uNzkyLjc5M2gtMi4xNjVjLS40NDQgMC0uNzc0LS4zNjUtLjc5Mi0uNzkzLS4wMTktLjQyOS4zNzctLjc5NC43OTItLjc5NGgyLjE2NXptLTYuMjUtNS4wNjhjLjQ0MyAwIC43NzMuMzYyLjc5Mi43OTMuMDE4LjQyOC0uMzc4Ljc5My0uNzkyLjc5M0g3LjcyMmMtLjQ0NCAwLS43NzQtLjM2NS0uNzkyLS43OTMtLjAxOS0uNDI4LjM3Ny0uNzkzLjc5Mi0uNzkzaDIuMTY1em02LjI1IDBjLjQ0MyAwIC43NzMuMzYyLjc5Mi43OTMuMDE4LjQyOC0uMzc4Ljc5My0uNzkyLjc5M2gtMi4xNjVjLS40NDQgMC0uNzc0LS4zNjUtLjc5Mi0uNzkzLS4wMTktLjQyOC4zNzctLjc5My43OTItLjc5M2gyLjE2NXptNi4yNSAwYy40NDMgMCAuNzczLjM2Mi43OTIuNzkzLjAxOC40MjgtLjM3OC43OTMtLjc5Mi43OTNoLTIuMTY1Yy0uNDQ0IDAtLjc3NC0uMzY1LS43OTItLjc5My0uMDE5LS40MjguMzc3LS43OTMuNzkyLS43OTNoMi4xNjV6Ii8+PHJlY3Qgd2lkdGg9IjIuNSIgaGVpZ2h0PSI2LjI1IiB4PSI4Ljc1IiB5PSIyLjUiIGZpbGw9IiMwMDAiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjIuNSIgaGVpZ2h0PSI2LjI1IiB4PSIxOC43NSIgeT0iMi41IiBmaWxsPSIjMDAwIiByeD0iMSIvPjwvZz48L3N2Zz4=')
    no-repeat scroll center center / contain;
`;
const CheckIn = styled.div`
  width: calc(38% - (2.2rem / 3));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.8rem 0;
  height: 100%;
  span:first-child {
    color: ${theme.fontLightColor};
    font-size: 0.8rem;
    font-weight: 300;
  }
  span:last-child {
    color: ${theme.fontDarkColor};
    font-size: 1rem;
    font-weight: 600;
  }
`;
const CheckOut = styled(CheckIn)``;
const Sum = styled.span`
  width: calc(24% - (2.2rem / 3));
  color: ${theme.fontDarkColor};
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
`;
