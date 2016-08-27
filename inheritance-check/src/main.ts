import {buildObject, Parent, SomeInterface} from './types';
import {implementsInterface} from './checker';
/*
    note that you have no access to "Child" interface nor "MyClass" class, since they're not
    exported, but the example will work anyway.
*/

let obj = buildObject();

console.log("obj implements Parent: " + implementsInterface(obj, Parent));
console.log("obj implements SomeInterface: " + implementsInterface(obj, SomeInterface));
