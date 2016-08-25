
export class Teacher {

    private students: Array<Student>; // we'll read type info for this!

    constructor(public id: string, public name: string) {
        this.students = new Array<Student>();
    }

    public getStudents(): Array<Student> {
        return this.students;
    }

    public printMyDetails(): void {
        console.log(`Teacher with id ${this.id} - name: ${this.name}`);
        for(let student of this.students) {
            student.printMyDetails();
        }
    }

}

export class Student {

    constructor(public id: string, public name: string) {
    }

    public printMyDetails(): void {
        console.log(`Student with id ${this.id} - name: ${this.name}`)
    }

}
