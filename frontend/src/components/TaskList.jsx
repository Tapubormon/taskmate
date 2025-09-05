import React from "react";

export default function TaskList() {
  return (
    <>
      <div className="d-flex align-items-center mb-5">
        <h1 className="main-task-tile">Today</h1>
        <span className="task-count">5</span>
      </div>

      <div className="px-3">
        <ul className="list-group">
          {["First", "Second", "Third"].map((label, i) => (
            <li key={i} className="task-list-group list-group-item d-flex justify-content-between align-items-center">
              <div>
                <input className="form-check-input me-1" type="checkbox" id={`checkbox${i}`} />
                <label className="form-check-label" htmlFor={`checkbox${i}`}>{label} checkbox</label>
              </div>
              <i className="fa-solid fa-angle-right"></i>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
