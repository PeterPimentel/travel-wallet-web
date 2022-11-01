import { RadioChangeEvent } from "antd";

export type RadioButtonOnChangeEvent = RadioChangeEvent;

export interface CoverImage {
  id: number;
  name: string;
  description: string;
  removed: boolean;
}
export interface User {
  username: string;
  email: string;
  id: number;
  active: boolean;
}

export interface AppSession {
  username: string;
  id: number;
}

export type LogoSize = "small" | "regular" | "large" | "extraLarge";

export type SelectOption = {
  value: string;
  text: string;
}
