let testContainer: HTMLElement = document.querySelector('#container');
let form: HTMLFormElement = document.querySelector('form');

let todos: { id: number, text: string }[] = [
    { id: 1, text: 'one' }
];

displayTodos();

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    let data: FormData = new FormData(form);
    todos.push({
        id: +(Math.random() * 10000),
        text: data.get('text').toString()
    })
    data.set('name', '');
    displayTodos();
})

function addListeners(): void {
    let btns = document.querySelectorAll('button.btn-danger');

    btns.forEach(btn => {

        btn.addEventListener('click', (e: Event) => {
            console.log('object')
            let id = btn.getAttribute('data-id');
            console.log(id)
            todos.filter((todo) => {
                console.log(todo.id.toString()=== id.toString());
                return todo.id.toString() !== id.toString();
            })
            console.log(todos);
            displayTodos();
        })
    })
}

function displayTodos(): void {
    testContainer.innerHTML = '';

    todos.forEach(todo => {
        let div: HTMLDivElement = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <div className="card-body">
                ${ todo.text }
                <button data-id="${ todo.id }" class="btn btn-danger">x</button>
            </div>
        `;
        testContainer.appendChild(div);
    })
    addListeners();
}
