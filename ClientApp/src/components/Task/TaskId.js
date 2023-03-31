import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import TaskDelete from "./TaskDelete";

function TaskId() {
  const [task, setTask] = useState(null);
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      fetch(`/api/tasks/${id}`)
        .then((res) => res.json())
        .then((data) => setTask(data))
        .catch((error) => console.error(error));
    }
    fetchTasks();
  }, [id]);

  const handleChange = (e) => {
    const value =
      e.target.name === "status" ? e.target.value === "true" : e.target.value;
    setEditedTask({ ...editedTask, [e.target.name]: value });
  };

  const handleEditClick = () => {
    setEditedTask(task);
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
      });

      if (!response.ok) {
        throw new Error("Failed to update the task");
      }

      const updatedTask = await response.json();
      setTask(updatedTask);
      setEditing(false);
      navigate(`/tasks/${updatedTask.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskDeleted = () => {
    navigate('/tasks');
  };

  return (
    <div>
      <h2>Task Details</h2>
      {task ? (
        editing ? (
          <div>
            <form>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={editedTask.name}
                onChange={handleChange}
              />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                id="description"
                value={editedTask.description}
                onChange={handleChange}
              />
              <label htmlFor="taskTime">Task Time:</label>
              <input
                type="number"
                name="taskTime"
                id="taskTime"
                value={editedTask.taskTime}
                onChange={handleChange}
              />

              <label htmlFor="status">Status:</label>
              <select name="status" value={task.status} onChange={handleChange}>
                <option value={true}>Completed</option>
                <option value={false}>Incomplete</option>
              </select>
            </form>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Task Time</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.taskTime}</td>
                  <td>{task.status ? "Completed" : "Incomplete"}</td>
                  <td>{new Date(task.createdAt).toLocaleString()}</td>
                  <td>{new Date(task.updatedAt).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            <button onClick={handleEditClick}>Edit</button>
            <TaskDelete taskId={task.id} onTaskDeleted={handleTaskDeleted} />
          </div>
        )
      ) : (
        <p>Loading task...</p>
      )}
    </div>
  );
}

export default TaskId;
