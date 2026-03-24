import "./App.css";
import DashboardCom from "./components/dashboard/DashboardCom";
import NavigationCom from "./components/navbar/NavigationCom/NavigationCom";

function App() {
  return (
    <>
      <div className="app-container">
        <div className="navbar-holder">
          <NavigationCom />
        </div>
        <div className="content-holder">
          <DashboardCom />
        </div>
      </div>
    </>
  );
}

export default App;
