import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
const Display = ({anecdote, votes}) => {
    return ( 
        <div>
            {anecdote}
            <div>has {votes} votes</div>
        </div>
    )
}
const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(props.anecdotes.length+1).join('0').split('').map(parseFloat))
    
    
    const handleClickNext = () => {
        setSelected(getRandomInt(props.anecdotes.length))
    }
    const handleClickVote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }
    const findHighestVotes = () => {
        var highestIndex = 0;
        for (let i = 0; i < votes.length; i++) {
            if (votes[i] > votes[highestIndex]) {
                highestIndex = i
            }
        }
        return (
            highestIndex
        )
    }
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Display anecdote = {props.anecdotes[selected]} votes = {votes[selected]}/>
            <div>
                <button onClick={handleClickVote}>vote</button>
                <button onClick={handleClickNext}>next anecdote</button>
            </div>
            <h1>Anecdote with most votes</h1>
            <Display anecdote = {props.anecdotes[findHighestVotes()]}
                             votes = {votes[findHighestVotes()]}/>
        </div>
    ) 
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)