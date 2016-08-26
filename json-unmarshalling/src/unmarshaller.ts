
// main entry point for JSON unmarshalling
export function unmarshall<T extends any>(json: string, targetClass: Class): T {
    let parsedObject = JSON.parse(json);
    convert(parsedObject, targetClass);
    return <T>parsedObject;
}


// recursive object conversion function. Now it changes the prototype to each nested object.
function convert(obj: any, targetClass: Class) {

    // this can be heavy, but we don't care now. Another approach may be shallow copy,
    // since recursion will take care of the deep copy.
    Object.setPrototypeOf(obj, targetClass.getConstructor().prototype);

    if (!targetClass.members) {
        return; // current class has no members.
    }

    // get all fields of targetClass that are classes or reference to types that may be arrays.
    let fields = targetClass.members.filter(m => m.type.kind === "class" || m.type.kind === "array");

    for (let field of fields) {
        if (field.type.kind === "class") {
            // we have a class type for the current field. Convert it recursively.
            const fieldClass = <Class>field.type;
            convert(obj[field.name], fieldClass);
        } else {
            // we have an array type for the current field. Convert each member recursively.
            const arrayType = <ArrayType>field.type;
            if(arrayType.elementType.kind === "class") { // we don't need conversion for interfaces.
                const array = <Array<any>>obj[field.name];
                for(let item of array) {
                    convert(item, arrayType.elementType);
                }
            }
        }
        // TODO: type references, unions, class expressions...
    }
}
