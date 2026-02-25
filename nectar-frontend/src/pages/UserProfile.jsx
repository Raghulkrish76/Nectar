import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import api from "../api"

export function UserProfile(){
    const {username, role} = useAuth()
    const [bookmarks, setBookmarks] = useState([])
    const token = localStorage.getItem("access")

    useEffect(()=>{
        const getBookmarks = async()=>{
            try{
                const response = await api.get("/api/bookmarks/")
                setBookmarks(response.data)
            }catch(error){
                console.error(error.response?.data || error.message)
            }
        }
        getBookmarks()
    },[])

    return(
        <>
            <p>{username}</p>
            <p>{role}</p>
            <p>Bookmark count: {bookmarks.length}</p>
            {bookmarks.map((bookmark)=>(
                <div key = {bookmark.id}>
                    <p>{bookmark.plant.name}</p>


                </div>
            ))}
            <p>{token}</p>
        </>
    )
}