import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/LayoutCom";
import DashboardCom from "./components/dashboard/DashboardCom";
import ViewListCom from "./components/signals/SignalsCom/SignalsCom";
import HelpCom from "./components/help/HelpCom";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardCom />} />
        <Route path="/details" element={<ViewListCom />} />
        <Route path="/help" element={<HelpCom />} />
      </Route>
    </Routes>
  );
}

export default App;
