
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
