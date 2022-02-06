import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { OpenState } from "../enums";
import "./style.scss";

interface ISetting {
  openState: OpenState;
  setOpenState: (state: OpenState) => void;
}

const Setting: React.FC<ISetting> = ({ setOpenState, openState }) => {
  const handleClick = () => {
    if (openState === OpenState.OPEN_SETTING) {
      setOpenState(OpenState.CLOSE);
    } else {
      setOpenState(OpenState.OPEN_SETTING);
    }
  };

  return (
    <div className="setting">
      {openState === OpenState.OPEN_SETTING ? (
        <div className="setting-board">setting-board</div>
      ) : null}
      <IoSettingsOutline className="setting-icon" onClick={handleClick} />
    </div>
  );
};

export default Setting;
