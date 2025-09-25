import axios from "axios";

const baseUrl = '/api/persons'

const getPersons = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const addPerson = newPerson => {
	const request = axios.post(baseUrl, newPerson)
	return request.then(response => response.data)
}

const updatePerson = newObject => {
	const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
	return request.then(response => response.data)
}

const deletePerson = id => {
	return axios.delete(`${baseUrl}/${id}`)
}

export default { getPersons, addPerson, updatePerson, deletePerson }