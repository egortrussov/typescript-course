import React, { useState } from 'react'

import ITodo from './interfaces/TodoInterface'

import TodoList from './components/TodoList'
import InputField from './components/InputField'

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

const App: React.FC = () => {

  const [todos, setTodos] = useState <ITodo[] | []> ([]);
  const forceUpdate = useForceUpdate();

  const addTodo = (title: string): void => {
    let newTodo: ITodo = {
      id: Math.random(),
      title,
      date: new Date().toISOString()
    }
    setTodos([
      ...todos,
      newTodo
    ])
    forceUpdate();
  }

  return (
    <div>
      <h1>Todos</h1>
      <InputField addTodo={ addTodo } />
      <TodoList todos={ todos } />
    </div>
  )
}

export default App