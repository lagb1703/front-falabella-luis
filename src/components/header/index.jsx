import { IoSearchOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartLight } from "react-icons/pi";
import Menu from "../menu";
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

                < Menu />

                <div className="search-container">
                    <input type="text" placeholder="Buscar en falabella.com" />
                    <button><IoSearchOutline/></button>
                </div>

                <button className="login-button">Inicia sesión</button>

                <button className="misCompras-button">Mis compras</button>

                <button className="Heart-button">
                    <CiHeart />
                </button>

                <button className="Carrito">
                    <PiShoppingCartLight />
                </button>

            </div>

        </header>
    );
}

function SubHeader() {
    return (
        <div className="sub-header">

            <button className="falabella-bedcrums-logo"
                    onPress={() => Alert.alert('Simple Button pressed')}>
                <img src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
                    alt="Logo" />
            </button>

            <a href="https://homecenter.falabella.com.co/homecenter-co">
                <button className="homecenter-bedcrums-logo"
                        onPress={() => Alert.alert('Simple Button pressed')}>
                    <img src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltccc5a7e27f9cab2f/6418aba238ab2c1b60a4bc29/logo-homecenter-our-stores.svg"
                        alt="Logo" />
                </button>
            </a>
        </div>
    );
}