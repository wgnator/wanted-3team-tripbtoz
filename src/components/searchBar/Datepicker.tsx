import {
  addDays,
  areIntervalsOverlapping,
  differenceInCalendarDays,
  endOfMonth,
  formatISO,
  getDate,
  getMonth,
  getYear,
  isSameDay,
  isSameMonth,
  nextSunday,
  previousSunday,
  startOfMonth,
} from 'date-fns';
import { addMonths, compareAsc } from 'date-fns/esm';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { CheckInAndOut } from './DateSelection';
type DateItemPropsType = {
  selectedAsStart?: boolean;
  selectedAsEnd?: boolean;
  selectedAsBetween?: boolean;
  endDateSelected?: boolean;
  startDateSelected?: boolean;
  isToday?: boolean;
};

type SelectedDatesType = {
  startDate: Date | null;
  endDate: Date | null;
};
type DatePickerProps = {
  setCheckInAndOut: Dispatch<SetStateAction<CheckInAndOut>>;
};
export default function DatePicker({ setCheckInAndOut }: DatePickerProps) {
  const today = new Date();
  const [selectedDates, setSelectedDates] = useState<SelectedDatesType>({
    startDate: addDays(today, 7),
    endDate: addDays(today, 8),
  });
  const windowRef = useRef<HTMLDivElement>(null);
  const monthsWrapperRef = useRef<HTMLDivElement>(null);

  const WINDOW_WIDTH = useRef<number>(0);
  const WHOLE_CALENDAR_WIDTH = useRef<number>(0);
  const [hasCalendarReachedEnd, setHasCalendarReachedEnd] = useState({
    left: true,
    right: false,
  });
  const handleDateSelection = (selectedDate: Date) => {
    if (selectedDates.startDate === null || (selectedDates.startDate && selectedDates.endDate))
      setSelectedDates({ startDate: selectedDate, endDate: null });
    else if (compareAsc(selectedDate, selectedDates.startDate) > 0)
      setSelectedDates({ ...selectedDates, endDate: selectedDate });
    else setSelectedDates({ startDate: selectedDate, endDate: null });
  };

  const checkCurrentCalendarPosition = () => {
    setHasCalendarReachedEnd({
      left: windowRef.current?.scrollLeft === 0,
      right: windowRef.current
        ? windowRef.current.scrollLeft >= WHOLE_CALENDAR_WIDTH.current - WINDOW_WIDTH.current
        : false,
    });
  };

  const slideCalendar = (direction: 'left' | 'right') => {
    if (direction === 'left') windowRef.current?.scrollTo(windowRef.current?.scrollLeft - WINDOW_WIDTH.current, 0);
    else if (direction === 'right')
      windowRef.current?.scrollTo(windowRef.current?.scrollLeft + WINDOW_WIDTH.current, 0);
    checkCurrentCalendarPosition();
  };

  useEffect(() => {
    if (selectedDates.startDate && selectedDates.endDate)
      setCheckInAndOut({ checkIn: selectedDates.startDate, checkOut: selectedDates.endDate });
  }, [selectedDates]);

  useEffect(() => {
    WINDOW_WIDTH.current = windowRef.current?.clientWidth || 0;
    WHOLE_CALENDAR_WIDTH.current = monthsWrapperRef.current?.clientWidth || 0;
    checkCurrentCalendarPosition();
  }, []);

  // useEffect(() => {

  // }, [hasCalendarReachedEnd]);
  return (
    <Container>
      {!hasCalendarReachedEnd.left && (
        <ArrowLeftWrapper className="wrapper">
          <IoIosArrowDropleft onClick={() => slideCalendar('left')} />
        </ArrowLeftWrapper>
      )}
      {!hasCalendarReachedEnd.right && (
        <ArrowRightWrapper className="wrapper">
          <IoIosArrowDropright onClick={() => slideCalendar('right')} />
        </ArrowRightWrapper>
      )}
      <Window ref={windowRef} className="WINDOW">
        <MonthsWrapper ref={monthsWrapperRef}>
          {new Array(12).fill(0).map((_, index) => {
            const month = addMonths(today, index);
            const startDateOfCalendar = previousSunday(startOfMonth(month));
            const endDateOfCalendar = nextSunday(endOfMonth(month));
            return (
              <MonthContainer key={index + 1}>
                <MonthText>
                  {getYear(month)}년 {getMonth(month) + 1}월
                </MonthText>
                <DaysContainer>
                  <DayItem>일</DayItem>
                  <DayItem>월</DayItem>
                  <DayItem>화</DayItem>
                  <DayItem>수</DayItem>
                  <DayItem>목</DayItem>
                  <DayItem>금</DayItem>
                  <DayItem>토</DayItem>
                </DaysContainer>
                <DatesContainer>
                  {new Array(differenceInCalendarDays(endDateOfCalendar, startDateOfCalendar))
                    .fill(0)
                    .map((_, index) => {
                      const date = addDays(startDateOfCalendar, index);
                      return isSameMonth(date, month) ? (
                        <DateItem
                          key={formatISO(date)}
                          selectedAsStart={selectedDates.startDate ? isSameDay(selectedDates.startDate, date) : false}
                          selectedAsEnd={selectedDates.endDate ? isSameDay(selectedDates.endDate, date) : false}
                          selectedAsBetween={
                            selectedDates.startDate && selectedDates.endDate
                              ? areIntervalsOverlapping(
                                  { start: addDays(selectedDates.startDate, 1), end: selectedDates.endDate },
                                  { start: date, end: addDays(date, 1) },
                                )
                              : false
                          }
                          endDateSelected={!!selectedDates.endDate}
                          startDateSelected={!!selectedDates.startDate}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDateSelection(date);
                          }}
                        >
                          <DateTextWrapper>{getDate(date)}</DateTextWrapper>
                          {isSameDay(today, date) && <Dot>.</Dot>}
                        </DateItem>
                      ) : (
                        <DateItem></DateItem>
                      );
                    })}
                </DatesContainer>
              </MonthContainer>
            );
          })}
        </MonthsWrapper>
      </Window>
    </Container>
  );
}
const Container = styled.div`
  z-index: 100;
  position: absolute;
  top: calc(60px + 1.25rem);
  left: calc((100% - 810px) / 2);
  width: 810px;
  background-color: rgb(255, 255, 255);
  border: ${theme.borderColor};
  box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.5);
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    padding: 5%;
    overflow: auto;
  }
`;
const ArrowLeftWrapper = styled.div`
  position: absolute;
  left: 2rem;
  top: 1rem;
  width: 1rem;
  height: 1rem;
`;
const ArrowRightWrapper = styled.div`
  position: absolute;
  right: 2rem;
  top: 1rem;
  width: 1rem;
  height: 1rem;
`;

