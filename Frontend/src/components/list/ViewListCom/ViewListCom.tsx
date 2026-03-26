import styles from "./ViewListCom.module.css";

import SignalTable from "../SignalTable/SignalTable";

const ViewListCom = () => {
	return (
		<div className={styles.container}>
			<span className="text-size2 text-style2">WhiteRock Next Gen AI</span>
			<span className="text-size4 text-style4">Real-time AI analysis of global assets. Signals are updated every hour.</span>
			<SignalTable />
		</div>
	);
};

export default ViewListCom;
