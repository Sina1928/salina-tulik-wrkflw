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
      <div className="login__header">
        <Logo />
      </div>
      <div className="login__ctnr">
        <h1 className="login__title">Log in to your account</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          {error && (
            <div className="error__message">
              {error} <button onClick={clearError}>✕</button>
            </div>
          )}
          <div className="login__group">
            <label className="login__label" htmlFor="email">
              Email:
            </label>{" "}
            <input
              type="email"
              className="login__email"
              placeholder="Example@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="login__group">
            <label className="login__label" htmlFor="password">
              Password:
            </label>{" "}
            <input
              type="password"
              placeholder="Yourpassword"
              className="login__password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="login-group">
            <button type="submit" disabled={loading} className="login__btn">
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="login-google">
            <p>Or Sign in with</p>
            <button className="login-google__btn">Google</button>
          </div>

          <div className="signup-prompt">
            <p>Don't have an account yet?</p>{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </div>
        </form>
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
