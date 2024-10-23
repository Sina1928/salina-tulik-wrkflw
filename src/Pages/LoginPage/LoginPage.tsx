import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo/Logo";
import { useState } from "react";
import { useLogin } from "@/contexts/LoginContext";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginPage: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, error, loading, clearError } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      onSuccess?.();
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error", err);
    }
  };

  return (
    <div>
      <Logo />
      <div>
        <h1>Log in to your account</h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <div>
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
      <div>
        <p>Don't have an account yet?</p> <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
