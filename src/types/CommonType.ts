import { RadioChangeEvent } from "antd";

export type RadioButtonOnChangeEvent = RadioChangeEvent;

export interface CoverImage {
  id: number;
  name: string;
}
export interface User {
  username: string;
  email: string;
  id: number;
}

export interface AppSession {
  username: string;
  id: number;
}
