import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

import { ChartJsData } from "../../../types/ChartType"

interface PieChartProps {
    data: ChartJsData;
    title: string;
    dataLabel: string;
}

const PieChart = ({ data, title, dataLabel }: PieChartProps) => {
    return (
        <Pie
            data={{
                labels: data.labels,
                datasets: [{
                    label: dataLabel,
                    borderColor: data.dataset.backgroundColor,
                    ...data.dataset
                }],
            }}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom' as const,
                    },
                    title: {
                        display: true,
                        text: title,
                    },
                },
            }} />
    )
}

export default PieChart