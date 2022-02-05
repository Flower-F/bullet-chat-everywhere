const isDev = process.env.NODE_ENV !== "production";

// 本地 url
let url = "http://localhost:3001";

if (!isDev) {
  // 线上 url
  url = "https://qctknu.api.cloudendpoint.cn";
}

export default url;
