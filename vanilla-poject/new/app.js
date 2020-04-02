var Todo = /** @class */ (function () {
    function Todo(name, description, completed) {
        this.name = name;
        this.description = description;
        this.completed = completed;
    }
    return Todo;
}());
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.allTodos = new Array;
    }
    TodoList.prototype.createTodoItem = function (name, description) {
        var newItem = new Todo(name, description, false);
        var totalCount = this.allTodos.push(newItem);
        return totalCount;
    };
    TodoList.prototype.allTodoItems = function () {
        return this.allTodos;
    };
    return TodoList;
}());
var todoList = new TodoList;
window.onload = function () {
    var name = document.getElementById("todoName");
    var description = document.getElementById("todoDescription");
    document.getElementById("add").addEventListener('click', function () {
        todoList.createTodoItem(name.value, description.value);
        console.log(todoList.allTodoItems());
    });
};
