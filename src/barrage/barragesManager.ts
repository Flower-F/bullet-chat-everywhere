// 弹幕的操纵类

import { Barrage } from "./barrage";
import { ChannelPositions } from "./channelPositions";
import {
  BARRAGE_HEIGHT,
  CHANNEL_SIZE,
  DEFAULT_SPEED,
  DEFAULT_OPACITY,
  BARRAGE_PADDING,
  FONT_FAMILY,
} from "./constants";
import { ColorSetting, PositionSetting } from "./enums";
import { IBarrage, ISettings } from "./types";

export class BarragesManager {
  private channels: Barrage[][];
  private waitQueue: Barrage[];
  private data: IBarrage[];
  private channelPositions: ChannelPositions;
  private isPaused: boolean;
  private speed: number;
  private opacity: number;
  private colorSetting: ColorSetting;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(
    data: IBarrage[],
    channelPositions: ChannelPositions,
    settings?: ISettings
  ) {
    this.data = data;
    this.channelPositions = channelPositions;
    this.channels = new Array(CHANNEL_SIZE)
      .fill(1)
      .map(() => new Array<Barrage>());
    // 等待队列
    this.waitQueue = [];

    // 是否暂停播放
    this.isPaused = true;

    // 进行选项设置
    this.speed = settings?.speed || DEFAULT_SPEED;
    this.opacity = settings?.opacity || DEFAULT_OPACITY;
    this.colorSetting =
      settings?.colorSetting || ColorSetting.DEFAULT_COLOR_SETTING;

    // 初始化数据
    this.initBarrage(data);

    // 设置画布
    this.canvas = document.querySelector(
      "#bullet-chat-everywhere-canvas"
    ) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    // 设置画布宽高
    this.canvas.width = window.innerWidth;
    this.canvas.height = BARRAGE_HEIGHT * CHANNEL_SIZE;
    // 画布透明度
    this.canvas.style.opacity = this.opacity.toString();
  }

  private initBarrage(data: IBarrage[]) {
    if (data.length === 0) {
      return;
    }

    for (let i = 0; i < CHANNEL_SIZE; i++) {
      this.channelPositions.occupied[i] = false;
    }

    // 初始化数据，每个通道先插入一条弹幕
    // 2,3,4,5,6 [1,2]
    // 分配成 [2] [3]

    for (
      let i = 0;
      i < this.channelPositions.positions.length && i < data.length;
      i++
    ) {
      // 查找当前插入的通道
      const channel = this.channelPositions.positions[i];
      // 获取弹幕
      const barrage = this.getBarrage(data[i], channel);

      // 将原数组清空，用于后续的重播
      this.channels[channel].splice(0, this.channels[channel].length);
      // 插入弹幕
      this.channels[channel].push(barrage);
      // 修改通道占用情况
      this.channelPositions.occupied[i] = true;
    }

    // 等待队列清空，用于后续重播
    this.waitQueue.splice(0, this.waitQueue.length);
    for (let i = this.channelPositions.positions.length; i < data.length; i++) {
      const barrage = this.getBarrage(data[i]);
      // 弹幕插入等待队列
      this.waitQueue.push(barrage);
    }
  }

  // 将数据包装成弹幕对象
  private getBarrage(obj: IBarrage, channel = 1) {
    const { content, fontSize, color } = obj;
    const barrage = new Barrage(content, fontSize, color, channel);
    // 初始化宽高
    barrage.initWH();
    return barrage;
  }

