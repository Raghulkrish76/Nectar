import api from "../api"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/CreatePlant.css"

export function CreatePlant() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [region, setRegion] = useState("")
    const [plantType, setplantType] = useState("")
    const [healthBenefits, setHealthBenefits] = useState([])
    const [allBenefits, setAllBenefits] = useState([])
    const [image, setImage] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        api.get("/api/healthbenefits")
            .then((res) => setAllBenefits(res.data))
            .catch((err) => console.log(err))
    }, [])

    const handleSubmit = async () => {
        try {
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

            await api.post('api/plants/create/', formData)
            navigate("/")

            alert("Plant created successfully")
        } catch (error) {
            console.log(error)
        }
    }

    const plantTypes = ["herb", "shrub", "tree", "climber", "aquatic", "succulent"]
    const regions = ["tropical", "subtropical", "temperate", "alpine", "arid"]

    return (
        <main className="create-plant-page">
            <div className="create-plant-container">

                <header className="create-plant-header">
                    <span className="create-plant-eyebrow">Admin Panel</span>
                    <h1 className="create-plant-title">Add a New Plant</h1>
                    <div className="create-plant-divider"></div>
                </header>

                <article className="create-plant-form-card">

                    {/* Plant Name */}
                    <section className="form-field-group">
                        <label className="form-field-label" htmlFor="plant-name">
                            Plant Name
                        </label>
                        <input
                            id="plant-name"
                            className="form-text-input"
                            type="text"
                            placeholder="e.g. Ashwagandha, Tulsi, Neem"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </section>

                    {/* Description */}
                    <section className="form-field-group">
                        <label className="form-field-label" htmlFor="plant-description">
                            Description
                        </label>
                        <input
                            id="plant-description"
                            className="form-text-input"
                            type="text"
                            placeholder="Brief description of the plant and its traditional uses"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </section>

                    <div className="form-section-divider"></div>

                    {/* Plant Type */}
                    <section className="form-field-group">
                        <h2 className="form-section-heading">Plant Type</h2>
                        <div className="form-options-grid">
                            {plantTypes.map((type) => (
                                <label key={type} className="form-option-label">
                                    <input
                                        type="radio"
                                        name="plantType"
                                        value={type}
                                        checked={plantType === type}
                                        onChange={(e) => setplantType(e.target.value)}
                                    />
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </label>
                            ))}
                        </div>
                    </section>

                    <div className="form-section-divider"></div>

                    {/* Region */}
                    <section className="form-field-group">
                        <h2 className="form-section-heading">Region</h2>
                        <div className="form-options-grid">
                            {regions.map((reg) => (
                                <label key={reg} className="form-option-label">
                                    <input
                                        type="radio"
                                        name="region"
                                        value={reg}
                                        checked={region === reg}
                                        onChange={(e) => setRegion(e.target.value)}
                                    />
                                    {reg === "alpine"
                                        ? "Alpine / Himalayan"
                                        : reg.charAt(0).toUpperCase() + reg.slice(1)}
                                </label>
                            ))}
                        </div>
                    </section>

                    <div className="form-section-divider"></div>

                    {/* Health Benefits */}
                    {allBenefits.length > 0 && (
                        <section className="form-field-group">
                            <h2 className="form-section-heading">Health Benefits</h2>
                            <div className="form-benefits-grid">
                                {allBenefits.map((benefit) => (
                                    <label key={benefit.id} className="form-option-label">
                                        <input
                                            type="checkbox"
                                            value={benefit.id}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setHealthBenefits([...healthBenefits, benefit.id])
                                                } else {
                                                    setHealthBenefits(
                                                        healthBenefits.filter((id) => id !== benefit.id)
                                                    )
                                                }
                                            }}
                                        />
                                        {benefit.name}
                                    </label>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="form-section-divider"></div>

                    {/* Image Upload */}
                    <section className="form-field-group">
                        <h2 className="form-section-heading">Plant Image</h2>
                        <div className="form-file-upload-area">
                            <span className="form-file-upload-icon">🌿</span>
                            <span className="form-file-upload-text">
                                Upload a clear photograph of the plant
                            </span>
                            <input
                                className="form-file-input"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="form-submit-area">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn-primary"
                            onClick={handleSubmit}
                        >
                            Add Plant
                        </button>
                    </div>

                </article>
            </div>
        </main>
    )
}