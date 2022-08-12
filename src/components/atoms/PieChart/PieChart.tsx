import { FC } from "react"
import { VictoryPie } from "victory"

import { PieData } from "../../../types/ChartType"

interface PieChartProps {
    data: PieData[];
    colors: string[];
}

export const PieChart: FC<PieChartProps> = ({ data, colors }) => {
    return (
        <div>
            <VictoryPie
                colorScale={colors}
                data={data}
            />
        </div>
    )
}