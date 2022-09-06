export type Feature = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type HeroMarketing = {
  id: number;
  status: string;
  title: string;
  summary: string;
};


export type LandingPage = {
  features: Feature[];
  hero: HeroMarketing;
}