import axios from "axios"

const client = axios.create({
    baseURL: 'http://192.168.0.107:8000',
})

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    console.log('TOKEN:', token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default client