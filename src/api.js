import axios from 'axios';

const api = axios.create({
    baseURL:'// https://itensparavenda.herokuapp.com/itens'
})

export default api;