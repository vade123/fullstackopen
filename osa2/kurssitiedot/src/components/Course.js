import React from 'react'

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

export default Course