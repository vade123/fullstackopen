import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => <h1>{title}</h1>
const Button = ({handleClick, text}) => <button onClick = {handleClick}>{text}</button>
const Counter = ({type, count}) => <div>{type} {count}</div>

const Statistics = ({good, neutral, bad}) => {
    const total = good+neutral+bad
    const average = good-bad
    if (total === 0) {
        return (
            <div>
            No feedback given
            </div>
        )
    }
    return (
        <div>
            <Counter type='Good' count={good} />
            <Counter type='Neutral' count={neutral} />
            <Counter type='Bad' count={bad} />
            <Counter type='All' count={total} />
            <Counter type='Average' count={average/total} />
            <div>Positive {good/total * 100} %</div>
        </div>
    )
}
const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClick = (type) => {
        if (type === 'good') {
            setGood(good+1)
        }
        else if (type === 'neutral') {
            setNeutral(neutral+1)
        }
        else {
            setBad(bad+1)
        }
    }

    return (
        <div>
            <Title title='Give feedback' />
            <Button handleClick={() => handleClick('good')} text='Good' />
            <Button handleClick={() => handleClick('neutral')} text='Neutral' />
            <Button handleClick={() => handleClick('bad')} text='Bad' />
            <Title title='Statistics' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)
