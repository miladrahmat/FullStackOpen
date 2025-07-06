import { useState } from 'react'

const Numbers = ({persons}) => {
  return (
    <div>
      {persons.map(person =>
        <p key={person.name}>
          {person.name}
        </p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name === newName)
    if (found !== undefined) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons([...persons, { name: newName }])
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
}

export default App
