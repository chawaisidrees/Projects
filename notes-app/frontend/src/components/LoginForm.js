import { useState } from "react";
import { api } from "../api";
import "./LoginForm.css";

export default function LoginForm({ onLogin }) {
    // onLogin = App.js ka function
    // Login successful → user object App.js ko bhejo

    const [username,    setUsername]    = useState("");
    const [password,    setPassword]    = useState("");
    const [isRegister,  setIsRegister]  = useState(false);
    // isRegister:
    //   false = Login mode
    //   true  = Register mode

    const [error, setError] = useState("");
    // Error message — wrong password etc.


    const handleSubmit = async (e) => {
        e.preventDefault();   // page reload rokta hai

        if (isRegister) {
            // ── REGISTER MODE ──────────────────
            const result = await api.register(username, password);

            if (result.detail) {
                // detail = error from backend
                // "Username already exists!"
                setError(result.detail);
                return;
            }

            // Register successful
            setError("");
            alert("Account created! Please login now.");
            setIsRegister(false);   // switch to login mode

        } else {
            // ── LOGIN MODE ─────────────────────
            const result = await api.login(username, password);

            if (result.detail) {
                // "Username not found!" or "Incorrect password!"
                setError(result.detail);
                return;
            }

            // Login successful
            setError("");
            onLogin(result);
            // result = {id: "abc123", username: "ali"}
            // App.js: setUser(result) → notes screen dikhega
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">

                <h1>📓 Notes App</h1>
                <h2>{isRegister ? "Create Account" : "Login"}</h2>

                {/* Error message — sirf tab dikhao jab error ho */}
                {error && (
                    <div className="login-error">{error}</div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Username</label>
                        <input
                            placeholder="Enter username..."
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            // type="password" = dots dikhenge
                            placeholder="Enter password..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn-login">
                        {isRegister ? "Create Account" : "Login →"}
                    </button>

                </form>

                {/* Switch between login and register */}
                <p className="switch-mode">
                    {isRegister ? "Already have an account?" : "No account yet?"}
                    <span onClick={() => {
                        setIsRegister(!isRegister);
                        // !isRegister = opposite
                        // false → true (register)
                        // true  → false (login)
                        setError("");   // clear error
                    }}>
                        {isRegister ? " Login" : " Register"}
                    </span>
                </p>

            </div>
        </div>
    );
}