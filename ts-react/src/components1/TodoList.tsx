import React from 'react'

import ITodo from '../interfaces/TodoInterface'

interface TodoListProps {
    todos: ITodo[]
}

const TodoList: React.FC <TodoListProps> = ({ todos }) => {
    return (
        <>
            {
                todos.forEach(todo => {
                    return (
                        <div className="todo">
                            <h3>{ todo.title }</h3>
                            <h4>{ todo.date }</h4>
                        </div>
                    )
                })
            }
        </>
    )
}

export default TodoList