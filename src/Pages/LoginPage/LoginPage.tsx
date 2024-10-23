import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo/Logo";
import { useState } from "react";

function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await navigate("/dashboard");
    } catch (err: any) {
      setError("Login Failed");
    }
  };
  return (
    <div>
      <Logo />
      <div>
        <h1>Log in to your account</h1>
        <p>Enter your work email address</p>
        <input type="text" placeholder="Example@company.com" />
        <button>Next</button>
      </div>
      <div>
        <p>Or Sign in with</p>
        <button>Google</button>
      </div>
      <div>
        <p>Don't have an account yet?</p> <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
