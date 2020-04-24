export const zeroFill = (number, targetLength = 2, forceSign) => {
  const absNumber = '' + Math.abs(number)
  const zerosToFill = targetLength - absNumber.length
  const sign = number >= 0
  return (sign ? (forceSign ? '+' : '') : '-') +
    Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber
}
