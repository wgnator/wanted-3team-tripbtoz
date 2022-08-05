import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../constants/constants';
import { theme } from '../../styles/theme';
import { Selecter } from './OptionSelector';

interface AutocompleteProps {
  setInputValue: any;
}

const mockDestination = ['서울', '제주', '강원', '부산'] as const;

export default function Autocomplete({ setInputValue }: AutocompleteProps) {
  const selectDesination = (destination: typeof mockDestination[number]) => {
    setInputValue(destination);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Title>추천여행지</Title>
          <Ul>
            {mockDestination.map((destination, idx) => (
              <Li key={idx} onClick={() => selectDesination(destination)}>
                {destination}
              </Li>
            ))}
          </Ul>
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled(Selecter)`
  padding: 0;
  left: 0;
  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    width: 100%;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Title = styled.span`
  padding: 1rem;
  padding-bottom: 0.5rem;
  font-weight: 600;
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;
`;
const Li = styled.li`
  font-size: 1.2rem;
  font-weight: 400;
  cursor: pointer;
  padding: 0.5rem 2rem;
  :hover {
    background-color: ${theme.onHoverBackgroundColor};
  }
`;
