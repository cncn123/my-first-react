import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [nameFilter, setNameFilter] = useState("");

  const [newInfo, setNewInfo] = useState({
    name: "",
    number: "",
  });

  const [Message, setMessage] = useState(null);

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const personsToShow =
    nameFilter.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toUpperCase().includes(nameFilter.toUpperCase())
        );

  const handleChange = (event) => {
    setNewInfo({
      ...newInfo,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addInfo = (event) => {
    event.preventDefault();
    const personObject = newInfo;
    const personFind = persons.find(
      (person) => person.name === personObject.name
    );
    if (personFind !== undefined) {
      if (
        window.confirm(
          `${personFind.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(personFind.id, personObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== personFind.id ? person : response.data
              )
            );
            setMessage({ msg: `Updated ${personObject.name}`, type: "info" });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log('error', error)
            setMessage({
              msg: `Information of '${personFind.name}' has already been removed from server`,
              type: "error",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(persons.filter((n) => n.id !== personFind.id));
          });
      }
    } else {
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        setMessage({ msg: `Added ${personObject.name}`, type: "info" });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message} />
      <Filter name={nameFilter} onChange={handleNameFilter} />

      <h2>Add a new</h2>
      <PersonForm
        newInfo={newInfo}
        handleChange={handleChange}
        onSubmit={addInfo}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} setPersons={setPersons} />
    </div>
  );
};

export default App;