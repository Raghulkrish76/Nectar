import api from "../api"
import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import { PlantOfTheDay } from "./PlantOfTheDay"
import "../styles/Bookmarks.css"

export function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([])
    useEffect(() => {
        api.get('/api/bookmarks')
            .then(response => setBookmarks(response.data))
    }, [])
    useEffect(() => { document.title = "My Bookmarks - Nectar"; }, [])
    return (
        <div className="bookmarks-page">
            <Navbar />
            <div className="bookmarks-layout">

                <main className="bookmarks-main">
                    <div className="bookmarks-header">
                        <span className="bookmarks-eyebrow">My Collection</span>
                        <h1 className="bookmarks-title">Bookmarks</h1>
                        <div className="bookmarks-gold-divider" />
                        <p className="bookmarks-count">{bookmarks.length} saved plant{bookmarks.length !== 1 ? "s" : ""}</p>
                    </div>

                    <div className="bookmarks-list">
                        {bookmarks.length === 0 && (
                            <p className="bookmarks-empty">No bookmarks yet. Start exploring plants!</p>
                        )}
                        {bookmarks.map((bookmark) => (
                            <div key={bookmark.id} className="bookmark-card">
                                <p className="bookmark-plant-name">{bookmark.plant.name}</p>
                            </div>
                        ))}
                    </div>
                </main>

                <aside className="potd-sidebar">
                    <PlantOfTheDay />
                </aside>

            </div>
        </div>
    )
}