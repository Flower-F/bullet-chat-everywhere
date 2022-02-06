import React from "react";
import { AiOutlineFontSize } from "react-icons/ai";
import { OpenState } from "../enums";
import "./style.scss";

interface IFont {
  openState: OpenState;
  setOpenState: (state: OpenState) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  color: string;
  setColor: (color: string) => void;
}

const Font: React.FC<IFont> = () => {
  return (
    <div className="font">
      <AiOutlineFontSize className="font-icon" />
    </div>
  );
};

export default Font;
