import personService from '../services/persons'

const Persons = ({ persons, setPersons }) => {
  const deleteInfo = (id) => {
    console.log('id', id)
    personService.delete(id).then(response => {
      console.log(response)
      setPersons(persons.map(person => person.id !== id))
    })
  }
  return (
    <div>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name}-{person.number}
          <button onClick={() => deleteInfo(person.id)}>delete</button>
        </li>
      ))}
    </div>
  );
};
export default Persons;
