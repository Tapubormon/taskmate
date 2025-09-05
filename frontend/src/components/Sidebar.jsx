import React, { useState } from "react";
import { getRandomColor } from "../utils/color";

export default function Sidebar() {
  const [lists, setLists] = useState([]);
  const [listCounter, setListCounter] = useState(0);

  const addList = () => {
    const color = getRandomColor();
    const newList = {
      id: `list-${listCounter + 1}`,
      name: `New List ${listCounter + 1}`,
      color: color,
      isEditing: true, // immediately allow edit
    };
    setLists([...lists, newList]);
    setListCounter(listCounter + 1);
  };

  const finalizeName = (id, value) => {
    setLists(
      lists.map((list) =>
        list.id === id
          ? { ...list, name: value.trim() || "Untitled List", isEditing: false }
          : list
      )
    );
  };

  return (
    <>
      <div>
        <h3 className="header-tile fs-4 pt-3">Menu</h3>
        <div className="search-container mb-5">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="pb-4">
        <h6 className="title-sub">TASKS</h6>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="task-list-item">
              <i
                className="fa-solid fa-angles-right"
                style={{ color: "#9a9393" }}
              ></i>
              Upcoming
            </div>
            <span className="badge rounded-pill">14</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="task-list-item">
              <i
                className="fa-solid fa-list-check"
                style={{ color: "#9a9393" }}
              ></i>
              Today
            </div>
            <span className="badge rounded-pill">14</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="task-list-item">
              <i
                className="fa-solid fa-calendar-days"
                style={{ color: "#9a9393" }}
              ></i>
              Calendar
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div
              className="task-list-item"
              onClick={() => window.dispatchEvent(new Event("createSticky"))} // no extra button
            >
              <i
                className="fa-solid fa-note-sticky"
                style={{ color: "#9a9393" }}
              ></i>
              Sticky wall
            </div>
          </li>
        </ul>
      </div>

      <div className="pb-4">
      <h6 className="title-sub">LISTS</h6>
      <ul className="list-group">
        {lists.map((list) => (
          <li
            key={list.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="task-list-item">
              <span
                className="icon-bg"
                style={{ backgroundColor: list.color }}
              ></span>
              {list.isEditing ? (
                <input
                  className="list-name-input"
                  defaultValue={list.name}
                  onBlur={(e) => finalizeName(list.id, e.target.value)}
                  autoFocus
                />
              ) : (
                <span>{list.name}</span>
              )}
            </div>
            <span className="badge rounded-pill">0</span>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div className="task-list-item">
            <i className="fa-solid fa-plus"></i>
            <button onClick={addList} className="add-list-btn">
              Add New List
            </button>
          </div>
        </li>
      </ul>
    </div>
    </>
  );
}
