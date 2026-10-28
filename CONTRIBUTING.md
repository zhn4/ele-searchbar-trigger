# Contributing

感谢你的关注！提交前请留意以下约定。

## 开发流程

```bash
npm install
npm run lint
npm test
npm run build
```

提 PR 之前，这三条（lint / test / build）必须在本地全部通过，CI 也跑同样的矩阵（Node 20 / 22 / 24）。

## 代码约定

- 面向 **Vue 2 + Element UI 2.x**，不要引入 Vue 3 专有 API；
- 本库零运行时依赖，请勿新增 `dependencies`（开发工具放 `devDependencies`）；
- 新增或修改行为必须补测试，测试放在 `tests/` 下，断言语义而非实现细节；
- 用户传错参数时抛出带定位信息的错误，不要 `console` 静默吞掉；
- 需要发布时的变更请写进 `CHANGELOG.md` 的 `Unreleased` 段。

## 提交信息

推荐 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)：

```
feat: 支持按 prop 前缀批量匹配
fix: 展开时还原原始 display
docs: 补充 Vue 2.7 使用示例
```

## 报告问题

请在 issue 里附上：Vue / Element UI / 本库版本、最小复现（最好是一个可运行的组件片段）、期望行为与实际行为。
