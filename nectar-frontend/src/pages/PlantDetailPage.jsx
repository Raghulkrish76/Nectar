import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api'
import useAuth from '../hooks/useAuth'

export function PlantDetailPage() {
    const {isAdmin} = useAuth()
    const { id } = useParams()
    const [allBenifits,setAllBenifits] = useState([])
    const [plant, setPlant] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editMode,setEditMode] = useState(false)
     useEffect(() => {
        Promise.all([
            api.get(`/api/plants/${id}/`),
            api.get("/api/healthbenefits/")
        ])
            .then(([plantres, benefitres]) => {
                setAllBenifits(benefitres.data)
                setPlant(plantres.data)
                setLoading(false)
            
            })
            .catch(() => setLoading(false))
    }, [id])

    if (loading) return <p>Loading.. </p>
    if (!plant) return <p>Plant not found </p>

    const handleUpdate = async ()=>{
       const response =   await api.patch(`/api/plants/${id}/update/`,plant)
       setPlant(response.data)
       setEditMode(false)   
    }
    return (
        <>
            

                <h1>{plant.name}</h1>
                <img src={plant.image} alt={plant.name} />
                <p>{plant.description}</p>

                <h3>
                    {plant.health_benifits.map((id)=>{
                        const benifit = allBenifits.find((b)=> b.id === id )
                        return(
                            <span key = {id}> {benifit?.name}</span>
                        )
                    })}
                </h3>
                {editMode?(
                    <>
                    <input 
                        value = {plant.name} 
                        onChange = {(e)=>setPlant({...plant,name:e.target.value})}/>
                    <input 
                        value = {plant.description}
                        onChange = {(e)=>setPlant({...plant,description:e.target.value})}/>
                    
                    
                    </>
                ):null}
                {isAdmin && (

                    <div>

                        {editMode?(
                            <>
                            <button onClick = {handleUpdate}> Save </button>
                            <button onClick = {()=>setEditMode(false)}>Cancel </button>
                            </>
                        ):(
                            <>
                            <button onClick={()=>setEditMode(true)}>Edit Plant </button>
                            <button> Delete Plant </button>
                            </>
                        )}
                    </div>
                )}
                
            
        </>
    )
}