# Type Validator example

In this example we'll see how to validate an object of type `<any>` against a given interface or class.

## Example application

This example may be the starting point to build a simple validation library

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

In this example we have 2 interfaces in `types.ts`:

```TypeScript
export interface Person {
    name: string;
    surname: string;
    age: number;
}

export interface Car {
    model: string;
    brand: string;
    plate: string;
    owner: Person;
}
```

and we want to check if some objects match with them. In `validator.ts` we do this check by visiting the given interface structure and checking that each field of the object matches the interface. We can try it with some test objects:

```TypeScript
let personOk = { name: "John", surname: "Doe", age: 36 };
let personNotOk = { name: 22, age: "x" };

let carOk = {brand:"Lamborghini", model:"Gallardo", owner: personOk};
let carNotOk1 = {brand: 33, owner: personOk};
let carNotOk2 = {brand:"Aston Martin", model:"DB-9", owner: personNotOk};

console.log("isValid(personOk):  " + isValid(personOk, Person) + "\n");
console.log("isValid(personNotOk):  " + isValid(personNotOk, Person) + "\n");

console.log("isValid(carOk):  " + isValid(carOk, Car) + "\n");
console.log("isValid(carNotOk1):  " + isValid(carNotOk1, Car) + "\n");
console.log("isValid(carNotOk2):  " + isValid(carNotOk2, Car) + "\n");
```

As you can see, personNotOk has a name that is a number, and it doesn't match with `Person` interface. Furthermore, `carNotOk2` seems to be a valid `Car` object, but its `owner` field still points to an invalid `Person` object. Let's see this in action:

```shell
$ node dist/main.js
isValid(personOk):  true

Field name should be string but it is number
isValid(personNotOk):  false

isValid(carOk):  true

Field brand should be string but it is number
isValid(carNotOk1):  false

Field name should be string but it is number
isValid(carNotOk2):  false
```

The `isValid` function did the check recursively for `carNotOk2`, and detected the issue with the `Person.name` field.
