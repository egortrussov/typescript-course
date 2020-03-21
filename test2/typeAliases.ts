type Alias = number | string;

function combine(a: Alias, b: Alias) {
    let res;
    if (typeof a === 'number' && typeof b === 'number')
        res = a + b;
    else 
        res = a.toString() + b.toString();
    return res;
}

const ans = combine('tg', 'tg');

console.log(ans)