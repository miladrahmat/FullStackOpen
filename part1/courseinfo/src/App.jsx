const Header = (props) => {
  return (
    <h1>{props.course}</h1>
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
      <Part part={props.part[0]} exerceses={props.exercises[0]} />
      <Part part={props.part[1]} exerceses={props.exercises[1]} />
      <Part part={props.part[2]} exerceses={props.exercises[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exerceses1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={[part1, part2, part3]} exercises={[exerceses1, exercises2, exercises3]} />
      <Total exercises={[exerceses1, exercises2, exercises3]} />
    </div>
  )
}

export default App
