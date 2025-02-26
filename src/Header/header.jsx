// Filename - Header.js
import "./header.css";

export default function Header() {
    return (
        <header className="header">
            {/* Menu Button */}
            <button className="menu-button">☰</button>

            {/* Title */}
            <h1 className="title">FALABELLA</h1>

            {/* Login Button */}
            <button className="login-button">Login</button>
        </header>
    );
}
