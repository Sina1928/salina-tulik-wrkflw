import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo/Logo";
import { SignupProvider } from "@/contexts/SignupContext";
import "./SignupPage.scss";
import LogoUploadTheme from "@/components/LogoUploadTheme/LogoUploadTheme";

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
  firstName: string; // User Info
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string; // Company Info
  logoUrl: string;
  themeColor: string;
  websiteUrl: string;
  industryId: string | null;
  selectedComponents: number[]; // Component Info
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
    industryId: null,
    selectedComponents: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [components, setComponents] = useState<Component[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // fetch industries (on mount)

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/industries"
        );
        setIndustries(response.data);
      } catch (err) {
        console.error("Error fetching industries", err);
      }
    };
    fetchIndustries();
  }, []);

  // If industryId available, fetch components
  useEffect(() => {
    if (!formData.industryId) return;

    const fetchComponents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/industries/${formData.industryId}/components`
        );
        setComponents(response.data);
      } catch (err) {
        console.error("Error fetching components", err);
      }
    };
    fetchComponents();
  }, [formData.industryId]);

  // Form Validation
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

    if (formData.websiteUrl) {
      try {
        new URL(formData.websiteUrl);
      } catch {
        newErrors.websiteUrl =
          "Please enter a valid URL (e.g., https://example.com";
      }
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleComponentSelection = (componentId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedComponents: prev.selectedComponents.includes(componentId)
        ? prev.selectedComponents.filter((id) => id !== componentId)
        : [...prev.selectedComponents, componentId],
    }));
  };

  const handleClickNext = () => {
    let stepErrors = {};

    if (currentStep === 1) {
      stepErrors = validateFormStepOne();
    } else if (currentStep === 2) {
      stepErrors = validateFormStepTwo();
    }

    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep((prev) => prev + 1);
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          user: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          },
          company: {
            name: formData.companyName,
            logoUrl: formData.logoUrl,
            themeColor: formData.themeColor,
            websiteUrl: formData.websiteUrl,
            industryId: formData.industryId,
          },
          components: formData.selectedComponents,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <Logo />
      <div className="signup__ctnr">
        <div className="signup__intro">
          <h1 className="signup__title">Welcome to Wrkflw</h1>
          <h2 className="signup__subtitle">
            Get started- it's free.
            <br /> No credit card needed.
          </h2>
        </div>

        <div className="steps-indicator">
          <div className={`step${currentStep >= 1 ? "active" : ""}`}>
            Account
          </div>
          <div className={`step${currentStep >= 2 ? "active" : ""}`}>
            Company
          </div>
          <div className={`step${currentStep >= 3 ? "active" : ""}`}>
            Features
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label>First Name:</label>{" "}
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Anna"
                  className={errors.firstName ? "errors" : ""}
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label>Last Name:</label>{" "}
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Mercredi"
                  className={errors.lastName ? "errors" : ""}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>{" "}
                <input
                  type="email"
                  id="user[email]"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@company.com"
                  className={errors.email ? "errors" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label>Password:</label>{" "}
                <input
                  type="password"
                  name="password"
                  placeholder="yourpassword"
                  value={formData.password}
                  required
                  onChange={handleChange}
                  className={errors.password ? "errors" : ""}
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label>Confirm Password:</label>{" "}
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="yourpassword"
                  value={formData.confirmPassword}
                  required
                  onChange={handleChange}
                  className={errors.password ? "errors" : ""}
                />
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <button
                type="button"
                className="next-btn"
                onClick={handleClickNext}
              >
                Next
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="companyName">Company Name:</label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={errors.companyName ? "errors" : ""}
                />
                {errors.companyName && (
                  <span className="error-message">{errors.companyName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="industryId">Industry:</label>
                <select
                  id="industryId"
                  className={errors.industryId ? "error" : ""}
                  name="industryId"
                  value={formData.industryId || ""}
                  onChange={handleChange}
                >
                  <option value="">Select an Industry</option>
                  {industries.map((industry) => (
                    <option key={industry.id} value={industry.id}>
                      {industry.name}
                    </option>
                  ))}
                </select>
                {errors.industryId && (
                  <span className="error-message">{errors.industryId}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="websiteUrl">Website URL: (optional)</label>
                <input
                  required={false}
                  type="text"
                  name="websiteUrl"
                  id="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  placeholder="https://website.com"
                  className={errors.websiteUrl ? "error" : ""}
                />
                {errors.websiteUrl && (
                  <span className="error-message">{errors.websiteUrl}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="logo-upload">Upload Your Logo:</label>
                <LogoUploadTheme />
              </div>

              <div className="button-group">
                <button type="button" onClick={handleBack} className="back-btn">
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleClickNext}
                  className="next-btn"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <h3>Select Your Features</h3>
              <div className="components__grid">
                {components.map((component) => (
                  <div
                    key={component.id}
                    className={`component-card ${
                      formData.selectedComponents.includes(component.id)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleComponentSelection(component.id)}
                  >
                    <h4>{component.name}</h4> <p>{component.description}</p>
                  </div>
                ))}
              </div>
              {errors.submit && (
                <div className="error-message">{errors.submit}</div>
              )}

              <div className="button-group">
                <button type="button" onClick={handleBack} className="back-btn">
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || formData.selectedComponents.length === 0}
                  className="submit-btn"
                >
                  {loading ? "Creating Account..." : "Complete Signup"}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="social-signup">
          <button className="google-btn">Continue with Google</button>
        </div>

        <div className="login-prompt">
          <p>Already have an account?</p>{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
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
