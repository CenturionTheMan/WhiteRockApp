import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import type { CurveType } from "recharts/types/shape/Curve";
import type { DotType } from "recharts/types/util/types";
import styles from "./SimpleChart.module.css";

type Props = {
	data: number[];
	color?: string;
	height?: number | `${number}%`;
	width?: number | `${number}%`;
	dot?: DotType | undefined;
	type?: CurveType;
};

const hexToRgba = (hex: string, alpha: number): string => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function SimpleChart({ data, color = "#4facfe", height = 50, width = "100%", dot = { r: 2, fill: color }, type = "linear" }: Props) {
	const maxValue = data.length > 0 ? Math.max(...data) : 1;
	const minValue = data.length > 0 ? Math.min(...data) : 0;
	const range = maxValue - minValue;

	const formattedData = data.map((value) => ({
		value: range > 0 ? (value - minValue) / range : 0, // Scale to [0, 1]
	}));
	return (
		<div
			style={{
				background: `linear-gradient(to bottom, transparent 50%, ${hexToRgba(color, 0.1)} 100%)`, // Dynamic gradient
			}}
			className={styles.chartHolder}
			tabIndex={-1}
		>
			<ResponsiveContainer width={width} height={height}>
				<LineChart data={formattedData}>
					<YAxis domain={[0, 1]} hide />
					<Line
						type={type}
						dataKey="value"
						stroke={color}
						strokeWidth={2}
						dot={dot} // hide dots if you want fully read-only
						activeDot={false} // disables hover effect on dots
						isAnimationActive={true} // optional: disable animation
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
