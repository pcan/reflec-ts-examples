

export function unmarshall<T extends any>(json: string, targetClass: Class): T {
    let parsedObject = JSON.parse(json);
    convert(parsedObject, targetClass);
    return <T>parsedObject;
}

function convert(obj: any, targetClass: Class) {

    // this can be heavy, but we don't care now. Another approach may be shallow copy,
    // since recursion will take care of the deep copy.
    Object.setPrototypeOf(obj, targetClass.getConstructor().prototype);

    // get all fields of targetClass that are classes or reference to types that may be arrays.
    let fields = targetClass.members.filter(m => m.type.kind === "class" || m.type.kind === "array");

    for (let field of fields) {
        if (field.type.kind === "class") {
            const fieldClass = <Class>field.type;
            convert(obj[field.name], fieldClass);
        } else {
            const arrayType = <ArrayType>field.type;
            const array = <Array<any>>obj[field.name];
            for(let item of array) {
                convert(item, arrayType.elementType);
            }
        }
        // TODO: type references, unions, class expressions...
    }
}
