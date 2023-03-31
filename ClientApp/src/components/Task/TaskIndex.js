import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Form, Table} from "react-bootstrap";

function TaskIndex() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((error) => console.error(error));
    }
    fetchTasks();
  }, []);

  const handleButtonClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  return (
    <div>
      <h2>Task List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Task Time</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
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
                <Button variant="primary" onClick={() => handleButtonClick(task.id)}>View Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TaskIndex;
