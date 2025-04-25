import { useShoppingCart } from './shoppingCartPage.service'
import ResumeComponent from '@/components/resumeCart'
import ProductCartList from '@/components/productCartList';
import './shoppingCart.css'

export default function ShoppingCartPage() {
    const {
        products,
        length
    } = useShoppingCart();

    const isEmpty = length === 0;

    if (isEmpty) {
        return (
            <div className="shopping-cart-layout">
                <div className="empty-cart-container">
                    <h1 className="cart-header">Tu Carro está vacío</h1>
                    <div className="empty-cart-message">
                        <p className="login-message">Inicia sesión para ver los productos que habías guardado en tu Carro.</p>
                        <button className="login-btn">Iniciar sesión</button>
                        <p className="register-text">¿No tienes cuenta? <span className="register-link">Regístrate</span></p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="shopping-cart-layout">
            <div className="left-column">
                <h1 className="cart-header">Carro ({length} producto{length !== 1 && 's'})</h1>
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
