import React, { ChangeEvent, MouseEvent } from "react";
import { AiOutlineFontSize } from "react-icons/ai";
import { OpenState } from "../enums";
import { colors } from "./colors";
import "./style.scss";

interface IFont {
  openState: OpenState;
  setOpenState: (state: OpenState) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  color: string;
  setColor: (color: string) => void;
}

const Font: React.FC<IFont> = ({
  openState,
  setOpenState,
  fontSize,
  setFontSize,
  color,
  setColor,
}) => {
  const handleClick = () => {
    if (openState === OpenState.OPEN_FONT) {
      setOpenState(OpenState.CLOSE);
    } else {
      setOpenState(OpenState.OPEN_FONT);
    }
  };

  const handleChangeFontSize = (e: ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    if (size > 40) {
      console.log("弹幕字号最大为 40");
      setFontSize(40);
      return;
    } else if (size < 20) {
      console.log("弹幕字号最小为 20");
      setFontSize(20);
      return;
    }
    setFontSize(size);
  };

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    if (color.length < 1) {
      e.target.value = "#";
    }
    if (color.length > 6) {
      e.target.value = e.target.value.substring(0, 7);
    }

    // 校验颜色是否合法
    const reg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!reg.test(color)) {
      setColor("#000000");
      return;
    }
    setColor(color);
  };

  const handlePickColor = (e: MouseEvent) => {
    const div = e.target as HTMLDivElement;
    setColor(div.style.backgroundColor);
  };

  return (
    <div className="font">
      <AiOutlineFontSize className="font-icon" onClick={handleClick} />
      {openState === OpenState.OPEN_FONT ? (
        <div className="font-board">
          <div className="color-selector">
            颜色
            <input
              type="text"
              className="color-text"
              defaultValue={"#000000"}
              onChange={handleChangeColor}
            />
            <div className="color-show">
              颜色演示
              <span
                className="color-now"
                style={{ backgroundColor: color }}
              ></span>
            </div>
            <div className="color-picker">
              {colors.map((item) => (
                <div
                  key={item}
                  className="color-kind"
                  style={{ backgroundColor: item }}
                  onClick={handlePickColor}
                ></div>
              ))}
            </div>
          </div>
          <div className="font-family">
            字体
            <input
              className="font-input"
              type="number"
              max="40"
              min="20"
              id="range"
              value={fontSize}
              onChange={handleChangeFontSize}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Font;
