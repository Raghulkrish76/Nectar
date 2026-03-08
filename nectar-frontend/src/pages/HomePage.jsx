import { useState, useEffect } from "react"
import api from "../api"
import { Navbar } from "../components/Navbar"
import "../styles/HomePage.css"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { PlantOfTheDay } from "./PlantOfTheDay"
import { PlantCard } from "./PlantCard"

export function HomePage() {
    const { isAdmin, username } = useAuth()
    const navigate = useNavigate()
    const [plants, setPlants] = useState([])
    const [benefits, setBenifits] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [region, setRegion] = useState("")
    const [plantType, setPlantType] = useState("")
    const [appliedFilters, setAppliedFilters] = useState({})
    const [selectedBenefits, setSelectedBenefits] = useState([])

    useEffect(() => { document.title = "Explore Plants - Nectar"; }, [])

    useEffect(() => {
        Promise.all([
            api.get("/api/plants/", { params: appliedFilters }),
            api.get("/api/healthbenefits/"),
        ])
            .then(([plantres, benefitsres]) => {
                const benifits = benefitsres.data
                setBenifits(benifits)
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

                {/* Left Sidebar — Filters */}
                <aside className="sidebar sidebar--filters">
                    <div className="sidebar__user-block">
                        <span className="sidebar__greeting">Welcome back,</span>
                        <Link to="/user-profile/" className="sidebar__username">
                            {username}
                        </Link>
                        <Link to="/bookmarks" className="sidebar__bookmarks-link">
                            <span className="sidebar__bookmarks-icon">🔖</span>
                            My Bookmarks
                        </Link>
                    </div>

                    <div className="sidebar__divider" />

                    <div className="sidebar__section">
                        <h2 className="sidebar__heading">Filters</h2>

                        <div className="filter-group">
                            <span className="filter-group__label">Health Benefits</span>
                            <div className="benefit-checklist">
                                {benefits.map((b) => (
                                    <label key={b.id} className="benefit-checkbox">
                                        <input
                                            type="checkbox"
                                            className="benefit-checkbox__input"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedBenefits([...selectedBenefits, b.name])
                                                } else {
                                                    setSelectedBenefits(selectedBenefits.filter((n) => n !== b.name))
                                                }
                                            }}
                                        />
                                        <span className="benefit-checkbox__label">{b.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            className="btn btn--primary btn--full"
                            onClick={() => {
                                const params = {}
                                if (selectedBenefits.length > 0) params.health_benifits = selectedBenefits.join(",")
                                setAppliedFilters(params)
                            }}
                        >
                            Apply Benefits
                        </button>
                    </div>
                </aside>

                {/* Main Content — Plant Listing */}
                <main className="plants-main">
                    <div className="search-bar">
                        <div className="search-bar__top-row">
                            <div className="search-bar__input-wrapper">
                                <span className="search-bar__icon">🔍</span>
                                <input
                                    type="text"
                                    className="search-bar__input"
                                    placeholder="Search plants by name…"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <button
                                className="btn btn--primary"
                                onClick={() => {
                                    const params = {}
                                    if (search) params.search = search
                                    if (region) params.region = region
                                    if (plantType) params.plant_type = plantType
                                    setAppliedFilters(params)
                                }}
                            >
                                Search
                            </button>
                        </div>

                        <div className="search-bar__filters-row">
                            <select
                                className="search-bar__select"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                            >
                                <option value="">All Regions</option>
                                <option value="tropical">Tropical</option>
                                <option value="subtropical">Sub-tropical</option>
                                <option value="temperate">Temperate</option>
                                <option value="arid">Arid / Desert</option>
                                <option value="alpine">Alpine</option>
                            </select>

                            <select
                                className="search-bar__select"
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
                        </div>
                    </div>

                    <div className="plants-main__header">
                        <div>
                            <span className="section-eyebrow">Encyclopedia</span>
                            <h2 className="section-heading">Medicinal Plants</h2>
                            <div className="gold-divider" />
                        </div>

                        {isAdmin && (
                            <button
                                className="btn btn--secondary"
                                onClick={() => navigate("/plants/create/")}
                            >
                                + Add Plant
                            </button>
                        )}
                    </div>

                    {loading && (
                        <p className="status-message status-message--loading">
                            Loading plants…
                        </p>
                    )}

                    {error && (
                        <p className="status-message status-message--error">{error}</p>
                    )}

                    {!loading && !error && (
                        <>
                            <p className="result-count">
                                Showing <strong>{plants.length}</strong> plants
                            </p>
                            <PlantCard plants={plants} />
                        </>
                    )}
                </main>

                {/* Right Sidebar — Plant of the Day */}
                <aside className="sidebar sidebar--potd">
                    <PlantOfTheDay />
                </aside>

            </div>
        </div>
    )
}