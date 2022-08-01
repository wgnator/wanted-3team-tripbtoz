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
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

// const createShowingMonthsProperties = (currentDate: Date) => {
//   return new Array(12).fill(0).map(_ => )
// }

type DateItemPropsType = {
  selectedAsStart?: boolean;
  selectedAsEnd?: boolean;
  selectedAsBetween?: boolean;
  endDateSelected?: boolean;
  startDateSelected?: boolean;
};

type SelectedDatesType = {
  startDate: Date | null;
  endDate: Date | null;
};
export default function DatePicker() {
  const [selectedDates, setSelectedDates] = useState<SelectedDatesType>({ startDate: null, endDate: null });
  const today = useRef(new Date());

  const handleDateSelection = (selectedDate: Date) => {
    if (selectedDates.startDate === null || (selectedDates.startDate && selectedDates.endDate))
      setSelectedDates({ startDate: selectedDate, endDate: null });
    else if (compareAsc(selectedDate, selectedDates.startDate) > 0)
      setSelectedDates({ ...selectedDates, endDate: selectedDate });
    else setSelectedDates({ startDate: selectedDate, endDate: null });
  };

  useEffect(() => {
    console.log(selectedDates);
  }, [selectedDates]);

  return (
    <Container>
      {new Array(12).fill(0).map((_, index) => {
        const month = addMonths(today.current, index);
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
              {new Array(differenceInCalendarDays(endDateOfCalendar, startDateOfCalendar)).fill(0).map((_, index) => {
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
                  </DateItem>
                ) : (
                  <DateItem></DateItem>
                );
              })}
            </DatesContainer>
          </MonthContainer>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 810px;
  border: ${theme.borderColor};
  display: flex;
  overflow: hidden;
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    padding: 5%;
    overflow: auto;
  }
`;
const MonthContainer = styled.div`
  padding: 2rem;
  flex-basis: 50%;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 480px) {
    padding: 0;
    margin: 1rem auto;
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
  display: flex;
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

  > * {
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
