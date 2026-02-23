import api from "../api"
import { useEffect,useState } from "react"
export function Bookmarks(){
    const [bookmarks,setBookmarks] = useState([])
     useEffect(()=>{
            api.get('/api/bookmarks')
            .then(response => setBookmarks(response.data))
     },[])
    return(
        <>
        {bookmarks.map((bookmark)=>(
            <div key = {bookmark.id}>
                <p>{bookmark.plant.name}</p>
            </div>
        ))}
        
        </>
    )
}