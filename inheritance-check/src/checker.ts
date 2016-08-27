/**
 * Checks if the object class implements a specific target interface.
 */
export function implementsInterface(object: Object, target: Interface) {
    const objClass: Class = object.constructor && object.constructor.getClass();
    if (objClass && objClass.implements) { // not all object will have Reflection information.
        let found = false;
        for (let base of objClass.implements) {
            let found = interfaceExtends(base, target);
            if (found) {
                return true;
            }
        }
    }
    return false;
}

// recursive interface inheritance check
function interfaceExtends(i: Interface, target: Interface) {
    if (i === target) { // yes! we can always use strict equality checks with reflec-ts objects :)
        return true;
    }
    if (i.extends) {
        let found = false;
        for (let base of i.extends) {
            // do a recursive check on base interface...
            found = interfaceExtends(base, target);
            if (found) {
                return true;
            }
        }
    }
    return false;
}
