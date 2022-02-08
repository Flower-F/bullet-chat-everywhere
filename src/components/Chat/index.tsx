import React, { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsChatSquareDots } from "react-icons/bs";
import { BarragesManager } from "../../barrage/barragesManager";
import { axiosInstance } from "../../request";
import { OpenState } from "../enums";
import "./style.scss";

interface IChatProps {
  openState: OpenState;
  setOpenState: (state: OpenState) => void;
  barragesManager: BarragesManager;
  fontSize: number;
  color: string;
}

const Chat: React.FC<IChatProps> = ({
  openState,
  setOpenState,
  fontSize,
  color,
  barragesManager,
}) => {
  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 禁用按钮
    setBannedButton(true);

    const barrage = {
      content,
      fontSize,
      color,
    };

    axiosInstance
      .post("/sendBarrages", {
        website: document.location.origin,
        ...barrage,
      })
      .then(({ data }) => {
        if (data.status === 200) {
          // 插入弹幕
          barragesManager.add(barrage);
          // 输入框置空
          setContent("");
        } else {
          console.log("Error: ", data.msg);
        }
        // 恢复按钮可用
        setBannedButton(false);
      })
      .catch(() => {
        console.log("已取消重复请求");
      });
  };

  const handleClick = () => {
    if (openState === OpenState.OPEN_CHAT) {
      setOpenState(OpenState.CLOSE);
    } else {
      setOpenState(OpenState.OPEN_CHAT);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const str = e.target.value || "";
    if (str.length >= 100) {
      console.log("输入内容过长");
      return;
    }
    setContent(str);
  };

  // 文本内容
  const [content, setContent] = useState("");
  const [bannedButton, setBannedButton] = useState(false);

  return (
    <div className="chat">
      <BsChatSquareDots className="chat-icon" onClick={handleClick} />
      {openState === OpenState.OPEN_CHAT ? (
        <form className="chat-board" onSubmit={handleSumbit}>
          <AiOutlineClose className="close-board" onClick={handleClick} />
          <textarea
            className="chat-input"
            placeholder="发条弹幕吧..."
            maxLength={100}
            onChange={handleChange}
            value={content}
          />
          <button
            type="submit"
            className="send-message"
            disabled={bannedButton}
          >
            发送
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default Chat;
