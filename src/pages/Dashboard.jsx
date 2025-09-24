import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Task from "../components/task";

const Dashboard = () => {
  const { logout, username } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log("Use Effect called");

    const fetchTasksAndUser = async () => {
      try {
        const res = await api.get("/api/tasks");
        let userTasks = [];

        res.data.forEach((element) => {
          if (element.user.username == username) {
            userTasks.push(element);
          }
        });

        setTasks(userTasks);

        const respUsers = await api.get("/api/users");

        respUsers.data.forEach((element) => {
          if (element.username == username) {
            setUser(element);
          }
        });
      } catch (err) {
        console.error(err);
        alert("Failed to fetch tasks");
      }
    };
    fetchTasksAndUser();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/tasks", {
        title: title,
        status: false,
        userId: user.id,
      });

      setTasks([...tasks, res.data]);
      setTitle("");
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      const taskList = tasks.filter((task) => task.id !== id);
      setTasks(taskList);
    } catch (error) {
      console.error(error);
      alert("Failed to delete the task");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/logout");
      logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="header">
        <h3 className="text">
          <strong>Welcome, {username.toUpperCase()}!</strong>
        </h3>
        <h3 className="text">Your Tasks</h3>
      </div>
      <form onSubmit={handleAddTask}>
        <div className="input">
          <input
            type="text"
            placeholder="New task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="submit-container">
          <button className="submit">Add</button>
        </div>
      </form>
      {tasks && (
        <div className="tasks-section">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      )}

      <div className="submit-container">
        <button className="submit" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
