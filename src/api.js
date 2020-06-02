import axios from 'axios'

const api = axios.create({
    baseURL:'https://itensparavenda-backend.herokuapp.com/'
})

export default api;