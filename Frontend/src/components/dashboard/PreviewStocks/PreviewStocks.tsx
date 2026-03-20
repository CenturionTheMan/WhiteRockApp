// import styles from "./PreviewStocks.modules.css";
import React, { useState } from "react";
import type StockInfo from "./../../../interfaces/StockInfo";

const PreviewStocks = ({ stocksInfo }: { stocksInfo: StockInfo[] }) => {
	return (
		<div>
			{stocksInfo.map((si) => (
				<Card key={si.ticker} info={si} />
			))}
		</div>
	);
};

const Card = ({ info }: { info: StockInfo }) => {
	return <div></div>;
};

export default PreviewStocks;
