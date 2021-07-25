import axios from "axios"

const baseURL = "http://localhost:3002/api/notes"

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
    // const nonExisting = {
    //   id: 10000,
    //   content: 'This note is not saved to server',
    //   date: '2019-05-30T17:30:31.098Z',
    //   important: true,
    // }
    // return request.then(response => response.data.concat(nonExisting))
  }
  
  const create = async (newObject) => {
    const config = { 
      headers: { Authorization: token},
    }
    const response = await axios.post(baseURL, newObject, config)
    return response.data
  }
  
  const update = async (id, newObject) => {
    const config = { 
      headers: { Authorization: token},
    }
    const response = await axios.put(`${baseURL}/${id}`, newObject, config)
    return response.data
  }

  const deleteNote = async id => {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseURL}/${id}`,config)
    return response.data
  }
  
  export default { 
    getAll: getAll, 
    create: create, 
    update: update,
    delete: deleteNote,
    setToken
  }