export default function triggerBySearchBar(refName = `formRef`, blackList = []) {
  if (!refName) {
    console.warn('triggerBySearchBar: 搜索栏表单的 ref 值')
    return
  }

  if (blackList.length === 0) {
    console.warn('triggerBySearchBar: blackList 参数为空，未指定需要隐藏的字段 prop 列表')
  }

  if (this.$refs[refName] === undefined) {
    console.error(`triggerBySearchBar: 未找到 ref 名称为 ${refName} 的搜索栏表单，请检查 ref 名称是否正确`)
    return
  }

  let searchBarFormItemArr = this.$refs[refName].$children

  const hiddenItemArr = searchBarFormItemArr.filter(item => blackList.includes(item.prop))

  hiddenItemArr.forEach(item => {
    item.$el.style.display = this.isSmallSearchBar ? 'none' : 'inline-block'
  })
}
