// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const [Value, setValue] = useState({
//     Email: "",
//     Password: "",
//   });
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setValue((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     let formErrors = {};
//     if (!Value.Email.includes("@")) {
//       formErrors.Email = "Please enter a valid email address.";
//     }
//     if (Value.Password.length < 6) {
//       formErrors.Password = "Password must be at least 6 characters long.";
//     }
//     return formErrors;
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     setErrors({});

//     try {
//       const res = await axios.post("http://localhost:8080/api/login", Value);
//       const token = res.data.token;

//       if (rememberMe) {
//         localStorage.setItem("token", token);
//       } else {
//         sessionStorage.setItem("token", token);
//       }

//       setValue({
//         Email: "",
//         Password: "",
//       });
//       navigate("/profile");
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Incorrect email or password. Please try again.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-slate-100">
//       {/* Left side with background image and subtle animation */}
//       <div className="w-1/2 relative bg-blue-900 overflow-hidden flex items-center justify-center">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           // style={{
//           //   backgroundImage: 'url("https://via.placeholder.com/600x800")',
//           //   animation: "move-bg 15s ease-in-out infinite",
//           // }}
//         ></div>
//         <div className="relative z-10 text-white p-8">
//           <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
//           <p className="text-lg">
//             Log in to access your personalized dashboard.
//           </p>
//         </div>
//       </div>

//       {/* Right side - Login form */}
//       <div className="w-1/2 flex items-center justify-center">
//         <form
//           onSubmit={onSubmit}
//           className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
//         >
//           <h2 className="text-2xl font-semibold text-center text-blue-500">
//             Login
//           </h2>

//           {/* Email Input */}
//           <input
//             type="email"
//             placeholder="Email address"
//             className={`w-full p-3 border ${
//               errors.Email ? "border-red-500" : "border-gray-300"
//             } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             required
//             onChange={onChange}
//             name="Email"
//             value={Value.Email}
//           />
//           {errors.Email && (
//             <p className="text-red-500 text-sm">{errors.Email}</p>
//           )}

//           {/* Password Input */}
//           <input
//             type="password"
//             placeholder="Password"
//             className={`w-full p-3 border ${
//               errors.Password ? "border-red-500" : "border-gray-300"
//             } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             required
//             onChange={onChange}
//             name="Password"
//             value={Value.Password}
//           />
//           {errors.Password && (
//             <p className="text-red-500 text-sm">{errors.Password}</p>
//           )}

//           {/* Submit Button */}
//           <button
//             className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
//             type="submit"
//           >
//             Login
//           </button>

//           {/* Remember Me & Forgot Password */}
//           <div className="flex justify-between items-center mt-4">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 className="mr-2"
//                 checked={rememberMe}
//                 onChange={() => setRememberMe(!rememberMe)}
//               />
//               Remember me
//             </label>
//             <Link
//               to="/forgot-password"
//               className="text-sm text-blue-600 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           {/* Registration Link */}
//           <div className="text-center mt-6">
//             <p className="text-gray-600 text-sm">
//               Don't have an account?{" "}
//               <Link to="/reg" className="text-blue-600 hover:underline">
//                 Register here
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>

//       <style>{`
//         @keyframes move-bg {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Login;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr", // Two equal columns for left and right
      height: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    left: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1e3a8a", // Same background color as registration component
      color: "white",
      padding: "20px",
      textAlign: "center",
      fontSize: "20px",
    },
    right: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f0f4f8",
      padding: "20px",
    },
    form: {
      backgroundColor: "white",
      padding: "40px 30px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      width: "100%",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
      transition: "border-color 0.3s",
    },
    inputFocus: {
      borderColor: "#3498db",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "20px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#2563EB",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    heading: {
      fontSize: "28px",
      marginBottom: "30px",
      color: "#333",
      fontWeight: "bold",
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
      marginTop: "5px",
    },
    rememberMe: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "10px",
    },
    registerLink: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#555",
    },
  };

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
      setErrors({ general: "Incorrect email or password. Please try again." });
    }
  };

  return (
    <div style={styles.container}>
      {/* Left side with welcome message */}
      <div style={styles.left}>
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg">Log in to access your personalized dashboard.</p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div style={styles.right}>
        <form onSubmit={onSubmit} style={styles.form}>
          <h2 style={styles.heading}>Login</h2>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email address"
            style={styles.input}
            onFocus={(e) =>
              (e.target.style.borderColor = styles.inputFocus.borderColor)
            }
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            required
            onChange={onChange}
            name="Email"
            value={Value.Email}
          />
          {errors.Email && <p style={styles.errorMessage}>{errors.Email}</p>}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            onFocus={(e) =>
              (e.target.style.borderColor = styles.inputFocus.borderColor)
            }
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            required
            onChange={onChange}
            name="Password"
            value={Value.Password}
          />
          {errors.Password && <p style={styles.errorMessage}>{errors.Password}</p>}

          {/* Submit Button */}
          <button type="submit" style={styles.button}>
            Login
          </button>

          {/* Remember Me & Forgot Password */}
          <div style={styles.rememberMe}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-600 underline">
              Forgot Password?
            </Link>
          </div>

          {/* Error Message */}
          {errors.general && <p style={styles.errorMessage}>{errors.general}</p>}

          {/* Registration Link */}
          <div style={styles.registerLink}>
            <p>
              Don't have an account?{" "}
              <Link to="/reg" className="text-blue-500 underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
