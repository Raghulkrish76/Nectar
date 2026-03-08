import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Navbar } from '../components/Navbar'
import { PlantOfTheDay } from './PlantOfTheDay'
import api from '../api'
import '../styles/PlantDetail.css'

export function PlantDetailPage() {
    const { isAdmin } = useAuth()
    const { id } = useParams()
    const [allBenifits, setAllBenifits] = useState([])
    const [plant, setPlant] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const navigate = useNavigate()
    const [deleting, setDeleting] = useState(false)

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

    if (loading) return <p className="admin-loading">Loading…</p>
    if (!plant) return <p className="admin-loading">Plant not found</p>

    const handleUpdate = async () => {
        const formData = new FormData()
        formData.append('name', plant.name)
        formData.append('region', plant.region)
        formData.append('description', plant.description)
        formData.append('plant_type', plant.plant_type)
        plant.health_benifits.forEach((id) => {
            formData.append('health_benefits', id)
        })
        if (plant.image instanceof File) {
            formData.append('image', plant.image)
        }

        try {
            const response = await api.patch(`/api/plants/${id}/update/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setPlant(response.data)
            setEditMode(false)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete")
        if (!confirmed) return
        setDeleting(true)
        try {
            await api.delete(`/api/plants/${id}/delete/`)
            navigate("/")
        } catch (error) {
            console.log(error.response.data)
            alert("Failed to delete plant")
            setDeleting(false)
        }
    }

    const handleBookmark = async () => {
        try {
            await api.post('/api/bookmarks/', { plant_id: plant.id })
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
       
        <div className="plant-detail-page">
             <title> Plants - Nectar</title>
            <Navbar />

            <div className="plant-detail-layout">

                <main className="plant-detail-main">

                    {/* Hero */}
                    <div className="plant-detail-hero">
                        <img className="plant-detail-img" src={plant.image} alt={plant.name} />
                        <h1 className="plant-detail-name">{plant.name}</h1>
                        <div className="plant-detail-gold-divider" />
                    </div>

                    {/* Description */}
                    <p className="plant-detail-desc">{plant.description}</p>

                    {/* Health Benefits */}
                    <div className="plant-benefits-section">
                        <span className="plant-benefits-label">Health Benefits</span>
                        <div className="plant-benefit-tags">
                            {plant.health_benifits.map((id) => {
                                const benifit = allBenifits.find((b) => b.id === id)
                                return (
                                    <span key={id} className="plant-benefit-tag">
                                        {benifit?.name}
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                    {/* Inline Edit Form */}
                    {editMode && (
                        <div className="plant-edit-form">

                            <input
                                className="plant-edit-field"
                                value={plant.name}
                                placeholder="Plant name"
                                onChange={(e) => setPlant({ ...plant, name: e.target.value })}
                            />

                            <input
                                className="plant-edit-field"
                                value={plant.description}
                                placeholder="Description"
                                onChange={(e) => setPlant({ ...plant, description: e.target.value })}
                            />

                            <div>
                                <h2>Region</h2>
                                <div className="plant-radio-group">
                                    {["tropical", "subtropical", "temperate", "arid", "alpine"].map((reg) => (
                                        <label key={reg} className="plant-edit-label">
                                            <input
                                                type="radio"
                                                name="region"
                                                checked={plant.region === reg}
                                                value={reg}
                                                onChange={(e) => setPlant({ ...plant, region: e.target.value })}
                                            />
                                            {reg === "alpine" ? "Alpine / Himalayan" : reg.charAt(0).toUpperCase() + reg.slice(1)}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2>Plant Type</h2>
                                <div className="plant-radio-group">
                                    {["herb", "shrub", "tree", "climber", "aquatic", "succulent"].map((type) => (
                                        <label key={type} className="plant-edit-label">
                                            <input
                                                type="radio"
                                                name="plantype"
                                                value={type}
                                                checked={plant.plant_type === type}
                                                onChange={(e) => setPlant({ ...plant, plant_type: e.target.value })}
                                            />
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2>Health Benefits</h2>
                                <div className="plant-check-group">
                                    {allBenifits.map((benefit) => (
                                        <label key={benefit.id} className="plant-edit-label">
                                            <input
                                                type="checkbox"
                                                value={benefit.id}
                                                checked={plant.health_benifits.includes(benefit.id)}
                                                onChange={(e) => {
                                                    const updatedBenefits = e.target.checked
                                                        ? [...plant.health_benifits, benefit.id]
                                                        : plant.health_benifits.filter((id) => id !== benefit.id)
                                                    setPlant({ ...plant, health_benifits: updatedBenefits })
                                                }}
                                            />
                                            {benefit.name}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2>Replace Image</h2>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="plant-edit-field"
                                    onChange={(e) => setPlant({ ...plant, image: e.target.files[0] })}
                                />
                            </div>

                        </div>
                    )}

                    {/* Admin Actions */}
                    {isAdmin && (
                        <div className="plant-actions">
                            {editMode ? (
                                <>
                                    <button className="btn btn--primary" onClick={handleUpdate}>Save Changes</button>
                                    <button className="btn btn--secondary" onClick={() => setEditMode(false)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn--secondary" onClick={() => setEditMode(true)}>Edit Plant</button>
                                    <button className="btn btn--danger" onClick={handleDelete} disabled={deleting}>
                                        {deleting ? "Deleting…" : "Delete Plant"}
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {/* Bookmark */}
                    <div className="plant-actions">
                        <button className="btn btn--bookmark" onClick={handleBookmark}>
                            {plant.is_bookmarked ? "🔖 Plant Bookmarked" : "🔖 Set Plant as Bookmark"}
                        </button>
                    </div>

                </main>

                <aside className="potd-sidebar">
                    <PlantOfTheDay />
                </aside>

            </div>
        </div>
    )
}