[![npm version](https://img.shields.io/npm/v/ele-searchbar-trigger)](https://www.npmjs.com/package/ele-searchbar-trigger)
[![CI](https://github.com/zhn4/ele-searchbar-trigger/actions/workflows/ci.yml/badge.svg)](https://github.com/zhn4/ele-searchbar-trigger/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/ele-searchbar-trigger)](./LICENSE)

# ele-searchbar-trigger

可能是折叠 / 展开 Element UI 搜索栏最省事的方法。
*maybe the most convenient way to collapse / expand an Element UI search bar.*

后台管理系统里常见的「查询条件一行放不下，收起来只留最常用的几个」需求，通常要写一堆 `v-if`。这个函数只做一件事：把 `blackList` 里的表单项在收起态隐藏、展开态还原，并且告诉你哪些 prop 没找到。

零运行时依赖，不 `import vue`，构建产物 < 1 KB。

## 快速开始

```bash
npm install ele-searchbar-trigger
```

```vue
<template>
  <el-form ref="formRef" :inline="true" :model="query">
    <el-form-item label="名称" prop="name">
      <el-input v-model="query.name" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="query.status" />
    </el-form-item>
    <el-form-item label="创建时间" prop="createdAt">
      <el-date-picker v-model="query.createdAt" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="toggleSearchBar">
        {{ isSmallSearchBar ? '展开' : '收起' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import triggerBySearchBar from 'ele-searchbar-trigger'

export default {
  data() {
    return {
      isSmallSearchBar: false,
      query: { name: '', status: '', createdAt: '' },
      // 收起时需要隐藏的字段 prop
      collapsedFields: ['status', 'createdAt'],
    }
  },
  methods: {
    toggleSearchBar() {
      this.isSmallSearchBar = !this.isSmallSearchBar
      // 等 DOM 更新后再操作，确保新渲染的表单项也能被处理
      this.$nextTick(() => {
        const { hidden, missing } = triggerBySearchBar(this, 'formRef', this.collapsedFields)
        if (missing.length) {
          console.warn('以下 prop 在表单中不存在：', missing)
        }
      })
    },
    handleSearch() {
      // ...
    },
  },
}
</script>
```

### 其他引入方式

```js
// CommonJS：包体本身就是一个函数，不需要 .default
const triggerBySearchBar = require('ele-searchbar-trigger')
```

```html
<!-- 直接 <script> 引入，全局变量 EleSearchbarTrigger -->
<script src="https://unpkg.com/ele-searchbar-trigger"></script>
```

可交互示例见 [examples/index.html](./examples/index.html)：先 `npm run build`，再用浏览器打开该文件（无需起服务）。

## API

```js
triggerBySearchBar(vm, refName = 'formRef', blackList = [])
```

函数读取 `vm.isSmallSearchBar` 决定方向：为真则隐藏，为假则还原。

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `vm` | `Vue` 组件实例 | - | 需要暴露 `isSmallSearchBar` 布尔状态 |
| `refName` | `string` | `'formRef'` | 指向 `el-form` 的 ref 名称 |
| `blackList` | `string[]` | `[]` | 收起态需要隐藏的表单项 `prop` 列表 |

返回值：

```js
{
  hidden: ['status', 'createdAt'], // 本次实际处理的 prop
  missing: [],                     // blackList 里在表单中找不到的 prop
  collapsed: true,                 // 本次是否按收起态处理
}
```

抛错（`TypeError`，信息里带具体定位）：

- 第一个参数不是 Vue 实例 / 没有 `$refs`；
- `blackList` 不是数组；
- `$refs` 里没有 `refName` 对应的组件；
- 对应组件的 `$children` 不是数组（通常是 ref 没指向 `el-form`）。

### 兼容旧写法

```js
// 1.x 的显式绑定写法同样可用
triggerBySearchBar.call(this, 'formRef', ['status', 'createdAt'])
```

## 已知限制

- 只支持 **Vue 2 + Element UI 2.x**，依赖 `el-form` 的 `$children` 与 `el-form-item.prop`；
- 通过 `$el.style.display` 直接改 DOM，不进入 Vue 响应式状态。组件重新渲染或列表重建后需要再次调用（示例里放在 `$nextTick` 中就是为此）。被隐藏前的 `display` 值会被记住，展开时原样还原；
- 表单项需要显式写 `prop`，`blackList` 按 `prop` 匹配。

## 开发

```bash
npm install
npm run lint     # ESLint 9 flat config
npm test         # Jest
npm run build    # 产出 dist/index.mjs | index.cjs | index.umd.js
```

`npm publish` 前会自动跑 lint + test + build（`prepublishOnly`）。

## 贡献

欢迎 issue 和 PR，提交前请先看 [CONTRIBUTING.md](./CONTRIBUTING.md)。变更记录见 [CHANGELOG.md](./CHANGELOG.md)。

## License

[MIT](./LICENSE)
