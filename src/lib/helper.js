
export const isFn         = ref => typeof ref == 'function'
export const isArray      = ref => Array.isArray(ref)
export const isObject     = ref => ref && typeof ref == 'object'
export const isNum        = ref => typeof ref == 'number' && !isNaN(ref)
export const isBool       = ref => typeof ref == 'boolean'
export const isString     = ref => typeof ref == 'string'
export const isUndefined  = ref => typeof ref == 'undefined'
export const isNull       = ref => ref === null

export const callFn = (callback, ...params ) => isFn(callback) && callback(...params)