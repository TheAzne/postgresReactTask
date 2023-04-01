import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import TaskCreate from "./TaskCreate";

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
  const handleCreateButtonClick = () => {
    navigate("/tasks/create");
  };

  return (
    <div>
      <h2 className="mb-5">Projekt lista</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Namn</th>
            <th>Beskrivning</th>
            <th>Uppgiftstid </th>
            <th>Status</th>
            <th>Uppdaterad</th>
            <th>Skapad</th>
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
              <td>{new Date(task.updatedAt).toLocaleString()}</td>
              <td>{new Date(task.createdAt).toLocaleString()}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleButtonClick(task.id)}
                >
                  Visa detalj
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="info" onClick={() => handleCreateButtonClick()}>
        Skapa en uppgift
      </Button>
    </div>
  );
}

export default TaskIndex;
