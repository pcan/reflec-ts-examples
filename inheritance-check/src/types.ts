export interface Parent {
    id: number;
}

interface Child extends Parent {
    name: string;
}

interface OtherInterface {
    description: string;
}

export interface SomeInterface {
    kind: number;
}

class MyClass implements OtherInterface, Child {

    constructor(public id: number, public name: string, public description: string) {
    }
}

let counter = 0;
export function buildObject(): OtherInterface {
    let id = counter++;
    return new MyClass(id, "some name...", "some description...");
}
