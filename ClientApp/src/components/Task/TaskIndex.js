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
            <th>Projektstart</th>
            <th>Projektslut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.taskTime}</td>
              <td>{task.status ? "Klar" : "Ej klar"}</td>
              <td>
                      {new Intl.DateTimeFormat("sv-SE", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(new Date(task.taskStart))}
                    </td>
                    <td>
                      {new Intl.DateTimeFormat("sv-SE", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(new Date(task.taskEnd))}
                    </td>
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
      <Button variant="dark" onClick={() => handleCreateButtonClick()}>
        Skapa en uppgift
      </Button>
    </div>
  );
}

export default TaskIndex;
