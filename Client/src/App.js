import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import ContactPage from './components/ContactPage';
import SponsorsPage from './components/SponsorsPage';
import Header from './components/Header';
import ClientPage from './components/ClientPage';
import CaregiverPage from './components/CaregiverPage';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import StaffPage from './components/StaffPage';
import Calendar from './components/Calendar';
import CareGiverForms from './components/CareGiverForms';
import Gallery from './components/Gallery';
// import './components/bootstrap-custom.scss';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/caregiver" element={<CaregiverPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/forms-caregiver" element={<CareGiverForms />} />
        <Route path='/gallery' element={<Gallery/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

