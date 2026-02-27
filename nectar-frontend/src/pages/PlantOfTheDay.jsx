import { useEffect,useState } from "react"
import api from "../api"
import { Link } from "react-router-dom"
import "../styles/HomePage.css"
export function PlantOfTheDay(){
    const [plantOfTheDay,setplantOfTheDay] = useState(null)
    const [loading , setLoading] = useState(false)
    useEffect(()=>{
            const fetchData = async()=>{
                setLoading(true)
                try{
                    const plantRes = await api.get("/api/plantoftheday")
                    setplantOfTheDay(plantRes.data)
                    
                }catch(error){
                    console.log(error.response.data)
                }finally{
                    setLoading(false)
                }
            }
            fetchData() 
    },[])
    return(
        <>
            
            <h2 className="panel__title">Plant of the Day</h2>

                    {loading && <p className="result-count">Loading…</p>}

                    {!loading && !plantOfTheDay && (
                        <p className="result-count">Plant not found in database.</p>
                    )}

                    {!loading && plantOfTheDay && (
                        <>
                            <div className="potd-badge"> ⭐ Featured</div>
                            <div className="potd-img-wrap">
                                <img src={plantOfTheDay.image} alt={plantOfTheDay.name} />
                            </div>
                            <h3 className="potd-name">{plantOfTheDay.name}</h3>
                            <p className="potd-region">{plantOfTheDay.region}</p>
                            <p className="potd-desc">{plantOfTheDay.description}</p>
                            <div className="potd-benefits">      
                            </div>
                            <Link to = {`/plants/${plantOfTheDay.id}`} className="potd-btn" > View Full Profile →</Link>
                        </>
                    )}
        </>
    )

}