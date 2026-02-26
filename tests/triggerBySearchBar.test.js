import triggerBySearchBar from '../src/index'

describe('triggerBySearchBar', () => {
  it('should warn if refName is not provided', () => {
    console.warn = jest.fn()
    triggerBySearchBar()
    expect(console.warn).toHaveBeenCalledWith('triggerBySearchBar: 搜索栏表单的 ref 值')
  })

  it('should warn if blackList is empty', () => {
    console.warn = jest.fn()
    triggerBySearchBar('formRef', [])
    expect(console.warn).toHaveBeenCalledWith('triggerBySearchBar: blackList 参数为空，未指定需要隐藏的字段 prop 列表')
  })

  it('should error if refName does not exist in $refs', () => {
    console.error = jest.fn()
    const context = { $refs: {} }
    triggerBySearchBar.call(context, 'nonExistentRef', [])
    expect(console.error).toHaveBeenCalledWith(
      'triggerBySearchBar: 未找到 ref 名称为 nonExistentRef 的搜索栏表单，请检查 ref 名称是否正确',
    )
  })

  it('should hide elements in blackList when isSmallSearchBar is true', () => {
    const mockElement = { style: { display: '' } }
    const context = {
      $refs: {
        formRef: {
          $children: [
            { prop: 'field1', $el: mockElement },
            { prop: 'field2', $el: mockElement },
          ],
        },
      },
      isSmallSearchBar: true,
    }

    triggerBySearchBar.call(context, 'formRef', ['field1'])
    expect(mockElement.style.display).toBe('none')
  })

  it('should show elements in blackList when isSmallSearchBar is false', () => {
    const mockElement = { style: { display: '' } }
    const context = {
      $refs: {
        formRef: {
          $children: [
            { prop: 'field1', $el: mockElement },
            { prop: 'field2', $el: mockElement },
          ],
        },
      },
      isSmallSearchBar: false,
    }

    triggerBySearchBar.call(context, 'formRef', ['field1'])
    expect(mockElement.style.display).toBe('inline-block')
  })
})
