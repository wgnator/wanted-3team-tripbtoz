import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';

export default function Header() {
  return (
    <Container>
      <Wrapper>
        <Link to="/">
          <Logo>LOGO</Logo>
        </Link>
        <Link to="reservation">예약목록</Link>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem 0;
  background: linear-gradient(70deg, purple, tomato, yellow);
  border-bottom: 1px solid ${theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.h1`
  color: white;
  font-weight: 800;
  font-size: 1.4rem;
`;
const Wrapper = styled.div`
  max-width: 976px;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: ${theme.primaryColor};
    font-size: 1.2rem;
    font-weight: 600;
  }
`;
