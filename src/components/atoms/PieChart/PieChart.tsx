import { ResponsivePie } from "@nivo/pie"

import { ChartData } from "../../../types/ChartType"

interface PieChartProps {
    data: ChartData[];
}

const MARGIN_Y = 60;
const MARGIN_X = 80;

const PieChart = ({ data }: PieChartProps) => {
    return (
        <ResponsivePie
            data={data}
            margin={{ top: MARGIN_Y, right: MARGIN_X, bottom: MARGIN_Y, left: MARGIN_X }}
            activeOuterRadiusOffset={8}
            arcLinkLabel={d => `${d.label}`}
            arcLabelsTextColor="#ffffff"
            colors={{ 'datum': 'data.color' }}
            animate={false}
        />
    )
}

export default PieChart