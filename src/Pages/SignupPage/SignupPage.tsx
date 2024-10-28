import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo/Logo";
import { useAuth } from "@/contexts/BaseAuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
  logoUrl: File | null;
  themeColor: string;
  websiteUrl: string;
  industryId: number | null;
  selectedComponents: number[];
}

const SignupPage: React.FC = () => {
  const { signup, error, loading, clearError } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    logoUrl: null,
    themeColor: "#ffffff",
    websiteUrl: "",
    industryId: null,
    selectedComponents: [],
  });

  const [industries, setIndustries] = useState<Industry[]>([]);
  const [components, setComponents] = useState<Component[]>([]);
  const [suggestedComponents, setSuggestedComponents] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

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
    console.log(formData);
  }, []);

  //   // when industry is selected, fetch components
  useEffect(() => {
    if (!formData.industryId) return;

    const fetchComponents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/industries/${formData.industryId}/components`
        );
        setComponents(response.data);
        const suggestedIds = response.data.map(
          (component: Component) => component.id
        );
        setSuggestedComponents(suggestedIds);
        // setFormData((prev) => ({ ...prev, selectedComponents: suggestedIds }));
      } catch (err) {
        console.error("Error fetching components", err);
      }
    };
    fetchComponents();
  }, [formData.industryId]);

  //   // Form Validation
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

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLogoUpload = (file: File) => {
    setFormData({ ...formData, logoUrl: file });
    console.log(formData);
  };

  const handleColorExtracted = (colors: string[]) => {
    console.log(colors);
  };

  const handleColorSelect = (color: string) => {
    console.log(formData);

    setFormData((prev) => ({
      ...prev,
      themeColor: color,
    }));
    console.log(formData);
  };

  const handleComponentSelection = (componentId: number) => {
    console.log(formData);
    setFormData((prev) => ({
      ...prev,
      selectedComponents: prev.selectedComponents.includes(componentId)
        ? prev.selectedComponents.filter((id) => id !== componentId)
        : [...prev.selectedComponents, componentId],
    }));
    console.log(formData);
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
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setValidationErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        industryId: Number(formData.industryId),
        websiteUrl: formData.websiteUrl,
        themeColor: formData.themeColor,
        selectedComponents: formData.selectedComponents,
        logoUrl: formData.logoUrl,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error: ", err);
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

        {error && (
          <div className="error__message">
            {error}
            <button type="button" className="error__close" onClick={clearError}>
              x
            </button>
          </div>
        )}

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
                  className={validationErrors.firstName ? "errors" : ""}
                />
                {validationErrors.firstName && (
                  <span className="error-message">
                    {validationErrors.firstName}
                  </span>
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
                  className={validationErrors.lastName ? "errors" : ""}
                />
                {validationErrors.lastName && (
                  <span className="error-message">
                    {validationErrors.lastName}
                  </span>
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
                  className={validationErrors.email ? "errors" : ""}
                />
                {validationErrors.email && (
                  <span className="error-message">
                    {validationErrors.email}
                  </span>
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
                  className={validationErrors.password ? "errors" : ""}
                />
                {validationErrors.password && (
                  <span className="error-message">
                    {validationErrors.password}
                  </span>
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
                  className={validationErrors.password ? "errors" : ""}
                />
                {validationErrors.confirmPassword && (
                  <span className="error-message">
                    {validationErrors.confirmPassword}
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
                  className={validationErrors.companyName ? "errors" : ""}
                />
                {validationErrors.companyName && (
                  <span className="error-message">
                    {validationErrors.companyName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="industryId">Industry:</label>
                <select
                  id="industryId"
                  className={validationErrors.industryId ? "error" : ""}
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
                {validationErrors.industryId && (
                  <span className="error-message">
                    {validationErrors.industryId}
                  </span>
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
                  className={validationErrors.websiteUrl ? "error" : ""}
                />
                {validationErrors.websiteUrl && (
                  <span className="error-message">
                    {validationErrors.websiteUrl}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="logo-upload">Upload Your Logo:</label>
                <LogoUploadTheme
                  onLogoUpload={handleLogoUpload}
                  onColorExtracted={handleColorExtracted}
                  onThemeColorSelect={handleColorSelect}
                  selectedThemeColor={formData.themeColor}
                />
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
              {suggestedComponents.length > 0 && (
                <Alert>
                  <AlertDescription>
                    Based on your industry, we recommend the following features.
                    Click to select or deselect from the following options.
                  </AlertDescription>
                </Alert>
              )}{" "}
              <div className="components__grid">
                {components.map((component) => (
                  <div
                    key={component.id}
                    className={`component-card ${
                      formData.selectedComponents.includes(component.id)
                        ? "selected"
                        : ""
                    } ${
                      suggestedComponents.includes(component.id)
                        ? "suggested"
                        : ""
                    }
                    }`}
                    onClick={() => handleComponentSelection(component.id)}
                  >
                    <Badge className="recommended__badge">Recommended</Badge>
                    <h4>{component.name}</h4> <p>{component.description}</p>
                  </div>
                ))}
              </div>
              {validationErrors.submit && (
                <div className="error-message">{validationErrors.submit}</div>
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

        {/* <div className="social-signup">
          <button className="google-btn">Continue with Google</button>
        </div> */}

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

export default SignupPage;
