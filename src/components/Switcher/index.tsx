import React, { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { BarragesManager } from "../../barrage/barragesManager";
import "./style.scss";

interface ISwitcher {
  barragesManager: BarragesManager;
}

const Switcher: React.FC<ISwitcher> = ({ barragesManager }) => {
  const [openBarrages, setOpenBarrages] = useState(barragesManager.isRunning());

  const handleClick = () => {
    if (barragesManager.isRunning()) {
      barragesManager.close(50);
    } else {
      barragesManager.open();
    }
    setOpenBarrages(barragesManager.isRunning());
  };

  return (
    <div className="switch">
      {openBarrages ? (
        <BsToggleOn className="switch-icon" onClick={handleClick} />
      ) : (
        <BsToggleOff className="switch-icon" onClick={handleClick} />
      )}
    </div>
  );
};

export default Switcher;
