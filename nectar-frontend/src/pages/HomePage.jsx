import { useState, useEffect } from "react"
import api from "../api"
import { Navbar } from "../components/Navbar"
import "../styles/HomePage.css"
import { Link, Navigate, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { Bookmarks } from "./Bookmarks"
import { PlantOfTheDay } from "./PlantOfTheDay"
import { PlantCard } from "./PlantCard"

export function HomePage() {
    const [plants, setPlants] = useState([])
    const [benefits, setBenifits] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { isAdmin, username } = useAuth()
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [region, setRegion] = useState("")
    const [plantType, setPlantType] = useState("")
    const [appliedFilters, setAppliedFilters] = useState({})
    const [selectedBenefits, setSelectedBenefits] = useState([])
    const [plantofTheDay,setPlantofTheDay] = useState([])
    useEffect(() => {
        Promise.all([
            api.get("/api/plants/", { params: appliedFilters }),
            api.get("/api/healthbenefits/"),
            api.get("/api/plantoftheday")
        ])
            .then(([plantres, benefitsres,plantofthedayRes]) => {
                const benifits = benefitsres.data
                setBenifits(benifits)
                setPlantofTheDay(plantofthedayRes.data)
                const mappedplants = plantres.data.map((plant) => ({
                    ...plant,
                    health_benifits: plant.health_benifits
                        .map((id) => benifits.find((b) => b.id === id)?.name).filter(Boolean)
                }))
                setPlants(mappedplants)
                setLoading(false)

            })
            .catch((error) => {
                setError("Failed to load plants")
                setLoading(false)
                console.log(error)
            })
    }, [appliedFilters])
    return (
        <div className="home-page">
            <Navbar />


            <div className="home-layout">


                <aside className="panel filters-panel">
                    <h2 className="panel__title">Filters</h2>
                    <h3><Link to = "/user-profile/">
                       Hello {username} !
                     </Link>
                    </h3>
                    <Link to="/bookmarks">
                        <button>Bookmarks</button>
                    </Link>
                    <div className="filter-group">
                        <span className="filter-group__label">Region</span>
                        <div className="region-chips">
                            {["All", "Tropical", "Sub-Tropical", "Temperate", "Arid/Desert", "Alphine/Himalayan"].map((r) => (
                                <button key={r} className="chip">
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <span className="filter-group__label">Health Benefits</span>
                        <div className="benefit-list">
                            {benefits.map((b) => (
                                <label key={b.id} className="benefit-item">
                                    <input type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedBenefits([...selectedBenefits, b.name])
                                            } else {
                                                setSelectedBenefits(selectedBenefits.filter((n) => n !== b.name))
                                            }
                                        }}
                                    />
                                    {b.name}
                                </label>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => {
                        const params = {}
                        if (selectedBenefits.length > 0) params.health_benifits = selectedBenefits.join(",")
                    
                        setAppliedFilters(params)

                    }}>
                        Apply  Health Benefits
                    </button>
                    <button className="filter-clear-btn" disabled >
                        Clear All Filters
                    </button>
                </aside>




                <main className="plants-panel">
                    <div>
                        <input
                            type="text"
                            placeholder="Search Plants"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <select value={region} onChange={(e) => setRegion(e.target.value)}>
                            <option value=""> All Region</option>
                            <option value="tropical"> Tropical </option>
                            <option value="subtropical">Sub-tropical</option>
                            <option value="temperate"> Temperate </option>
                            <option value="arid">Arid/Desert</option>
                            <option value="alpine">Alphine</option>


                        </select>

                        <select
                            value={plantType}
                            onChange={(e) => setPlantType(e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="herb">Herb</option>
                            <option value="shrub">Shrub</option>
                            <option value="tree">Tree</option>
                            <option value="climber">Climber</option>
                            <option value="aquatic">Aquatic</option>
                            <option value="succulent">Succulent</option>
                        </select>
                        <button onClick={() => {
                            const params = {}
                            if (search) params.search = search
                            if (region) params.region = region
                            if (plantType) params.plant_type = plantType
                            setAppliedFilters(params)

                        }}>
                            Apply  Filters
                        </button>

                    </div>
                    <br />
                    <h2 className="panel__title">Medicinal Plants</h2>

                    {loading && <p className="result-count">Loading plants…</p>}

                    {error && (
                        <p className="result-count" style={{ color: "#e8a0a0" }}>{error}</p>
                    )}

                    {isAdmin && (
                        <button onClick={() => navigate("/plants/create/")}>
                            Create Plant
                        </button>
                    )}
                    {!loading && !error && (
                        <>
                            <p className="result-count">
                                Showing {plants.length} plants
                            </p>
                            <PlantCard plants = {plants}/>
                            
                        </>
                    )}
                </main>
                <aside className="panel potd-panel">
                    <PlantOfTheDay/>
                </aside>

            </div>
        </div >
    )
}