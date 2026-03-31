import styles from "./SignalsCom.module.css";

import SignalTable, { type TableRowData } from "../SignalTableCom/SignalTableCom";
import StockDetails from "../StockDetailsCom/StockDetailsCom";
import { useCallback, useEffect, useRef, useState } from "react";
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

	const handleOnSelected = useCallback((ticker: string) => {
		onSelected(ticker);
	}, []);

	useEffect(() => {
		const tickerFromUrl = getTickerFromUrl(location);

		if (tickerFromUrl && tickerFromUrl !== selected) {
			onSelected(tickerFromUrl);
		}
	}, [location.search]);

	useEffect(() => {
		if (!selected) return;

		const timeout = setTimeout(() => {
			stockDetailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
		}, 50); // small delay for DOM to update

		return () => clearTimeout(timeout);
	}, [selected]);

	return (
		<div className={styles.container}>
			<span className="text-size2 text-style2">WhiteRock Next Gen AI</span>
			<span className="text-size4 text-style4">Real-time AI analysis of global assets. Signals are updated every hour.</span>
			<SignalTable fnOnSelected={handleOnSelected} />
			<div ref={stockDetailsRef} className={`${styles.stockDetailsHolder} ${selected ? styles.show : ""}`}>
				<StockDetails ticker={selected} />
			</div>
		</div>
	);
};

export default SignalsCom;
