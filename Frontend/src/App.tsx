import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/LayoutCom";
import DashboardCom from "./components/dashboard/DashboardCom";
import ViewListCom from "./components/list/ViewListCom/ViewListCom";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<DashboardCom />} />
				<Route path="/list" element={<ViewListCom />} />
				<Route path="/help" element={<div />} />
			</Route>
		</Routes>
	);
}

export default App;
