// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// function Update() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState({
//     employeeName: "",
//     task: "",
//     explainAboutTask: "",
//     date: "",
//     pendingWork: "",
//     completedWork: "",
//     workStatus: "Pending", 
//   });

//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/getOne/${id}`);
//         if (response.data && response.data.data) {
//           setData(response.data.data);
//         } else {
//           console.error("No data found for the provided ID.");
//           navigate("/table"); 
//         }
//       } catch (error) {
//         console.error("Error fetching task", error);
//       }
//     };
//     fetchTask();
//   }, [id, navigate]);

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

  // const submit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put(`http://localhost:8080/api/getUpdate/${id}`, data);
  //     if (response.status === 200) {
  //       alert("Task updated successfully!"); 
  //       navigate("/table");
  //     } else {
  //       alert("Failed to update task. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating task", error);
  //     alert("Error updating task. Please try again.");
  //   }
  // };

//   return (
//    <div className="bg-slate-100">
//      <div className="max-w-4xl  mx-auto p-6 bg-gray-50 shadow-md rounded-lg" id="task">
//       <h1 className="text-center text-gray-700 text-2xl font-semibold mb-8">
//         Task Update Form
//       </h1>
//       <form onSubmit={submit}>
//         <ul className="space-y-4">
//           {/* Employee Name */}
//           <li className="flex flex-col">
//             <label className="font-medium text-gray-600 text-sm">Employee Name:</label>
//             <input
//               type="text"
//               placeholder="Enter employee name"
//               name="employeeName"
//               value={data.employeeName}
//               onChange={onChange}
//               className="border border-gray-200 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm shadow-sm placeholder-gray-500"
//             />
//           </li>
//           {/* Task */}
//           <li className="flex flex-col">
//             <label className="font-medium text-gray-600 text-sm">Task:</label>
//             <input
//               type="text"
//               placeholder="Enter task"
//               name="task"
//               value={data.task}
//               onChange={onChange}
//               className="border border-gray-200 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm shadow-sm placeholder-gray-500"
//             />
//           </li>
//           {/* Explain About Task */}
//           <li className="flex flex-col">
//             <label className="font-medium text-gray-600 text-sm">Explain About Task:</label>
//             <textarea
//               placeholder="Brief description of the task"
//               name="explainAboutTask"
//               value={data.explainAboutTask}
//               onChange={onChange}
//               className="border border-gray-200 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm shadow-sm placeholder-gray-500"
//               rows={3}
//             />
//           </li>
//           {/* Date */}
//           <li className="flex flex-col">
//             <label className="font-medium text-gray-600 text-sm">Date:</label>
//             <input
//               type="date"
//               name="date"
//               value={data.date}
//               onChange={onChange}
//               className="border border-gray-200 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm shadow-sm placeholder-gray-500"
//             />
//           </li>
//           {/* Pending Work */}
//           <li className="flex flex-col">
//             <label className="font-medium text-gray-600 text-sm">Pending Work:</label>
//             <input
//               type="text"
//               placeholder="Enter pending work"
//               name="pendingWork"
//               value={data.pendingWork}
//               onChange={onChange}
//               className="border border-gray-200 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm shadow-sm placeholder-gray-500"
//             />
//           </li>
//           {/* Completed Work */}
//           <li className="flex flex-col">
//             <label className="font-medium text-gray-600 text-sm">Completed Work:</label>
//             <input
//               type="text"
//               placeholder="Enter completed work"
//               name="completedWork"
//               value={data.completedWork}
//               onChange={onChange}
//               className="border border-gray-200 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm shadow-sm placeholder-gray-500"
//             />
//           </li>
//           {/* Work Status */}
//           <li className="flex flex-col">
//             <label className="font-medium text-gray-600 text-sm">Work Status:</label>
//             <div className="flex space-x-3 mt-2">
//               {["Completed", "Pending", "Not Started"].map((status) => (
//                 <label key={status} className="flex items-center text-sm">
//                   <input
//                     type="radio"
//                     name="workStatus"
//                     value={status}
//                     checked={data.workStatus === status}
//                     onChange={onChange}
//                     className="mr-1"
//                   />
//                   <span className="text-gray-600">{status}</span>
//                 </label>
//               ))}
//             </div>
//           </li>
//           {/* Submit Button */}
//           <li className="text-center mt-6">
//             <button
//               className="w-full bg-blue-500 text-white py-2 rounded-lg text-base font-medium hover:bg-blue-600 transition duration-200 ease-in-out shadow-md"
//               type="submit"
//             >
//               Update Task
//             </button>
//           </li>
//         </ul>
//       </form>
//     </div>
//    </div>
//   );
// }

// export default Update;



// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Update({ task, onClose, onUpdate }) {
//   const [formData, setFormData] = useState({
//     employeeName: task.employeeName,
//     task: task.task,
//     explainAboutTask: task.explainAboutTask,
//     date: task.date,
//     pendingWork: task.pendingWork,
//     completedWork: task.completedWork,
//     workStatus: task.workStatus,
//   });
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState({
//     employeeName: "",
//     task: "",
//     explainAboutTask: "",
//     date: "",
//     pendingWork: "",
//     completedWork: "",
//     workStatus: "Pending", 
//   });

//   const Navigate=useNavigate()
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:8080/api/update/${task._id}`, formData);
//       onUpdate(); // Trigger the refresh of task list
//       onClose(); // Close the dialog
      
//     } catch (err) {
//       console.log("Error updating task:", err);
//     }
//   };

//    const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:8080/api/getUpdate/${id}`, data);
//       if (response.status === 200) {
//         alert("Task updated successfully!"); 
//         navigate("/profile");
//       } else {
//         alert("Failed to update task. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error updating task", error);
//       alert("Error updating task. Please try again.");
//     }
//   };
//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/getOne/${id}`);
//         if (response.data && response.data.data) {
//           setData(response.data.data);
//         } else {
//           console.error("No data found for the provided ID.");
//           navigate("/table"); 
//         }
//       } catch (error) {
//         console.error("Error fetching task", error);
//       }
//     };
//     fetchTask();
//   }, [id, navigate]);
//   return (
//    <div className="p-3 bg-slate-50">
//      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-2">
//       <div className="flex flex-col space-y-2">
//         <label className="font-semibold">Employee Name:</label>
//         <input
//           type="text"
//           name="employeeName"
//           value={formData.employeeName}
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//       </div>
//       <div className="flex flex-col space-y-2">
//         <label className="font-semibold">Task:</label>
//         <input
//           type="text"
//           name="task"
//           value={formData.task}
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//       </div>
//       <div className="flex flex-col space-y-2">
//         <label className="font-semibold">Description:</label>
//         <textarea
//           name="explainAboutTask"
//           value={formData.explainAboutTask}
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//       </div>
//       <div className="flex flex-col space-y-2">
//         <label className="font-semibold">Date:</label>
//         <input
//           type="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//       </div>
//       <div className="flex flex-col space-y-2">
//         <label className="font-semibold">Pending Work:</label>
//         <input
//           type="text"
//           name="pendingWork"
//           value={formData.pendingWork}
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//       </div>
//       <div className="flex flex-col space-y-2">
//         <label className="font-semibold">Completed Work:</label>
//         <input
//           type="text"
//           name="completedWork"
//           value={formData.completedWork}
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//       </div>
//       <div className="flex flex-col space-y-2">
//         <label className="font-semibold">Work Status:</label>
//         <select
//           name="workStatus"
//           value={formData.workStatus}
//           onChange={handleChange}
//           className="p-2 border rounded"
//         >
//           <option value="Pending">Pending</option>
//           <option value="Completed">Completed</option>
//         </select>
//       </div>
//       <button type="submit" className="p-2 bg-blue-500 text-white rounded mt-4">
//         Update Task
//       </button>
//     </form>
//    </div>
//   );
// }

// export default Update;



// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function Update({ task, onClose, onUpdate }) {
//   const [formData, setFormData] = useState({
//     employeeName: task.employeeName,
//     task: task.task,
//     explainAboutTask: task.explainAboutTask,
//     date: task.date,
//     pendingWork: task.pendingWork,
//     completedWork: task.completedWork,
//     workStatus: task.workStatus,
//   });

//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Handle form field changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submission (task update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Send PUT request to update task
//       const response = await axios.put(
//         `http://localhost:8080/api/update/${task._id}`,
//         formData
//       );

//       if (response.status === 200) {
//         // Task successfully updated, close modal and refresh parent component's task list
//         onUpdate();
//         onClose();

//         // Redirect to profile page after update
//         navigate("/profile");
//       } else {
//         console.error("Failed to update task");
//       }
//     } catch (err) {
//       console.error("Error updating task:", err);
//     }
//   };

//   // Fetch task details on component mount
//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/getOne/${id}`
//         );
//         if (response.data && response.data.data) {
//           setFormData(response.data.data); // Populate the form data
//         } else {
//           console.error("No data found for the provided ID.");
//           navigate("/table"); // Redirect if task is not found
//         }
//       } catch (error) {
//         console.error("Error fetching task", error);
//         navigate("/table"); // Redirect in case of error
//       }
//     };

//     fetchTask();
//   }, [id, navigate]);

//   return (
//     <div className="p-3 bg-slate-50">
//       <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-2">
//         <div className="flex flex-col space-y-2">
//           <label className="font-semibold">Employee Name:</label>
//           <input
//             type="text"
//             name="employeeName"
//             value={formData.employeeName}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />
//         </div>
//         <div className="flex flex-col space-y-2">
//           <label className="font-semibold">Task:</label>
//           <input
//             type="text"
//             name="task"
//             value={formData.task}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />
//         </div>
//         <div className="flex flex-col space-y-2">
//           <label className="font-semibold">Description:</label>
//           <textarea
//             name="explainAboutTask"
//             value={formData.explainAboutTask}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />
//         </div>
//         <div className="flex flex-col space-y-2">
//           <label className="font-semibold">Date:</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />
//         </div>
//         <div className="flex flex-col space-y-2">
//           <label className="font-semibold">Pending Work:</label>
//           <input
//             type="text"
//             name="pendingWork"
//             value={formData.pendingWork}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />
//         </div>
//         <div className="flex flex-col space-y-2">
//           <label className="font-semibold">Completed Work:</label>
//           <input
//             type="text"
//             name="completedWork"
//             value={formData.completedWork}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />
//         </div>
//         <div className="flex flex-col space-y-2">
//           <label className="font-semibold">Work Status:</label>
//           <select
//             name="workStatus"
//             value={formData.workStatus}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           >
//             <option value="Pending">Pending</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </div>
//         <button type="submit" className="p-2 bg-blue-500 text-white rounded mt-4">
//           Update Task
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Update;
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
