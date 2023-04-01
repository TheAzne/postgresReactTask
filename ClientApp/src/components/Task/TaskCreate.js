import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

function TaskCreate() {
  const [task, setTask] = useState({
    name: "",
    description: "",
    taskTime: 0,
    status: false,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isCompleted = event.target.status.value === "true";
    const newTask = {
      name: event.target.name.value,
      description: event.target.description.value,
      taskTime: event.target.taskTime.value,
      status: isCompleted,
    };
    fetch("/api/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        navigate(`/tasks/${data.id}`); // navigate to the task details page
      })
      .catch((error) => console.error(error));
  };

  const handleStatusChange = (eventKey) => {
    const isCompleted = eventKey === "true";
    setTask((prevTask) => ({ ...prevTask, status: isCompleted }));
  };
  

  return (
    <div>
      <h2>Skapa projekt</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Namn:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Beskrivning:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="taskTime" className="mb-3">
          <Form.Label>Projekt tid:</Form.Label>
          <Form.Control
            type="number"
            name="taskTime"
            value={task.taskTime}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="status" className="mb-4">
          <Form.Label>Status:</Form.Label>
          <Dropdown onSelect={handleStatusChange}>
            <Dropdown.Toggle variant="primary">
              {task.status ? (
                <>
                  <i className="bi bi-check"></i> Klar
                </>
              ) : (
                <>
                  <i className="bi bi-slash-circle"></i> Ej klar
                </>
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="true"> Klar</Dropdown.Item>
              <Dropdown.Item eventKey="false"> Ej klar</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Button variant="success" type="submit" style={{ marginRight: "8px" }}>
          Skapa
        </Button>
        <Link to="/tasks">
          <Button className="ml-2" variant="secondary">
            Avbryt
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default TaskCreate;
