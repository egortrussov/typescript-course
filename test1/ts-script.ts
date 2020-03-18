const button = document.querySelector("button")! as HTMLButtonElement;
const input1 = document.querySelector("#num1")! as HTMLInputElement;
const input2 = document.querySelector("#num2")! as HTMLInputElement;

function add(a: number, b: number) {
    return a + b;
}

button.addEventListener("click", () => {
    console.log(add(+input1.value, +input2.value));
})