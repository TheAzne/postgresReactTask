import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import TaskDelete from "./TaskDelete";
import {Button, Form, Table} from "react-bootstrap";

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
    navigate("/tasks");
  };

  return (
    <div>
      <h2>Task Details</h2>
      {task ? (
        editing ? (
          <div>
            <Form>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editedTask.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="description" className="mb-3">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={editedTask.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="taskTime" className="mb-3">
                <Form.Label>Task Time:</Form.Label>
                <Form.Control
                  type="number"
                  name="taskTime"
                  value={editedTask.taskTime}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="status" className="mb-3">
                <Form.Label>Status:</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={editedTask.status}
                  onChange={handleChange}
                >
                  <option value={true}>Completed</option>
                  <option value={false}>Incomplete</option>
                </Form.Control>
              </Form.Group>
            </Form>
            <Button variant="success"  style={{ marginRight: "8px" }} onClick={handleSaveClick}>Save</Button>
            <Button variant="secondary"  onClick={handleCancelClick}>Cancel</Button>
          </div>
        ) : (
          <div>
            <Table striped bordered hover>
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
            </Table>
            <Button
              style={{ marginRight: "8px" }}
              variant="primary"
              onClick={handleEditClick}
            >
              Edit
            </Button>
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
