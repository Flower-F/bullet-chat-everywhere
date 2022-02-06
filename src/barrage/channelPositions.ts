// 控制弹幕出现的位置

import { PositionSetting } from "./enums";

export class ChannelPositions {
  public positions: number[];

  constructor(type: PositionSetting) {
    this.positions = [];
    this.setChannel(type);
  }

  public setChannel(type: PositionSetting) {
    switch (type) {
      case PositionSetting.TOP_POSITON:
        this.positions = [0, 1];
        break;
      case PositionSetting.MIDDLE_POSITION:
        this.positions = [2, 3, 4, 5];
        break;
      case PositionSetting.BOTTOM_POSITION:
        this.positions = [6, 7];
        break;
      case PositionSetting.WHOLE_POSITION:
        this.positions = [0, 1, 2, 3, 4, 5, 6, 7];
        break;
      default:
        this.positions = [0, 1, 2, 3, 4, 5, 6, 7];
        break;
    }
  }
}
