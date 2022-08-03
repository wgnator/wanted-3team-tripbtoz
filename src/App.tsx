import Router from './Router';
import { GlobalStyle } from './styles/GlobalStyle';
 import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

function App() {
  const queryClient = new QueryClient();
  console.log("쿼리클",queryClient);
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
      </QueryClientProvider>

    </>
  );
}

export default App;
