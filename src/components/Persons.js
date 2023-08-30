import personService from "../services/persons";

const Persons = ({ persons, setPersons }) => {
  const deleteInfo = (person) => {
    const id = person.id
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.delete(id).then((response) => {
        setPersons((persons) => {
          return persons.filter((person) => person.id !== id);
        });
      });
    }
  };
  return (
    <div>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteInfo(person)}>delete</button>
        </li>
      ))}
    </div>
  );
};
export default Persons;
