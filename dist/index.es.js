function a(r = "formRef", i = []) {
  if (!r) {
    console.warn("triggerBySearchBar: 搜索栏表单的 ref 值");
    return;
  }
  if (i.length === 0 && console.warn("triggerBySearchBar: blackList 参数为空，未指定需要隐藏的字段 prop 列表"), this.$refs[r] === void 0) {
    console.error(`triggerBySearchBar: 未找到 ref 名称为 ${r} 的搜索栏表单，请检查 ref 名称是否正确`);
    return;
  }
  this.$refs[r].$children.filter((e) => i.includes(e.prop)).forEach((e) => {
    e.$el.style.display = this.isSmallSearchBar ? "none" : "inline-block";
  });
}
export {
  a as default
};
