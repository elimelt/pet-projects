const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]}  />
      <Part part={props.course.parts[2]}  />
    </>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <>
      <p>
        {props.part.name} {props.part.excercises}
      </p>
    </>
  )

}

const Total = (props) => {
  return (
    <>
      <p> Total exercises: 
        {props.course.parts[0].excercises + props.course.parts[1].excercises + props.course.parts[2].excercises}
      </p>
    </>
  )

}
const App = () => {
  const course = {

    name: 'Learning React',
    parts: [
      {
        name: 'Fundamentals of React',
        excercises: 10
      },
      {
        name: 'Using props to pass data',
        excercises: 7
      },
      { 
        name:'State of a component',
        excercises: 14
      }
    ]
  }
  return (
    <div>
      <Header name={course.name}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}
export default App;
