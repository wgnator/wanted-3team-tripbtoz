import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/search';
import XIcon from '../../assets/x';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { determineQuery, setQuery } from '../../reducers/searchQueryReducer';
import { MOBILE_BREAKPOINT } from '../../constants/constants';
import { theme } from '../../styles/theme';
import Autocomplete from './Autocomplete';

interface InputSearchProps {}

export default function InputSearch({}: InputSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [hasXIcon, setHasXIcon] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();
  const clearInput = () => {
    inputRef.current!.value = '';
    setHasXIcon(false);
  };

  const checkValue = (value: string) => {
    if (value) {
      setHasXIcon(true);
      return;
    }
    setHasXIcon(false);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkValue(event.target.value);
    setInputValue(event.target.value);
  };

  useEffect(() => {
    dispatch(setQuery({ hotelName: inputValue }));
  }, [inputValue]);

  const openRecommendation = () => {
    setIsOpen(true);
  };

  const closeRecommendation = () => {
    isOpen && setTimeout(() => setIsOpen(false), 100);
  };

  const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.code) {
      case 'Enter':
        dispatch(determineQuery());
        return;
      case 'Escape':
        return;
      default:
        !isOpen && openRecommendation();
        return;
    }
  };

  return (
    <InputSearchWrapper htmlFor="search_input" onBlur={closeRecommendation} onFocus={openRecommendation}>
      <SearchIcon />
      <SearchInput
        id="search_input"
        placeholder="지역명, 호텔명, 펜션명 검색"
        onChange={handleOnChange}
        onKeyDown={handleKeydown}
        value={inputValue}
        ref={inputRef}
      />
      <IconContainer onClick={clearInput}>
        <XIcon hidden={!hasXIcon} />
      </IconContainer>
      {isOpen && <Autocomplete setInputValue={setInputValue} />}
    </InputSearchWrapper>
  );
}

export const InputSearchWrapper = styled.label`
  position: relative;
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.625rem;
  svg:first-child {
    width: 1.8rem;
    height: 1.8rem;
  }
  svg:last-child {
    width: 1.3rem;
    height: 1.3rem;
    fill: ${theme.borderColor};
  }
  :hover {
    background-color: ${theme.onHoverBackgroundColor};
  }
  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    height: 100%;
    border-right: 1px solid ${theme.borderColor};
  }
`;
const SearchInput = styled.input`
  width: 100%;
  white-space: nowrap;
  font-size: 1rem;
  padding: 0 0.625rem;
  border: none;
  outline: none;
  color: ${theme.fontDarkColor};
  background-color: transparent;
  ::placeholder {
    color: ${theme.fontDarkColor};
  }
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;
