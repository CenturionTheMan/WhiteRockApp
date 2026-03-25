import { Outlet } from "react-router-dom";
import NavigationCom from "./navbar/NavigationCom/NavigationCom";

function LayoutCom() {
	return (
		<div className="app-container">
			<NavigationCom />

			<div className="content-holder">
				<Outlet /> {/* This is wherere content is pasted */}
			</div>
		</div>
	);
}

export default LayoutCom;
