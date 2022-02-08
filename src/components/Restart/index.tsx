import React from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { BarragesManager } from "../../barrage/barragesManager";
import "./style.scss";

interface IRestartProps {
  barragesManager: BarragesManager;
}

const Restart: React.FC<IRestartProps> = ({ barragesManager }) => {
  const handleClick = () => {
    barragesManager.replay();
  };

  return (
    <div className="restart">
      <VscDebugRestart
        className="restart-icon"
        onClick={handleClick}
        title="重播弹幕"
      />
    </div>
  );
};

export default Restart;
