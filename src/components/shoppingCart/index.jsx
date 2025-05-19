import React, { useState } from 'react';
import { SlArrowUp } from "react-icons/sl";
import './shoppingCart.css';
import { cartItems, calculateTotal, formatPrice, isCartEmpty } from './shoppingCart.service';

const ShoppingCart = () => {
  const [showDiscountDetails, setShowDiscountDetails] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState(
    isCartEmpty(cartItems) ? [] : cartItems.map(() => 1)
  );
  const [currentCartItems, setCurrentCartItems] = useState(cartItems);

  const toggleDiscountDetails = () => {
    setShowDiscountDetails(!showDiscountDetails);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(currentCartItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleItemSelect = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(1, Math.min(20, value));
    setQuantities(newQuantities);
  };

  const incrementQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const decrementQuantity = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    } else {
      // Eliminar el producto si la cantidad es 1
      const newCartItems = [...currentCartItems];
      newCartItems.splice(index, 1);
      setCurrentCartItems(newCartItems);
      
      // Actualizar las cantidades y los items seleccionados
      newQuantities.splice(index, 1);
      setQuantities(newQuantities);
      
      setSelectedItems(selectedItems.filter(id => id !== currentCartItems[index].id));
    }
  };

  // Función para calcular el subtotal de un producto (precio * cantidad)
  const calculateProductSubtotal = (item, quantityIndex) => {
    return (item.price - (item.discount || 0)) * quantities[quantityIndex];
  };

  // Función para calcular el subtotal sin descuentos (para mostrar el precio original total)
  const calculateOriginalSubtotal = (item, quantityIndex) => {
    return item.price * quantities[quantityIndex];
  };

  // Calcula el total basado en los items actuales y sus cantidades
  const total = currentCartItems.reduce((sum, item, index) => {
    return sum + calculateProductSubtotal(item, index);
  }, 0);

  const falabellaTotal = total * 0.9;

  // cuando el carrito está vacío
  if (isCartEmpty(currentCartItems)) {
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
      {/* Columna izquierda con título */}
      <div className="left-column">
        <h1 className="cart-header">Carro ({currentCartItems.length} producto)</h1>
        <div className="cart-section">
          <div className="seller-section">
            <p>Vendido por Marketplace</p>
            <label className="select-all">
              <input 
                type="checkbox" 
                checked={selectedItems.length === currentCartItems.length && currentCartItems.length > 0}
                onChange={handleSelectAll}
              />
              Seleccionar todos
            </label>
          </div>
          
          <div className="cart-items">
            {currentCartItems.map((item, index) => (
              <div key={item.id} className="cart-item">
                <div className="item-select">
                  <input 
                    type="checkbox" 
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemSelect(item.id)}
                  />
                </div>
                
                <div className="product-image">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3>{item.name} {item.brand}</h3>
                  <p>Vendido por {item.seller}</p>
                  
                  <div className="delivery-tags">
                    <span className="delivery-time">{item.arrives}</span>
                    <span className="free-shipping">
                      {item.freeShipping ? 'Envío gratis' : 'Costo de envío aplica'}
                    </span>
                  </div>
                  
                  <div className="price-quantity-container">
                    <div className="price-section">
                      <span className="discounted-price">${formatPrice(calculateProductSubtotal(item, index))}</span>
                      <span className="original-price">${formatPrice(calculateOriginalSubtotal(item, index))}</span>
                      <span className="discount-percent">
                        {Math.round((item.discount/item.price)*100)}%
                      </span>
                    </div>
                    
                    <div className="quantity-control">
                      <div className="quantity-buttons">
                        <button onClick={() => decrementQuantity(index)}>-</button>
                        <span>{quantities[index]}</span>
                        <button onClick={() => incrementQuantity(index)}>+</button>
                      </div>
                      <div className="max-units">Máx 20 unidades</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Columna derecha con título */}
      <div className="right-column">
        <h2 className="summary-header">Resumen de la orden</h2>
        <div className="order-summary">
          <div className="summary-row">
            <span>Productos ({currentCartItems.length})</span>
            <span>${formatPrice(currentCartItems.reduce((sum, item, idx) => sum + (item.price * quantities[idx]), 0))}</span>
          </div>
          
          <div className="discounts-section">
            <div className="discounts-header" onClick={toggleDiscountDetails}>
              <div className="discounts-title">
                <SlArrowUp className={`arrow-icon ${showDiscountDetails ? 'open' : ''}`} />
                <span>Descuentos ({currentCartItems.filter(item => item.discount).length})</span>
              </div>
              <span>- ${formatPrice(currentCartItems.reduce((sum, item, idx) => sum + ((item.discount || 0) * quantities[idx]), 0))}</span>
            </div>
            
            {showDiscountDetails && (
              <div className="discount-details">
                {currentCartItems.map((item, idx) => item.discount ? (
                  <div key={item.id} className="discount-item">
                    <span>{item.name} (x{quantities[idx]})</span>
                    <span>- ${formatPrice(item.discount * quantities[idx])}</span>
                  </div>
                ) : null)}
              </div>
            )}
          </div>
          
          <div className="summary-row total">
            <span>Total:</span>
            <span>${formatPrice(total)}</span>
          </div>
          
          <div className="summary-row falabella-total">
            <span>Total con Falabella:</span>
            <span>${formatPrice(falabellaTotal)}</span>
          </div>
          
          <button className="checkout-btn">Continuar compra</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;