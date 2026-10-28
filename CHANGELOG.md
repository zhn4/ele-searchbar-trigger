# Changelog

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 与 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

## [1.0.0] - 2026-10-28

首个公开版本。

### Added

- `triggerBySearchBar(vm, refName, blackList)`：按 `vm.isSmallSearchBar` 折叠 / 展开 `el-form` 中的指定表单项。
- 返回值 `{ hidden, missing, collapsed }`，调用方可感知处理结果与未匹配的 prop。
- 记录元素原始 `display`，展开时原样还原，不再写死 `inline-block`。
- 兼容旧写法 `triggerBySearchBar.call(this, refName, blackList)`。
- TypeScript 类型声明（`types/index.d.ts`）。
- ESM / CJS / UMD 三种构建产物、ESLint 9 flat config、GitHub Actions CI。
- 可交互示例 `examples/index.html`。
- npm 包名：`ele-searchbar-trigger`（与仓库名一致）。

### Changed

- 参数校验失败从 `console.warn` / `console.error` 改为抛出带定位信息的 `TypeError`，错误不再静默（**行为变更**：原先"未传 refName 时告警"是一段永远走不到的死代码，已移除）。
- `blackList` 为空时直接返回，不再输出告警噪音。
- 包入口修正为 `dist/index.mjs` / `dist/index.cjs`，不再引用未生成的 `index.esm.js` / `index.cjs.js`；补充 `exports`、`files`、`sideEffects` 字段。
- UMD 全局变量名改为 `EleSearchbarTrigger`（与包名一致，原为 `TriggerBySearchBar`）。
