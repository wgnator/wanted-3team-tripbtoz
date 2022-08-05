import { Outlet, useLocation, useMatch } from 'react-router-dom';
import Header from './Header';
import SearchBar from './searchBar/Index';

export default function Layout() {
  const locate = useLocation();
  const hasSearchBar =
    locate.pathname === '/detail' || locate.pathname === '/' || useMatch({ path: '/details/:hotelName' });

  return (
    <>
      <Header />
      {hasSearchBar && <SearchBar />}
      <Outlet />
    </>
  );
}
