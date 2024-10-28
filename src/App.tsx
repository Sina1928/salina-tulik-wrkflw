import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage.tsx";
import { BaseAuthProvider } from "./contexts/BaseAuthContext.tsx";
import SignupPage from "./Pages/SignupPage/SignupPage.tsx";
import LoginPage from "./Pages/LoginPage/LoginPage.tsx";
import DashboardPage from "./Pages/DashboardPage/DashboardPage.tsx";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <BaseAuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BaseAuthProvider>
    </BrowserRouter>
  );
}

export default App;
