import React, { useRef } from 'react'

interface InputFieldInterface {
    addTodo: (title: string) => void
}

const InputField: React.FC <InputFieldInterface> = ({ addTodo }) => {
    const inputRef = useRef<HTMLInputElement>(document.createElement('input'));

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTodo(inputRef.current.value)
    } 

    return (
        <form onSubmit={ (e) => onSubmit(e) }>
            <input type="text" ref={ inputRef } />
            <input type="submit"/>
        </form>
    )
}

export default InputField