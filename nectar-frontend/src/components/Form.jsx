import { useState } from "react"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import api from "../api"
import { useNavigate } from 'react-router-dom'

export function Form({ route, method }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [adminToken, setAdminToken] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = { username, password }
            if (method === 'register' && adminToken) {
                payload.admin_token = adminToken
            }
            const res = await api.post(route, payload)
            console.log(res.data)
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            }
            else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }


    }
    return (
        <>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    className="auth-form__input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="auth-form__input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {method === 'register' && (
                    <input
                        className="auth-form__input"
                        type="text"
                        value={adminToken}
                        onChange={(e) => setAdminToken(e.target.value)}
                        placeholder="Admin token (optional)"
                    />
                )}

                <button type="submit" disabled={loading} className="auth-form__btn">
                    {loading ? 'Loading...' : (method === 'register' ? 'Register' : 'Login')}
                </button>

            </form>
        </>
    )
}