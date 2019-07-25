import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}
/*
const Total = (props) => {
    const count = props.parts[0].exercises + 
                    props.parts[1].exercises + 
                    props.parts[2].exercises
    return (
        <p>Number of exercises {count}</p>
    )
}
*/
const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {   
                id: 1,
                name: 'Fundamentals of React',
                exercises: 10
            },
            {   
                id: 2,
                name: 'Using props to pass data',
                exercises: 7
            },
            {   
                id: 3,
                name: 'State of a component',
                exercises: 14
            },
            {   
                id: 4,
                name: 'Redux',
                exercises: 60
            }
        ]
    }
    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))