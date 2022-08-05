import {
  addDays,
  areIntervalsOverlapping,
  differenceInCalendarDays,
  endOfDay,
  endOfMonth,
  formatISO,
  getDate,
  getMonth,
  getYear,
  isPast,
  isSameDay,
  isSameMonth,
  isSunday,
  nextSunday,
  previousSunday,
  startOfMonth,
} from 'date-fns';
import { addMonths, compareAsc } from 'date-fns/esm';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { CheckInAndOut } from './DateSelection';
import { MOBILE_BREAKPOINT } from '../../constants/constants';

type DateItemPropsType = {
  isPast?: boolean;
  selectedAs?: 'start' | 'end' | 'between' | null;
  endDateSelected?: boolean;
  startDateSelected?: boolean;
  isToday?: boolean;
};
type SelectedDatesType = {
  startDate: Date | null;
  endDate: Date | null;
};
type CalendarReachedEndStatusType = {
  left: boolean;
  right: boolean;
};
type CalendarDirectionsType = 'left' | 'right';
type DatePickerProps = {
  initialDates: CheckInAndOut;
  setCheckInAndOut: Dispatch<SetStateAction<CheckInAndOut>>;
};

export default function DatePicker({ initialDates, setCheckInAndOut }: DatePickerProps) {
  const today = new Date();

  const [selectedDates, setSelectedDates] = useState<SelectedDatesType>({
    startDate: initialDates.checkIn,
    endDate: initialDates.checkOut,
  });
  const [hasCalendarReachedEnd, setHasCalendarReachedEnd] = useState<CalendarReachedEndStatusType>({
    left: true,
    right: false,
  });

  const windowRef = useRef<HTMLDivElement>(null);
  const monthsWrapperRef = useRef<HTMLDivElement>(null);
  const WINDOW_WIDTH = useRef<number>(0);
  const WHOLE_CALENDAR_WIDTH = useRef<number>(0);

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

  const slideCalendar = (direction: CalendarDirectionsType) => {
    if (direction === 'left') windowRef.current?.scrollTo(windowRef.current?.scrollLeft - WINDOW_WIDTH.current, 0);
    else if (direction === 'right')
      windowRef.current?.scrollTo(windowRef.current?.scrollLeft + WINDOW_WIDTH.current, 0);
    checkCurrentCalendarPosition();
  };

  const checkIsSelectedAs = (date: Date) => {
    if (selectedDates.startDate && isSameDay(selectedDates.startDate, date)) return 'start';
    if (selectedDates.endDate && isSameDay(selectedDates.endDate, date)) return 'end';
    if (
      selectedDates.startDate &&
      selectedDates.endDate &&
      areIntervalsOverlapping(
        { start: addDays(selectedDates.startDate, 1), end: selectedDates.endDate },
        { start: date, end: addDays(date, 1) },
      )
    )
      return 'between';
    return null;
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

  return (
    <Container>
      {!hasCalendarReachedEnd.left && (
        <ArrowWrapper direction="left">
          <IoIosArrowDropleft onClick={() => slideCalendar('left')} />
        </ArrowWrapper>
      )}
      {!hasCalendarReachedEnd.right && (
        <ArrowWrapper direction="right">
          <IoIosArrowDropright onClick={() => slideCalendar('right')} />
        </ArrowWrapper>
      )}
      <Window ref={windowRef}>
        <MonthsWrapper ref={monthsWrapperRef}>
          {new Array(12).fill(0).map((_, index) => {
            const month = addMonths(today, index);
            const startDateOfCalendar = isSunday(startOfMonth(month))
              ? startOfMonth(month)
              : previousSunday(startOfMonth(month));
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
                          isPast={isPast(endOfDay(date))}
                          selectedAs={checkIsSelectedAs(date)}
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
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    top: 7rem;
    width: 100%;
    padding: 5%;
    left: 0;
    min-width: 360px;
  }
`;
const ArrowWrapper = styled.div<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 1.5rem;
  ${(props) => (props.direction === 'left' ? `left: 2rem;` : `right: 2rem;`)}
  * {
    transform: scale(1.2);
    transform-origin: center;
    fill: ${theme.borderColor};
  }
  *:first-child {
    width: 1.2rem;
    height: 1.2rem;
  }
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;
const Window = styled.div`
  width: 100%;
  overflow: hidden;
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    overflow: auto;
  }
`;
const MonthsWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column;
  }
`;
const MonthContainer = styled.div`
  padding: 2rem;
  width: 405px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
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
  height: 18rem;
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
  color: ${(props) => (props.selectedAs !== null ? 'rgb(255, 255, 255)' : theme.fontDarkColor)};
  background-color: ${(props) => props.selectedAs === 'between' && theme.secondaryColor};

  ${(props) => props.isPast && `pointer-events: none; color:${theme.fontLightColor}`}
  ${(props) =>
    props.selectedAs === 'start' &&
    props.endDateSelected &&
    `background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 49%, ${theme.secondaryColor} 50%, ${theme.secondaryColor} 100%);`}
  ${(props) =>
    props.selectedAs === 'end' &&
    props.startDateSelected &&
    `background: linear-gradient(90deg, ${theme.secondaryColor} 0% ,  ${theme.secondaryColor} 49%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%);`};

  > div:first-child {
    ${(props) =>
      (props.selectedAs === 'start' || props.selectedAs === 'end') && `background-color: ${theme.primaryColor}`};
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
  z-index: -1;
  width: 100%;
  text-align: center;
  font-weight: bold;
  top: 50%;
`;
