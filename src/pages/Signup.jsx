import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = savedUsers.find((item) => item.email === email);

    if (alreadyExists) {
      toast.error("User already exists with this email");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    };

    const updatedUsers = [...savedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast.success("Account created successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Create Account</h1>
        <p className="login-subtitle">Sign up to get started</p>

        <form onSubmit={handleSignup} className="login-form">
          <input
            type="text"
            placeholder="Full Name"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-submit-btn">
            Sign Up
          </button>
        </form>

        <p className="login-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="create-account-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;