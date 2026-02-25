import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import api from "../api"

export function UserProfile(){
    const {username, role} = useAuth()
    const [bookmarks, setBookmarks] = useState([])

    useEffect(()=>{
        const getBookmarks = async()=>{
            try{
                const response = await api.get("/api/bookmarks/")
                setBookmarks(response.data)
            }catch(error){
                console.error(error.response.data)
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
        </>
    )
}