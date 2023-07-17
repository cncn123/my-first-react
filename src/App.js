import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

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


  const addInfo = (event) => {
    event.preventDefault()
    if (persons.some(a => a.name === newInfo.name)) {
      alert(`${newInfo.name} is already added to phonebook`)
    } else {
      const personObject = newInfo
      setPersons(persons.concat(personObject))
      setNewInfo({ name: '', number: '' })
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={nameFilter} onChange={handleNameFilter} />

      <h3>Add a new</h3>
      <PersonForm newInfo={newInfo} handleChange={handleChange} onSubmit={addInfo} />


      <h3>Numbers</h3>
      <Persons persons={personsToShow} />

    </div>
  )
}

export default App