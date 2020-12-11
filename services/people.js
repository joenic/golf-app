import axios from 'axios'

export const getPeople = () => axios.get('https://localhost:5000/api/people').then(res => res.data)
