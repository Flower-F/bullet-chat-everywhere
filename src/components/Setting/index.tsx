import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { BarragesManager } from "../../barrage/barragesManager";
import { OpenState } from "../enums";
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

  return (
    <div className="setting">
      <IoSettingsOutline className="setting-icon" onClick={handleClick} />
      {openState === OpenState.OPEN_SETTING ? (
        <div className="setting-board">
          <form className="set-positions">
            弹幕位置
            <div className="position-radio">
              顶部
              <input type="radio" name="position" />
            </div>
            <div className="position-radio">
              中部
              <input type="radio" name="position" />
            </div>
            <div className="position-radio">
              底部
              <input type="radio" name="position" />
            </div>
            <div className="position-radio">
              全屏
              <input type="radio" name="position" defaultChecked />
            </div>
          </form>
          <form className="set-speed">
            速度
            <div className="speed-selections">
              <div className="speed-radio">
                超快速
                <input type="radio" name="speed" />
              </div>
              <div className="speed-radio">
                快速
                <input type="radio" name="speed" />
              </div>
              <div className="speed-radio">
                中速
                <input type="radio" name="speed" defaultChecked />
              </div>
              <div className="speed-radio">
                慢速
                <input type="radio" name="speed" />
              </div>
            </div>
          </form>
          <form className="set-color">
            颜色配置
            <div className="color-radio">
              彩色
              <input type="radio" name="color" defaultChecked />
            </div>
            <div className="color-radio">
              黑色
              <input type="radio" name="color" />
            </div>
            <div className="color-radio">
              白色
              <input type="radio" name="color" />
            </div>
          </form>
          <form className="set-opacity">
            透明度
            <input type="range" min="0" max="100" />
          </form>
          <form className="fix-button">
            固定按钮
            <input type="radio" defaultChecked />
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Setting;
