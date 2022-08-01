import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/search';
import { theme } from '../../styles/theme';
import InputSearch from './InputSearch';

export default function SearchBar() {
  const [isFocusInput, setIsFocusInput] = useState(false);
  return (
    <Container>
      <Wrapper>
        <InputSearch isFocusInput={isFocusInput} setIsFocusInput={setIsFocusInput} />
        <Datepicker />
        <OptionSelector></OptionSelector>
        <Button>
          <SearchIcon />
        </Button>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid ${theme.borderColor};
`;
const Wrapper = styled.div`
  width: 976px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border: 1px solid ${theme.borderColor};
  border-radius: 4px;
`;

const Datepicker = styled.div`
  height: 100%;
  width: 100%;
  border-right: 1px solid ${theme.borderColor};
`;
const OptionSelector = styled.div`
  height: 100%;
  width: 100%;
`;
const Button = styled.button`
  border: none;
  background-color: ${theme.primaryColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  svg {
    width: 2rem;
    height: 2rem;
    stroke: white;
  }
  cursor: pointer;
`;
