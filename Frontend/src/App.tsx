import { useState } from "react";
import "./App.css";
import NavigationCom from "./components/NavigationCom";
import DashboardCom from "./components/dashboard/DashboardCom";

function App() {
  return (
    <>
      <div className="app-container">
        <div className="navbar-holder">NAV</div>
        <div className="content-holder">
          <DashboardCom />
        </div>
      </div>
    </>
  );
}

export default App;
