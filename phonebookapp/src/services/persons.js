import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseURL)
    return req.then(res => res.data)
}

const create = newObject => {
    const req = axios.post(baseURL, newObject)
    return req.then(res => res.data)
}

const update = (id, newObject) => {
    const req = axios.put(`${baseURL}/${id}`, newObject)
    return req.then(res => res.data)
}

const updateAll = newPersons => {
    return axios
        .put(`${baseURL}`, newPersons)
        .then(res => res.data)
}

const deletePerson = id => {
    axios.delete(`${baseURL}/${id}`)
}

export default { getAll, create, update, updateAll, deletePerson }
