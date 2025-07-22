import { useState, useEffect } from 'react';

// Components
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

// Services
import services from './services/persons';

const App = () => {
  // States
  const [persons, setPersons] = useState(null);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setfilter] = useState('');
  const [message, setMessage] = useState({
    body: '',
    type: 'success',
  });

  // Get persons
  const getPersons = () => {
    services.getPersons().then((response) => {
      return setPersons(response);
    });
  };

  // UseEffect
  useEffect(() => {
    getPersons();
  }, []);

  if (!persons) {
    return null
  }

  // newPerson.name exist in persons ?
  const isNewName = persons.find(
    (person) =>
      person.name.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase()
  );

  const searchPersonDelete = persons.filter(
    (person) =>
      person.name.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase()
  );

  // Function new person
  const addNewName = (event) => {
    event.preventDefault();

    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
      id: isNewName ? searchPersonDelete[0].id : (persons.length + 1).toString(),
    };

    if (!isNewName) {
      services.createPerson(personObject).then(() => {
        setPersons(persons.concat(personObject));
        setNewPerson({ name: '', number: '' });
        getPersons();

        const messageObject = {
          body: `Added ${personObject.name}`,
          type: 'success',
        };

        setMessage(messageObject);
      });
    } else {
      const confirm = window.confirm(
        `${newPerson.name} is already added to Phonebook, replace the old number whit a new one?`
      );

      const id = searchPersonDelete[0].id;

      confirm &&
        services
          .updateNumber(id, personObject)
          .then((response) => {
            setPersons(
              persons.map((person) => (person.id !== id ? person : response))
            );
            setNewPerson({ name: '', number: '' });
            getPersons();
            const messageObject = {
              body: `Updated ${personObject.name}`,
              type: 'success',
            };
            setMessage(messageObject);
          })
          .catch((error) => {
            console.error(`Update number failed: ${error}`);

            const messageObject = {
              body: `information of ${personObject.name} has already been removed from server`,
              type: 'error',
            };

            setMessage(messageObject);
          });
    }
  };

  // Controller add person.name
  const handleNewName = (event) =>
    setNewPerson({ ...newPerson, name: event.target.value });

  // Controller add person.phone
  const handleNewPhone = (event) =>
    setNewPerson({ ...newPerson, number: event.target.value });

  // Controller filter
  const handleFilter = (event) => setfilter(event.target.value);

  // Controller deleted
  const deletedPerson = (name, id) => {
    const confirmDeleted = window.confirm(`Detele ${name} ?`);
    confirmDeleted &&
      services.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        const messageObject = {
          body: `Deleted ${name}`,
          type: 'success',
        };
        setMessage(messageObject);
      }).catch((error) => {
        console.error(`Delete person failed: ${error}`);

        const messageObject = {
          body: `Information of ${name} has already been removed from server`,
          type: 'error',
        };

        setMessage(messageObject);
      });
  };

  // What do render
  const personToShow =
    filter === ''
      ? persons
      : persons.filter(
        (person) =>
          person.name
            .toLocaleLowerCase()
            .indexOf(filter.toLocaleLowerCase()) > -1
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={ message } />
      <Filter handleFilter={ handleFilter } />
      <div>
        <h2>add a new</h2>
      </div>
      <PersonForm
        addNewName={ addNewName }
        handleNewName={ handleNewName }
        handleNewPhone={ handleNewPhone }
        newPerson={ newPerson }
      />
      <h2>Numbers</h2>
      <Persons personToShow={ personToShow } handleButton={ deletedPerson } />
    </div>
  );
};

export default App;
