# Inheritance check example

In this example we'll check if an object class implements a specific interface, doing a recursive check on the inheritance hierarchy.

## Example application

This example may be the starting point to build an effective type-based dependency injection framework.

## Building
Install reflec-ts before building and running the example.

```shell
npm install -g reflec-ts
```

Then run:

```shell
reflec-tsc -p .
node dist/main.js
```

## Documentation

In this example we have some types in `types.ts`:

```TypeScript
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
```

Note that `MyClass` directly implements `OtherInterface` and `Child`, but also `Parent` through *indirect* inheritance. We only export `Parent` and `SomeInterface` for the purpose of inheritance checking. In `checker.ts` we implemented a small function that climbs up the inheritance hierarchy for a given object class and check if it implements a specific interface:

```TypeScript
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
```

Let's build an instance of `MyClass` (we know which interfaces this class implements, but maybe not the end user of our `types.ts` "library"):

```TypeScript
let obj = buildObject();
```

We can do a pair of checks, in `main.ts`:

```TypeScript
console.log("obj implements Parent: " + implementsInterface(obj, Parent));
console.log("obj implements SomeInterface: " + implementsInterface(obj, SomeInterface));
```

This is the output:

```shell
$ node dist/main.js
obj implements Parent: true
obj implements SomeInterface: false
```

This may be very helpful for a loose coupling mechanism between application components: imagine to build many different services based on a set of public interfaces that you can extend as you want: your IoC framework may use a simple mechanism like the one in `checker.ts` (about ten lines of code!!) to detect dependencies between components.
