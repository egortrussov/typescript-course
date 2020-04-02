interface ITodo {
    name: string;
    description: string;
    completed: boolean;
}

class Todo implements ITodo {
    public name: string;
    public description: string;
    public completed: boolean;

    constructor (name: string, description: string, completed: boolean) {
        this.name = name;
        this.description = description;
        this.completed = completed;
    }
}

class TodoList {
    public allTodos: Todo[] = new Array;

    createTodoItem(name: string, description: string): number {
        let newItem = new Todo(name, description, false);
        let totalCount: number = this.allTodos.push(newItem);
        return totalCount;
    }

    allTodoItems(): Todo[] {
        return this.allTodos;
    }
}

let todoList = new TodoList;

window.onload = function(){
    let name= <HTMLInputElement>document.getElementById("todoName");
    let description = <HTMLInputElement>document.getElementById(
                       "todoDescription");
    document.getElementById("add").addEventListener(
      'click', () => {
        todoList.createTodoItem(name.value, description.value);
        console.log(todoList.allTodoItems());
      }); 
}
