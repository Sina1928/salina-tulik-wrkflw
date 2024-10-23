import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo/Logo";
import { SignupProvider, useSignup } from "@/contexts/SignupContext";

interface Industry {
  id: number;
  name: string;
  description?: string;
}

interface Component {
  id: number;
  name: string;
  description: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  logoUrl: string;
  themeColor: string;
  websiteUrl: string;
  industryId: string;
  selectedComponents: number[];
}

const SignupContent: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    logoUrl: "",
    themeColor: "",
    websiteUrl: "",
    industryId: "",
    selectedComponents: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [components, setComponents] = useState<Component[]>([]);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await axios.get("http://localhost:8080/industries");
        setIndustries(response.data);
      } catch (err) {
        console.error("Error fetching industries", err);
      }
    };
    fetchIndustries();
  }, []);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/industries/${formData.industryId}components`
        );
        setComponents(response.data);
      } catch (err) {
        console.error("Error fetching components", err);
      }
    };
    fetchComponents();
  }, [formData.industryId]);

  const validateFormStepOne = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

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

  const validateFormStepTwo = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }

    if (!formData.industryId) {
      newErrors.industryId = "Industry selection is required.";
    }

    if (!formData.websiteUrl) {
      newErrors.websiteUrl = "Please enter a valid URL";
    }

    return newErrors;
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickNext = () => {
 if currentStep ===1 {
  errors = validateFormStepOne
 } else if currentStep ===2 {
  errors= validateFormStepTwo
 }
 if (Object.keys(errors).length ===0)
  setErrors({})
  } else {
    setErrors(errors)
  }
  // const validationErrors = validateForm();
  // if (Object.keys(validationErrors).length > 0) {
  //   setErrors(validationErrors);
  //   return;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    };
    try {
      const response = await axios.post("/signup", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error: ", err);
    }
  }

  return (
    <div className="">
      <Logo />
      <div>
        <h1>Welcome to Wrkflw</h1>
        <h2>Get started- it's free. No credit card needed.</h2>
      </div>
      <div>
        {/* <button>Continue with Google</button> <p>Or</p>{" "} */}
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name:</label>{" "}
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Anna"
                className={`input ${
                  errors.email ? "input--invalid" : "input--valid"
                }`}
              />
              <label>Last Name:</label>{" "}
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Mercredi"
                className={`input ${
                  errors.email ? "input--invalid" : "input--valid"
                }`}
              />
              <label htmlFor="email">Email:</label>{" "}
              <input
                type="email"
                id="user[email]"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
                  required
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
                  required
                  onChange={handleChange}
                  className={`input ${
                    errors.confirmPassword ? "input--invalid" : "input--valid"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="error-message">{errors.confirmPassword}</p>
                )}
              </div>
              <button type="button" className="next-btn" onClick={}>
                Next
              </button>
              <div>
                <label htmlFor="industryId">Industry:</label>
                <select
                  id="industryId"
                  className={errors.industryId ? "error" : ""}
                  name="industryId"
                  value={formData.industryId || ""}
                  onChange={handleChange}
                >
                  {industries.map((industry) => (
                    <option key={industry.id} value={industry.id}>
                      {industry.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="components__grid">
                {components.map((component) => (
                  <div key={component.id}>
                    {component.name} {component.description}
                  </div>
                ))}
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

export const SignupPage: React.FC = () => {
  return (
    <SignupProvider>
      <SignupContent />
    </SignupProvider>
  );
};

export default SignupPage;
