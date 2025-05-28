const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exerceses}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part.parts[0].name} />
      <Part part={props.part.parts[1].name} />
      <Part part={props.part.parts[2].name} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.part.parts[0].exercises + props.part.parts[1].exercises + props.part.parts[2].exercises}
    </p>
  )
}

const App = () => {
const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of component',
      exercises: 14
    }
  ]
}

  return (
    <div>
      <Header course={course} />
      <Content part={course} />
      <Total part={course} />
    </div>
  )
}

export default App
