import { useEffect, useState } from "react"
import api from "../api"
import { Navbar } from "../components/Navbar"
import "../styles/AdminDashboard.css"

export function AdminDashboard() {

    const [stats, setStats] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, usersRes] = await Promise.all([
                    api.get("/api/adminstats"),
                    api.get("/api/adminusers")
                ]);
                setStats(statsRes.data)
                setUsers(usersRes.data)

            } catch (error) {
                console.log(error)
                setError("Failed to load data")
            } finally {
                setLoading(false)
            }
        }
        fetchDashboardData()
    }, [])

    useEffect(() => { document.title = "Admin Dashboard - Nectar"; }, [])

    if (loading) return <p className="admin-loading">Loading data…</p>
    if (error) return <p className="admin-error">{error}</p>
    return (
        <div className="admin-page">
            <Navbar />
            <div className="admin-container">

                <div className="admin-header">
                    <span className="admin-header__eyebrow">Management</span>
                    <h1 className="admin-header__title">Dashboard</h1>
                    <div className="admin-header__divider" />
                </div>

                <div className="admin-stats">
                    <div className="stat-card">
                        <span className="stat-card__label">Total Plants</span>
                        <p className="stat-card__value">{stats.total_plants}</p>
                    </div>
                    <div className="stat-card">
                        <span className="stat-card__label">Total Users</span>
                        <p className="stat-card__value">{stats.total_users}</p>
                    </div>
                </div>

                <div className="admin-users">
                    <div className="admin-users__header">
                        <h2 className="admin-users__title">All Users</h2>
                    </div>
                    {users.map((user, index) => (
                        <div key={index} className="user-row">
                            <p className="user-row__name"> {user.username} </p>
                            <p className="user-row__role">{user.role} </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}