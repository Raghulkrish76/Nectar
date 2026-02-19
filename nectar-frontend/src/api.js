import axios from 'axios'
import { ACCESS_TOKEN } from './constants'
console.log("🔍 API Base URL:", import.meta.env.VITE_API_URL) 

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL
})


api.interceptors.request.use(
  
    
    (config)=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        console.log("token seng",token)
        if(token){
            config.headers.Authorization = `Bearer ${token}`

        }
        console.log("Final headers:", config.headers) 
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default api