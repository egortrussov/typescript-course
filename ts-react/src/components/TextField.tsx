import React, { useState, useRef } from 'react';

interface Props {
    text: string,
    description?: string,
    count: (num: number) => number
}

const TextField: React.FC <Props> = ({ text, description, count }) => {
    const [num, setNum] = useState <number>(5);
    const inputRef = useRef<HTMLInputElement>(document.createElement('input'))

    const getValue = (): void => {
        alert(inputRef.current.value)
    }

    return (
        <div>
            { text } { description } <br/>
            Result: { count(5) }
            <h3>{ num }</h3>
            <button onClick={ () => setNum(num + 100) }>Add 100</button>
            <input type="text" ref={ inputRef } />
            <button onClick={ () => getValue() }>Get value</button>
        </div>
    )
}

export default TextField