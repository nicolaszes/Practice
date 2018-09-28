// typeof 对于基本类型，除了 null 都可以显示正确的类型
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b 没有声明，但是还会显示 undefined

// typeof 对于对象，除了函数都会显示 object
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'

// 对于 null 来说，虽然它是基本类型，但是会显示 object，这是一个存在很久了的 Bug
typeof null // 'object'

/**
 * 为什么会出现这种情况呢？
 * 因为在 JS 的最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息，
 * 000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object。
 * 虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。
 */

/**
 * instanceof 可以正确的判断对象的类型
 * 因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。
 */
function newInstanceof(left, right) {
  // 获得类型的原型
  let prototype = right.prototype
  // 获得对象的原型
  left = left.__proto__
  // 判断对象的类型是否等于类型的原型
  while (true) {
    if (left === null)
      return false
    if (prototype === left)
      return true
    left = left.__proto__
  }
}

