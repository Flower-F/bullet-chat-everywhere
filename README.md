# 一个 chrome 弹幕插件

## 技术栈

前端：React Hooks + Typescript + Sass + Axios + Webpack

后端：字节轻服务

其它：Prettier + ESlint

## 运行方法

- 运行 `npm run build`，获取打包文件夹 dist，删除其中的 txt 文件
- 在谷歌浏览器地址栏输入 `chrome://extensions/`，进入扩展页面
- 打开右上角的**开发者模式**
- 选择左侧的**加载已解压的扩展程序**选项
- 路径选择 dist 文件夹的路径，导入即可
