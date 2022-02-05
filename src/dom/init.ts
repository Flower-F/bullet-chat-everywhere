export const domInit = () => {
  const bulletChat = document.createElement("div");
  bulletChat.id = "bullet-chat-everywhere";
  document.body.appendChild(bulletChat);

  const canvas = document.createElement("canvas");
  canvas.id = "bullet-chat-everywhere-canvas";
  document.body.appendChild(canvas);
};
