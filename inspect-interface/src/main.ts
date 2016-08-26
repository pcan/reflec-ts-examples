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

if (MyInterface.members) { // members may be undefined if there are no members.
    for (let member of MyInterface.members) {
        let memberDescription = `Member ${member.name} is ${member.type.kind}`;
        if (member.type.kind === 'interface' || member.type.kind === 'class') {
            memberDescription += ' - name: ' + (<NamedType>member.type).name;
        }
        console.log(memberDescription);
    }
}
