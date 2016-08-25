import {Teacher} from './classes';
import {unmarshall} from '././unmarshaller';

 // this string may be the result of a GET.
let jsonObject = `{
    "name": "John Doe",
    "id": 45,
    "students": [
        {"id": 1, "name": "Ted"},
        {"id": 2, "name": "Lenny"},
        {"id": 3, "name": "Frank"}
    ]
}`;


let teacher = unmarshall<Teacher>(jsonObject, Teacher.getClass());
console.log("teacher instanceof Teacher: " + (teacher instanceof Teacher));
//now we can call Teacher methods on unmarshalled object!
teacher.printMyDetails();
