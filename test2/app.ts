function add(a: number, b : number): number {
    return a + b;
}

function printRes(num: number): void {
    console.log('Result ' , num)
}

printRes(add(4, 5));