export interface SearchBarFormItem {
  prop?: string
  $el?: { style: { display: string } }
}

export interface SearchBarForm {
  $children: SearchBarFormItem[]
}

export interface SearchBarVm {
  /** Vue 2 组件实例上的 $refs，ref 需要指向 el-form */
  $refs: Record<string, SearchBarForm | undefined>
  /** 搜索栏当前是否处于收起态 */
  isSmallSearchBar?: boolean
}

export interface TriggerBySearchBarResult {
  /** 本次实际处理的表单项 prop */
  hidden: string[]
  /** blackList 中在表单里找不到的 prop */
  missing: string[]
  /** 本次是否按收起态处理 */
  collapsed: boolean
}

/**
 * 折叠 / 展开 Element UI 搜索栏中的部分表单项。
 *
 * 推荐写法：triggerBySearchBar(vm, 'formRef', ['status'])
 * 兼容写法：triggerBySearchBar.call(vm, 'formRef', ['status'])
 */
export default function triggerBySearchBar(
  this: SearchBarVm,
  vm?: SearchBarVm | string,
  refNameOrBlackList?: string | string[],
  blackList?: string[],
): TriggerBySearchBarResult
