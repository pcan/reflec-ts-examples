# JSON unmarshalling example

In this example we'll see how to read a JSON object from a string (that may be the result of a HTTP GET) and build it with the correct prototype, recursively.

If you have a TypeScript model class that contains methods and fields and you want to *"cast"* a JSON object to that class in order to call its methods, you have to inspect your class reflection data in order to apply the right prototype to nested objects.

## Example application

This kind of unmarshalling is essential if you want to use the [Active record pattern](http://www.martinfowler.com/eaaCatalog/activeRecord.html), since you have both data and operation of domain objects.

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

In this example we have two classes, `Teacher` and `Student`:

```TypeScript
class Teacher {
    private students: Array<Student>; // we'll read type info for this!

    constructor(public id: string, public name: string) {
        this.students = new Array<Student>();
    }

    public printMyDetails(): void {
        console.log(`Teacher with id ${this.id} - name: ${this.name}`);
        for(let student of this.students) {
            student.printMyDetails();
        }
    }
}

class Student {

    constructor(public id: string, public name: string) {
    }

    public printMyDetails(): void {
        console.log(`Student with id ${this.id} - name: ${this.name}`)
    }
}
```

and we want to recreate a `Teacher` instance from this string:

```
let jsonObject = `{
    "name": "John Doe",
    "id": 45,
    "students": [
        {"id": 1, "name": "Ted"},
        {"id": 2, "name": "Lenny"},
        {"id": 3, "name": "Frank"}
    ]
}`;
```

Our [unmarshaller](./src/unmarshaller.ts) method will take care of this. You pass a `Class` object and your json string, and it will assign the right prototype to each nested object recursively:

```TypeScript
let teacher = unmarshall<Teacher>(jsonObject, Teacher.getClass());
```

**Warning (from MDN):** Changing the [[Prototype]] of an object is, by the nature of how modern JavaScript engines optimize property accesses, a very slow operation, in every browser and JavaScript engine.

Instead of changing the prototype property of an object, you may want to create a fresh instance of the right class. This improvement should be made in `unmarshaller.ts`.

At this point you can invoke `teacher.printMyDetails();`, and this is the output:

```shell
$ node dist/main.js
Teacher with id 45 - name: John Doe
Student with id 1 - name: Ted
Student with id 2 - name: Lenny
Student with id 3 - name: Frank
```
