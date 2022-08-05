import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DetailsPage from './pages/DetailsPage';
import Main from './pages/MainPage';
import ReservationStatusPage from './pages/ReservationStatusPage';

export default function Router() {
  // window.history.scrollRestoration = "manual";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="details/:hotelName" element={<DetailsPage />} />
          <Route path="reservation" element={<ReservationStatusPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
