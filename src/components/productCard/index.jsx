import {
  FiTruck,
  FiStar
} from "react-icons/fi";
import { getImage } from "./productCard.service"
import {
  useState,
} from "react";
import {
  Link as RouterLink
} from "react-router";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  return (
    <RouterLink
      to={`/product/${product._id}`}
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-header">
        {product.patrocinado && (
          <span className="sponsored-badge">Patrocinado</span>
        )}
        {product.envioGratis && (
          <span className="free-shipping-badge">
            <FiTruck className="truck-icon" /> Envío gratis
          </span>
        )}
      </div>

      <div className="product-image">
        <img
          src={getImage(product.imagenes[0])}
          alt={product.nombre}
          className="product-img"
        />
      </div>

      <div className="product-info">
        <div className="product-brand">{product.marca}</div>
        <h3 className="product-name">{product.nombre}</h3>
        <p className="product-seller">Por {product.marca}</p>

        <div className="price-container">
          <div className="price-mini-container">
            <span className="current-price">$ {formatPrice(product.precio * product.descuento)}</span>
            {product.descuento > 0 && (
                <span className="discount">{product.descuento*100}% OFF</span>
              )}
            </div>
          {product.descuento > 0 && (
              <span className="original-price">$ {formatPrice(product.precio)}</span>
          )}
        </div>

        <div className="rating-info">
          <FiStar className="star-icon" />
          <span>{product.calificacion.toFixed(1)}</span>
        </div>

        <div className={`view-product-button ${isHovered ? 'visible' : ''}`}>
          <button className="view-product-btn">
            Ver producto
          </button>
        </div>
      </div>
    </RouterLink>
  );
};
