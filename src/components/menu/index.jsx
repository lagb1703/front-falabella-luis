import { useState, useRef, useEffect } from 'react';
import { FaGreaterThan } from "react-icons/fa6";
import './menu.css';


export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const categorias = [
        { name: 'Tecnología', href: '/tecnologia' },
        { name: 'Celulares y accesorios', href: '/celulares-accesorios' },
        { name: 'Electrohogar', href: '/electrohogar' },
        { name: 'Moda mujer', href: '/moda-mujer' },
        { name: 'Moda hombre', href: '/moda-hombre' },
        { name: 'Tenis y zapatos', href: '/tenis-zapatos' },
        { name: 'Belleza y salud', href: '/belleza-salud' },
        { name: 'Accesorios de moda', href: '/accesorios-moda' },
        { name: 'Niños y juguetes', href: '/ninos-juguetes' },
        { name: 'Moda niños y bebés', href: '/moda-ninos-bebes' },
        { name: 'Muebles y organización', href: '/muebles-organizacion' },
        { name: 'Dormitorio', href: '/dormitorio' },
        { name: 'Bebé', href: '/bebe' },
        { name: 'Cocina y menaje', href: '/cocina' },
        { name: 'Deportes y aire libre', href: '/deportes' },
        { name: 'Decoración e iluminación', href: '/decoracion' },
        { name: 'Mascotas', href: '/mascotas' },
        { name: 'Herramientas y maquinaria', href: '/herramientas' },
        { name: 'Jardín y terraza', href: '/jardin' },
        { name: 'Ferretería y construcción', href: '/ferreteria' },
        { name: 'Supermercado', href: '/supermercado' },
        { name: 'Automotriz', href: '/automotriz' },
        { name: 'Motos', href: '/motos' },
        { name: 'Baño', href: '/baño' },
        { name: 'Servicios y experiencias', href: '/servicios' },
        { name: 'Crate&Barrel', href: '/Crate&Barrel' },
        { name: 'Libros, papelería y música', href: '/libros' }
    ];

    return (
        <div>
            <button id="botonmenu" onClick={toggleMenu} className={isOpen ? 'open' : ''}>
                <div className="menu-line"></div>
                <div className="menu-line"></div>
                <div className="menu-line"></div>
            </button>

            <nav id="menu" ref={menuRef} className={isOpen ? 'open' : ''}>

                <div className="menu-header">
                    <div className="menu-top-line"></div>
                    <div className="menu-title">
                        <span>¡Hola!</span>
                        <button className="close-button" onClick={toggleMenu}>X</button>
                    </div>
                </div>

                <ul>
                    {categorias.map((categoria, index) => (
                        <li key={index}>
                            <a href={categoria.href}>
                                {categoria.name}
                                <FaGreaterThan className="categoria-icon" />
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>

    )
}