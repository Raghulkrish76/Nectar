import { useEffect, useState } from "react"
import api from "../api"
import { Link } from "react-router-dom"
import "../styles/LandingPage.css"

export function LandingPage() {
    const [plants, setPlants] = useState([])
    useEffect(() => {
        const plants = async () => {
            try {
                const res = await api.get("api/landingpage/plants/")
                setPlants(res.data)
            } catch (error) {
                console.log(error.response.data)
            }
        }
        plants()
    }, [])
    useEffect(() => { document.title = "Welcome - Nectar"; }, [])
    return (
        <div className="landing-page">

            <header className="landing-hero">
                <span className="landing-hero__eyebrow">Traditional Indian Wisdom</span>
                <h1 className="landing-hero__title">
                    Discover <span>Nectar</span>
                </h1>
                <p className="landing-hero__subtitle">
                    A living encyclopedia of traditional Indian medicinal plants — rooted in Ayurveda, trusted through generations.
                </p>
                <div className="landing-hero__divider" />

                <div className="landing-cta">
                    <Link to="/register/" className="btn btn--primary">Explore Now</Link>
                    <Link to="/login/" className="btn btn--secondary">Login</Link>
                    <Link to="/register/" className="btn btn--secondary">Register</Link>
                </div>
            </header>

            <section className="landing-plants">
                <span className="landing-plants__eyebrow">Featured</span>
                <h2 className="landing-plants__title">Medicinal Plants</h2>
                <div className="landing-plants__divider" />

                <div className="landing-plants-grid">
                    {plants.map((plant, index) => (
                        <div key={index} className="landing-plant-card">
                            <div className="landing-plant-card__img-wrap">
                                {plant.image && <img src={plant.image} alt={plant.name} />}
                            </div>
                            <div className="landing-plant-card__body">
                                <h3 className="landing-plant-card__name"> {plant.name}</h3>
                                <p className="landing-plant-card__desc">{plant.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}