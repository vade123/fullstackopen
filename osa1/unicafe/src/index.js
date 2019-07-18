import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => <h1>{title}</h1>
const Button = ({handleClick, text}) => <button onClick = {handleClick}>{text}</button>
const Counter = ({type, count}) => <div>{type} {count}</div>

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const incrementByOne = (type) => {
        if (type === 'good') 
            setGood(good+1)
        else if (type === 'neutral')
            setNeutral(neutral+1)
        else 
            setBad(bad+1)
    }

    return (
        <div>
            <Title title='Give feedback' />
            <Button handleClick={() => incrementByOne('good')} text='Good' />
            <Button handleClick={() => incrementByOne('neutral')} text='Neutral' />
            <Button handleClick={() => incrementByOne('bad')} text='Bad' />
            <Title title='Statistics' />
            <Counter type='Good' count={good} />
            <Counter type='Neutral' count={neutral} />
            <Counter type='Bad' count={bad} />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)
