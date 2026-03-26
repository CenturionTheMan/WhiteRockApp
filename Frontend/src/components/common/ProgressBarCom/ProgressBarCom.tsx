import styles from "./ProgressBarCom.module.css";

const ProgressBarCom = ({
	value,
	backgroundColor = "var(--col-bg3)",
	fillColor = "var(--col-primary1)",
}: {
	value: number;
	backgroundColor?: string;
	fillColor?: string;
}) => {
	return (
		<div className={styles.holder}>
			<div className={styles.fillHolder} style={{ backgroundColor }}>
				<div
					className={styles.fill}
					style={{
						width: `${value}%`,
						backgroundColor: fillColor,
					}}
				/>
			</div>
			<span className={styles.text}>{value}%</span>
		</div>
	);
};

export default ProgressBarCom;
