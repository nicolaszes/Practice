/**
 * 1.子组件为何不可以修改父组件传递的 Prop，单向数据流，易于监测数据的流动，出现了错误可以更加迅速的定位到错误发生的位置。
 * 
 * 2.如果修改了，Vue 是如何监控到属性的修改并给出警告的。
 * 在initProps的时候，在defineReactive时通过判断是否在开发环境，
 * 如果是开发环境，会在触发set的时候判断是否此key是否处于updatingChildren中被修改
 * 如果不是，说明此修改来自子组件，触发warning提示。
 */

/**
 * 浅度监听
 * 基本数据类型，子组件修改父组件传的props会警告
 * 如果传入的是引用数据类型，那么修改改引用数据类型的某个属性值时，对应的props也会修改，并且vue不会爆警告。
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
/**
 * 需要特别注意的是，当你从子组件修改的prop属于基础类型时会触发提示。
 * 这种情况下，你是无法修改父组件的数据源的， 因为基础类型赋值时是值拷贝。
 * 你直接将另一个非基础类型（Object, array）赋值到此key时也会触发提示(但实际上不会影响父组件的数据源)，
 * 当你修改object的属性时不会触发提示，并且会修改父组件数据源的数据。
 */