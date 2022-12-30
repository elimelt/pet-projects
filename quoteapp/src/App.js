import { useState } from 'react'
import ExampleArea from './components/ExampleArea'
import  TypingArea  from './components/TypingArea'
import ValidationArea from './components/ValidationArea'

const Button = ({ text, handleClick}) => {
  return(<><button onClick={handleClick}>{text}</button></>)
}

const Quote = ({ selected }) => {
  return <div>{selected}</div>
}

const VoteData = ({ score }) => {
  return (
    <>
      <p>this quote has {score} {(score === 1) ? 'vote' : 'votes'}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'public static void main(String[] args) {}',
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const rand = (i) => Math.floor(Math.random() * i)

  const [selected, setSelected] = useState('push new quote to display a new quote')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(anecdotes[0])
  const [scores, setScores] = useState(anecdotes.reduce((accumulator, curr) => {
    accumulator[curr] = 0
    return accumulator
  }, {}))

  const [currText, setCurrText] = useState('initial state')

  

  const newQuote = () => {
    const newQuote = anecdotes[rand(anecdotes.length)]
    const newScore = scores[newQuote]
    setScore(newScore)
    setSelected(newQuote)
  }

  const voteCurr = () => {
    const copy = {...scores}
    copy[selected] += 1
    setScores(copy)
    setScore(copy[selected])
    findBest()
  }

  const findBest = () => {
    const best = Object.keys(scores).reduce((a, curr) => {
      return scores[curr] > scores[a] ? curr : a
    }, Object.keys(scores)[0])
    setBest(best)
  }



  return (
    <div>
      <div>
        <div>
          <h1>Quote of the day</h1>
          <Quote selected={selected}/>
          <br/>
          <VoteData score={score}/>
          <Button text="new quote" handleClick={newQuote}/>
          <Button text="vote for this quote" handleClick={voteCurr}/>
          <br/>
          <h1>Most popular quote</h1>
          <Quote selected={best}/>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Syntext</h1>
      <div>
        <ExampleArea currQuote={selected}/>
        <TypingArea currText={currText} setCurrText={setCurrText}/>
        <ValidationArea currQuote={selected} currText={currText}/>
      </div>
    </div>
  )
}

export default App