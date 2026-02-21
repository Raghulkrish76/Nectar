import api from "../api"
import { useState, useEffect } from "react"
import {useNavigate } from "react-router-dom"

export function CreatePlant() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [region, setRegion] = useState("")
    const [plantType, setplantType] = useState("")
    const [healthBenefits, setHealthBenefits] = useState([])
    const [allBenefits, setAllBenefits] = useState([])
    const [image,setImage] =useState(null)
     const navigate = useNavigate()

    useEffect(() => {
        api.get("/api/healthbenefits")
            .then((res) => setAllBenefits(res.data))
            .catch((err) => console.log(err))
    }, [])

    const handleSubmit = async()=>{
        try{
            const formData = new FormData()

        formData.append("name", name)
        formData.append("description", description)
        formData.append("plant_type", plantType)
        formData.append("region", region)

        healthBenefits.forEach((id) => {
            formData.append("health_benifits", id)
        })

        if (image) {
            formData.append("image", image)
        }

        await api.post('api/plants/create',formData)
        navigate("/")
       

        alert("Plant created successfully")
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <input
                type="text"
                placeholder="Plant Name"
                onChange={(e) => setName(e.target.value)}

            />

            <input
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <h3>Plant Type</h3>

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
                        name="plantType"   // same name for all
                        value={type}
                        checked={plantType === type}
                        onChange={(e) => setplantType(e.target.value)}
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
            ))}

            <h3>Region</h3>

            {[
                "tropical",
                "subtropical",
                "temperate",
                "alpine",
                "arid"
            ].map((reg) => (
                <label key={reg} style={{ display: "block" }}>
                    <input
                        type="radio"
                        name="region" 
                        value={reg}
                        checked={region === reg}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                    {reg === "alpine"
                        ? "Alpine/Himalayan"
                        : reg.charAt(0).toUpperCase() + reg.slice(1)}
                </label>
            ))}

            {allBenefits.map((benefit) => (
    <label key={benefit.id}>
        <input
            type="checkbox"
            value={benefit.id}
            onChange={(e) => {
                if (e.target.checked) {
                    setHealthBenefits([
                        ...healthBenefits,
                        benefit.id
                    ])
                } else {
                    setHealthBenefits(
                        healthBenefits.filter(
                            (id) => id !== benefit.id
                        )
                    )
                }
            }}
        />
        {benefit.name}
    </label>
))}

    <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
/>
    <button onClick={handleSubmit}> Submit </button>
        </>
    )
}