import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://74.179.83.201:8000',
})
