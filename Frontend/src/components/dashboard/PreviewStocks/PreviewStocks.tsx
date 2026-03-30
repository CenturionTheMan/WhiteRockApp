import styles from "./PreviewStocks.module.css";
import type StockInfoModel from "../../../interfaces/StockInfoModel";
import SimpleChart from "../../common/SimpleChart/SimpleChart";
import { getOnlyPrices, getPriceByOrder } from "../../../interfaces/StockInfoModel";

const GetStyleColor = (val: number) => {
	if (val > 0)
		return "#75ff9e"; // --col-primary1
	else if (val < 0)
		return "#ffb4ab"; // --col-negative1
	else return "#ffdf9e"; // --col-neutral1
};

const Card = ({ info }: { info: StockInfoModel }) => {
	const diff = (getPriceByOrder(info, -1) ?? 0) - (getPriceByOrder(info, 0) ?? 0);
	return (
		<div className={styles.cardHolder}>
			<div className="text-style2 text-size2">{info.ticker}</div>
			<span className={`text-style3 text-size3 ${styles.cardSubText}`}>{info.subtext}</span>
			<div className={`${styles.cardLastPrice} `}>
				<div className="text-style2 text-size2">{getPriceByOrder(info, -1)}</div>
				<span
					className="text-size4 text-style3"
					style={{
						color: GetStyleColor(diff),
					}}
				>
					{diff >= 0 ? `+${diff.toFixed(2)}%` : `${diff.toFixed(2)}%`}
				</span>
			</div>
			<SimpleChart data={getOnlyPrices(info)} color={GetStyleColor(diff)} dot={false} />
		</div>
	);
};

const PreviewStocks = ({ stocksInfo }: { stocksInfo: StockInfoModel[] }) => {
	return (
		<div className={`${styles.previewHolder} flex-row-center`}>
			{stocksInfo.map((si) => (
				<Card key={si.ticker} info={si} />
			))}
		</div>
	);
};
export default PreviewStocks;
