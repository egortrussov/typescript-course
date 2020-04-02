interface ITodo {
    name: string;
    description: string;
    completed: boolean;
    id: string;
}

class Todo implements ITodo {
    public name: string;
    public id: string;
    public description: string;
    public completed: boolean;

    constructor (name: string, id: string, description: string, completed: boolean) {
        this.name = name;
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
}

class TodoList {
    public allTodos: Todo[] = new Array;

    createTodoItem(name: string, id: string, description: string): number {
        let newItem = new Todo(name, id, description, false);
        let totalCount: number = this.allTodos.push(newItem);
        return totalCount;
    }

    allTodoItems(): Todo[] {
        return this.allTodos;
    }

    deleteItem(id: string): Todo[] {
        let todos: Todo[] = this.allTodos;
        todos = todos.filter(todo => todo.id !== id);
        this.allTodos = todos;
        showAllTodos();
        return this.allTodos;
    }
}

let todoList = new TodoList;

let container = document.getElementById('todo-list');

window.onload = function(){
    let name= <HTMLInputElement>document.getElementById("todoName");
    let description = <HTMLInputElement>document.getElementById(
                       "todoDescription");
    document.getElementById("add").addEventListener(
      'click', () => {
        let id: string = Math.random().toString();
        todoList.createTodoItem(name.value, id, description.value);
        container.appendChild(createTodoElement(name.value, id, description.value));
      }); 
}

function createTodoElement(name: string, id: string, description: string): HTMLDivElement {
    let div = <HTMLDivElement> document.createElement('div');
    let nameSpan = <HTMLSpanElement> document.createElement('span');
    let descriptionSpan = <HTMLSpanElement> document.createElement('span');
    let deleteBtn = <HTMLButtonElement> document.createElement('button');
    
    deleteBtn.setAttribute('data-id', id);
    deleteBtn.addEventListener('click', () => {
        todoList.deleteItem(id);
    })
    nameSpan.innerText = name;
    descriptionSpan.innerText = description;
    div.appendChild(nameSpan);
    div.appendChild(document.createElement('br'));
    div.appendChild(descriptionSpan);
    div.appendChild(deleteBtn);
    div.appendChild(document.createElement('hr'));

    return div;
} 

function showAllTodos(): void {
    container.innerHTML = '';
    todoList.allTodos.forEach(todo => {
        container.append(createTodoElement(todo.name, todo.id, todo.description));
    })
}