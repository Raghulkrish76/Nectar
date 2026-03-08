import { useEffect } from "react"
import { Form } from "../components/Form"
import "../styles/Register.css"

export function Register() {
    useEffect(() => { document.title = "Create Account - Nectar"; }, [])
    return (
        <div className="auth-page">
            <div className="auth-layout">

                <div className="auth-image-section">
                    <div className="auth-image-placeholder">
                        <span className="auth-image-placeholder__icon">🌱</span>
                        <p className="auth-image-placeholder__text">Nectar</p>
                        <p className="auth-image-placeholder__sub">Join our Ayurvedic community</p>
                    </div>
                </div>

                <div className="auth-form-section">
                    <div className="auth-form-header">
                        <span className="auth-form-header__eyebrow">New Here?</span>
                        <h1 className="auth-form-header__title">Create Account</h1>
                        <div className="auth-form-header__divider" />
                    </div>
                    <Form route="/api/auth/register/" method="register" />
                </div>

            </div>
        </div>
    )
}
