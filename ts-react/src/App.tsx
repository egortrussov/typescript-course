import React from 'react'
import TextField from './components/TextField'

const App: React.FC = () => {

  const count = (num: number): number => {
    return num * num;
  }

  return (
    <div>
      <h1>Hello</h1>
      <TextField description="Desc" count={ count } text="Helloooooo" />
    </div>
  )
}

export default App