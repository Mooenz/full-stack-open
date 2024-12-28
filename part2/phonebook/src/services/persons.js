import axios from 'axios';

const urlBase = 'http://localhost:3001/persons';

const getPersons = () => {
  const request = axios.get(urlBase);
  return request.then((response) => response.data);
};

const createPerson = (personObject) => {
  const request = axios.post(urlBase, personObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => axios.delete(`${urlBase}/${id}`);

const updateNumber = (id, personObject) => {
  const request = axios.put(`${urlBase}/${id}`, personObject);
  return request.then((response) => response.data);
};

const services = {
  getPersons,
  createPerson,
  deletePerson,
  updateNumber,
};

export default services;
