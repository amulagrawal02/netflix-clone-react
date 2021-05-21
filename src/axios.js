import axios from 'axios'
// we use axios to make request get, post etc
// this is base url
const instance = axios.create({
    baseURL : 'https://api.themoviedb.org/3'
})

export default instance;