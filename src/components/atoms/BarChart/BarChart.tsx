import { ResponsiveBar } from "@nivo/bar";

import { ChartData } from "../../../types/ChartType";

interface BarChartProps {
    data: ChartData[];
}

const MARGIN_Y = 60;
const MARGIN_X = 80;

const BarChart = ({ data }: BarChartProps) => {
    return (
        <ResponsiveBar
            margin={{ top: MARGIN_Y, right: MARGIN_X, bottom: MARGIN_Y, left: MARGIN_X }}
            data={data as any}
            indexBy="id"
            keys={["value"]}
            labelTextColor="inherit:darker(1.4)"
            colors={{ 'datum': 'data.color' }}
        />
    );
}

export default BarChart;