// filepath: d:\PrivateProjects\WhiteRockApp\Frontend\src\components\dashboard\PreviewStocks\StockChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const SimpleChart = ({ data, color }: { data: number[], color: string }) => {
    const chartData = {
        labels: data.map((_, index) => `Point ${index + 1}`), // X-axis labels
        datasets: [
            {
                label: "Stock Price",
                data: data,
                borderColor: color,
                borderWidth: 2,
                pointRadius: 2, // Set to 0 to hide points
                pointBackgroundColor: color,
                fill: false, // No fill under the line
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false }, // Hide legend
        },
        scales: {
            x: { display: false },
            y: { display: false },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default SimpleChart;