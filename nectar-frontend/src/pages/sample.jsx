export function HomePage() {
    const [plants, setPlants] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeRegion, setActiveRegion] = useState("All")
    const [activeBenefits, setActiveBenefits] = useState([])

    // Derive Plant of the Day from the live plants list
    const plantOfTheDay = plants.find(
        (p) => p.name.toLowerCase() === "tulsi"
    ) || null

    // List of all available benefits from backend { id, name }
    const [benefitList, setBenefitList] = useState([])

    useEffect(() => {
        Promise.all([
            api.get("/api/plants/"),
            api.get("/api/healthbenefits/")
        ])
            .then(([plantsRes, benefitsRes]) => {
                const benefits = benefitsRes.data
                setBenefitList(benefits)

                // Map backend IDs (health_benifits) to frontend names (health_benefits)
                const mappedPlants = plantsRes.data.map((p) => ({
                    ...p,
                    health_benefits: Array.isArray(p.health_benifits)
                        ? p.health_benifits
                            .map((id) => benefits.find((b) => b.id === id)?.name)
                            .filter(Boolean)
                        : [],
                }))

                setPlants(mappedPlants)
                setLoading(false)
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
                setError("Failed to load data. Please try again.")
                setLoading(false)
            })
    }, [])

    const toggleBenefit = (b) =>
        setActiveBenefits((prev) =>
            prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
        )

    const clearFilters = () => {
        setActiveRegion("All")
        setActiveBenefits([])
    }

    // Filter logic — runs against live backend data
    const filtered = plants.filter((p) => {
        const regionMatch = activeRegion === "All" || p.region === activeRegion
        const benefits = Array.isArray(p.health_benefits) ? p.health_benefits : []
        const benefitMatch =
            activeBenefits.length === 0 ||
            activeBenefits.some((b) => benefits.includes(b))
        return regionMatch && benefitMatch
    })

    return (
        <div className="home-page">
            <Navbar />

            <div className="home-layout">

                {/* ── LEFT: Filters ─────────────────────────────── */}
                <aside className="panel filters-panel">
                    <h2 className="panel__title">Filters</h2>

                    {/* Region chips */}
                    <div className="filter-group">
                        <span className="filter-group__label">Region</span>
                        <div className="region-chips">
                            {REGIONS.map((r) => (
                                <button
                                    key={r}
                                    className={`chip ${activeRegion === r ? "chip--active" : ""}`}
                                    onClick={() => setActiveRegion(r)}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Health benefits checkboxes */}
                    <div className="filter-group">
                        <span className="filter-group__label">Health Benefits</span>
                        <div className="benefit-list">
                            {loading && (
                                <span style={{ fontSize: "0.75rem", color: "#7a9e7a", fontStyle: "italic" }}>
                                    Loading…
                                </span>
                            )}
                            {benefitList.map((b) => (
                                <label key={b.id} className="benefit-item">
                                    <input
                                        type="checkbox"
                                        checked={activeBenefits.includes(b.name)}
                                        onChange={() => toggleBenefit(b.name)}
                                    />
                                    {b.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button className="filter-clear-btn" onClick={clearFilters}>
                        Clear All Filters
                    </button>
                </aside>

                {/* ── CENTER: Plant Cards ────────────────────────── */}
                <main className="plants-panel">
                    <h2 className="panel__title">Medicinal Plants</h2>

                    {loading && (
                        <p className="result-count">Loading plants…</p>
                    )}

                    {error && (
                        <p className="result-count" style={{ color: "#e8a0a0" }}>{error}</p>
                    )}

                    {!loading && !error && (
                        <>
                            <p className="result-count">
                                Showing {filtered.length} of {plants.length} plants
                            </p>
                            <div className="plants-grid">
                                {filtered.map((plant) => {
                                    const benefits = Array.isArray(plant.health_benefits)
                                        ? plant.health_benefits
                                        : []
                                    return (
                                        <div className="plant-card" key={plant.id}>
                                            <div className="plant-card__img-wrap">
                                                <img src={plant.image} alt={plant.name} />
                                            </div>
                                            <div className="plant-card__body">
                                                <h3 className="plant-card__name">{plant.name}</h3>
                                                <p className="plant-card__region">{plant.region}</p>
                                                <p className="plant-card__desc">{plant.description}</p>
                                                <div className="plant-card__tags">
                                                    {benefits.map((b) => (
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

                    {loading && (
                        <p className="result-count">Loading…</p>
                    )}

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
                                    {(Array.isArray(plantOfTheDay.health_benefits)
                                        ? plantOfTheDay.health_benefits
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