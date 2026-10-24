import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import RestaurantPage from "./pages/RestaurantPage.jsx";

export default function App() {
  return (
    <Router basename="/eatmalawi">
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
