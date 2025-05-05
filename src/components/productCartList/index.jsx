import { useImage } from "../productCard/productCard.service";
import { formatPrice, useProductCart } from "./productCartList.service";
import { v4 as uuid } from 'uuid';
import { Image } from "@chakra-ui/react";

function Product({ product }) {
    const {
        getAmount,
        removeAmount,
        addAmount
    } = useProductCart(product["_id"]);
    const image = useImage(product.imagenes[0]);
    return (
        <div className="cart-item">
            <div className="item-select">
                <input
                    type="checkbox"
                />
            </div>
            <div className="product-image">
                <Image src={image} alt={product.nombre} />
            </div>

            <div className="item-details">
                <h3>{product.nombre} {product.marca}</h3>
                <p>Vendido por falabella</p>

                <div className="delivery-tags">
                    <span className="free-shipping">
                        {product.envioGratis ? 'Envío gratis' : 'Costo de envío aplica'}
                    </span>
                </div>

                <div className="price-quantity-container">
                    <div className="price-section">
                        <span className="discounted-price">${formatPrice(product.precio * (1 - product.descuento))}</span>
                        <span className="original-price">${formatPrice(product.precio)}</span>
                        <span className="discount-percent">
                            {product.descuento * 100}%
                        </span>
                    </div>

                    <div className="quantity-control">
                        <div className="quantity-buttons">
                            <button onClick={removeAmount}>-</button>
                            <span>{getAmount}</span>
                            <button onClick={addAmount}>+</button>
                        </div>
                        <div className="max-units">Máx 20 unidades</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProductCartList({ products }) {
    return (
        <div className="cart-section">
            <div className="seller-section">
                <p>{products[0].marca}</p>
                <label className="select-all">
                    <input
                        type="checkbox"
                    />
                    Seleccionar todos
                </label>
            </div>

            <div className="cart-items">
                {products.map((item) => (
                    <Product
                        key={uuid()} product={item} />
                ))}
            </div>
        </div>
    );
}