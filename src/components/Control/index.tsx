import React, { useEffect, useState } from "react";
import Chat from "../Chat";
import Font from "../Font";
import Question from "../Question";
import Setting from "../Setting";
import Switcher from "../Switcher";
import "./style.scss";
import { BarragesManager } from "../../barrage/barragesManager";
import { ChannelPositions } from "../../barrage/channelPositions";
import Restart from "../Restart";
import { PositionSetting } from "../../barrage/enums";
import { OpenState } from "../enums";
import { axiosInstance } from "../../request";

const Control = () => {
  const [barragesManager, setBarragesManager] = useState<BarragesManager>(
    new BarragesManager(
      [],
      new ChannelPositions(PositionSetting.WHOLE_POSITION)
    )
  );

  useEffect(() => {
    axiosInstance
      .post("/getBarrages", {
        website: document.location.origin,
      })
      .then(({ data }) => {
        if (data.status === 200) {
          // console.log("弹幕数据", data.list);
          setBarragesManager(
            new BarragesManager(
              data.list,
              new ChannelPositions(barragesManager.getPosition()),
              barragesManager.getSetting()
            )
          );
        } else {
          console.log("Error: ", data.msg);
        }
      });
  }, []);

  // 字体配置
  const [fontSize, setFontSize] = useState(30);
  const [color, setColor] = useState("#000000");

  // 控制开关状态
  const [openState, setOpenState] = useState(OpenState.CLOSE);

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
            <Chat
              openState={openState}
              setOpenState={setOpenState}
              barragesManager={barragesManager}
              fontSize={fontSize}
              color={color}
            />
          </li>
          <li className="menu-item">
            <Setting
              openState={openState}
              setOpenState={setOpenState}
              barragesManager={barragesManager}
            />
          </li>
          <li className="menu-item">
            <Question />
          </li>
          <li className="menu-item">
            <Restart barragesManager={barragesManager} />
          </li>
          <li className="menu-item">
            <Font
              openState={openState}
              setOpenState={setOpenState}
              fontSize={fontSize}
              color={color}
              setFontSize={setFontSize}
              setColor={setColor}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Control;
