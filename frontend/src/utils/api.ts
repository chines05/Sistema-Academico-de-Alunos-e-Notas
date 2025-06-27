import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.15.7:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      AsyncStorage.removeItem('@token')
    }
    return Promise.reject(error)
  }
)

export default api
