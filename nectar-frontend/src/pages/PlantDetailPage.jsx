import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api'
import useAuth from '../hooks/useAuth'

export function PlantDetailPage() {
    const {isAdmin} = useAuth()
    const { id } = useParams()
    const [plant, setPlant] = useState(null)
    const [loading, setLoading] = useState(null)
    useEffect(() => {
        Promise.all([
            api.get(`/api/plants/${id}/`),
            api.get("/api/healthbenefits/")
        ])
            .then(([plantres, benefitres]) => {
                const allBenifits = benefitres.data

                const mappedPlant = {
                    ...plantres.data,
                    health_benifits: plantres.data.health_benifits
                        .map((id) => allBenifits.find((b) => b.id === id)?.name)
                        .filter(Boolean)
                }

                setPlant(mappedPlant)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [id])

    if (loading) return <p>Loading.. </p>
    if (!plant) return <p>Plant not found </p>
    return (
        <>
            <div>

                <h1>{plant.name}</h1>
                <img src={plant.image} alt={plant.name} />
                <p>{plant.description}</p>

                <h3>{plant.health_benifits.map((b) => (
                    <span key={b.id}>{b}</span>
                ))} </h3>
                {isAdmin && (
                    <div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                )}
                {console.log(isAdmin)}
            </div>
        </>
    )
}