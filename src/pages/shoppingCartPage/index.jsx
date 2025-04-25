import { useShoppingCart, useLogin } from './shoppingCartPage.service'
import { Link } from "react-router"
import ResumeComponent from '@/components/resumeCart'
import ProductCartList from '@/components/productCartList';
import LoginForm from "@/components/loginForm"
import './shoppingCart.css'

export default function ShoppingCartPage() {
    const {
        products,
        length
    } = useShoppingCart();
    const { isOpen, onOpen } = useLogin();
    if (length == 0) {
        return (
            <div className="shopping-cart-layout">
                <div className="empty-cart-container">
                    <h1 className="cart-header">Tu Carro está vacío</h1>
                    <div className="empty-cart-message">
                        <p className="login-message">Inicia sesión para ver los productos que habías guardado en tu Carro.</p>
                        <Link to="" className="login-btn">Iniciar sesión</Link>
                        <p className="register-text">¿No tienes cuenta? <Link to="/registration" className="register-link">Regístrate</Link></p>
                    </div>
                </div>
                <LoginForm isOpen={isOpen} onOpen={onOpen} />
            </div>
        );
    }
    return (
        <div className="shopping-cart-layout">
            <div className="left-column">
                <h1 className="cart-header">Carro ({length} producto)</h1>
                <div className="cart-section">
                    {[...products.values()].map((products, index) => (
                        <ProductCartList
                            key={index}
                            products={products}
                        />
                    ))}
                </div>
            </div>
            <ResumeComponent />
        </div>
    );
}

