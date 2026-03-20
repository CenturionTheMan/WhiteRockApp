import type StockInfo from "../../interfaces/StockInfo";
import OverviewCom from "./OverviewCom/OverviewCom";
import PreviewStocks from "./PreviewStocks/PreviewStocks";

const DashboardCom = () => {
	const stocksInfo: StockInfo[] = [
		{ ticker: "AAPL", subtext: "Apple Inc.", values: [150.25, 152.5, 149.8] },
		{
			ticker: "GOOGL",
			subtext: "Alphabet Inc.",
			values: [140.8, 142.1, 139.5],
		},
		{
			ticker: "MSFT",
			subtext: "Microsoft Corp.",
			values: [380.5, 385.2, 378.9],
		},
	];
	return (
		<div className="flex-column-center">
			<OverviewCom />
			<PreviewStocks stocksInfo={stocksInfo} />
		</div>
	);
};

export default DashboardCom;
