import { ColorSetting } from "./enums";

export interface IBarrage {
  content: string;
  fontSize: number;
  color: string;
}

export interface ISettings {
  speed: number;
  opacity: number;
  colorSetting: ColorSetting;
}
