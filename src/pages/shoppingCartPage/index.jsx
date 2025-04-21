import { useShoppingCart } from './shoppingCartPage.service'
import ResumeComponent from '@/components/resumeCart'
import ProductCartList from '@/components/productCartList';
import './shoppingCart.css'

export default function ShoppingCartPage() {
    const {
        products,
        length
    } = useShoppingCart();
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

