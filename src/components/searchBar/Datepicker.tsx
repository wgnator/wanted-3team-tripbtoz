import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Container, ModalBackground, Printer, Selecter } from './OptionSelector';
import {
  getDayGap,
  getMonthDate,
  getToday,
  isAlonePoint,
  isBetweenPoint,
  isEndPoint,
  isPastDate,
  isSameDate,
  isStartOrEndPoint,
  isStartPoint,
} from './services/datepickerService';

interface DatepickerProps {}
interface CheckInAndOut {
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

export default function Datepicker({}: DatepickerProps) {
  const today = getToday();
  const [selectedDate, setSelectedDate] = useState(today);
  const [checkInAndOut, setCheckInAndOut] = useState<CheckInAndOut>(() => {
    const checkIn = new Date(today);
    checkIn.setDate(checkIn.getDate() + 7);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 1);
    return { checkIn, checkOut };
  });
  const [monthDate, setMonthDate] = useState(getMonthDate(today));
  const [isOpen, setIsOpen] = useState(false);

  const openDatepicker = () => {
    setIsOpen((state) => !state);
  };
  const closeDatepicker = () => {
    setIsOpen(false);
  };

  const giveColor = (day: number) => {
    const SATURDAY = 6;
    const SUNDAY = 0;
    const SATURDAY_COLOR = '#4343ff';
    const SUNDAY_COLOR = '#ff4141';
    if (day === SATURDAY) return SATURDAY_COLOR;
    if (day === SUNDAY) return SUNDAY_COLOR;
  };

  const selectDate = (date: Date) => {
    setCheckInAndOut((prevState) => {
      if (prevState.checkIn && prevState.checkOut) {
        return { checkIn: date, checkOut: null };
      } else if (prevState.checkIn && !prevState.checkOut) {
        if (prevState.checkIn.getTime() > date.getTime()) {
          return { checkIn: date, checkOut: null };
        }
        if (prevState.checkIn.getTime() === date.getTime()) {
          return prevState;
        }
        return { ...prevState, checkOut: date };
      }
      return prevState;
    });
  };

  const checkSelected = (date: Date) => {
    const inputValue = date.getTime();
    const checkIn = checkInAndOut.checkIn.getTime();
    const checkOut = checkInAndOut.checkOut?.getTime();
    if (isAlonePoint({ inputValue, checkIn, checkOut })) return 'alonePoint';
    if (isStartPoint({ inputValue, checkIn })) return 'startPoint';
    if (isEndPoint({ inputValue, checkOut })) return 'endPotint';
    if (isBetweenPoint({ inputValue, checkIn, checkOut })) return 'betweenPoint';
  };

  const changeMonth = (todo: 'prev' | 'next') => {
    setSelectedDate((prevState) => {
      const prevDate = new Date(prevState);
      if (todo === 'prev') {
        prevDate.setMonth(prevDate.getMonth() - 1);
      } else {
        prevDate.setMonth(prevDate.getMonth() + 1);
      }
      return prevDate;
    });
  };

  useEffect(() => {
    setMonthDate(getMonthDate(selectedDate));
  }, [selectedDate]);

  return (
    <Container>
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
          <DatepickerWrapper>
            <Navigation>
              <ButtonPrev type="button" onClick={() => changeMonth('prev')} />
              <span>
                {selectedDate.toLocaleDateString()}
                <TodayButton onClick={() => setSelectedDate(today)}>오늘날짜로</TodayButton>
              </span>
              <ButtonNext type="button" onClick={() => changeMonth('next')} />
            </Navigation>
            <Calendar>
              <Days>
                {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
                  <Day key={idx} color={giveColor(idx) || theme.fontLightColor}>
                    {day}
                  </Day>
                ))}
              </Days>
              <Dates>
                {monthDate.map((date, idx) => (
                  <NumberDay
                    key={idx}
                    onClick={() => selectDate(date)}
                    color={giveColor(date.getDay())}
                    isBlur={date.getMonth() !== selectedDate.getMonth()}
                    hasPointer
                    isSelect={checkSelected(date)}
                    isToday={isSameDate(today, date)}
                    isPastDate={isPastDate(today, date)}
                  >
                    <span>{date.getDate()}</span>
                  </NumberDay>
                ))}
              </Dates>
            </Calendar>
          </DatepickerWrapper>
          <ModalBackground onClick={closeDatepicker} />
        </>
      )}
    </Container>
  );
}

const DatepickerPrinter = styled(Printer)`
  min-width: 400px;
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

const DatepickerWrapper = styled(Selecter)`
  width: 480px;
`;
const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    position: relative;
    cursor: default;
  }
`;
const Calendar = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  :hover {
    background-color: ${theme.onHoverBackgroundColor};
  }
`;
const ButtonNext = styled(Button)`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0)
    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMjIyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS43NDggMTIuNTk0bC01LjI4IDUuMTZhLjg3NC44NzQgMCAwMS0xLjIxNiAwIC44MjcuODI3IDAgMDEwLTEuMTg5TDEzLjkyNCAxMiA5LjI1MiA3LjQzNWEuODI3LjgyNyAwIDAxMC0xLjE4OS44NzQuODc0IDAgMDExLjIxNiAwbDUuMjggNS4xNmEuODI3LjgyNyAwIDAxMCAxLjE4OHoiLz48L3N2Zz4=')
    no-repeat scroll 0% 0%;
`;

const ButtonPrev = styled(ButtonNext)`
  transform: rotate(180deg);
`;
const TodayButton = styled(Button)`
  position: absolute;
  left: 5.5rem;
  padding: 0.2rem 1rem;
  border-radius: 4px;
`;
const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 1rem;
  margin-bottom: 0.4rem; ;
`;
const Dates = styled(Days)``;

const Day = styled.div<DayProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => props.color && `color:${props.color}`};
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    font-size: 1.2rem;
    aspect-ratio: 1;
  }
`;

const NumberDay = styled(Day)<DayProps>`
  ${(props) => props.isBlur && 'opacity:0.2'};
  ${(props) => (props.hasPointer ? 'cursor: pointer' : 'pointer-events: none')};
  ${(props) => props.isSelect === 'betweenPoint' && `background:${theme.secondaryColor}`};
  ${(props) =>
    props.isSelect === 'startPoint' &&
    `background: linear-gradient(to right, white,white, ${theme.secondaryColor}, ${theme.secondaryColor})`};
  ${(props) =>
    props.isSelect === 'endPotint' &&
    `background: linear-gradient(to left, white,white, ${theme.secondaryColor}, ${theme.secondaryColor})`};
  ${(props) => props.isPastDate && 'pointer-events: none; background-color:rgba(0,0,0,0.3); opacity:0.2;'};
  :after {
    ${(props) =>
      props.isToday &&
      `content: ' ';
      border: 2px solid ${isStartOrEndPoint(props.isSelect) ? 'white' : theme.primaryColor};
      border-radius: 100%;
      position: absolute;
      bottom: 0.2rem;`};
  }
  span {
    ${(props) =>
      isStartOrEndPoint(props.isSelect) && `color:white; background: ${theme.primaryColor}; border-radius:100%`};
  }
`;
