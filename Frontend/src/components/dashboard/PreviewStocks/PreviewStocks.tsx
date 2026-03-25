import styles from "./PreviewStocks.module.css";
import type StockInfo from "./../../../interfaces/StockInfo";
import SimpleChart from "../../common/SimpleChart/SimpleChart";

const PreviewStocks = ({ stocksInfo }: { stocksInfo: StockInfo[] }) => {
	return (
		<div className={`${styles.previewHolder} flex-row-center`}>
			{stocksInfo.map((si) => (
				<Card key={si.ticker} info={si} />
			))}
		</div>
	);
};

const GetStyleColor = (val: number) => {
	if (val > 0)
		return "#75ff9e"; // --col-primary1
	else if (val < 0)
		return "#ffb4ab"; // --col-negative1
	else return "#ffdf9e"; // --col-neutral1
};

const Card = ({ info }: { info: StockInfo }) => {
	const diff = (info.values[info.values.length - 1] ?? 0) - (info.values[0] ?? 0);

	return (
		<div className={styles.cardHolder}>
			<div className="text-style2 text-size2">{info.ticker}</div>
			<span className={`text-style3 text-size3 ${styles.cardSubText}`}>{info.subtext}</span>
			<div className={`${styles.cardLastPrice} `}>
				<div className="text-style2 text-size2">{info.values.at(-1)}</div>
				<span
					className="text-size4 text-style3"
					style={{
						color: GetStyleColor(diff),
					}}
				>
					{diff >= 0 ? `+${diff.toFixed(2)}%` : `-${diff.toFixed(2)}%`}
				</span>
			</div>
			<SimpleChart data={info.values} color={GetStyleColor(diff)} />
		</div>
	);
};

export default PreviewStocks;
