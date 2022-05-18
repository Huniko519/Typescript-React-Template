// @ts-ignore
export const deepFreeze = (obj) => {
  const propNames = Object.getOwnPropertyNames(obj)
  propNames.forEach((name) => {
    const prop = obj[name]
    if (typeof prop === 'object' && prop !== null) deepFreeze(prop)
  })
  return Object.freeze(obj)
}

// @ts-ignore
export const clearEmptyValue = (obj) => {
  const resObj = { ...obj }
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) delete resObj[key]
  })
  return resObj
}

// @ts-ignore
export const clearEmptyValueAndToHyphen = (obj, str = '_') => {
  let resObj = { ...obj }
  resObj = clearEmptyValue(resObj)
  Object.keys(resObj).forEach((key) => {
    // @ts-ignore
    resObj[key.humpToHyphen(str)] = resObj[key]
    delete resObj[key]
  })
  return resObj
}

// @ts-ignore
export const toHyphen = (obj) => {
  const propNames = Object.getOwnPropertyNames(obj)
  const resObj = {}
  propNames.forEach((name) => {
    // @ts-ignore
    resObj[name.humpToHyphen('_')] = obj[name]
  })

  return resObj
}

// @ts-ignore
export const toHump = (obj) => {
  if (!obj) return obj
  const propNames = Object.getOwnPropertyNames(obj)
  const resObj = {}
  propNames.forEach((name) => {
    // @ts-ignore
    resObj[name.hyphenToHump('_')] = obj[name]
  })
  return resObj
}

// @ts-ignore
export const objResult = (obj, str, empty = 'undefined') => {
  if (!obj) return obj
  const strArr = str.split('.')
  let nowObj = JSON.parse(JSON.stringify(obj))
  while (strArr.length) {
    const item = strArr.shift()
    if (nowObj[item] || nowObj[item] === 0 || nowObj[item] === false) {
      nowObj = nowObj[item]
    } else {
      return empty
    }
  }
  return nowObj
}
