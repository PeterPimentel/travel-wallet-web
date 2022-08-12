import { Progress } from "../../atoms/Progress/Progress";

type BalanceProgress = {
    percent: number;
}

const getColor = (value: number) => {
    if (value >= 90) {
        return 'danger'
    }

    if (value > 70) {
        return 'warning'
    }

    return 'info'
}

export const BalanceProgress = ({ percent }: BalanceProgress) => {
    return (
        <Progress percent={percent} size="small" color={getColor(percent)} />
    )
}