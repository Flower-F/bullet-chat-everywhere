// 控制弹幕出现的位置

import {
  BOTTOM_POSITION,
  MIDDLE_POSITION,
  TOP_POSITON,
  WHOLE_POSITION,
} from "./constants";

export class ChannelPositions {
  positions: number[];

  constructor(type: number) {
    this.positions = [];
    this.setChannel(type);
  }

  setChannel(type: number) {
    switch (type) {
      case TOP_POSITON:
        this.positions = [0, 1];
        break;
      case MIDDLE_POSITION:
        this.positions = [2, 3, 4, 5];
        break;
      case BOTTOM_POSITION:
        this.positions = [6, 7];
        break;
      case WHOLE_POSITION:
        this.positions = [0, 1, 2, 3, 4, 5, 6, 7];
        break;
      default:
        this.positions = [0, 1, 2, 3, 4, 5, 6, 7];
        break;
    }
  }
}
