import axios, {
    type AxiosError,
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig
} from "axios"

const baseUrl = "https://phongvibanhxua-be-apis.onrender.com"

const config: AxiosRequestConfig = {
    baseURL: baseUrl,
    timeout: 3000000
}

const api = axios.create(config)

const handleBefore = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token")?.replaceAll('"', "")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        config.headers["ngrok-skip-browser-warning"] = "true"
    }
    return config
}

const handleError = (error: AxiosError): Promise<AxiosError> => {
    console.error(error)
    return Promise.reject(error)
}

api.interceptors.request.use(handleBefore, handleError)

export default api
