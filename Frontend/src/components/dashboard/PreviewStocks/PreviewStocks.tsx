import styles from "./PreviewStocks.module.css";
import React, { useState } from "react";
import type StockInfo from "./../../../interfaces/StockInfo";

const PreviewStocks = ({ stocksInfo }: { stocksInfo: StockInfo[] }) => {
	return (
		<div className={`${styles.previewHolder} flex-row-center`}>
			{stocksInfo.map((si) => (
				<Card key={si.ticker} info={si} />
			))}
		</div>
	);
};

const Card = ({ info }: { info: StockInfo }) => {
	const diff = (info.values[0] ?? 0) - (info.values[info.values.length - 1] ?? 0);
	return (
		<div className={styles.cardHolder}>
			<div className="text-style2 text-size2">{info.ticker}</div>
			<span>{info.subtext}</span>
			<div className={`${styles.cardLastPrice} flex-row-center`}>
				<div>{info.values.at(-1)}</div>
				<span>{diff > 0 ? `+${diff.toFixed(2)}%` : `${diff.toFixed(2)}%`}</span>
			</div>
		</div>
	);
};

export default PreviewStocks;
