import React from 'react';
import Button from "react-bootstrap/Button";

const TaskDelete = ({ taskId, onTaskDeleted }) => {
  const taskDelete = async () => {
    try {
      const response = await fetch(`/api/Tasks/${taskId}`, { method: 'DELETE' });

      if (response.ok) {
        onTaskDeleted(taskId);
        alert('Task deleted successfully.');
      } else {
        throw new Error(`Error deleting task: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  return (
    <Button variant="danger" onClick={taskDelete} className="delete-task-button">
      Delete Task
    </Button>

  );
};

export default TaskDelete;
