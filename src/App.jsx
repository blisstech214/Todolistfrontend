import React from "react";
import { Routes, Route } from "react-router-dom";
import Registration from "./component/main/Registration";
import Login from "./component/main/Login";
import Forgot from "./component/main/Forgot";
import Reset from "./component/main/Reset";
import Profile from "./component/dashboard/pages/Profile";
import TodoList from "./component/dashboard/pages/TodoList";
import Update from "./component/dashboard/pages/Update";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password/:token" element={<Reset />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/form" element={<TodoList />} />
        <Route path="/edit/:id" element={<Update />} /> */}
      </Routes>
    </div>
  );
}

export default App; // Ensure this line is present
