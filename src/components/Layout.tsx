import { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Header';
import SearchBar from './searchBar/Index';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/details" element={<SearchBar />} />
        <Route path="/details/*" element={<SearchBar />} />
      </Routes>
      <Outlet />
    </>
  );
}
