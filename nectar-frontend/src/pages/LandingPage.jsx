import { useEffect,useState } from "react"
import api from "../api"

export function LandingPage(){
    const [plants,setPlants] = useState([])
    useEffect(()=>{
        const plants = async()=>{
            try{
                const res = await api.get("api/landingpage/plants/")
                setPlants(res.data)
            }catch(error){
                console.log(error.response.data)
            }
        }
        plants()
    },[])
    return(
        <>
        <h1> Landing page </h1>
        {plants.map((plant,index)=>(
            
            <div key = {index}>
                <p> {plant.name}</p>
                <p>{plant.description}</p>

            </div>
        ))}
        </>
    )
}