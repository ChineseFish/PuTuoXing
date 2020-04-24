export const debounce = (fn, opts) => {
  let delay = (opts && opts.delay) || opts || 0
  return (...a) => {
    let args = a
    let timer
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        args = timer = null
      }, delay)
    }
  }
}
