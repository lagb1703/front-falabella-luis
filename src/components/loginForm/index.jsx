import React from 'react';
import './loginForm.css';
import { FiEyeOff } from 'react-icons/fi';
import { RiCloseLargeFill } from "react-icons/ri";


export default function LoginForm() {
    return (
        <div className='wrapper'>
            <form action="">
                <div className="close">
                    <RiCloseLargeFill />
                </div>

                <div className="logo">
                    <img src="https://images.contentstack.io/v3/assets/blt7c5c2f2f888a7cc3/blt9a6cb2faab703fa5/65a68ebb130790558acbf0cb/falabella.com_green_icon.svg"
                        alt="logo de falabella"
                        style={{ width: '100px', height: 'auto', borderRadius: '10px' }}
                    />
                </div>

                <h1>Inicia sesión para comprar</h1>

                <div className="input-box">
                    <input type="text" placeholder="Ingresa tu correo electrónico" required />
                </div>

                <div className="input-box">
                    <input type="password" placeholder="ingresa tu contraseña" required />
                    <FiEyeOff className='icon' />
                </div>

                <div className="remember">
                    <p>¿Olvidaste tu contraseña? No te preocupes, pide un código verificador por <a href="#">correo</a> o <a href="#">SMS</a></p>
                </div>

                <div className="button">
                    <button type="submit">Ingresar</button>
                </div>

                <div className="register-link">
                    <p>¿Aún no tienes cuenta?  <a href="#">Regístrate</a></p>
                </div>

            </form>
        </div>
    );
}