import {jwtDecode} from 'jwt-decode'
import { ACCESS_TOKEN } from '../constants'

const useAuth = ()=>{
    const token = localStorage.getItem(ACCESS_TOKEN)
    

    if(!token){
        return{
            isAdmin :false, isAuthenticated:false
        };
    }
        const decodedToken = jwtDecode(token)
        return{
            isAuthenticated: true,
            isAdmin: decodedToken.role === 'admin',
            username : decodedToken.username,
        }
    }

export default useAuth;