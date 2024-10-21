import axios from "axios";
import { useState } from "react";

function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/signup", SignUpValues);
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
        <input type="email" id="user[email]" placeholder="name@company.com" />
      </div>
      <button type="submit">Sign Up</button>
    </div>
  );
}

export default SignupPage;
