import axios from 'axios'
import { ElMessage } from 'element-plus'
import { setupMock } from './mock'

const baseURL = 'http://localhost:11325/xlw'

const http = axios.create({
    baseURL,
    timeout: 15000
})

if (import.meta.env.VITE_USE_MOCK === 'true') {
    setupMock(http)
}

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

http.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error?.response?.data?.msg || error?.message || '请求失败'
        ElMessage.error(message)
        return Promise.reject(error)
    }
)

export default http
