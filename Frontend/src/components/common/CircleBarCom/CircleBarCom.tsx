import React, { useEffect, useState } from "react";

const CircleBarCom = ({ size, strokeWidth, fillPercent }: { size: number; strokeWidth: number; fillPercent: number }) => {
	const [progress, setProgress] = useState(0);

	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;

	useEffect(() => {
		const timeout = setTimeout(() => setProgress(fillPercent), 100);
		return () => clearTimeout(timeout);
	}, [fillPercent]);

	const offset = circumference - (progress / 100) * circumference;
	return (
		<svg width={size} height={size}>
			{/* Background */}
			<circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none" style={{ stroke: "var(--col-bg3)" }} />

			{/* Progress */}
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				strokeWidth={strokeWidth}
				fill="none"
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				strokeLinecap="round"
				style={{
					stroke: "var(--col-primary1)",
					transition: "stroke-dashoffset 0.8s ease",
					transform: "rotate(-90deg)",
					transformOrigin: "50% 50%",
				}}
			/>

			{/* Text */}
			<text
				x="50%"
				y="50%"
				dominantBaseline="middle"
				textAnchor="middle"
				style={{
					fontSize: "var(--font-size-small)",
					fill: "var(--col-primary1)",
				}}
			>
				{progress == 0 ? "" : `${progress}%`}
			</text>
		</svg>
	);
};

export default CircleBarCom;
