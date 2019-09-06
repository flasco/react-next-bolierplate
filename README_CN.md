# react-next-bolierplate

react 服务端渲染模板, 使用 antd, typescript, koa2...

https://github.com/flasco/react-next-bolierplate

## 环境前置要求

- node 8+
- yarn

## 怎么运行项目

```bash
cd <项目根目录>
yarn # 安装依赖
yarn server # 启动服务
```

## 一些文档

- [next.js](https://github.com/zeit/next.js)
- [ant design](https://ant.design/)
- [typescript 向导](http://www.typescriptlang.org/)
  ... 更多暂略

## 使用代码校验 <只在 VSCode 下>

- [vscode-eslint 配置](https://www.pandaomeng.com/2019/05-06-vscode-eslint-typscript/)
- VSCode 安装 `sass-lint`, `prettier` 插件.
- 重新启动 VSCode

## 文件名约定

使用中横线分割单词.

使用 `person-level` 而不是 `PersonLevel`, 除非他是一个类, 那样的话你可以用 `PersonLevelHeader.js` 当文件名.

但是我更喜欢用 `person-level-header/index.js` 而不是 `PersonLevelHeader.js`
