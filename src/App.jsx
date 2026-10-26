import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import RestaurantPage from "./pages/RestaurantPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const RouteHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p');
    if (p) {
      // The 404.html script sends the path as ?p=/eatmalawi/restaurant/1
      // Since we have basename="/eatmalawi", we need to navigate to /restaurant/1
      const cleanPath = p.startsWith('/eatmalawi') ? p.replace('/eatmalawi', '') : p;
      navigate(cleanPath, { replace: true });
    }
  }, [navigate]);

  return null;
};

export default function App() {
  return (
    <Router basename="/eatmalawi">
      <ScrollToTop />
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <RouteHandler />

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
