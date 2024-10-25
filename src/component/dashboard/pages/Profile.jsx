import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import TableShow from "./TableShow";
import TodoList from "./TodoList";
import { FaUser, FaCamera, FaTrashAlt, FaUpload, FaSignOutAlt } from 'react-icons/fa';


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Load profile image from sessionStorage if exists
    const storedImage = sessionStorage.getItem("profileImage");
    if (storedImage) {
      setPreviewUrl(storedImage);
    }

    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8080/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/images/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Image uploaded successfully!");
      const uploadedImageUrl = res.data.imageUrl;
      setPreviewUrl(uploadedImageUrl);
      sessionStorage.setItem("profileImage", uploadedImageUrl);
    } catch (error) {
      setMessage("Error uploading image.");
    }
  };

  const handleDelete = () => {
    sessionStorage.removeItem("profileImage");
    setPreviewUrl(null);
    setMessage("Image removed.");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const handleSignUp = () => {
    navigate("/reg", { replace: true });
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="">
      <div className="flex">
        <div className=" flex w-[20%]">
          <div className="w-72 sm:w-80 md:w-96 flex  bg-blue-500 flex-col items-center shadow-md p-2">
            {/* Profile Image Section */}
            <div
              data-aos="fade-right"
              className="w-full lg:w-1/3 p-24 rounded-lg flex flex-col items-center"
            >
              <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <FaUser className="text-gray-400 text-6xl" />
                )}
                <div className="absolute bottom-0 bg-white right-16  p-2 rounded-full cursor-pointer">
                  <label htmlFor="fileInput">
                    <FaCamera className="text-blue-600" />
                  </label>
                </div>
              </div>

              {/* User Info Section */}
              <div className="space-y-4 mt-8 font-bold text-center mb-4">
                <div>{userData.Email}</div>
                <div>{userData.UserName}</div>
              </div>

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="mt-4 flex gap-4">
                <form onSubmit={handleSubmit}>
                  {/* <button
                  type="submit"
                  className="px-4  text-sm p-1 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center gap-2 shadow-lg"
                >
                  <FaUpload />
                  Upload
                </button> */}
                </form>

                {previewUrl && (
                  <button
                    onClick={handleDelete}
                    className="px-2 text-xs p-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 shadow-lg"
                  >
                    <FaTrashAlt />
                    Delete
                  </button>
                )}
              </div>
              {message && (
                <p className="mt-2 text-xs text-green-500">{message}</p>
              )}
            </div>

            {/* Log out and Sign Up Section */}
            <ul className="space-y-6 w-full">
              <li className="p-5 py-32">
                <button
                  className="p-2 bg-red-500 w-full hover:bg-red-600 text-white rounded-lg transition-all duration-300 mb-4"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
                <button
                  className="p-2 bg-green-500 w-full  hover:bg-green-600 text-white rounded-lg transition-all duration-300"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/* <TableShow /> */}

       
        <div className="w-[80%]">
          <TodoList />
        </div> 
      </div>
      <a href="#table">
        <TableShow />
        </a>
    </div>
  );
};

export default Profile;
