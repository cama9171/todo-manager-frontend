import { useEffect, useState } from "react";
import api from "../api/axios";

const Task = ({ task, handleDeleteTask }) => {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [user, setUser] = useState(task.user);

  const statusString = status ? "Done" : "Pending";

  const onStatusChange = async () => {
    try {
      const resp = await api.put(`/api/tasks/${task.id}`, {
        title: title,
        status: !status,
        userId: user.id,
      });

      setStatus(!status);
    } catch (error) {
      console.error(error);
      alert("Failed to update the status of the task");
    }
  };

  return (
    <div className="task-item">
      <div className="task-desc-status">
        <span className="task-desc">{title}</span>
        <span className={`task-status ${statusString.toLowerCase()}`}>
          {statusString}
        </span>
      </div>
      <div className="task-actions">
        <button className="status-btn" onClick={onStatusChange}>
          {status ? "Mark as Pending" : "Mark as Done"}
        </button>
        <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
