import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [Value, setValue] = useState({
    Email: "",
    Password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!Value.Email.includes("@")) {
      formErrors.Email = "Please enter a valid email address.";
    }
    if (Value.Password.length < 6) {
      formErrors.Password = "Password must be at least 6 characters long.";
    }
    return formErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const res = await axios.post("http://localhost:8080/api/login", Value);
      const token = res.data.token;

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      setValue({
        Email: "",
        Password: "",
      });
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      alert("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Left side with background image and subtle animation */}
      <div className="w-1/2 relative bg-blue-900 overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          // style={{
          //   backgroundImage: 'url("https://via.placeholder.com/600x800")',
          //   animation: "move-bg 15s ease-in-out infinite",
          // }}
        ></div>
        <div className="relative z-10 text-white p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg">
            Log in to access your personalized dashboard.
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-1/2 flex items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-blue-500">
            Login
          </h2>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email address"
            className={`w-full p-3 border ${
              errors.Email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
            onChange={onChange}
            name="Email"
            value={Value.Email}
          />
          {errors.Email && (
            <p className="text-red-500 text-sm">{errors.Email}</p>
          )}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 border ${
              errors.Password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
            onChange={onChange}
            name="Password"
            value={Value.Password}
          />
          {errors.Password && (
            <p className="text-red-500 text-sm">{errors.Password}</p>
          )}

          {/* Submit Button */}
          <button
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            type="submit"
          >
            Login
          </button>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Registration Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/reg" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes move-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

export default Login;
