import type { SignalCall } from "../../../interfaces/SignalModel";
import styles from "./SignalTable.module.css";
import sortIcon from "./../../../assets/sort.svg";
import sortActIcon from "./../../../assets/sortActive.svg";
import filterIcon from "./../../../assets/filter.svg";
import filterActIcon from "./../../../assets/filterActive.svg";
import { useEffect, useState } from "react";
import SimpleChart from "../../common/SimpleChart/SimpleChart";
import ProgressBarCom from "../../common/ProgressBarCom/ProgressBarCom";

export interface TableRowData {
	ticker: string;
	call: SignalCall;
	confidence: number;
	lastPrices: number[];
}

const mockTableData: TableRowData[] = [
	{
		ticker: "AAPL",
		call: "BUY",
		confidence: 0.87,
		lastPrices: [172.1, 173.5, 174.2, 175.8, 176.3],
	},
	{
		ticker: "TSLA",
		call: "SELL",
		confidence: 0.73,
		lastPrices: [245.3, 243.9, 242.1, 240.7, 238.4],
	},
	{
		ticker: "AMZN",
		call: "BUY",
		confidence: 0.91,
		lastPrices: [132.4, 133.2, 134.8, 135.6, 136.9],
	},
	{
		ticker: "GOOGL",
		call: "HOLD",
		confidence: 0.65,
		lastPrices: [125.1, 124.9, 125.3, 125.0, 124.7],
	},
	{
		ticker: "MSFT",
		call: "BUY",
		confidence: 0.89,
		lastPrices: [310.2, 312.5, 315.1, 317.6, 320.0],
	},
	{
		ticker: "NVDA",
		call: "BUY",
		confidence: 0.94,
		lastPrices: [450.5, 455.2, 460.8, 468.3, 472.6],
	},
	{
		ticker: "META",
		call: "SELL",
		confidence: 0.68,
		lastPrices: [290.1, 288.7, 287.3, 285.0, 283.4],
	},
	{
		ticker: "NFLX",
		call: "HOLD",
		confidence: 0.59,
		lastPrices: [410.0, 412.3, 411.5, 409.8, 408.6],
	},
	{
		ticker: "AMD",
		call: "BUY",
		confidence: 0.82,
		lastPrices: [102.5, 104.0, 105.6, 107.2, 108.9],
	},
	{
		ticker: "INTC",
		call: "SELL",
		confidence: 0.71,
		lastPrices: [36.2, 35.8, 35.1, 34.6, 34.0],
	},
];

const CalcPriceChangeStr = (prices: number[]) => {
	const diff = CalcPriceChange(prices);
	return diff >= 0 ? `+${diff.toFixed(2)}%` : `${diff.toFixed(2)}%`;
};

const CalcPriceChange = (prices: number[]) => {
	const diff = (prices[prices.length - 1] ?? 0) - (prices[0] ?? 0);
	return diff;
};

const GetStyleColor = (val: number) => {
	if (val > 0)
		return "#75ff9e"; // --col-primary1
	else if (val < 0)
		return "#ffb4ab"; // --col-negative1
	else return "#ffdf9e"; // --col-neutral1
};

const GetCallColor = (call: SignalCall, alpha = 1) => {
	if (call == "BUY")
		return `rgba(117, 255, 158, ${alpha})`; // --col-primary1
	else if (call == "SELL")
		return `rgba(255, 180, 171, ${alpha})`; // --col-negative1
	else return `rgba(255, 223, 158, ${alpha})`; // --col-neutral1
};

const GetConfidenceColor = (confidence: number, alpha = 1) => {
	if (confidence >= 0.8)
		return `rgba(117, 255, 158, ${alpha})`; // --col-primary1
	else if (confidence <= 0.6)
		return `rgba(255, 180, 171, ${alpha})`; // --col-negative1
	else return `rgba(255, 223, 158, ${alpha})`; // --col-neutral1
};

const SignalTable = () => {
	const [rows, setRows] = useState<TableRowData[]>([]);

	useEffect(() => {
		setRows(mockTableData);
	}, []);

	return (
		<>
			<div className={styles.filters}>
				<div className={styles.filterBtn}>
					<img src={filterIcon} />
					<span className="text-size4 text-style3">Filter</span>
				</div>
				<div className={styles.filterBtn}>
					<img src={sortIcon} />
					<span className="text-size4 text-style3">Sort</span>
				</div>
			</div>
			<div className={styles.tableWrapper}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>ASSET</th>
							<th>LAST PRICE</th>
							<th>24H CHANGE</th>
							<th>AI SIGNAL</th>
							<th>CONFIDENCE</th>
							<th>MOMENTUM</th>
						</tr>
					</thead>

					<tbody>
						{rows.map((r) => (
							<tr key={r.ticker}>
								<td className="text-style2 text-size3">{r.ticker}</td>
								<td className="text-style3 text-size3">{`$${r.lastPrices.at(-1) ?? "??"}`}</td>
								<td
									className="text-style3 text-size3"
									style={{
										color: GetStyleColor(CalcPriceChange(r.lastPrices)),
									}}
								>
									{CalcPriceChangeStr(r.lastPrices)}
								</td>
								<td>
									<div
										style={{
											color: GetCallColor(r.call, 1),
											backgroundColor: GetCallColor(r.call, 0.1),
											borderStyle: "solid",
											borderWidth: "1px",
										}}
										className={`text-style2 text-size4 ${styles.TableAlSignal}`}
									>
										{r.call}
									</div>
								</td>
								<td>
									<ProgressBarCom value={r.confidence * 100} fillColor={GetConfidenceColor(r.confidence)} />
								</td>
								<td>
									<SimpleChart data={r.lastPrices} dot={false} type="bump" color={GetStyleColor(CalcPriceChange(r.lastPrices))} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default SignalTable;
