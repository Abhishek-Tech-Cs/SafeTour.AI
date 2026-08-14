import axios from 'axios';

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if(error.response?.status === 401 && error.config?.url === "/auth/me"){
            window.dispatchEvent(
                new Event("unauthorized")
            )
        }
        return Promise.reject(error)
    }
)

export default api
