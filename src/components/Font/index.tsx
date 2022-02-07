import React, { ChangeEvent, useState } from "react";
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
      setInputColor("#");
      setColor("#000000");
    } else if (color.length > 6) {
      setInputColor(e.target.value.substring(0, 7));
    } else {
      setInputColor(color);
    }

    // 校验颜色是否合法
    const reg = /^#([A-Fa-f0-9]{6})$/;
    if (reg.test(color)) {
      setColor(color);
    } else {
      if (e.target.value.length >= 6) {
        setColor(e.target.value.substring(0, 7));
      } else {
        setColor("#000000");
      }
    }
  };

  const handlePickColor = (index: number) => {
    if (index < 0 || index >= 14) {
      return;
    }
    setColor(colors[index]);
    setInputColor(colors[index]);
  };

  const [inputColor, setInputColor] = useState(color);

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
              onChange={handleChangeColor}
              value={inputColor}
            />
            <div className="color-show">
              颜色演示
              <span
                className="color-now"
                style={{ backgroundColor: color }}
              ></span>
            </div>
            <div className="color-picker">
              {colors.map((item, index) => (
                <div
                  className="color-kind"
                  key={item}
                  style={{ backgroundColor: item }}
                  onClick={() => handlePickColor(index)}
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
