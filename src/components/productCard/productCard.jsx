import { FiTruck, FiStar, FiChevronDown, FiChevronLeft, FiChevronRight  } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function ProductCard ({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const discount = Math.round(100 - (product.price / product.originalPrice * 100));

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.sponsored && (
        <span className="sponsored-badge">Patrocinado</span>
      )}
      {product.freeShipping && (
        <span className="free-shipping-badge">
          <FiTruck className="truck-icon" /> Envío gratis
        </span>
      )}
      
      <div className="product-image">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="product-img"
          onError={(e) => {
            e.target.src = '/images/placeholder-product.jpg';
          }}
        />
      </div>
      
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-seller">Por {product.brand}</p>
        
        <div className="price-container">
          <span className="current-price">$ {formatPrice(product.price)}</span>
          {discount > 0 && (
            <>
              <span className="discount">{discount}% OFF</span>
              <span className="original-price">$ {formatPrice(product.originalPrice)}</span>
            </>
          )}
        </div>
        
        <div className="rating-info">
          <FiStar className="star-icon" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
        
        <div className="product-color">
          Color: {product.color}
        </div>

        <div className={`view-product-button ${isHovered ? 'visible' : ''}`}>
          <button className="view-product-btn">
            Ver producto
          </button>
        </div>
      </div>
    </div>
  );
};
