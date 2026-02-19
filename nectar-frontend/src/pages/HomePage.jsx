import { useState, useEffect } from "react"
import api from "../api"
import { Navbar } from "../components/Navbar"
import "../styles/HomePage.css"

export function HomePage() {
    const [plants, setPlants] = useState([])
    const [benefits,setBenefits] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const plantOfTheDay = plants.find(
        (p) => p.name.toLowerCase() === "tulsi"
    ) || null

   useEffect(()=>{
        Promise.all([
            api.get("/api/plants/"),
            api.get("/api/healthbenefits/")
        ])
            .then(([plantres,benefitsres])=>{
                const benifits = benefitsres.data
                setBenefits(benifits)

                const mappedplants = plantres.data.map((plant)=>({
                    ...plant,
                    health_benifits: plant.health_benifits
                    .map((id)=> benifits.find((b)=>b.id === id)?.name).filter(Boolean)
                }))
                setPlants(mappedplants)
                setLoading(false)

            })
            .catch((err)=>{
                setError("Failed to load plants")
                setLoading(false)
            })
   },[])
    return (
        <div className="home-page">
            <Navbar />

            <div className="home-layout">

                {/* ── LEFT: Filters (hardcoded UI only) ─────────── */}
                <aside className="panel filters-panel">
                    <h2 className="panel__title">Filters</h2>

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
                            {["Anti-inflammatory", "Digestive Health", "Immunity Boost", "Stress Relief", "Skin Care", "Antioxidant"].map((b) => (
                                <label key={b} className="benefit-item">
                                    <input type="checkbox" disabled />
                                    {b}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button className="filter-clear-btn" disabled>
                        Clear All Filters
                    </button>
                </aside>

                {/* ── CENTER: Plant Cards ────────────────────────── */}
                <main className="plants-panel">
                    <h2 className="panel__title">Medicinal Plants</h2>

                    {loading && <p className="result-count">Loading plants…</p>}

                    {error && (
                        <p className="result-count" style={{ color: "#e8a0a0" }}>{error}</p>
                    )}

                    {!loading && !error && (
                        <>
                            <p className="result-count">
                                Showing {plants.length} plants
                            </p>
                            <div className="plants-grid">
                                {plants.map((plant) => {
                                    const benefits = Array.isArray(plant.health_benifits)
                                        ? plant.health_benifits
                                        : []
                                    return (
                                        <div className="plant-card" key={plant.id} >
                                            <div className="plant-card__img-wrap">
                                                <img src={plant.image} alt={plant.name} />
                                            </div>
                                            <div className="plant-card__body">
                                                <h3 className="plant-card__name">{plant.name}</h3>
                                                <p className="plant-card__region">{plant.region}</p>
                                                <p className="plant-card__desc">{plant.description}</p>
                                                <div className="plant-card__tags">
                                                    {plant.health_benifits.map((b) => (
                                                        <span className="plant-card__tag" key={b}>{b}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )}
                </main>

                {/* ── RIGHT: Plant of the Day ────────────────────── */}
                <aside className="panel potd-panel">
                    <h2 className="panel__title">Plant of the Day</h2>

                    {loading && <p className="result-count">Loading…</p>}

                    {!loading && !plantOfTheDay && (
                        <p className="result-count">Plant not found in database.</p>
                    )}

                    {!loading && plantOfTheDay && (
                        <>
                            <div className="potd-badge">⭐ Featured</div>
                            <div className="potd-img-wrap">
                                <img src={plantOfTheDay.image} alt={plantOfTheDay.name} />
                            </div>
                            <h3 className="potd-name">{plantOfTheDay.name}</h3>
                            <p className="potd-region">{plantOfTheDay.region}</p>
                            <p className="potd-desc">{plantOfTheDay.description}</p>
                            <div className="potd-benefits">
                                <p className="potd-benefits__title">Key Benefits</p>
                                <ul className="potd-benefits__list">
                                    {(Array.isArray(plantOfTheDay.health_benifits)
                                        ? plantOfTheDay.health_benifits
                                        : []
                                    ).map((b) => (
                                        <li key={b}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                            <button className="potd-btn">View Full Profile →</button>
                        </>
                    )}
                </aside>

            </div>
        </div>
    )
}