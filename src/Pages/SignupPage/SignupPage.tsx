import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage: React.FC = () => {
  interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
  }
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must greater than 6 characters long.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post("/signup", formData);
      console.log(response.data);
    } catch (err) {
      console.error("Signup error: ", err);
    }
  };

  return (
    <div>
      <div>
        <h1>Welcome to Wrkflw</h1>
        <h2>Get started- it's free. No credit card needed.</h2>
      </div>
      <div>
        <button>Continue with Google</button> <p>Or</p>{" "}
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>{" "}
              <input
                type="email"
                id="user[email]"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className={`input ${
                  errors.email ? "input--invalid" : "input--valid"
                }`}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
              <div>
                <label>Password:</label>{" "}
                <input
                  type="password"
                  name="password"
                  placeholder="yourpassword"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input ${
                    errors.password ? "input--invalid" : "input--valid"
                  }`}
                />
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
              </div>
              <div>
                <label>Confirm Password:</label>{" "}
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="yourpassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input ${
                    errors.confirmPassword ? "input--invalid" : "input--valid"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="error-message">{errors.confirmPassword}</p>
                )}
              </div>
              <button type="submit">Sign Up</button>
            </div>
          </form>
          <div>
            <p>Already have an account?</p> <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
