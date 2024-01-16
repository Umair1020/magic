import React, { useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { baseurl } from "../../utils/BaseUrl";
import Footer from "../Footer/Footer";

const SignUp = () => {
  const userCookie = Cookies.get("user");
  function handleGoogleSignIn() {
    const googleAuthUrl =
      "https://accounts.google.com/o/oauth2/auth" +
      "?client_id=522145634044-s8od91l3uifec7tb2jct6gmc9v2g11nd.apps.googleusercontent.com" +
      `&redirect_uri=${baseurl}/auth/google/callback` +
      "&response_type=code" +
      "&scope=openid profile email";

    // Open a new window with the Google OAuth URL
    window.open(googleAuthUrl, "_self");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Name, setName] = useState("");

  const handleAuth = async () => {
    // Check if any of the fields are empty before sending the request
    if (!Name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Return early if any field is empty
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Return early if email format is invalid
    }

    try {
      const response = await axios.post(`${baseurl}/auth/signupWithEmail`, {
        Email: email,
        Password: password,
        Name,
      });
      Cookies.set("user", response.data.token);

      window.location.reload();
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Create an account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                {" "}
                <Link
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  to="/login"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Login to your Account
                </Link>
              </p>
            </div>
            <div className="sc-1c859520-0 jHAXMR">
              <input
                className="sc-1c859520-1 cvZGAj input"
                id="Name"
                type="name"
                name="Name"
                required
                placeholder="Enter Your Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                fdprocessedid="mjjker"
              />
            </div>
            <div className="sc-1c859520-0 jHAXMR">
              <input
                className="sc-1c859520-1 cvZGAj input"
                id="email"
                type="email"
                name="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fdprocessedid="mjjker"
              />
            </div>
            <div className="sc-1c859520-0 jHAXMR">
              <input
                className="sc-1c859520-1 cvZGAj input"
                id="email"
                name="Password"
                required
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fdprocessedid="mjjker"
              />
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="text"
              style={{
                backgroundColor: "#4285F4",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                height: "50px",
              }}
            >
              <img
                src="/icons8-google-48.png"
                style={{ width: "20px", marginRight: "10px" }}
              />
              Continue with Google
            </button>
            <div className="sc-449b86b2-7 hgRQkd">
              <button
                type="submit"
                className="text"
                fdprocessedid="oe84x"
                onClick={handleAuth}
                style={{ height: "50px" }}
              >
                Sign Up
              </button>
              <br />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
