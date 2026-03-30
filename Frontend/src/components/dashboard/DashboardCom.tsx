import OverviewCom from "./OverviewCom/OverviewCom";
import PreviewStocks from "./PreviewStocks/PreviewStocks";
import { useStockByPeriod } from "../../hooks/useStocks";
import { useMemo } from "react";

const DashboardCom = () => {
	const from = useMemo(() => {
		const d = new Date();
		d.setDate(d.getDate() - 30);
		return d;
	}, []);
	const to = useMemo(() => new Date(), []);
	const stocksFetch = useStockByPeriod(from, to);

	const renderStocks = () => {
		if (stocksFetch.loading) return <div>LOADING...</div>;
		if (stocksFetch.error) return <div>ERROR: {stocksFetch.error}</div>;
		if (!stocksFetch.data) return <div>NO DATA</div>;
		return <PreviewStocks stocksInfo={stocksFetch.data} />;
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "stretch",
			}}
		>
			<OverviewCom />
			{renderStocks()}
		</div>
	);
};

export default DashboardCom;
