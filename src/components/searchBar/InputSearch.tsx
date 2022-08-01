import { useRef } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/search';
import XIcon from '../../assets/x';
import { theme } from '../../styles/theme';

interface InputSearchProps {
  isFocusInput: boolean;
  setIsFocusInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputSearch({ isFocusInput, setIsFocusInput }: InputSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => inputRef.current?.focus();
  const unfocusInput = () => inputRef.current?.blur();

  const doFocus = (event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    focusInput();
    setIsFocusInput(true);
  };

  const doUnfocus = (event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    unfocusInput();
    setIsFocusInput(false);
  };

  return (
    <InputSearchWrapper onClick={doFocus}>
      <SearchIcon />
      <SearchInput placeholder="지역명, 호텔명, 펜션명 검색" onFocus={doFocus} onBlur={doUnfocus} ref={inputRef} />
      <IconContainer onClick={doUnfocus}>
        <XIcon isEnable={isFocusInput} />
      </IconContainer>
    </InputSearchWrapper>
  );
}

const InputSearchWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.625rem;
  border-right: 1px solid ${theme.borderColor};
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
`;
const SearchInput = styled.input`
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
