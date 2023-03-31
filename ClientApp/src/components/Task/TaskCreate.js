import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

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

  return (
    <div>
      <h2>Create Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="taskTime" className="mb-3">
          <Form.Label>Task Time:</Form.Label>
          <Form.Control
            type="number"
            name="taskTime"
            value={task.taskTime}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="status" className="mb-3">
          <Form.Label>Status:</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value={true}>Completed</option>
            <option value={false}>Incomplete</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit" style={{ marginRight: "8px" }}>Create Task</Button>
        <Link to="/api/tasks">
          <Button className="ml-2" variant="secondary">Cancel</Button>
        </Link>
      </Form>
    </div>
  );
}

export default TaskCreate;
