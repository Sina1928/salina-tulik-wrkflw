import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage.tsx";
import { BaseAuthProvider } from "./contexts/BaseAuthContext.tsx";
import SignupPage from "./Pages/SignupPage/SignupPage.tsx";
import LoginPage from "./Pages/LoginPage/LoginPage.tsx";
import DashboardPage from "./Pages/DashboardPage/DashboardPage.tsx";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage.tsx";

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const isAuthenticated = localStorage.getItem("accessToken");

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
//   return <>{children}</>;
// };

// const ProtectedWrapper: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   return (
//     <LoginProvider>
//       <ProtectedRoute>{children}</ProtectedRoute>
//     </LoginProvider>
//   );
// };

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
