import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [nameFilter, setNameFilter] = useState('')

  const [newInfo, setNewInfo] = useState({
    name: '',
    number: ''
  })

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = nameFilter.length === 0
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(nameFilter.toUpperCase()))


  const handleChange = (event) => {
    setNewInfo({
      ...newInfo,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const addInfo = (event) => {
    event.preventDefault()
    if (persons.some(a => a.name === newInfo.name)) {
      alert(`${newInfo.name} is already added to phonebook`)
      personService.update(personObject,)
    } else {
      const personObject = newInfo
      personService.create(personObject).then(response => {
        setPersons(persons.concat(response.data))
      })
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={nameFilter} onChange={handleNameFilter} />

      <h2>Add a new</h2>
      <PersonForm newInfo={newInfo} handleChange={handleChange} onSubmit={addInfo} />


      <h2>Numbers</h2>
      <Persons persons={personsToShow} setPersons={setPersons} />

    </div>
  )
}

export default App