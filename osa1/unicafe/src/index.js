import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => <h1>{title}</h1>
const Button = ({handleClick, text}) => <button onClick = {handleClick}>{text}</button>
const Counter = ({type, count}) => <div>{type} {count}</div>
const Positive = ({total, good}) => <div>Positive {good/total * 100} %</div>

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const [average, setAverage] = useState(0)

    const handleClick = (type) => {
        if (type === 'good') {
            setGood(good+1)
            setAverage(average+1)
        }
        else if (type === 'neutral') {
            setNeutral(neutral+1)
        }
        else {
            setBad(bad+1)
            setAverage(average-1)
        }
        setTotal(total+1)
    }

    return (
        <div>
            <Title title='Give feedback' />
            <Button handleClick={() => handleClick('good')} text='Good' />
            <Button handleClick={() => handleClick('neutral')} text='Neutral' />
            <Button handleClick={() => handleClick('bad')} text='Bad' />
            <Title title='Statistics' />
            <Counter type='Good' count={good} />
            <Counter type='Neutral' count={neutral} />
            <Counter type='Bad' count={bad} />
            <Counter type='All' count={total} />
            <Counter type='Average' count={average/total} />
            <Positive total={total} good={good} />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)
