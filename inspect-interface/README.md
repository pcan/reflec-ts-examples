# Interface inspection example

In this example we'll print all members of a TypeScript `interface`.

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

In this example we have some types in `main.ts`:

```TypeScript
interface MyInterface {
    id: number;
    name: string;
    nestedInterface: AnotherInterface;
    nestedClass: MyClass;
}

interface AnotherInterface {
    description: string;
}

class MyClass {
    field: Date;
}
```

and we want to print all members of `MyInterface`:

```TypeScript
for (let member of MyInterface.members) {
    let memberDescription = `Member ${member.name} is ${member.type.kind}`;
    if (member.type.kind === 'interface' || member.type.kind === 'class') {
        memberDescription += ' - name: ' + (<NamedType>member.type).name;
    }
    console.log(memberDescription);
}
```

Using the kind property of the `Type` object, we can do deep inspection (and do it recursively, if we want) on the field type, when it's `class` or `interface`.

This is the output:

```shell
$ node dist/main.js
Member id is number
Member name is string
Member nestedInterface is interface - name: AnotherInterface
Member nestedClass is class - name: MyClass
```
