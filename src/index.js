import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Management from './pages/management/management';
import Contact from './pages/contact/contact';
import Detail from './pages/home/components/detail';
import Add from './pages/add/add';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Management />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
