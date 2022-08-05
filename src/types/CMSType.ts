export type Feature = {
  id: number;
  status: string;
  icon: string;
  title: string;
  description: string;
};

export type FeatureApiResponse = {
  data: Feature[];
};
