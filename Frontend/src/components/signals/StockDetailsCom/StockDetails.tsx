import { useLocation } from "react-router-dom";
import styles from "./StockDetailsCom.module.css";
import type { SignalCall } from "../../../interfaces/SignalModel";
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip } from "recharts";
import type { CurveType } from "recharts/types/shape/Curve";
import type { DotType } from "recharts/types/util/types";
import { sign } from "chart.js/helpers";
import { useStockByTicker } from "../../../hooks/useStocks";
import { useSignalsByTicker, useSignalsLatest } from "../../../hooks/useSignals";

export type StockDetailsData = {
	ticker: string;
	description: string;
	prices: {
		date: Date;
		price: number;
	}[];
	calls: {
		date: Date;
		signal: SignalCall;
	}[];
};

const GetStyleColor = (val: number) => {
	if (val > 0)
		return "#75ff9e"; // --col-primary1
	else if (val < 0)
		return "#ffb4ab"; // --col-negative1
	else return "#ffdf9e"; // --col-neutral1
};

const GetCallColor = (signal: string) => {
	if (signal === "BUY") return GetStyleColor(1);
	else if (signal === "SELL") return GetStyleColor(-1);
	else return GetStyleColor(0);
};

const createChart = (data: StockDetailsData) => {
	const buildChartData = (data: StockDetailsData) => {
		return data.prices.map((p) => {
			const call = data.calls.find((c) => c.date.getTime() === p.date.getTime());

			return {
				...p,
				signal: call?.signal ?? null,
			};
		});
	};

	const getTrendColor = (prices: { price: number }[]) => {
		const first = prices[0].price;
		const last = prices[prices.length - 1].price;
		return GetStyleColor(last - first);
	};

	const CustomDot = (props: any) => {
		const { cx, cy, payload } = props;
		if (!payload.signal) return null;
		const color = GetCallColor(payload.signal);
		return <circle cx={cx} cy={cy} r={6} fill={color} stroke="#000" strokeWidth={1} />;
	};

	const CustomTooltip = ({ active, payload }: any) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			const color = GetCallColor(data.signal);

			return (
				<div style={{ background: "#222", padding: 10, borderRadius: 6 }}>
					<div className="text-style3 text-size4">{new Date(data.date).toLocaleDateString()}</div>
					<div className="text-style3 text-size4">Price: ${data.price}</div>
					{data.signal && (
						<div className="text-style3 text-size4" style={{ color: color }}>
							Signal: {data.signal}
						</div>
					)}
				</div>
			);
		}

		return null;
	};

	const chartData = buildChartData(data);
	const color = getTrendColor(data.prices);

	return (
		<ResponsiveContainer width="95%" height="90%">
			<LineChart data={chartData}>
				<CartesianGrid stroke="#444" strokeDasharray="3 3" />

				<XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString()} />

				<YAxis
					label={{
						value: "Price",
						angle: -90,
						position: "insideLeft",
					}}
				/>

				<Tooltip content={<CustomTooltip />} />

				<Line type="linear" dataKey="price" stroke={color} strokeWidth={2} dot={<CustomDot />} activeDot={{ r: 5 }} />
			</LineChart>
		</ResponsiveContainer>
	);
};

const StockDetailsCom = ({ ticker }: { ticker: string }) => {
	const now = new Date();
	const pastDate = new Date(now);
	pastDate.setDate(pastDate.getDate() - 30);

	const stockFetch = useStockByTicker(ticker);
	const signalsFetch = useSignalsByTicker(ticker);

	const data = useMemo<StockDetailsData | null>(() => {
		if (!stockFetch.data || !signalsFetch.data) return null;

		const details: StockDetailsData = {
			ticker: stockFetch.data.ticker,
			description: stockFetch.data.subtext,
			prices: stockFetch.data.values,
			calls: signalsFetch.data.map((sig) => ({ date: sig.date, signal: sig.call })),
		};
		return details;
	}, [ticker, stockFetch.data, signalsFetch.data]);

	const render = () => {
		if (data === null) {
			return <div>LOADING DATA ...</div>;
		} else {
			return (
				<div id="tickerDetails" className={`${styles.detailsDiv}`}>
					<div className={styles.header}>
						<div>
							<h3 className={`text-style1 text-size1`}>{data?.ticker}</h3>
							<span className={`text-style4 text-size4`}>{data?.description}</span>
						</div>
						<div>
							<h3 className={`text-style1 text-size1`}>{"$" + data?.prices.at(-1)?.price}</h3>
							<span>Last updated: 14:00</span>
						</div>
					</div>

					<div className={styles.chartHolder}>{createChart(data)}</div>
				</div>
			);
		}
	};

	return render();
};

export default StockDetailsCom;
