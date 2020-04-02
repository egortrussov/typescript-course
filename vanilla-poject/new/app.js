var Todo = /** @class */ (function () {
    function Todo(name, id, description, completed) {
        this.name = name;
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
    return Todo;
}());
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.allTodos = new Array;
    }
    TodoList.prototype.createTodoItem = function (name, id, description) {
        var newItem = new Todo(name, id, description, false);
        var totalCount = this.allTodos.push(newItem);
        return totalCount;
    };
    TodoList.prototype.allTodoItems = function () {
        return this.allTodos;
    };
    TodoList.prototype.deleteItem = function (id) {
        var todos = this.allTodos;
        todos = todos.filter(function (todo) { return todo.id !== id; });
        this.allTodos = todos;
        showAllTodos();
        return this.allTodos;
    };
    return TodoList;
}());
var todoList = new TodoList;
var container = document.getElementById('todo-list');
window.onload = function () {
    var name = document.getElementById("todoName");
    var description = document.getElementById("todoDescription");
    document.getElementById("add").addEventListener('click', function () {
        var id = Math.random().toString();
        todoList.createTodoItem(name.value, id, description.value);
        container.appendChild(createTodoElement(name.value, id, description.value));
    });
};
function createTodoElement(name, id, description) {
    var div = document.createElement('div');
    var nameSpan = document.createElement('span');
    var descriptionSpan = document.createElement('span');
    var deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-id', id);
    deleteBtn.addEventListener('click', function () {
        todoList.deleteItem(id);
    });
    nameSpan.innerText = name;
    descriptionSpan.innerText = description;
    div.appendChild(nameSpan);
    div.appendChild(document.createElement('br'));
    div.appendChild(descriptionSpan);
    div.appendChild(deleteBtn);
    div.appendChild(document.createElement('hr'));
    return div;
}
function showAllTodos() {
    container.innerHTML = '';
    todoList.allTodos.forEach(function (todo) {
        container.append(createTodoElement(todo.name, todo.id, todo.description));
    });
}
