import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Task Time:
          <input
            type="number"
            name="taskTime"
            value={task.taskTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Status:
          <select name="status" value={task.status} onChange={handleChange}>
            <option value={true}>Completed</option>
            <option value={false}>Incomplete</option>
          </select>
        </label>
        <br />
        <button type="submit">Create Task</button>
        <Link to="/api/tasks">Cancel</Link>
      </form>
    </div>
  );
}

export default TaskCreate;
