// Login.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import GroceriesList from "../Grocery/grocery"; // Import GroceriesList component
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import { useNavigate, NavLink } from "react-router-dom";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false); // Track login status
  const [token, setToken] = useState(""); // Store token

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post("https://groceries-i18z.onrender.com/api/auth/login", user)
        .then((res) => {
          alert(res.data.token);
          setUserState(res.data.user);
          setToken(res.data.token); // Set token
          setLoggedIn(true); // Set login status to true
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [formErrors, isSubmit, user, setUserState, navigate]);

  return (
    <div>
      {/* Render login form only if not logged in */}
      {!loggedIn && (
        <div className={loginstyle.login}>
          <form>
            <h1>Login</h1>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={changeHandler}
              value={user.email}
            />
            <p className={basestyle.error}>{formErrors.email}</p>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={changeHandler}
              value={user.password}
            />
            <p className={basestyle.error}>{formErrors.password}</p>
            <button className={basestyle.button_common} onClick={loginHandler}>
              Login
            </button>
          </form>
          <NavLink to="/signup">Not yet registered? Register Now</NavLink>
        </div>
      )}
      {loggedIn && <GroceriesList token={token} />}
      </div>)};
export default Login;
