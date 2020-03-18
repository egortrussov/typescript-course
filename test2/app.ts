function add(a: number, b: number, sh: boolean) {
//     if (typeof a !== 'number' || typeof b !== 'number')
//         throw new Error('Incorreact input!');
//     else
    if (sh)
        return a + b;
}

let n1 = '5', n2 = 1.3;
let printRes = true;

let num: number;
num = 55;

let res = add(+n1, +n2, printRes);
console.log(res)

const person: {
    name: string,
    age: number,
    hobbies: string[]
} = {
    name: 'name',
    age: 30,
    hobbies: ['draw', 'sport']
}
console.log(person.hobbies);