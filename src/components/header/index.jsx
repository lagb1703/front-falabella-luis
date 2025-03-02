import "./header.css";

export default function Header() {
    return (

        <header className="header">

            <SubHeader />

            <div className="main-header">

                <div className="main-logo" >
                    <img src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
                        alt="Logo" />
                </div>

                <button className="menu-button">☰ Menú</button>

                <div className="search-container">
                    <input type="text" placeholder="Buscar en falabella.com" />
                    <button>🔍</button>
                </div>

                <button className="login-button">Inicia sesión</button>

                <button className="misCompras-button">Inicia sesión</button>

                <button className="Heart-button">Inicia sesión</button>

                <button className="Carrito">Inicia sesión</button>

            </div>

        </header>
    );
}

function SubHeader() {
    return (
        <div className="sub-header">
            <div className="falabella-bedcrums-logo">
                <img src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
                    alt="Logo" />
            </div>

            <div className="homecenter-bedcrums-logo">
                <img src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltccc5a7e27f9cab2f/6418aba238ab2c1b60a4bc29/logo-homecenter-our-stores.svg"
                    alt="Logo" />
            </div>
        </div>
    );
}