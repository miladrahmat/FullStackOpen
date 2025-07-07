import { useState } from 'react'

const Numbers = ({persons}) => {
  return (
    <div>
      {persons.map(person =>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-532542'},
    { name: 'Dan Abranov', number: '12-43-23454'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])
  const [numbers, setNumbers] = useState([...persons])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const searchName = (search) => {
    const searchResult = persons.filter(person => person.name.indexOf(search) !== -1)
    setNumbers(searchResult)
  }

  const addName = (event) => {
    event.preventDefault()
    const foundName = persons.find(person => person.name === newName)
    const foundNumber = persons.find(person => person.number === newNumber)
    if (foundName !== undefined) {
      alert(`${newName} is already added to phonebook`)
    }
    else if (foundNumber !== undefined) {
      alert(`${newNumber} is already added to phonebook`)
    }
    else {
      setPersons([...persons, { name: newName, number: newNumber }])
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input onChange={event => searchName(event.target.value)} />
        </div>
      </form>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={numbers} />
    </div>
  )
}

export default App
