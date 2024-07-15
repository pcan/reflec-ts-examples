
// check if an object matches an interface, recursively.
export function isValid(object: any, interfaceObj: Interface): object is interfaceObj {

    if (interfaceObj.members) { // members may be undefined if there are no members.
        for (let member of interfaceObj.members) {
            if (isPrimitive(member.type) && object[member.name] && member.type.kind != typeof object[member.name]) {
                // found a primitive type field in the interface, but not in the object
                console.log(`Field ${member.name} should be ${member.type.kind} but it is ${typeof object[member.name]}`)
                return false;
            } else if (member.type.kind === 'interface' && object[member.name]) {
                // recursively check field type against the corresponding interface
                if(!isValid(object[member.name], <Interface>member.type)) {
                    return false;
                }
            }
            // TODO: check class types...
        }
    }
    return true;
}


function isPrimitive(type: Type): boolean {
    return type && (
        type.kind === "string" ||
        type.kind === "number" ||
        type.kind === "boolean"
    );
}
