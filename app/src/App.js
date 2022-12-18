import { useState } from 'react'


const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, name}) => 
  <button onClick={onClick}> {name}</button>

const History = (props) => {
  if (props.allClicks.length === 0) return <div>push a button</div>
  else return <div>history: {props.allClicks.join(' ')}</div> 
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClicks = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClicks = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClicks} name='left'/>
      <Button onClick={handleRightClicks} name='right'/>
      {right}
      <History allClicks={allClicks}/>
    </div>
  )
}
export default App;