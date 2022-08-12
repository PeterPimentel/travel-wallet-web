import { VictoryChart, VictoryTheme, VictoryBar } from "victory"

import { BarData } from "../../../types/ChartType";

interface BarChartProps {
    data: BarData[];
    color: string;
}

export const BarChart = ({ data, color }: BarChartProps) => {
    return (
        <VictoryChart
            theme={VictoryTheme.grayscale}
            domainPadding={10}
        >
            <VictoryBar
                style={{ data: { fill: color } }}
                data={data}
            />
        </VictoryChart>
    )
}