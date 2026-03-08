import { Form } from "../components/Form"
import "../styles/Login.css"
import { useEffect } from "react"

export function Login() {   
    useEffect(() => { document.title = "Login - Nectar"; }, [])
    return (
        <div className="auth-page">
            <div className="auth-layout">

                <div className="auth-image-section">
                    <div className="auth-image-placeholder">
                        <span className="auth-image-placeholder__icon">🌿</span>
                        <p className="auth-image-placeholder__text">Nectar</p>
                        <p className="auth-image-placeholder__sub">Traditional Indian Medicinal Plants</p>
                    </div>
                </div>

                <div className="auth-form-section">
                    <div className="auth-form-header">
                        <span className="auth-form-header__eyebrow">Welcome Back</span>
                        <h1 className="auth-form-header__title">Sign In</h1>
                        <div className="auth-form-header__divider" />
                    </div>
                    <Form route="/api/auth/login/" method="login" />
                </div>

            </div>
        </div>
    )
}