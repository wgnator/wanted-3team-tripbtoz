import Router from './Router';
import { GlobalStyle } from './styles/GlobalStyle';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
