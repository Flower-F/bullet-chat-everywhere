import { ColorSetting, Speed } from "./enums";

export interface IBarrage {
  content: string;
  fontSize: number;
  color: string;
}

export interface ISettings {
  speed: Speed;
  opacity: number;
  colorSetting: ColorSetting;
}
