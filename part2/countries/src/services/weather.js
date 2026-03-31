import axios from 'axios'

const baseUrl = 'http://localhost:3001/weather/'


const getWeather = (id) => {
  if (import.meta.env.VITE_SOME_KEY === 'horea') {
    const request = axios.get(`${baseUrl}${id}`)
    return request.then(response => response.data.weather.temperature)
  } else {
    return Promise.reject(new Error('Invalid API key'))
  }
}

export default { getWeather }