import React, { ChangeEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { BarragesManager } from "../../barrage/barragesManager";
import { ColorSetting, PositionSetting, Speed } from "../../barrage/enums";
import { OpenState } from "../enums";
import "./style.scss";

interface ISettingProps {
  openState: OpenState;
  setOpenState: (state: OpenState) => void;
  barragesManager: BarragesManager;
}

const Setting: React.FC<ISettingProps> = ({
  setOpenState,
  openState,
  barragesManager,
}) => {
  const handleClick = () => {
    if (openState === OpenState.OPEN_SETTING) {
      setOpenState(OpenState.CLOSE);
    } else {
      setOpenState(OpenState.OPEN_SETTING);
    }
  };

  const handleChangeOpacity = (e: ChangeEvent<HTMLInputElement>) => {
    let opacity = parseInt(e.target.value);
    if (opacity >= 100) {
      opacity = 100;
    } else if (opacity < 0) {
      opacity = 0;
    }
    setOpacity(opacity);
    if (opacity === 100) {
      opacity = 99;
    }
    barragesManager.setOpacity(opacity / 100);
  };

  const handleFixButton = () => {
    if (fixButton) {
      localStorage.setItem("__bullet_chat_everywhere_fix__", "false");
    } else {
      localStorage.setItem("__bullet_chat_everywhere_fix__", "true");
    }
    setFixButton(!fixButton);
  };

  const handlePosition = (e: ChangeEvent<HTMLInputElement>) => {
    const position = e.target.value;
    if (
      position === PositionSetting.BOTTOM_POSITION ||
      position === PositionSetting.TOP_POSITON ||
      position === PositionSetting.WHOLE_POSITION ||
      position === PositionSetting.MIDDLE_POSITION
    ) {
      barragesManager.setPosition(position);
      setPosition(position);
    } else {
      // console.log("类型不符");
    }
  };

  const handleSpeed = (e: ChangeEvent<HTMLInputElement>) => {
    const speed = parseInt(e.target.value);
    if (
      speed === Speed.NORMAL_SPEED ||
      speed === Speed.QUICK_SPEED ||
      speed === Speed.SLOW_SPEED ||
      speed === Speed.VERY_QUICK_SPEED
    ) {
      barragesManager.setSpeed(speed);
      setSpeed(speed);
    }
  };

  const handleColorSetting = (e: ChangeEvent<HTMLInputElement>) => {
    const colorSetting = e.target.value;
    if (
      colorSetting === ColorSetting.BLACK_COLOR_SETTING ||
      colorSetting === ColorSetting.WHITE_COLOR_SETTING ||
      colorSetting === ColorSetting.DEFAULT_COLOR_SETTING
    ) {
      barragesManager.setColorSetting(colorSetting);
      setColorSetting(colorSetting);
    }
  };

  const [opacity, setOpacity] = useState(barragesManager.getOpacity() * 100);
  const [fixButton, setFixButton] = useState<boolean>(
    localStorage.getItem("__bullet_chat_everywhere_fix__") === "true"
  );
  const [position, setPosition] = useState(barragesManager.getPosition());
  const [speed, setSpeed] = useState(barragesManager.getSpeed());
  const [colorSetting, setColorSetting] = useState(
    barragesManager.getColorSetting()
  );

  return (
    <div className="setting">
      <IoSettingsOutline
        className="setting-icon"
        onClick={handleClick}
        title="弹幕设置"
      />
      {openState === OpenState.OPEN_SETTING ? (
        <div className="setting-board">
          弹幕位置
          <AiOutlineClose className="close-board" onClick={handleClick} />
          <form className="set-positions">
            <div className="position-radio">
              顶部
              <input
                type="radio"
                name="position"
                value={PositionSetting.TOP_POSITON}
                onChange={handlePosition}
                checked={position === PositionSetting.TOP_POSITON}
              />
            </div>
            <div className="position-radio">
              中部
              <input
                type="radio"
                name="position"
                value={PositionSetting.MIDDLE_POSITION}
                checked={position === PositionSetting.MIDDLE_POSITION}
                onChange={handlePosition}
              />
            </div>
            <div className="position-radio">
              底部
              <input
                type="radio"
                name="position"
                value={PositionSetting.BOTTOM_POSITION}
                checked={position === PositionSetting.BOTTOM_POSITION}
                onChange={handlePosition}
              />
            </div>
            <div className="position-radio">
              全屏
              <input
                type="radio"
                name="position"
                checked={position === PositionSetting.WHOLE_POSITION}
                value={PositionSetting.WHOLE_POSITION}
                onChange={handlePosition}
              />
            </div>
          </form>
          速度
          <form className="set-speed">
            <div className="speed-radio">
              超快速
              <input
                type="radio"
                name="speed"
                checked={speed === Speed.VERY_QUICK_SPEED}
                value={Speed.VERY_QUICK_SPEED}
                onChange={handleSpeed}
              />
            </div>
            <div className="speed-radio">
              快速
              <input
                type="radio"
                name="speed"
                checked={speed === Speed.QUICK_SPEED}
                value={Speed.QUICK_SPEED}
                onChange={handleSpeed}
              />
            </div>
            <div className="speed-radio">
              中速
              <input
                type="radio"
                name="speed"
                value={Speed.NORMAL_SPEED}
                checked={speed === Speed.NORMAL_SPEED}
                onChange={handleSpeed}
              />
            </div>
            <div className="speed-radio">
              慢速
              <input
                type="radio"
                name="speed"
                value={Speed.SLOW_SPEED}
                checked={speed === Speed.SLOW_SPEED}
                onChange={handleSpeed}
              />
            </div>
          </form>
          颜色配置
          <form className="set-color">
            <div className="color-radio">
              彩色
              <input
                type="radio"
                name="color"
                checked={colorSetting === ColorSetting.DEFAULT_COLOR_SETTING}
                value={ColorSetting.DEFAULT_COLOR_SETTING}
                onChange={handleColorSetting}
              />
            </div>
            <div className="color-radio">
              黑色
              <input
                type="radio"
                name="color"
                checked={colorSetting === ColorSetting.BLACK_COLOR_SETTING}
                value={ColorSetting.BLACK_COLOR_SETTING}
                onChange={handleColorSetting}
              />
            </div>
            <div className="color-radio">
              白色
              <input
                type="radio"
                name="color"
                checked={colorSetting === ColorSetting.WHITE_COLOR_SETTING}
                value={ColorSetting.WHITE_COLOR_SETTING}
                onChange={handleColorSetting}
              />
            </div>
          </form>
          <form className="set-opacity">
            不透明度
            <div className="opacity-show">
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={handleChangeOpacity}
              />
              <div className="opacity-number">{`${opacity}%`}</div>
            </div>
          </form>
          <form className="fix-button">
            移动按钮
            <input
              type="radio"
              checked={fixButton}
              onClick={handleFixButton}
              readOnly={true}
            />
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Setting;
