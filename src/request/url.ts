const isDev = process.env.NODE_ENV !== "production";

// 本地 url，使用 apifox 进行数据 mock
// let url = "http://127.0.0.1:4523/mock/620114";

// 后端开发完成，使用后端 url
let url = "https://qctknu.api.cloudendpoint.cn";

if (!isDev) {
  // 线上 url
  url = "https://qctknu.api.cloudendpoint.cn";
}

export default url;
