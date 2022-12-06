import { Steps as BaseSteps } from 'antd';

type Item = {
    key: string;
    title: string;
}

type StepsProps = {
    items: Item[],
    current: number;
}

export const Steps = ({ items, current }: StepsProps) => {
    return <BaseSteps current={current} items={items} />
}