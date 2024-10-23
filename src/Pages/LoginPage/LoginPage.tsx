import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo/Logo";
import { useState } from "react";
import { LoginProvider, useLogin } from "@/contexts/LoginContext";
import "./LoginPage.scss";

const LoginContent: React.FC = () => {
  const { login, error, loading, clearError } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error", err);
    }
  };

  return (
    <div className="login">
      <Logo />
      <div className="login-ctnr">
        <h1>Log in to your account</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error} <button onClick={clearError}>✕</button>
            </div>
          )}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="email__input"
            placeholder="Example@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Yourpassword"
            className="password__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading} className="submit__btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>Or Sign in with</p>
        <button>Google</button>
      </div>
      <div className="signup-prompt">
        <p>Don't have an account yet?</p> <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export const LoginPage: React.FC = () => {
  return (
    <LoginProvider>
      <LoginContent />
    </LoginProvider>
  );
};

export default LoginPage;
