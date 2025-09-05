import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskDetails from "./components/TaskDetails.jsx";
import StickyWall from "./components/StickyWall.jsx";

export default function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 menu vh-100">
          <Sidebar />
        </div>

        <div className="col-lg-5 vh-100">
          <TaskList />
        </div>

        <div className="col-lg-4 menu vh-100">
          <TaskDetails />
        </div>
      </div>

      <StickyWall />
    </div>
  );
}
