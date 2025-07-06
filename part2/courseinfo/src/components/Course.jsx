const Header = (props) => <h2>{props.course}</h2>

const Part = ({name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({ parts }) => (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
)

const Total = (props) => <p><b>total of {props.total} exercises</b></p>

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

export default Course