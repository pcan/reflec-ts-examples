import {Person, Car} from './types';
import {isValid} from './validator';

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
