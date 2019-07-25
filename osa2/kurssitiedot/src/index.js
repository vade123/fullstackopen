import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
    return (
        <h2>{course}</h2>
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

const Total = ({parts}) => {
    const count = parts.reduce((s, p) => s + p.exercises, 0) 
    return (
        <p style={{fontWeight: 'bold'}}>total of {count} exercises</p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const App = () => {
    const courses = [ 
        {
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
                    exercises: 11
                }
            ]
        },
        {
            name: 'Node.js',
                parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <h1>Webdev curriculum</h1>
            <Course course={courses[0]} />
            <Course course={courses[1]} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))