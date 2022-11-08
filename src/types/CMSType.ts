export type Feature = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type HeroMarketing = {
  title: string;
  summary: string;
};

export type Carousel = string;

export type SocialLink = {
  link: string;
  type: string;
};

export type LandingPage = {
  hero: HeroMarketing;
  features: Feature[];
  carousel: Carousel[],
  cover: string;
  social: SocialLink[];
}