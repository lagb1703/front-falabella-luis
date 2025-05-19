import {
  useShoppingCartInfo
} from './resumeCart.service';
import EpaycoButton from "@/components/paymentButton"
export default function ResumeComponent() {
  const {
    length, 
    price,
    discountNumber,
    discount,
    total
  } = useShoppingCartInfo()
  return (
    <div className="right-column">
      <h2 className="summary-header">Resumen de la orden</h2>
      <div className="order-summary">
        <div className="summary-row">
          <span>Productos ({length})</span>
          <span>${price}</span>
        </div>

        <div className="discounts-section">
          <div className="discounts-header">
            <div className="discounts-title">
              <span>Descuentos ({discountNumber})</span>
            </div>
            <span>- ${discount}</span>
          </div>

          {/* {showDiscountDetails && (
            <div className="discount-details">
              {cartItems.map(item => item.discount ? (
                <div key={item.id} className="discount-item">
                  <span>{item.name}</span>
                  <span>- ${formatPrice(item.discount)}</span>
                </div>
              ) : null)}
            </div>
          )} */}
        </div>

        <div className="summary-row total">
          <span>Total:</span>
          <span>${total}</span>
        </div>

        {/* <div className="summary-row falabella-total">
          <span>Total con Falabella:</span>
          <span>${formatPrice(falabellaTotal)}</span>
        </div> */}

        <EpaycoButton />
      </div>
    </div>
  );
}