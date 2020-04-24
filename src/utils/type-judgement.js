export const isFunction = (input) => {
  return input instanceof Function ||
    Object.prototype.toString.call(input) === '[object Function]'
}

export const isNumber = (input) => {
  return typeof input === 'number' ||
    Object.prototype.toString.call(input) === '[object Number]'
}

export const isArray = (input) => {
  return input instanceof Array ||
    Object.prototype.toString.call(input) === '[object Array]'
}

export const isDate = (input) => {
  return input instanceof Date ||
    Object.prototype.toString.call(input) === '[object Date]'
}

export const isObjectEmpty = (obj) => {
  if (Object.getOwnPropertyNames) {
    return (Object.getOwnPropertyNames(obj).length === 0)
  } else {
    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
        return false
      }
    }
    return true
  }
}

export const isObject = (input) => {
  // IE8 will treat undefined and null as object if it wasn't for
  // input != null
  return input != null &&
    Object.prototype.toString.call(input) === '[object Object]'
}

export const isUndefined = (input) => {
  return input === void 0
}
