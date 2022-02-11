# 一款便捷式弹幕插件

[官方文档](https://bullet-chat-everywhere-5e5799636-1305624698.tcloudbaseapp.com/)

[线上体验地址](https://bullet-chat-testing-5c5s551c589b-1305624698.tcloudbaseapp.com/index.html)

## 技术栈

前端：React Hooks + Typescript + Sass + Axios + Webpack

后端：字节轻服务

其它：Prettier + ESlint

## 文件结构说明

src 目录下：

├─barrage：弹幕功能实现
├─components
│ ├─Chat：发送组件
│ ├─Control：整体的父组件
│ ├─Font：字体组件
│ ├─Question：帮助文档组件
│ ├─Restart：重播组件
│ ├─Setting：设置组件
│ └─Switcher：开关组件
├─dom：dom 操作，主要完成按钮的移动功能
└─request：使用 Axios 防止重复请求
