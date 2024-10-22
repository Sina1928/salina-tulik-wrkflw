import { Link } from "react-router-dom";
function LoginPage() {
  return (
    <div>
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
