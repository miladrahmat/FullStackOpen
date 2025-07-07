import { useState } from 'react'

const Filter = ({value, onChange}) => {
  return (
    <form>
      <div>
        filter shown with <input value={value} onChange={onChange} />
      </div>
    </form>
  )
}

const PersonForm = ({onSubmit, nameValue, nameChange, numberValue, numberChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={nameChange}/>
      </div>
      <div>
        number: <input value={numberValue} onChange={numberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
     </form>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person =>
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-532542', id: 2},
    { name: 'Dan Abranov', number: '12-43-23454', id: 3},
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
  ])

  const [filterNumbers, setFilterNumbers] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const searchName = (filterNumbers) => {
    const searchResult = persons.filter(person => person.name.indexOf(filterNumbers) !== -1)
    return searchResult
  }

  const setId = () => {
    let id = 0
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].id > id) {
        id = persons[i].id
      }
    }
    return (id + 1)
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
      setPersons([...persons, { name: newName, number: newNumber, id: setId() }])
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterNumbers} onChange={event => setFilterNumbers(event.target.value)} />
      <h3>add a new</h3>
      <PersonForm
      onSubmit={addName}
      nameValue={newName}
      nameChange={event => setNewName(event.target.value)}
      numberValue={newNumber}
      numberChange={event => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={searchName(filterNumbers)} />
    </div>
  )
}

export default App
