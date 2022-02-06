import React, { useEffect, useState } from "react";
import Chat from "../Chat";
import Font from "../Font";
import Question from "../Question";
import Setting from "../Setting";
import Switcher from "../Switcher";
import "./style.scss";
import url from "../../../url.config";
import { BarragesManager } from "../../barrage/barragesManager";
import { ChannelPositions } from "../../barrage/channelPositions";
import Restart from "../Restart";
import { PositionSetting } from "../../barrage/enums";

const Control = () => {
  const [barragesManager, setBarragesManager] = useState<BarragesManager>(
    new BarragesManager(
      [],
      new ChannelPositions(PositionSetting.WHOLE_POSITION)
    )
  );

  useEffect(() => {
    fetch(url + "/barrages").then((res) => {
      res.json().then((data) => {
        setBarragesManager(
          new BarragesManager(
            data.list,
            new ChannelPositions(PositionSetting.WHOLE_POSITION)
          )
        );
      });
    });
  }, []);

  return (
    <div className="bullet-control">
      <div className="menu">
        <input
          className="menu-toggler"
          id="bullet-chat-menu-toggler"
          type="checkbox"
        />
        <label htmlFor="bullet-chat-menu-toggler"></label>
        <ul>
          <li className="menu-item">
            <Switcher barragesManager={barragesManager} />
          </li>
          <li className="menu-item">
            <Chat />
          </li>
          <li className="menu-item">
            <Setting />
          </li>
          <li className="menu-item">
            <Question />
          </li>
          <li className="menu-item">
            <Restart barragesManager={barragesManager} />
          </li>
          <li className="menu-item">
            <Font />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Control;
