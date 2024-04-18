import axios from 'axios'

export default axios.create({
  baseURL: "http://localhost:63133/api/",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
})