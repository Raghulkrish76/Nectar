import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api'
import useAuth from '../hooks/useAuth'

export function PlantDetailPage() {
    const { isAdmin } = useAuth()
    const { id } = useParams()
    const [allBenifits, setAllBenifits] = useState([])
    const [plant, setPlant] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)
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

    const handleUpdate = async () => {
        const formData = new FormData()
        formData.append('name',plant.name)
        formData.append('region',plant.region)
        formData.append('description',plant.description)
        formData.append('plant_type',plant.plant_type)
        plant.health_benifits.forEach((id)=>{
            formData.append('health_benefits',id)
        })
        if(plant.image instanceof File){
            formData.append('image',plant.image)
        }

        try {
            const response = await api.patch(`/api/plants/${id}/update/`, formData,
                {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                })
            setPlant(response.data)
            setEditMode(false)
        }
        catch (error) {
            console.log(error.response.data)
        }


    }
    return (
        <>


            <h1>{plant.name}</h1>
            <img src={plant.image} alt={plant.name} />
            <p>{plant.description}</p>

            <h3>
                {plant.health_benifits.map((id) => {
                    const benifit = allBenifits.find((b) => b.id === id)
                    return (
                        <span key={id}> {benifit?.name}</span>
                    )
                })}
            </h3>
            {editMode ? (
                <>
                    <input
                        value={plant.name}
                        onChange={(e) => setPlant({ ...plant, name: e.target.value })} />
                    <input
                        value={plant.description}
                        onChange={(e) => setPlant({ ...plant, description: e.target.value })} />
                    {
                        ["tropical",
                            "subtropical",
                            "temperate",
                            "arid",
                            "alpine"].map((reg) => (
                                <label key={reg} style={{ display: "block" }}>
                                    <input
                                        type="radio"
                                        name="region"
                                        checked={plant.region === reg}
                                        value={reg}
                                        onChange={(e) => setPlant({ ...plant, region: e.target.value })}

                                    />
                                    {reg}

                                </label>

                            ))
                    }
                    <h2>select type </h2>
                    {[
                        "herb",
                        "shrub",
                        "tree",
                        "climber",
                        "aquatic",
                        "succulent"
                    ].map((type) => (
                        <label key={type} style={{ display: "block" }}>
                            <input
                                type="radio"
                                name="plantype"
                                value={type}
                                checked={plant.plant_type === type}
                                onChange={(e) => setPlant({ ...plant, plant_type: e.target.value })}
                            />

                            {type}
                        </label>
                    ))}
                    {
                        allBenifits.map((benefit) => (
                            <label key={benefit.id} style={{ display: "block" }}>
                                <input
                                    type="checkbox"
                                    value={benefit.id}
                                    checked={plant.health_benifits.includes(benefit.id)}
                                    onChange={(e) => {
                                        const updatedBenefits = e.target.checked
                                            ? [...plant.health_benifits, benefit.id]
                                            : plant.health_benifits.filter(
                                                (id) => id !== benefit.id
                                            );

                                        setPlant({
                                            ...plant,
                                            health_benifits: updatedBenefits
                                        });
                                    }}
                                />
                                {benefit.name}
                            </label>
                        ))
                    }

                    <input
                        type = "file"
                        accept = "image/*"
                        onChange = {(e)=>{setPlant({
                            ...plant,
                            image:e.target.files[0]
                        })}}
                    />

                </>
            ) : null}
            {isAdmin && (

                <div>

                    {editMode ? (
                        <>
                            <button onClick={handleUpdate}> Save </button>
                            <button onClick={() => setEditMode(false)}>Cancel </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setEditMode(true)}>Edit Plant </button>
                            <button> Delete Plant </button>
                        </>
                    )}
                </div>
            )}


        </>
    )
}