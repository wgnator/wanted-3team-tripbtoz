import { useRef, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/search';
import XIcon from '../../assets/x';
import { MOBILE_BREAKPOINT } from '../../constants/constants';
import { theme } from '../../styles/theme';

interface InputSearchProps {}

export default function InputSearch({}: InputSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasXIcon, setHasXIcon] = useState(false);

  const clearInput = () => {
    inputRef.current!.value = '';
    setHasXIcon(false);
  };

  const checkValue = () => {
    if (inputRef.current?.value) {
      setHasXIcon(true);
      return;
    }
    setHasXIcon(false);
  };

  // 할일: input search value를 리덕스에 저장

  return (
    <InputSearchWrapper htmlFor="search_input">
      <SearchIcon />
      <SearchInput id="search_input" placeholder="지역명, 호텔명, 펜션명 검색" onChange={checkValue} ref={inputRef} />
      <IconContainer onClick={clearInput}>
        <XIcon hidden={!hasXIcon} />
      </IconContainer>
    </InputSearchWrapper>
  );
}

const InputSearchWrapper = styled.label`
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
