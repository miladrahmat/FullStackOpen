import { useState, useEffect } from 'react'
import personServce from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterNumbers, setFilterNumbers] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personServce
    .getPersons()
    .then(response => {
      console.log('promise fulfilled')
      console.log(response)
      setPersons(response)
    })
  }, [])

  const searchName = (filterNumbers) => {
    const searchResult = persons.filter(person => person.name.indexOf(filterNumbers) !== -1)
    return searchResult
  }

  const addName = (event) => {
    event.preventDefault()
    const foundName = persons.find(person => person.name === newName)
    const foundNumber = persons.find(person => person.number === newNumber)
    if (foundName !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...foundName, number: newNumber}
        personServce
        .updatePerson(updatedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id === updatedPerson.id ? response : person))
          setNewName('')
          setNewNumber('')
        })
        .then(not => {
          setNotification(`Updated ${foundName.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(err => {
          setErrorMessage(`Information of ${foundName.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== foundName.id))
        })
      }
    }
    else if (foundNumber !== undefined) {
      if (window.confirm(`${foundNumber.name} is already added to phonebook with number ${foundNumber.number}, replace the old name with a new one?`)) {
        const updatedPerson = {...foundNumber, name: newName}
        personServce
        .updatePerson(updatedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id === updatedPerson.id ? response : person))
          setNewName('')
          setNewNumber('')
        })
        .then(not => {
          setNotification(`Updated ${foundNumber.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(err => {
          setErrorMessage(`Information of ${foundNumber.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== foundNumber.id))
        })
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personServce
      .addPerson(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
      .then(not => {
        setNotification(`Added ${newPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const deleteName = (id) => {
    personServce
    .deletePerson(id)
    setPersons(persons.filter(person => person.id !== id))
    console.log(`${id} needs to be deleted`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={errorMessage} />
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
      <Persons persons={searchName(filterNumbers)} deleteFunc={deleteName} />
    </div>
  )
}

export default App
