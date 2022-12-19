import { useState } from 'react'

const Header = (props) => 
  <><h1>{props.text}</h1></>

const Button = ({ handleClick, text}) => {
  return (<><button onClick={handleClick}>{text}</button></>)
}

const Feedback = ({ hText, clicks, texts, i }) =>{
  return (
    <div>
      <Header text={hText}/>
      <Button handleClick={clicks[0]} text={texts[0]}/>
      <Button handleClick={clicks[1]} text={texts[1]}/>
      <Button handleClick={clicks[2]} text={texts[2]}/>
    </div>
  )
}

const Stats = ({ hText, g, b, n}) => {
  if (g + b + n === 0) return <><p>no reviews</p></>
  return( 
    <div>
      <Header text={hText}/>
      <table>
        <tbody>
          <tr><StatLine name="good" stat={g}/></tr>
          <tr><StatLine name="neutral" stat={n}/></tr>
          <tr><StatLine name="bad" stat={b}/></tr>
          <tr><StatLine name="all" stat={g + n + b}/></tr>
          <tr><StatLine name="average" stat={(Math.round(100*(g-b)/(g + b + n))/100)}/></tr>
          <tr><StatLine name="positive" stat={(Math.round(g/(g + b + n)*100))/100 + "%"}/></tr>
        </tbody>
      </table>
      
    </div>
  )
}

const StatLine = ({ name, stat }) => {
  return (
    <><td>{name}</td><td>{stat}</td></>
  )
} 

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const clicks = [
   () => setGood(good + 1), 
   () => setNeutral(neutral + 1), 
   () => setBad(bad + 1)
  ]
  const texts = ['good', 'neutral', 'bad']
  return (
    <div>
      <Feedback hText="give feedback" clicks={clicks} texts={texts}/>
      <Stats hText="statistics" g={good} n={neutral} b={bad}/>
      
    </div>
  )
}

export default App