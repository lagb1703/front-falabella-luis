import "./header.css";
import logo from "../../public/test.png";

export default function Header() {
    return (
        <header className="header">
            <h1 className="title">
                <img src={logo} alt="Logo" />
            </h1>

            <button className="menu-button">☰</button>

            <div className="search-container">
                <input type="text" placeholder="Buscar en falabella.com" />
                <button>🔍</button>
            </div>

            <button className="login-button">Inicia sesión</button>
        </header>
    );
}
