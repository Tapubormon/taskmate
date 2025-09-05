import React, { useState, useEffect } from "react";
import { getRandomColor } from "../utils/color";

export default function TaskDetails() {
  const [subTasks, setSubTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDueDate(today);
  }, []);

  const addSubTask = () => {
    const color = getRandomColor();
    const newTask = {
      id: `subtask-${subTasks.length + 1}`,
      name: `New Sub Task`,
      color: color,
      isEditing: true, // immediately editable
    };
    setSubTasks([...subTasks, newTask]);
  };

  const finalizeSubTask = (id, value) => {
    setSubTasks(
      subTasks.map((task) =>
        task.id === id
          ? { ...task, name: value.trim() || "Untitled Subtask", isEditing: false }
          : task
      )
    );
  };

  return (
    <>
      <div>
        <h3 className="header-tile fs-4 pt-3">Task</h3>
        <div className="form-group d-flex flex-column">
          <input
            type="text"
            className="custom-input mb-3"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="custom-textarea"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3">
        <div className="d-flex align-items-center mb-3">
          <div className="fs-6 sub_list_info_spacing">List</div>
          <div>
            <select className="form-select form-select-sm">
              <option>One</option>
              <option>Two</option>
              <option>Three</option>
            </select>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="fs-6 sub_list_info_spacing">Due Date</div>
          <div>
            <input className="date_time" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
        </div>

        <div>
      <h4 className="right-section-subtask-menu">Subtasks:</h4>
      <ul className="list-group">
        {subTasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="task-list-item">
              <span
                className="icon-bg"
                style={{ backgroundColor: task.color }}
              ></span>
              {task.isEditing ? (
                <input
                  className="list-name-input"
                  defaultValue={task.name}
                  onBlur={(e) => finalizeSubTask(task.id, e.target.value)}
                  autoFocus
                />
              ) : (
                <span>{task.name}</span>
              )}
            </div>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div className="task-list-item">
            <i className="fa-solid fa-plus"></i>
            <button onClick={addSubTask} className="add-list-btn">
              Add Sub Task
            </button>
          </div>
        </li>
      </ul>
    </div>
      </div>

      <div className="action-buttons">
        <button type="button" className="btn btn-light w-100">Delete Task</button>
        <button type="button" className="btn btn-warning w-100">Save Changes</button>
      </div>
    </>
  );
}