  // 每次要进行的渲染操作
  private renderPerTime() {
    this.channels.forEach((channel, index) => {
      for (let i = 0; i < channel.length; i++) {
        if (channel[i].outOfWindow) {
          if (i === channel.length - 1) {
            this.channelPositions.occupied[index] = false;
          }
          continue;
        }
        // 初始化弹幕数据
        channel[i].initXY();
        // 移动弹幕
        channel[i].x -= this.speed;

        // 渲染弹幕
        this.context.font = `bolder ${channel[i].fontSize}px/${BARRAGE_HEIGHT}px ${FONT_FAMILY}`;

        if (this.colorSetting === ColorSetting.WHITE_COLOR_SETTING) {
          this.context.fillStyle = "#ffffff";
        } else if (this.colorSetting === ColorSetting.BLACK_COLOR_SETTING) {
          this.context.fillStyle = "#000000";
        } else {
          this.context.fillStyle = channel[i].color;
        }
        this.context.fillText(channel[i].content, channel[i].x, channel[i].y);

        // 修改通道占用情况
        this.channelPositions.occupied[index] = true;

        // 判断是否需要将等待队列的内容塞入通道
        if (
          i === channel.length - 1 &&
          this.waitQueue.length &&
          window.innerWidth - this.waitQueue[0].width >=
            channel[i].x + BARRAGE_PADDING + channel[i].width &&
          this.channelPositions.positions.includes(index)
        ) {
          const shiftBarrage = this.waitQueue.shift() as Barrage;
          shiftBarrage.channel = index;
          shiftBarrage.initXY();
          channel.push(shiftBarrage);
        }

        // 判断弹幕是否已经离开窗口，若离开后面不再渲染
        if (channel[i].x <= -channel[i].width) {
          // 修改停止渲染的标记
          channel[i].outOfWindow = true;
        }
      }
      // 当通道为空时，直接塞入弹幕
      // if (
      //   this.channelPositions.positions.includes(index) &&
      //   this.channelPositions.occupied[index] === false &&
      //   this.waitQueue.length
      // ) {
      //   console.log("yes");
      //   this.channelPositions.occupied[index] = true;
      //   const shiftBarrage = this.waitQueue.shift() as Barrage;
      //   shiftBarrage.channel = index;
      //   shiftBarrage.initXY();
      //   channel.push(shiftBarrage);
      // } else {

      // }
    });
  }

  // 清除画布
  private clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // 播放弹幕
  private play() {
    this.isPaused = false;
    this.render();
  }

  // 暂停弹幕
  private pause() {
    this.isPaused = true;
  }

  // 重播弹幕
  public replay() {
    // 清空画布
    this.clearCanvas();
    // 重新初始化弹幕数据
    this.initBarrage(this.data);
  }

  // 添加弹幕
  public add(obj: IBarrage) {
    this.data.push(obj);
    const barrage = this.getBarrage(obj);
    this.waitQueue.push(barrage);
  }

  // 开启弹幕
  public open() {
    this.play();
  }

  // 关闭弹幕
  // 这个函数需要异步执行，否则无法清除
  public close(delay: number) {
    this.pause();
    let bulletChatTimer = null;
    bulletChatTimer && clearTimeout(bulletChatTimer);
    bulletChatTimer = setTimeout(() => {
      this.clearCanvas();
    }, delay);
  }

  // 渲染函数，这是一个递归函数，需要绑定 this
  private render() {
    // 先清空画布
    this.clearCanvas();
    // 执行弹幕的渲染
    this.renderPerTime();
    // 判断是否暂停
    if (!this.isPaused) {
      requestAnimationFrame(this.render.bind(this));
    }
  }

  // 设置与获取位置
  public setPosition(type: PositionSetting) {
    this.channelPositions.setChannel(type);
    this.replay();
  }

  // 设置与获取弹幕透明度
  public setOpacity(opacity: number) {
    this.opacity = opacity;
    this.canvas.style.opacity = opacity.toString();
  }

  public getOpacity() {
    return this.opacity;
  }

  // 设置与弹幕速度
  public setSpeed(speed: number) {
    this.speed = speed;
  }

  // 设置颜色配置
  public setColorSetting(colorSetting: ColorSetting) {
    this.colorSetting = colorSetting;
  }

  // 判断弹幕状态
  public isRunning() {
    return this.isPaused === false;
  }
}
