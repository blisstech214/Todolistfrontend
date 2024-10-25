import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/resetPassword/${token}`,
        { password }
      );
      setMessage("Password reset successful");
      console.log("Password reset response", response.data);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setError(error.response?.data || "Error resetting password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {/* Reset Password Card */}
      <div className="flex flex-col items-center w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-blue-900 w-full text-center">
          Reset Password
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 w-full"
        >
          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              required
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 w-full"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </span>
          </div>

          {/* Confirm Password Input */}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 w-full"
          />

          {/* Reset Password Button */}
          <button
            type="submit"
            className="p-3 bg-blue-900 text-white font-semibold text-base rounded-md hover:bg-blue-800 transition duration-200 w-full"
          >
            Reset Password
          </button>
        </form>

        {/* Messages */}
        {message && (
          <p className="text-green-600 font-medium mt-4">{message}</p>
        )}
        {error && <p className="text-red-600 font-medium mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Reset;
