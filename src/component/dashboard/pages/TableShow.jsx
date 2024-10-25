// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FaRegEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import Update from "./Update";
// function TableShow() {
//   const [taskShow, setTaskShow] = useState([]);
//   const navigate = useNavigate();
//   const[Selected,setSelected]=useState()
//   // Fetch task data on component mount
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await axios.get("http://localhost:8080/api/getTaskData");
//         // Filter out tasks that have any empty or null values
//         const filteredTasks = res.data.data.filter(
//           (task) => task.employeeName && task.task && task.explainAboutTask && task.date
//         );
//         setTaskShow(filteredTasks);
//       } catch (err) {
//         console.log("Error fetching tasks", err);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Function to handle task deletion
//   const deleteTask = async (_id) => {
//     try {
//       const response = await axios.delete(`http://localhost:8080/api/delete/${_id}`);

//       if (response.status === 200) {
//         setTaskShow((prevTasks) => prevTasks.filter((task) => task._id !== _id));
//       }
//     } catch (err) {
//       console.error("Error deleting task:", err);
//     }
//   };

//   const handleEditClick = (_id) => {
//     setSelected()
//     navigate(`/edit/${_id}`);
//   };

//   return (
//     <div className="min-h-screen m-20">
//       <div className="flex justify-center items-center bg-blue-600 text-white py-3 rounded-md mb-6 shadow-lg hover:bg-blue-700 transition-all duration-300">
//         <button className="font-semibold text-xl">Task Manager</button>
//       </div>

//       <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
//         <table className="min-w-full table-auto text-xs md:text-base text-gray-700 border-collapse">
//           <thead className="bg-blue-500 text-white">
//             <tr>
//               <th className="px-6 py-3 text-left font-semibold">Roll No</th>
//               <th className="px-6 py-3 text-left font-semibold">Employee Name</th>
//               <th className="px-6 py-3 text-left font-semibold">Task</th>
//               <th className="px-6 py-3 text-left font-semibold">Description</th>
//               <th className="px-6 py-3 text-left font-semibold">Date</th>
//               <th className="px-6 py-3 text-left font-semibold">Pending Work</th>
//               <th className="px-6 py-3 text-left font-semibold">Completed Work</th>
//               <th className="px-6 py-3 text-left font-semibold">Work Status</th>
//               <th className="px-6 py-3 text-left font-semibold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {taskShow.length > 0 ? (
//               taskShow.map((task, index) => (
//                 <tr
//                   key={task._id}
//                   className={`hover:bg-gray-200 text-xs ${
//                     index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
//                   }`}
//                 >
//                   <td className="px-6 py-4 font-medium">{index + 1}</td>
//                   <td className="px-6 py-4">{task.employeeName}</td>
//                   <td className="px-6 py-4">{task.task}</td>
//                   <td className="px-6 py-4">{task.explainAboutTask}</td>
//                   <td className="px-6 py-4">{task.date}</td>
//                   <td className="px-6 py-4">{task.pendingWork}</td>
//                   <td className="px-6 py-4">{task.completedWork}</td>
//                   <td className="px-6 py-4">{task.workStatus}</td>
//                   <td className="px-6 py-4 flex space-x-4 justify-center">
//                     <FaRegEdit
//                       className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-300"
//                       onClick={() => handleEditClick(task._id)}
//                     />
//                     <MdDelete
//                       className="text-red-500 cursor-pointer hover:text-red-700 transition duration-300"
//                       onClick={() => deleteTask(task._id)}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center py-4 text-gray-600">
//                   No tasks found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       {/* Conditionally render the Update form */}
//       {Selected && (
//         <div className="mt-8">
//           <Update />
//         </div>
//       )}
//     </div>
//   );
// }

// export default TableShow;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Dialog } from "primereact/dialog"; // Importing Dialog from PrimeReact
import Update from "./Update";
function TableShow() {
  const [taskShow, setTaskShow] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // To store the task to edit
  const [showDialog, setShowDialog] = useState(false); // To handle dialog visibility

  // Fetch task data on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks function
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/getTaskData");
      const filteredTasks = res.data.data.filter(
        (task) => task.employeeName && task.task && task.explainAboutTask && task.date
      );
      setTaskShow(filteredTasks);
    } catch (err) {
      console.log("Error fetching tasks", err);
    }
  };

  // Function to handle task deletion
  const deleteTask = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/delete/${_id}`);
      if (response.status === 200) {
        setTaskShow((prevTasks) => prevTasks.filter((task) => task._id !== _id));
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Function to handle edit click
  const handleEditClick = (task) => {
    setSelectedTask(task); // Set the task to be edited
    setShowDialog(true); // Open the dialog
  };

  // Callback function after updating the task
  const handleUpdate = () => {
    setShowDialog(false); // Close the dialog
    fetchTasks(); // Refresh tasks after updating
  };

  return (
    <div className="min-h-screen m-20">
      <div className="flex justify-center items-center bg-blue-600 text-white py-3 rounded-md mb-6 shadow-lg hover:bg-blue-700 transition-all duration-300">
        <button className="font-semibold text-xl">Task Manager</button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full table-auto text-xs md:text-base text-gray-700 border-collapse">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Roll No</th>
              <th className="px-6 py-3 text-left font-semibold">Employee Name</th>
              <th className="px-6 py-3 text-left font-semibold">Task</th>
              <th className="px-6 py-3 text-left font-semibold">Description</th>
              <th className="px-6 py-3 text-left font-semibold">Date</th>
              <th className="px-6 py-3 text-left font-semibold">Pending Work</th>
              <th className="px-6 py-3 text-left font-semibold">Completed Work</th>
              <th className="px-6 py-3 text-left font-semibold">Work Status</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {taskShow.length > 0 ? (
              taskShow.map((task, index) => (
                <tr
                  key={task._id}
                  className={`hover:bg-gray-200 text-xs ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  }`}
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">{task.employeeName}</td>
                  <td className="px-6 py-4">{task.task}</td>
                  <td className="px-6 py-4">{task.explainAboutTask}</td>
                  <td className="px-6 py-4">{task.date}</td>
                  <td className="px-6 py-4">{task.pendingWork}</td>
                  <td className="px-6 py-4">{task.completedWork}</td>
                  <td className="px-6 py-4">{task.workStatus}</td>
                  <td className="px-6 py-4 flex space-x-4 justify-center">
                    <FaRegEdit
                      className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-300"
                      onClick={() => handleEditClick(task)}
                    />
                    <MdDelete
                      className="text-red-500 cursor-pointer hover:text-red-700 transition duration-300"
                      onClick={() => deleteTask(task._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-600">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Dialog for Editing */}
      <Dialog
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        header="Update Task"
        modal
        style={{ width: "50vw" }}
      >
        {selectedTask && (
          <Update task={selectedTask} onClose={() => setShowDialog(false)} onUpdate={handleUpdate} />
        )}
      </Dialog>
    </div>
  );
}

export default TableShow;