const Window = styled.div`
  width: 100%;
  overflow: hidden;
`;
const MonthsWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
`;
const MonthContainer = styled.div`
  padding: 2rem;
  width: 405px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 480px) {
    padding: 0;
    margin: 1rem auto;
    width: 100%;
  }
`;
const MonthText = styled.div`
  font-size: 1.2rem;
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const DaysContainer = styled.div`
  width: 100%;
  display: flex;
`;
const DayItem = styled.div`
  color: ${theme.fontLightColor};
  height: 23px;
  width: calc(100% / 7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DatesContainer = styled.div`
  height: 240px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const DateItem = styled.div<DateItemPropsType>`
  height: 40px;
  width: calc(100% / 7);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.selectedAsStart || props.selectedAsEnd || props.selectedAsBetween
      ? 'rgb(255, 255, 255)'
      : theme.fontDarkColor};

  background-color: ${(props) =>
    !props.selectedAsStart && !props.selectedAsEnd && props.selectedAsBetween && theme.secondaryColor};

  ${(props) =>
    (props.selectedAsStart &&
      props.endDateSelected &&
      `background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 49%, ${theme.secondaryColor} 50%, ${theme.secondaryColor} 100%);`) ||
    (props.selectedAsEnd &&
      props.startDateSelected &&
      `background: linear-gradient(90deg, ${theme.secondaryColor} 0% ,  ${theme.secondaryColor} 49%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%);`)};

  > div:first-child {
    background-color: ${(props) => (props.selectedAsStart || props.selectedAsEnd) && theme.primaryColor};
  }
`;
const DateTextWrapper = styled.div`
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border: 2px solid ${theme.primaryColor};
    border-radius: 50%;
  }
`;

const Dot = styled.div`
  color: ${theme.primaryColor};
  position: absolute;
  width: 100%;
  text-align: center;
  font-weight: bold;
  top: 50%;
`;
