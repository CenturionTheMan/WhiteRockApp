import styles from "./SignalsCom.module.css";

import SignalTable from "../SignalTableCom/SignalTableCom";
import StockDetails from "../StockDetailsCom/StockDetails";
import { useEffect, useRef, useState } from "react";
import { useLocation, type Location } from "react-router-dom";

const getTickerFromUrl = (location: Location) => {
	const queryParams = new URLSearchParams(location.search);
	const ticker = queryParams.get("ticker") ?? "";
	return ticker;
};

const SignalsCom = () => {
	const location = useLocation();
	const stockDetailsRef = useRef<HTMLDivElement>(null);
	const [selected, onSelected] = useState<string>(getTickerFromUrl(location) ?? "");

	const scrollView = () => {
		console.log("?", stockDetailsRef, " | ", selected);
		if (stockDetailsRef.current && selected) {
			stockDetailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	const handleOnSelected = (ticker: string) => {
		onSelected(ticker);
		if (ticker === selected) {
			setTimeout(() => {
				scrollView();
			}, 0);
		}
	};

	useEffect(() => {
		if (selected) {
			scrollView();
		}
	}, [selected]);

	return (
		<div className={styles.container}>
			<span className="text-size2 text-style2">WhiteRock Next Gen AI</span>
			<span className="text-size4 text-style4">Real-time AI analysis of global assets. Signals are updated every hour.</span>
			<SignalTable fnOnSelected={handleOnSelected} fnOnRowsLoaded={() => scrollView()} />
			<div ref={stockDetailsRef} className={`${styles.stockDetailsHolder} ${selected ? styles.show : ""}`}>
				<StockDetails ticker={selected} />
			</div>
		</div>
	);
};

export default SignalsCom;
