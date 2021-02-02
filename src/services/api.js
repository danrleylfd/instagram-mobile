import axios from 'axios'

const api = axios.create({
    baseURL: 'https://insta-back-gram.herokuapp.com'
})

export default api
