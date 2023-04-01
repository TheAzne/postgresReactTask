import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import TaskDelete from "./TaskDelete";
import { Button, Form, Table } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

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

  const handleStatusChange = (eventKey) => {
    const isCompleted = eventKey === "true";
    setEditedTask((prevTask) => ({ ...prevTask, status: isCompleted }));
  };
  

  return (
    <div>
      <h2>Projekt detaljer</h2>
      {task ? (
        editing ? (
          <div>
            <Form>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Namn:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editedTask.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="description" className="mb-3">
                <Form.Label>Beskrivning:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={editedTask.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="taskTime" className="mb-3">
                <Form.Label>Projekt tid (timmar):</Form.Label>
                <Form.Control
                  type="number"
                  name="taskTime"
                  value={editedTask.taskTime}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="status" className="mb-3">
                <Form.Label>Status:</Form.Label>
                <Dropdown onSelect={handleStatusChange}>
                  <Dropdown.Toggle variant="primary">
                    {editedTask.status ? (
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
                    <Dropdown.Item eventKey="true">
                      Klar
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="false">
                     Ej klar
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Form>
            <Button
              variant="success"
              style={{ marginRight: "8px" }}
              onClick={handleSaveClick}
            >
              Spara
            </Button>
            <Button variant="secondary" onClick={handleCancelClick}>
              Avbryt
            </Button>
          </div>
        ) : (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Namn</th>
                  <th>Beskrivning</th>
                  <th>Projekt tid (timmar)</th>
                  <th>Status</th>
                  <th>Uppdaterad</th>
                  <th>Skapad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.taskTime}</td>
                  <td>{task.status ? "Completed" : "Incomplete"}</td>
                  <td>{new Date(task.updatedAt).toLocaleString()}</td>
                  <td>{new Date(task.createdAt).toLocaleString()}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              style={{ marginRight: "8px" }}
              variant="primary"
              onClick={handleEditClick}
            >
              Ändra
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
