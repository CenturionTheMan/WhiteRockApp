import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/LayoutCom";
import DashboardCom from "./components/dashboard/DashboardCom";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<DashboardCom />} />
				<Route path="/list" element={<div />} />
				<Route path="/help" element={<div />} />
			</Route>
		</Routes>
	);
}

export default App;
