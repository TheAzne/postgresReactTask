import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TaskIndex() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((error) => console.error(error));
    }
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
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
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.taskTime}</td>
              <td>{task.status ? "Completed" : "Incomplete"}</td>
              <td>{new Date(task.createdAt).toLocaleString()}</td>
              <td>{new Date(task.updatedAt).toLocaleString()}</td>
              <td>
                <Link to={`/tasks/${task.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskIndex;
