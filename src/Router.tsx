import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Layout from './components/Layout';
import DetailsPage from './pages/DetailsPage';
import Main from './pages/MainPage';
import ReservationStatusPage from './pages/ReservationStatusPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="detail/:hotelName" element={<DetailsPage />} />
          <Route path="reservation" element={<ReservationStatusPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
