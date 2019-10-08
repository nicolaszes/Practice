/**
 * 1.子组件为何不可以修改父组件传递的 Prop，单向数据流，易于监测数据的流动，出现了错误可以更加迅速的定位到错误发生的位置。
 * 
 * 2.如果修改了，Vue 是如何监控到属性的修改并给出警告的。
 * 在initProps的时候，在defineReactive时通过判断是否在开发环境，
 * 如果是开发环境，会在触发set的时候判断是否此key是否处于updatingChildren中被修改
 * 如果不是，说明此修改来自子组件，触发warning提示。
 */

if (process.env.NODE_ENV !== 'production') {
  var hyphenatedKey = hyphenate(key);
  if (isReservedAttribute(hyphenatedKey) ||
    config.isReservedAttr(hyphenatedKey)) {
    warn(
      ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
      vm
    );
  }
  defineReactive$$1(props, key, value, function () {
    if (!isRoot && !isUpdatingChildComponent) {
      warn(
        "Avoid mutating a prop directly since the value will be " +
        "overwritten whenever the parent component re-renders. " +
        "Instead, use a data or computed property based on the prop's " +
        "value. Prop being mutated: \"" + key + "\"",
        vm
      );
    }
  });
}