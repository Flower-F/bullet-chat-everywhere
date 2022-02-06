// 弹幕类，包含了弹幕的基本设置

import { BARRAGE_HEIGHT, MARGIN_FROM_WINDOW } from "./constants";

export class Barrage {
  content: string;
  fontSize: number;
  isInitedWH: boolean;
  color: string;
  outOfWindow: boolean;
  channel: number;
  delayTime: number;
  width: number;
  isInitedXY: boolean;
  x: number;
  y: number;

  constructor(
    content: string,
    fontSize: number,
    color: string,
    channel: number
  ) {
    this.content = content; // 弹幕的内容
    this.fontSize = fontSize; // 弹幕字体大小
    this.color = color; // 弹幕颜色
    this.isInitedWH = false; // 是否初始化了宽高
    this.isInitedXY = false; // 是否初始化了坐标
    this.outOfWindow = false; // 判断是否离开了窗口
    this.channel = channel; // 通道
    this.delayTime = 0; // 延迟时间
    this.width = 0; // 宽度
    this.x = 0; // x 坐标
    this.y = 0; // y 坐标
  }

  // 初始化宽高
  initWH() {
    // 检测是否初始化
    if (this.isInitedWH) {
      return;
    }

    const spanElem = document.createElement("span");
    spanElem.innerText = this.content;
    spanElem.style.fontSize = this.fontSize + "px";
    spanElem.style.position = "absolute";

    // 获取弹幕的宽度
    document.body.appendChild(spanElem);
    this.width = spanElem.clientWidth;
    document.body.removeChild(spanElem);

    // 完成初始化宽高
    this.isInitedWH = true;
  }

  initXY() {
    if (this.isInitedXY) {
      return;
    }

    // 计算弹幕首次出现位置
    this.x = window.innerWidth;
    this.y = BARRAGE_HEIGHT * this.channel + MARGIN_FROM_WINDOW;

    // 完成坐标初始化
    this.isInitedXY = true;
  }
}
