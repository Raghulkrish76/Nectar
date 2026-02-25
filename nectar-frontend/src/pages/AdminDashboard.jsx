import { useEffect,useState } from "react"
import api from "../api"

export function AdminDashboard(){  

    const [stats,setStats] =useState(null)
    const [users,setUsers] = useState([])
    const[loading,setLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(()=>{
        const fetchDashboardData = async () =>{
            try{
                const [statsRes,usersRes] = await Promise.all([
                    api.get("/api/adminstats"),
                    api.get("/api/adminusers")
                ]);
                setStats(statsRes.data)
                setUsers(usersRes.data)
                
            }catch(error){
                console.log(error)
                setError("Failed to load data")
            }finally{
                setLoading(false)
            }
        }
        fetchDashboardData()
     },[])

     if(loading) return <p>Loading data</p>
     if(error) return <p>{error}</p>
    return(
        <>
            < h1> Dashboard Data </h1>

            <h2>Total Plants </h2>
            <p>{stats.total_plants}</p>
            <h2>Total Users </h2>
            <p>{stats.total_users}</p>
            <h2>All users</h2>
            {users.map((user,index)=>(
                <div key = {index}>
                    <p> {user.username} </p>
                    <p>{user.role} </p>

                </div>
            ))}

        </>
    )
}