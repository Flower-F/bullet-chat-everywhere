import React, { ChangeEvent, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { BarragesManager } from "../../barrage/barragesManager";
import { ColorSetting, PositionSetting } from "../../barrage/enums";
import { OpenState, Speed } from "../enums";
import "./style.scss";

interface ISetting {
  openState: OpenState;
  setOpenState: (state: OpenState) => void;
  barragesManager: BarragesManager;
}

const Setting: React.FC<ISetting> = ({
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
    const opacity = parseInt(e.target.value);
    if (opacity > 100 || opacity < 0) {
      return;
    }
    setOpacity(opacity);
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
    } else {
      console.log("类型不符");
    }
  };

  const handleSpeed = (e: ChangeEvent<HTMLInputElement>) => {
    const speed = parseInt(e.target.value);
    if (
      speed === Speed.NORMAL_SPEED ||
      speed === Speed.QUICK_SPEED ||
      speed === Speed.SLOW_SPEED ||
      speed === Speed.VERY_QUICK_SPEED
    )
      barragesManager.setSpeed(speed);
  };

  const handleColorSetting = (e: ChangeEvent<HTMLInputElement>) => {
    const colorSetting = e.target.value;
    if (
      colorSetting === ColorSetting.BLACK_COLOR_SETTING ||
      colorSetting === ColorSetting.WHITE_COLOR_SETTING ||
      colorSetting === ColorSetting.DEFAULT_COLOR_SETTING
    ) {
      barragesManager.setColorSetting(colorSetting);
    }
  };

  const [opacity, setOpacity] = useState(barragesManager.getOpacity() * 100);
  const [fixButton, setFixButton] = useState<boolean>(
    localStorage.getItem("__bullet_chat_everywhere_fix__") === "true"
  );

  return (
    <div className="setting">
      <IoSettingsOutline className="setting-icon" onClick={handleClick} />
      {openState === OpenState.OPEN_SETTING ? (
        <div className="setting-board">
          弹幕位置
          <form className="set-positions">
            <div className="position-radio">
              顶部
              <input
                type="radio"
                name="position"
                value={PositionSetting.TOP_POSITON}
                onChange={handlePosition}
              />
            </div>
            <div className="position-radio">
              中部
              <input
                type="radio"
                name="position"
                value={PositionSetting.MIDDLE_POSITION}
                onChange={handlePosition}
              />
            </div>
            <div className="position-radio">
              底部
              <input
                type="radio"
                name="position"
                value={PositionSetting.BOTTOM_POSITION}
                onChange={handlePosition}
              />
            </div>
            <div className="position-radio">
              全屏
              <input
                type="radio"
                name="position"
                defaultChecked
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
                value={Speed.VERY_QUICK_SPEED}
                onChange={handleSpeed}
              />
            </div>
            <div className="speed-radio">
              快速
              <input
                type="radio"
                name="speed"
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
                defaultChecked
                onChange={handleSpeed}
              />
            </div>
            <div className="speed-radio">
              慢速
              <input
                type="radio"
                name="speed"
                value={Speed.SLOW_SPEED}
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
                defaultChecked
                value={ColorSetting.DEFAULT_COLOR_SETTING}
                onChange={handleColorSetting}
              />
            </div>
            <div className="color-radio">
              黑色
              <input
                type="radio"
                name="color"
                value={ColorSetting.BLACK_COLOR_SETTING}
                onChange={handleColorSetting}
              />
            </div>
            <div className="color-radio">
              白色
              <input
                type="radio"
                name="color"
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
            固定按钮
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
