
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Update({ task, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    employeeName: task.employeeName,
    task: task.task,
    explainAboutTask: task.explainAboutTask,
    date: task.date,
    pendingWork: task.pendingWork,
    completedWork: task.completedWork,
    workStatus: task.workStatus,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (task update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to update task
      const response = await axios.put(
        `http://localhost:8080/api/update/${task._id}`,
        formData
      );

      if (response.status === 200) {
        // Task successfully updated, close modal and refresh parent component's task list
        onUpdate();
        onClose();
      } else {
        console.error("Failed to update task");
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Fetch task details on component mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/getOne/${id}`
        );
        if (response.data && response.data.data) {
          setFormData(response.data.data); // Populate the form data
        } else {
          console.error("No data found for the provided ID.");
          navigate("/profile"); // Redirect if task is not found
        }
      } catch (error) {
        console.error("Error fetching task", error);
        navigate("/profile"); // Redirect in case of error
      }
    };

    fetchTask();
  }, [id, navigate]);

  return (
    <div className="p-3 bg-slate-50" id="task">
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-2">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Employee Name:</label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Task:</label>
          <input
            type="text"
            name="task"
            value={formData.task}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Description:</label>
          <textarea
            name="explainAboutTask"
            value={formData.explainAboutTask}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Pending Work:</label>
          <input
            type="text"
            name="pendingWork"
            value={formData.pendingWork}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Completed Work:</label>
          <input
            type="text"
            name="completedWork"
            value={formData.completedWork}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Work Status:</label>
          <input
            type="text"
            name="workStatus"
            value={formData.workStatus}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
        </div>
      </form>
    </div>
  );
}

export default Update;
