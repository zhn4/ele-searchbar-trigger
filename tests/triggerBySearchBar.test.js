import triggerBySearchBar from '../src/index'

function createForm(fields) {
  return {
    $children: fields.map(({ prop, display = '' }) => ({ prop, $el: { style: { display } } })),
  }
}

function createVm({ fields, isSmallSearchBar = true, refName = 'formRef' }) {
  const form = createForm(fields)

  return {
    vm: { $refs: { [refName]: form }, isSmallSearchBar },
    form,
  }
}

describe('triggerBySearchBar', () => {
  it('收起时隐藏 blackList 中的表单项，并返回处理结果', () => {
    const { vm, form } = createVm({ fields: [{ prop: 'field1' }, { prop: 'field2' }] })

    const result = triggerBySearchBar(vm, 'formRef', ['field1'])

    expect(form.$children[0].$el.style.display).toBe('none')
    expect(form.$children[1].$el.style.display).toBe('')
    expect(result).toEqual({ hidden: ['field1'], missing: [], collapsed: true })
  })

  it('展开时不覆盖模板里原有的 display', () => {
    const { vm, form } = createVm({
      fields: [{ prop: 'field1', display: 'flex' }],
      isSmallSearchBar: false,
    })

    triggerBySearchBar(vm, 'formRef', ['field1'])

    expect(form.$children[0].$el.style.display).toBe('flex')
  })

  it('先收起再展开时能回到原始 display', () => {
    const { vm, form } = createVm({
      fields: [{ prop: 'field1', display: 'flex' }],
      isSmallSearchBar: true,
    })

    triggerBySearchBar(vm, 'formRef', ['field1'])
    expect(form.$children[0].$el.style.display).toBe('none')

    vm.isSmallSearchBar = false
    triggerBySearchBar(vm, 'formRef', ['field1'])
    expect(form.$children[0].$el.style.display).toBe('flex')
  })

  it('支持旧写法 triggerBySearchBar.call(this, refName, blackList)', () => {
    const { vm, form } = createVm({ fields: [{ prop: 'field1' }] })

    const result = triggerBySearchBar.call(vm, 'formRef', ['field1'])

    expect(form.$children[0].$el.style.display).toBe('none')
    expect(result.hidden).toEqual(['field1'])
  })

  it('未传 refName 时默认使用 formRef', () => {
    const { vm, form } = createVm({ fields: [{ prop: 'field1' }] })

    const result = triggerBySearchBar(vm, undefined, ['field1'])

    expect(form.$children[0].$el.style.display).toBe('none')
    expect(result.hidden).toEqual(['field1'])
  })

  it('blackList 为空时不做任何 DOM 改动', () => {
    const { vm, form } = createVm({ fields: [{ prop: 'field1' }] })

    const result = triggerBySearchBar(vm, 'formRef', [])

    expect(form.$children[0].$el.style.display).toBe('')
    expect(result).toEqual({ hidden: [], missing: [], collapsed: true })
  })

  it('返回 blackList 中在表单里找不到的 prop', () => {
    const { vm } = createVm({ fields: [{ prop: 'field1' }] })

    const result = triggerBySearchBar(vm, 'formRef', ['field1', 'notExist'])

    expect(result.missing).toEqual(['notExist'])
  })

  it('只处理 blackList 内的字段', () => {
    const { vm, form } = createVm({ fields: [{ prop: 'field1' }, { prop: 'field2' }] })

    triggerBySearchBar(vm, 'formRef', ['field2'])

    expect(form.$children[0].$el.style.display).toBe('')
    expect(form.$children[1].$el.style.display).toBe('none')
  })

  it('未绑定 Vue 实例时抛出 TypeError', () => {
    expect(() => triggerBySearchBar('formRef', ['field1'])).toThrow(TypeError)
    expect(() => triggerBySearchBar('formRef', ['field1'])).toThrow(/第一个参数必须是 Vue 组件实例/)
  })

  it('ref 不存在时抛出 TypeError 并带上 ref 名称', () => {
    const { vm } = createVm({ fields: [{ prop: 'field1' }] })

    expect(() => triggerBySearchBar(vm, 'nonExistentRef', ['field1'])).toThrow(/"nonExistentRef"/)
  })

  it('ref 没有指向 el-form 时抛出 TypeError', () => {
    const vm = { $refs: { formRef: {} }, isSmallSearchBar: true }

    expect(() => triggerBySearchBar(vm, 'formRef', ['field1'])).toThrow(/\$children 不是数组/)
  })

  it('blackList 不是数组时抛出 TypeError', () => {
    const { vm } = createVm({ fields: [{ prop: 'field1' }] })

    expect(() => triggerBySearchBar(vm, 'formRef', 'field1')).toThrow(/blackList 必须是字符串数组/)
  })
})
