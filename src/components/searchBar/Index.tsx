import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/search';
import { theme } from '../../styles/theme';
import InputSearch from './InputSearch';
import OptionSelector from './OptionSelector';

export default function SearchBar() {
  const [isFocusInput, setIsFocusInput] = useState(false);

  const [numberOfPeople, setNumberOfPeople] = useState({ adult: 2, children: 0 });

  return (
    <Container>
      <Wrapper>
        <InputSearch isFocusInput={isFocusInput} setIsFocusInput={setIsFocusInput} />
        <Datepicker />
        <OptionSelector numberOfPeople={numberOfPeople} setNumberOfPeople={setNumberOfPeople} />
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
  width: 100%;
`;
const Wrapper = styled.div`
  max-width: 976px;
  width: 100%;
  margin: 0 auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${theme.borderColor};
  border-radius: 4px;
`;

const Datepicker = styled.div`
  height: 100%;
  width: 100%;
  border-right: 1px solid ${theme.borderColor};
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
