import styled from 'styled-components';
import SearchIcon from '../../assets/search';
import { MOBILE_BREAKPOINT } from '../../constants/constants';
import { theme } from '../../styles/theme';
import DateSelection from './DateSelection';
import InputSearch from './InputSearch';
import OptionSelector from './OptionSelector';

export default function SearchBar() {
  return (
    <Container>
      <Wrapper>
        <InputSearch />
        <DateSelection />
        <OptionSelector />
        <Button>
          <IconWrapper>
            <SearchIcon />
          </IconWrapper>
        </Button>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem 0;
  width: 100%;
  position: relative;
  background-color: white;
  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    border-bottom: 1px solid ${theme.borderColor};
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;
const Wrapper = styled.div`
  max-width: 976px;
  width: 100%;
  margin: 0 auto;
  border-radius: 4px;
  display: grid;
  grid-template-areas:
    'search-bar search-bar search-bar search-bar'
    'dete-selector dete-selector dete-selector dete-selector'
    'option-selector option-selector option-selector button';
  & > :nth-child(1) {
    grid-area: search-bar;
    border-bottom: 1px solid ${theme.borderColor};
  }
  & > :nth-child(2) {
    grid-area: dete-selector;
    border-bottom: 1px solid ${theme.borderColor};
  }
  & > :nth-child(3) {
    grid-area: option-selector;
    border-bottom: 1px solid ${theme.borderColor};
  }
  & > :nth-child(4) {
    grid-area: button;
    border-bottom: 1px solid ${theme.borderColor};
  }
  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.1);
  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    display: flex;
    flex-direction: row;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${theme.borderColor};
    border-bottom: none;
    box-shadow: none;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  svg {
    width: 2rem;
    height: 2rem;
    stroke: white;
  }
  cursor: pointer;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.primaryColor};
  width: 100%;
  height: 80%;
  border-radius: 4px;
  margin-right: 1rem;
  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    margin: 0;
    border-radius: 0;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
  }
`;
