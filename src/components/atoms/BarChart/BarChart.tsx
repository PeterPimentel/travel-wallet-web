import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { ChartJsData } from "../../../types/ChartType";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarChartProps {
    data: ChartJsData;
    title: string;
    dataLabel: string;
}

const BarChart = ({ data, title, dataLabel }: BarChartProps) => {

    return (
        <Bar
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top' as const,
                    },
                    title: {
                        display: true,
                        text: title,
                    },
                },
            }}
            data={{
                labels: data.labels,
                datasets: [{
                    label: dataLabel,
                    ...data.dataset
                }],
            }} />
    );
}

export default BarChart;