import styled from 'styled-components';
import SearchIcon from '../../assets/search';
import { theme } from '../../styles/theme';
import Datepicker from './Datepicker';
import InputSearch from './InputSearch';
import OptionSelector from './OptionSelector';

export default function SearchBar() {
  return (
    <Container>
      <Wrapper>
        <InputSearch />
        <Datepicker />
        <OptionSelector />
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
  /* display: flex;
  flex-direction: column;
  @media (min-width: 450px) {
    flex-direction: row;
  } */
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
