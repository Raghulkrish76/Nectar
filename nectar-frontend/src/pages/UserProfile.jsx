import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { Navbar } from "../components/Navbar"
import { PlantOfTheDay } from "./PlantOfTheDay"
import { Link } from "react-router"
import api from "../api"
import "../styles/UserProfile.css"

export function UserProfile() {
    const { username, role } = useAuth()
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        const getBookmarks = async () => {
            try {
                const response = await api.get("/api/bookmarks/")
                setBookmarks(response.data)
            } catch (error) {
                console.error(error.response?.data || error.message)
            }
        }
        getBookmarks()
    }, [])
    useEffect(() => { document.title = "My Profile - Nectar"; }, [])

    return (
        <div className="profile-page">
            <Navbar />
            <div className="profile-layout">

                <main className="profile-main">

                    <div className="profile-header">
                        <span className="profile-header__eyebrow">Your Account</span>
                        <h1 className="profile-username">{username}</h1>
                        <p className="profile-role">{role}</p>
                        <div className="profile-gold-divider" />
                        <p className="profile-bookmark-count">
                            Bookmark count: <strong>{bookmarks.length}</strong>
                        </p>
                    </div>

                    <div className="profile-bookmarks-section">
                        <h2 className="profile-bookmarks-heading">Saved Plants</h2>
                        <div className="profile-bookmarks-list">
                            {bookmarks.length === 0 && (
                                <p className="profile-empty">No bookmarks yet. Start exploring!</p>
                            )}
                            {bookmarks.map((bookmark) => (
                                <div key={bookmark.id} className="profile-bookmark-item">
                                    <p>  <Link to={`/plants/${bookmark.plant.id}`}>{bookmark.plant.name}   </Link> </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </main>

                <aside className="potd-sidebar">
                    <PlantOfTheDay />
                </aside>

            </div>
        </div>
    )
}