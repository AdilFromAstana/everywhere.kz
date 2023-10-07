const toString = Object.prototype.toString;

export function isEmpty(val: any): boolean {
  // Null and Undefined...
  if (val === undefined) return true;

  if (val == null) return true;

  // Booleans...
  if (typeof val === 'boolean') return false;

  // Numbers...
  // if (typeof val === 'number') return val === 0;

  // Strings...
  if (typeof val === 'string') return val.length === 0;

  // Functions...
  if (typeof val === 'function') return val.length === 0;

  // Arrays...
  if (Array.isArray(val)) return val.length === 0;

  // Errors...
  if (val instanceof Error) return val.message === '';

  // Objects...
  if (val.toString === toString) {
    switch (val.toString()) {
      // Maps, Sets, Files and Errors...
      case '[object File]':
      case '[object Map]':
      case '[object Set]': {
        return val.size === 0;
      }

      // Plain objects...
      case '[object Object]': {
        for (const key in val) {
          if (Object.prototype.hasOwnProperty.call(val, key)) return false;
        }

        return true;
      }
      default: {
        return true;
      }
    }
  }

  // Anything else...
  return false;
}
