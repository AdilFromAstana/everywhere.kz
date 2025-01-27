const has = Object.prototype.hasOwnProperty;

/**
 * To string.
 *
 * @type {Function}
 */

const toString = Object.prototype.toString;

export function isEmpty(val: any) {
    // Null and Undefined...
    if (val === undefined) return true;

    if (val == null) return true;

    // Booleans...
    if ('boolean' == typeof val) return false;

    // Numbers...
    // if ('number' == typeof val) return val === 0

    // Strings...
    if ('string' == typeof val) return val.length === 0;

    // Functions...
    if ('function' == typeof val) return val.length === 0;

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
                    if (has.call(val, key)) return false;
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
