import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000' /* endereço do  local onde esta o meu servidor */
})

export default api