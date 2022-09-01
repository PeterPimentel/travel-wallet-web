export interface ChartData {
    id: string;
    value: number;
    label: string;
    color: string;
}

export interface ChartJsDataset {
    data: number[];
    backgroundColor: string[];
}
export interface ChartJsData {
    labels: string[];
    dataset: ChartJsDataset;
}