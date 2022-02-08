import React from "react";
import { RiQuestionLine } from "react-icons/ri";
import "./style.scss";

const Question = () => {
  return (
    <div className="question">
      <a
        href="https://bullet-chat-everywhere-5e5799636-1305624698.tcloudbaseapp.com/docs/notes/use/toC.html"
        title="帮助文档"
      >
        <RiQuestionLine className="question-icon" />
      </a>
    </div>
  );
};

export default Question;
