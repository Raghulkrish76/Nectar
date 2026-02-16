import { useEffect, useState } from "react"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import {jwtDecode} from 'jwt-decode'
import api from "../api"
import {Navigate} from 'react-router-dom'

export function ProtectedRoute({children}){

    const [isAuthorized,setIsAuthorized] = useState(null)
     useEffect(()=>{
        auth().catch(()=>setIsAuthorized(false))
     },[])
    const refreshToken = async()=>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post('api/auth/refresh/',{refresh:refreshToken})
            if(res.status===200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                setIsAuthorized(true)
            }
            else{
                setIsAuthorized(false)
            }
        }catch(error){
            alert(error)
            setIsAuthorized(false)
        }
    }

    const auth = async()=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
            return
        }
        const decode = jwtDecode(token)
        const tokenExpiration = decode.exp 
        const now = Date.now()/1000
        if(tokenExpiration>now){
            setIsAuthorized(true)
        }
        else{
            await refreshToken()
        }

    }
    if (isAuthorized===null){
        return <div> Loading ...  </div>
    }
    return isAuthorized ? children : <Navigate to= "/login"/>
}