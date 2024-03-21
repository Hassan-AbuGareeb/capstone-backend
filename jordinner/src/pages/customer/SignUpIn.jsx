import React, { useState, useContext, useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/router";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { BsCalendarDate } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import CustomerNav from "./customerNav";
import { TokenContext } from "../_app";

function SignUpIn() {
  const { setHaveToken } = useContext(TokenContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      check(token);
    }
  }, []); //check if the user is already signed in and has valid token

  async function check(token) {
    const isTokenValidResponse = await fetch(
      "http://localhost:3001/customer/checktoken",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    if (isTokenValidResponse.status !== 200) {
      localStorage.removeItem("token");
      setHaveToken(false);
    }
    router.push("/");
  }

  const [action, setAction] = useState("Sign Up");
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const [signUpFormData, setSignUpFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    age: "",
    location: "",
    phoneNumber: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignInInputChange = (event) => {
    const { name, value } = event.target;
    setSignInFormData({ ...signInFormData, [name]: value });
  };

  const handleSignUpInputChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormData({ ...signUpFormData, [name]: value });
  };

  const handleSignInSubmit = async (event) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/customer/signin",
        signInFormData
      );
      const token = response.data;
      // store the token in local storage
      console.log(token);
      localStorage.setItem("token", token);
      setErrorMessage(""); // clear any previous error messages
      console.log("Signed in successfully");
      setHaveToken(true);
      // redirect to customer's profile
      router.push("/");
    } catch (error) {
      console.error("Error occurred during sign in:", error);
      setErrorMessage("Wrong username or password.");
    }
  };

  const handleSignUpSubmit = async (event) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/customer/signup",
        signUpFormData
      );
      const token = response.data;
      // store the token in local storage
      console.log(token);
      localStorage.setItem("token", token);
      setErrorMessage(""); // clear any previous error messages
      console.log("Signed up successfully");
      setHaveToken(true);
      // redirect to customer's profile
      router.push("/");
    } catch (error) {
      console.error("Error occurred during sign up:", error);
      setErrorMessage(
        error.response.data.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  const options = [
    { label: "Khalda" },
    { label: "Abdali" },
    { label: "Rabiyeh" },
    { label: "Tabarbour" },
    { label: "Shmeisani" },
    { label: "Abdoun" },
    { label: "Jabal Al-Hussein" },
  ];

  return (
    <div>
      <CustomerNav />
      <section className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Sign Up" && (
            <div className="input">
              <BiUser className="icon" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                value={signUpFormData.firstName}
                onChange={handleSignUpInputChange}
              />
            </div>
          )}
          {action === "Sign Up" && (
            <div className="input">
              <BiUser className="icon" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                value={signUpFormData.lastName}
                onChange={handleSignUpInputChange}
              />
            </div>
          )}
          <div className="input">
            <AiOutlineMail className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={
                action === "Sign In"
                  ? signInFormData.email
                  : signUpFormData.email
              }
              onChange={
                action === "Sign In"
                  ? handleSignInInputChange
                  : handleSignUpInputChange
              }
            />
          </div>
          <div className="input">
            <RiLockPasswordLine className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={
                action === "Sign In"
                  ? signInFormData.password
                  : signUpFormData.password
              }
              onChange={
                action === "Sign In"
                  ? handleSignInInputChange
                  : handleSignUpInputChange
              }
            />
          </div>
          {action === "Sign Up" && (
            <div className="input">
              <RiLockPasswordLine className="icon" />
              <input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                required
                value={signUpFormData.password2}
                onChange={handleSignUpInputChange}
              />
            </div>
          )}
          {action === "Sign Up" && (
            <div className="input">
              <HiMiniDevicePhoneMobile className="icon" />
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                required
                value={signUpFormData.phoneNumber}
                onChange={handleSignUpInputChange}
              />
            </div>
          )}
          {action === "Sign Up" && (
            <div className="input">
              <BsCalendarDate className="icon" />
              <input
                type="number"
                name="age"
                placeholder="Age"
                required
                value={signUpFormData.age}
                onChange={handleSignUpInputChange}
              />
            </div>
          )}
          {action === "Sign Up" && (
            <div className="input">
              <CiLocationOn className="icon" />
              <select
                className="location-dropdown"
                name="location"
                value={signUpFormData.location}
                onChange={handleSignUpInputChange}
                required
              >
                <option value="">Select Location</option>
                {options.map((option, index) => (
                  <option key={index} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {action === "Sign In" && (
            <div className="forgot-password">
              Forgot Password? <span>Click Here!</span>
            </div>
          )}
          {action === "Sign Up" && (
            <div className="terms">
              <input type="checkbox" required />
              <p>
                By proceeding, I agree to the terms of use and privacy policies.
              </p>
            </div>
          )}
          <div className="submit-container">
            <button
              className={action === "Sign In" ? "submit gray" : "submit"}
              onClick={() => {
                action === "Sign In"
                  ? setAction("Sign Up")
                  : handleSignUpSubmit();
              }}
            >
              Sign Up
            </button>
            <button
              className={action === "Sign Up" ? "submit gray" : "submit"}
              onClick={() => {
                action === "Sign Up"
                  ? setAction("Sign In")
                  : handleSignInSubmit();
              }}
            >
              Sign In
            </button>
          </div>
          <div className="error">{errorMessage}</div>
        </div>
      </section>
    </div>
  );
}

export default SignUpIn;
