import type StockInfo from "../../interfaces/StockInfo";
import OverviewCom from "./OverviewCom/OverviewCom";
import PreviewStocks from "./PreviewStocks/PreviewStocks";

const DashboardCom = () => {
	const stocksInfo: StockInfo[] = [
		{ ticker: "AAPL", subtext: "Apple Inc.", values: [150.25, 152.5, 200.8] },
		{ ticker: "AAPL", subtext: "Apple Inc.", values: [150.25, 152.5, 200.8] },
		{ ticker: "AAPL", subtext: "Apple Inc.dad  dasd asd ", values: [150.25, 152.5, 200.8] },
		{ ticker: "AAPL", subtext: "Apple Inc.", values: [150.25, 152.5, 200.8] },
		{
			ticker: "GOOGL",
			subtext: "Alphabet Inc.",
			values: [140.8, 142.1, 142.1, 142.1, 142.1, 142.1, 142.1, 140.8],
		},
		{
			ticker: "GOOGL",
			subtext: "Alphabet Inc.",
			values: [140.8, 142.1, 142.1, 142.1, 142.1, 142.1, 142.1, 140.8],
		},
		{
			ticker: "MSFT",
			subtext: "Microsoft Corp.",
			values: [380.5, 385.2, 328.9],
		},
		{
			ticker: "MSFT",
			subtext: "Microsoft Corp.",
			values: [380.5, 385.2, 328.9],
		},
	];
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "stretch",
			}}
		>
			<OverviewCom />
			<PreviewStocks stocksInfo={stocksInfo} />
		</div>
	);
};

export default DashboardCom;
