import React from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { BarragesManager } from "../../barrage/barragesManager";
import "./style.scss";

interface IRestart {
  barragesManager: BarragesManager;
}

const Restart: React.FC<IRestart> = ({ barragesManager }) => {
  const handleClick = () => {
    barragesManager.replay();
  };

  return (
    <div className="restart">
      <VscDebugRestart className="restart-icon" onClick={handleClick} />
    </div>
  );
};

export default Restart;
