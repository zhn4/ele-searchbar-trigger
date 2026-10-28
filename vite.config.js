import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'EleSearchbarTrigger',
      formats: ['es', 'cjs', 'umd'],
      // .mjs / .cjs 后缀让 Node 与打包工具无需猜模块类型
      fileName: (format) => ({ es: 'index.mjs', cjs: 'index.cjs', umd: 'index.umd.js' })[format],
    },
  },
})
