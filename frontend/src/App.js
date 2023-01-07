import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import HomePage from "./pages/HomePage.jsx";
import CurrenciesPage from "./pages/CurrenciesPage.jsx";
import ExchangesPage from "./pages/ExchangesPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import CryptoDetailsPage from "./pages/CryptoDetailsPage.jsx";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/currencies" element={<CurrenciesPage />} />
          <Route path="/exchanges" element={<ExchangesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/crypto/:coinId" element={<CryptoDetailsPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
