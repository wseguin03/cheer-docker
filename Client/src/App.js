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
        <Route path="/login" element={<LoginPage />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

