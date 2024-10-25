import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoList() {
  const initialTask = {
    employeeName: "",
    task: "",
    explainAboutTask: "",
    date: "",
    pendingWork: "",
    completedWork: "",
    workStatus: "",
  };

  const [Task, setTask] = useState(initialTask);
  const navigate = useNavigate();
  const [Change, setChange] = useState();
  const onChange = (e) => {
    setTask((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    setTask((pre) => ({ ...pre, workStatus: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting Task:", Task);

    axios
      .post("http://localhost:8080/api/taskPost", Task)
      .then((res) => {
        if (res.status === 200) {
          console.log("Post successful:", res.data);
          setTask(initialTask);
          navigate("/profile ");
        } else {
          console.error("Unexpected response from server:", res);
          alert("Failed to submit task. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error submitting task:", err);

        alert(
          "An error occurred while submitting the task. Please try again later."
        );
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-100 shadow-md rounded-lg">
      <h1 className="text-center font-bold text-blue-600 text-3xl  mb-8">
        Task Handler
      </h1>
      <form onSubmit={onSubmit}>
        <ul className="space-y-4">
          <li>
            <label className="font-medium text-sm text-gray-600">
              Employee Name:
            </label>
            <input
              type="text"
              placeholder="Enter employee name"
              name="employeeName"
              value={Task.employeeName}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </li>
          {/* Task */}
          <li>
            <label className="font-medium text-sm text-gray-600">Task:</label>
            <input
              type="text"
              placeholder="Enter task"
              name="task"
              value={Task.task}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </li>
          {/* Explain About Task */}
          <li>
            <label className="font-medium text-sm text-gray-600">
              Explain About Task:
            </label>
            <textarea
              placeholder="Brief description of the task"
              name="explainAboutTask"
              value={Task.explainAboutTask}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
              required
            />
          </li>
          {/* Date */}
          <li>
            <label className="font-medium text-sm text-gray-600">Date:</label>
            <input
              type="date"
              name="date"
              value={Task.date}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </li>
          {/* Pending Work */}
          <li>
            <label className="font-medium text-sm text-gray-600">
              Pending Work:
            </label>
            <input
              type="text"
              placeholder="Enter pending work"
              name="pendingWork"
              value={Task.pendingWork}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </li>
          {/* Completed Work */}
          <li>
            <label className="font-medium text-sm text-gray-600">
              Completed Work:
            </label>
            <input
              type="text"
              placeholder="Enter completed work"
              name="completedWork"
              value={Task.completedWork}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </li>
          {/* Work Status */}
          <li>
            <label className="font-medium text-sm text-gray-600">
              Work Status:
            </label>
            <div className="flex space-x-4 mt-1">
              <label>
                <input
                  type="radio"
                  name="workStatus"
                  value="Completed"
                  checked={Task.workStatus === "Completed"}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Completed
              </label>
              <label>
                <input
                  type="radio"
                  name="workStatus"
                  value="Pending"
                  checked={Task.workStatus === "Pending"}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Pending
              </label>
              <label>
                <input
                  type="radio"
                  name="workStatus"
                  value="Not Started"
                  checked={Task.workStatus === "Not Started"}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Not Started
              </label>
            </div>
          </li>
          {/* Submit Button */}
          <li className="text-center mt-6">
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
              type="submit"
            >
              Submit
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default TodoList;
