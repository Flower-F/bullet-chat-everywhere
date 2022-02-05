export const setScope = () => {
  const parent = document.querySelector(
    "#bullet-chat-everywhere"
  ) as HTMLElement;
  const box = parent.querySelector(".control") as HTMLElement;
  const scope = parent.querySelector(".scope") as HTMLElement;

  let tempRight = parseInt(
      localStorage.getItem("__bullet_chat_everywhere_right__") || "100"
    ),
    tempBottom = parseInt(
      localStorage.getItem("__bullet_chat_everywhere_bottom__") || "100"
    );

  box.style.right = tempRight + "px";
  box.style.bottom = tempBottom + "px";

  let flag = false;

  box.onmousedown = (e) => {
    // 记录此时的鼠标位置
    const preX = e.clientX,
      preY = e.clientY;

    const { right: boundingRight, bottom: boundingBottom } =
      box.getBoundingClientRect();

    // 记录此时 box 的定位值
    const right = window.innerWidth - boundingRight,
      bottom = window.innerHeight - boundingBottom;

    document.onmousemove = (e) => {
      scope.style.visibility = "visible";
      box.className = "control selected";

      // 获取鼠标移动之后的位置
      const curX = e.clientX,
        curY = e.clientY;
      // 计算增量
      const changeX = curX - preX,
        changeY = curY - preY;

      const { width } = box.getBoundingClientRect();
      const radius = scope.getBoundingClientRect().width / 2;

      box.style.right = right - changeX + "px";
      box.style.bottom = bottom - changeY + "px";

      localStorage.setItem(
        "__bullet_chat_everywhere_right__",
        tempRight.toString()
      );
      localStorage.setItem(
        "__bullet_chat_everywhere_bottom__",
        tempBottom.toString()
      );

      const dist = Math.sqrt(
        Math.pow(Math.abs(right - changeX) + width / 2, 2) +
          Math.pow(Math.abs(bottom - changeY) + width / 2, 2)
      );

      if (dist + width / 2 > radius + 10) {
        flag = true;
      } else {
        flag = false;
        tempRight = right - changeX;
        tempBottom = bottom - changeY;
        localStorage.setItem(
          "__bullet_chat_everywhere_right__",
          tempRight.toString()
        );
        localStorage.setItem(
          "__bullet_chat_everywhere_bottom__",
          tempBottom.toString()
        );
      }

      // 边界判定，是否超出底线
      if (right - changeX <= -width / 2) {
        tempRight = -width / 2;
        box.style.right = tempRight + "px";
        localStorage.setItem(
          "__bullet_chat_everywhere_right__",
          tempRight.toString()
        );
      }

      if (bottom - changeY <= -width / 2) {
        tempBottom = -width / 2;
        box.style.bottom = tempBottom + "px";
        localStorage.setItem(
          "__bullet_chat_everywhere_bottom__",
          tempBottom.toString()
        );
      }
    };
  };

  document.onmouseup = () => {
    box.className = "control";
    document.onmousemove = null;
    scope.style.visibility = "hidden";
    if (flag) {
      box.style.right = tempRight + "px";
      box.style.bottom = tempBottom + "px";
      flag = false;
    }
  };
};
