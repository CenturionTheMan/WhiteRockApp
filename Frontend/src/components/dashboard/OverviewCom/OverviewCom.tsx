import styles from "./OverviewCom.module.css";

import CircleBarCom from "./../../common/CircleBarCom/CircleBarCom";

const OverviewCom = () => {
	return (
		<div className={`${styles.holder}`}>
			<div className={styles.card1}>
				<div className={`text-style3 text-size3 ${styles.title}`}>
					GLOBAL MARKET SENTIMENT
				</div>
				<div className={`${styles.header} text-style1 text-size1`}>
					Highly Bullish
				</div>
				<span className={`${styles.comment} text-style4 text-size3`}>
					AI signals indicate a strong momentum across tech indices. <br />
					Sentiment score: 88/100
				</span>
			</div>
			<div className={styles.card2}>
				<CircleBarCom fillPercent={80} size={120} strokeWidth={15} />
				<div className={`flex-row-center ${styles.signal_stre_text}`}>
					<div className={styles.dot} />
					<span
						className={`text-style3 text-size3`}
						style={{
							textAlign: "center",
						}}
					>
						Overall signals strength
					</span>
				</div>
			</div>
		</div>
	);
};

export default OverviewCom;
