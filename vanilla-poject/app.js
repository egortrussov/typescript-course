var testContainer = document.querySelector('#container');
var form = document.querySelector('form');
var todos = [
    { id: 1, text: 'one' }
];
displayTodos();
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    todos.push({
        id: +(Math.random() * 10000),
        text: data.get('text').toString()
    });
    data.set('name', '');
    displayTodos();
});
function addListeners() {
    var btns = document.querySelectorAll('button.btn-danger');
    btns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            console.log('object');
            var id = btn.getAttribute('data-id');
            console.log(id);
            todos.filter(function (todo) {
                console.log(todo.id.toString() === id.toString());
                return todo.id.toString() !== id.toString();
            });
            console.log(todos);
            displayTodos();
        });
    });
}
function displayTodos() {
    testContainer.innerHTML = '';
    todos.forEach(function (todo) {
        var div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = "\n            <div className=\"card-body\">\n                " + todo.text + "\n                <button data-id=\"" + todo.id + "\" class=\"btn btn-danger\">x</button>\n            </div>\n        ";
        testContainer.appendChild(div);
    });
    addListeners();
}
