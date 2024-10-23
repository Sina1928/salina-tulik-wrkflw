import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage.tsx";
import SignupPage from "./Pages/SignupPage/SignupPage.tsx";
import LoginPage from "./Pages/LoginPage/LoginPage.tsx";
import DashboardPage from "./Pages/DashboardPage/DashboardPage.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
