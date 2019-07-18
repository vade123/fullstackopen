import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => <h1>{title}</h1>
const Button = ({handleClick, text}) => <button onClick = {handleClick}>{text}</button>
const Statistic = ({text, value}) => <div>{text} {value}</div>

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
                <tr>
                    <td>good</td><td>{good}</td>
                </tr>
                <tr>
                    <td>neutral</td><td>{neutral}</td>
                </tr>
                <tr>
                    <td>bad</td><td>{bad}</td>
                </tr>
                <tr>
                    <td>all</td><td>{total}</td>
                </tr>
                <tr>
                    <td>average</td><td>{average}</td>
                </tr>
                <tr>
                    <td>positive</td><td>{positive}</td>
                </tr>
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
