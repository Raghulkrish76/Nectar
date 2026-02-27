import { Link } from "react-router"

export function PlantCard({plants}) {

    return (
        <>
            <div className="plants-grid">
                {plants.map((plant) => {
                    return (
                        <Link to={`/plants/${plant.id}`} key={plant.id}>
                            <div className="plant-card"  >
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
                        </Link>
                    )
                })}
            </div>

        </>
    )
}