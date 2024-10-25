
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Registration() {
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
      backgroundColor: "#1e3a8a", // Blue background for quotes section
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
    loginLink: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#555",
    },
  };

  const navigate = useNavigate();

  const initialValue = {
    FirstName: "",
    LastName: "",
    UserName: "",
    Email: "",
    Password: "",
  };

  const [Change, setChange] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setChange((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,14}$/;
    return passwordRegex.test(password);
  };

  const Onclick = (e) => {
    e.preventDefault();

    if (!validateEmail(Change.Email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(Change.Password)) {
      setErrorMessage(
        "Password must be 8-14 characters long and include at least one letter, one number, and one special character."
      );
      return;
    }

    setErrorMessage("");

    axios
      .post("http://localhost:8080/api/register", Change)
      .then((res) => {
        setChange(initialValue);
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage("Registration failed. Please try again.");
      });
  };

  return (
    <div style={styles.container}>
      {/* Right section for form */}
      <div style={styles.right}>
        <form style={styles.form} onSubmit={Onclick}>
          <h2 style={styles.heading}>
            <span className="text-blue-500">Create an Account</span>
          </h2>
          <input
            type="text"
            placeholder="First Name"
            name="FirstName"
            style={styles.input}
            onFocus={(e) =>
              (e.target.style.borderColor = styles.inputFocus.borderColor)
            }
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            required
            onChange={onChange}
            value={Change.FirstName}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="LastName"
            style={styles.input}
            onFocus={(e) =>
              (e.target.style.borderColor = styles.inputFocus.borderColor)
            }
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            required
            onChange={onChange}
            value={Change.LastName}
          />
          <input
            type="text"
            placeholder="User Name"
            name="UserName"
            style={styles.input}
            onFocus={(e) =>
              (e.target.style.borderColor = styles.inputFocus.borderColor)
            }
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            required
            onChange={onChange}
            value={Change.UserName}
          />
          <input
            type="email"
            placeholder="Email"
            name="Email"
            style={styles.input}
            onFocus={(e) =>
              (e.target.style.borderColor = styles.inputFocus.borderColor)
            }
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            required
            onChange={onChange}
            value={Change.Email}
          />
          <input
            type="password"
            placeholder="Password"
            name="Password"
            style={styles.input}
            onFocus={(e) =>
              (e.target.style.borderColor = styles.inputFocus.borderColor)
            }
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            required
            onChange={onChange}
            value={Change.Password}
          />
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
          <button
            type="submit"
            style={styles.button}
            className="text-white bg-blue-500"
          >
            Register
          </button>
          <p
            style={styles.loginLink}
            className="flex text-blue-500 text-lg justify-between px-10"
          >
            <h1 className="text-base">Already have an account?</h1>
            <Link to="/" className="text-blue-500 text-base underline">
              Login
            </Link>
          </p>
        </form>
      </div>
      {/* Left section for quotes */}
      <div style={styles.left}>
        <div>
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Platform</h2>
          <p className="text-lg">
            "Unlock your potential by joining us today and start your journey to
            success."
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
