import React from "react";
import AppRoutes from "./AppRoutes";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Toaster position="top-center" />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}


export default App;
