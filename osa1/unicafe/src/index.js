import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => <h1>{title}</h1>
const Button = ({handleClick, text}) => <button onClick = {handleClick}>{text}</button>
const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td><td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const total = good+neutral+bad
    const average = (good-bad)/total
    const positive = good/total * 100 + ' %'

    if (total === 0) {
        return (
            <div>
            No feedback given
            </div>
        )
    }
    return (
        <table>
            <tbody>
                <Statistic text='good' value={good} />
                <Statistic text='neutral' value={neutral} />
                <Statistic text='bad' value={bad} />
                <Statistic text='all' value={total} />
                <Statistic text='average' value={average} />
                <Statistic text='positive' value={positive} />
            </tbody>
        </table>
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
