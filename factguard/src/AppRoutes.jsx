import React from "react";
import Analyze from "./pages/Analyze";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import Contact from "./components/Contact";
import SignupPage from "./pages/SignupPage";
import HowItWorks from "./components/HowItWorks";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HeroSection from "./components/HeroSection";
import TermsOfService from "./pages/TermsOfService";
import CallToAction from "./components/CallToAction";
import ProtectedRoute from "./routes/ProtectedRoute";
import FeatureSection from "./components/FeatureSection";
import ProblemSection from "./components/ProblemSection";
import { Routes, Route, useLocation } from "react-router-dom";

// ✅ NEW IMPORT
import History from "./pages/History";

const AppRoutes = () => {
  const location = useLocation();

  // Pages where Navbar and Footer should be hidden
  const isHiddenLayoutPage = ["/login", "/signup", "/analyze"].includes(
    location.pathname
  );

  return (
    <div className="flex flex-col min-h-screen">
      {!isHiddenLayoutPage && <Navbar />}

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <ProblemSection />
                <FeatureSection />
                <CallToAction />
              </>
            }
          />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* ✅ NEW ROUTE FOR HISTORY */}
          <Route path="/history" element={<History />} />

          <Route
            path="/analyze"
            element={
              <ProtectedRoute>
                <Analyze />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {!isHiddenLayoutPage && <Footer />}
    </div>
  );
};

export default AppRoutes;

