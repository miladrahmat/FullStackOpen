import { useState } from 'react'

const MostVotes = (props) => {
  let mostVoted = props.votes[0]
  let mostVotedIndex = 0

  for (let i = 0; i < 8; i++) {
    if (props.votes[i] > mostVoted) {
      mostVoted = props.votes[i]
      mostVotedIndex = i
    }
  }

  return (
    <p>{props.anecdotes[mostVotedIndex]}</p>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const getRandomNumber = (max) => {
    return (Math.floor(Math.random() * max))
  }
  
  const handleVote = () => {
    const copy = [...votes]

    copy[selected] += 1
    setVotes(copy)
  }

  const handleSelected = () => {
    setSelected(getRandomNumber(8))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVote} text='vote' />
      <Button handleClick={handleSelected} text='next anecdote' />
      <h1>Anecdote with the most votes</h1>
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App