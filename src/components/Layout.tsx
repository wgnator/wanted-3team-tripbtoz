import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import SearchBar from './searchBar/Index';

export default function Layout() {
  const locate = useLocation();
  const hasSearchBar = locate.pathname === '/detail' || locate.pathname === '/';

  return (
    <>
      <Header />
      {hasSearchBar && <SearchBar />}
      <Outlet />
    </>
  );
}
