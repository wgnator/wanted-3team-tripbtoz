import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApplyStatus from './pages/ApplyStatus';
import Registration from './pages/Registration';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}
