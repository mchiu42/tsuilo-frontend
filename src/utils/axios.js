import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: import.meta.env.NODE_ENV === 'development' 
    ? 0 : 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export default axiosInstance
