/**
 * 折叠 / 展开 Element UI 搜索栏中的部分表单项。
 *
 * 推荐用法（在同一个组件的 methods 里）：
 *
 *   import triggerBySearchBar from 'ele-searchbar-trigger'
 *
 *   triggerBySearchBar(this, 'formRef', ['status', 'createdAt'])
 *
 * 兼容旧写法：
 *
 *   triggerBySearchBar.call(this, 'formRef', ['status', 'createdAt'])
 *
 * @param {object} vm Vue 组件实例（需要暴露 isSmallSearchBar 布尔状态）
 * @param {string} [refName='formRef'] 指向 el-form 的 ref 名称
 * @param {string[]} [blackList=[]] 处于收起态时需要隐藏的表单项 prop 列表
 * @returns {{ hidden: string[], missing: string[], collapsed: boolean }}
 *   hidden: 本次实际处理的 prop；missing: blackList 中在表单里找不到的 prop；
 *   collapsed: 本次是否按"收起"处理。
 * @throws {TypeError} 参数不合法或找不到对应的 ref / el-form 子组件时抛出
 */
const DEFAULT_REF_NAME = 'formRef'

/** 记录元素被隐藏前的 display 取值，展开时原样还原，避免写死 inline-block。 */
const originalDisplay = new WeakMap()

function resolveArguments(thisArg, first, second, third) {
  // 旧写法通过 call(this, refName, blackList) 调用，第一个参数是字符串或不再有参数
  const legacyCall = typeof first !== 'object' || first === null
  const vm = legacyCall ? thisArg : first
  const refName = (legacyCall ? first : second) || DEFAULT_REF_NAME
  const blackList = (legacyCall ? second : third) || []

  return { vm, refName, blackList }
}

export default function triggerBySearchBar(first, second, third) {
  const { vm, refName, blackList } = resolveArguments(this, first, second, third)

  if (!vm || !vm.$refs) {
    throw new TypeError(
      'triggerBySearchBar: 第一个参数必须是 Vue 组件实例，例如 triggerBySearchBar(this, "formRef")；旧写法 triggerBySearchBar.call(this, "formRef") 同样可用',
    )
  }

  if (!Array.isArray(blackList)) {
    throw new TypeError(`triggerBySearchBar: blackList 必须是字符串数组，收到的是 ${typeof blackList}`)
  }

  const searchBar = vm.$refs[refName]

  if (!searchBar) {
    throw new TypeError(`triggerBySearchBar: $refs 中不存在 ref="${refName}"，请检查 ref 名称是否正确`)
  }

  const items = searchBar.$children

  if (!Array.isArray(items)) {
    throw new TypeError(
      `triggerBySearchBar: $refs["${refName}"].$children 不是数组，ref 需要指向 el-form 组件（Element UI 2.x）`,
    )
  }

  const collapsed = Boolean(vm.isSmallSearchBar)
  const hidden = []

  for (const item of items) {
    if (!blackList.includes(item.prop)) continue

    hidden.push(item.prop)

    const el = item.$el

    if (!el || !el.style) continue

    if (collapsed) {
      if (!originalDisplay.has(el)) originalDisplay.set(el, el.style.display)
      el.style.display = 'none'
    } else if (originalDisplay.has(el)) {
      // 只还原被自己隐藏过的元素，没处理过的不动，避免覆盖模板里原有的 display
      el.style.display = originalDisplay.get(el) || ''
      originalDisplay.delete(el)
    }
  }

  const missing = blackList.filter((prop) => !items.some((item) => item.prop === prop))

  return { hidden, missing, collapsed }
}
