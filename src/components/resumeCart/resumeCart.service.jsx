import { useContext } from 'react'
import shoppingCartContext from '@/gobal/shoppingCart/shoppingCart.context'

export function useShoppingCartInfo(){
    const {getCartProductsDetails} = useContext(shoppingCartContext);
    console.log(getCartProductsDetails)
    const total = getCartProductsDetails.reduce((result, i) => result + i.precio*i.cantidad, 0);
    const discount = getCartProductsDetails.reduce((result, i)=>{
        return result+i.precio*i.descuento*i.cantidad
    }, 0);
    return {
        length: getCartProductsDetails.reduce((result, i) => result + i.cantidad, 0),
        price: formatPrice(total),
        discountNumber: getCartProductsDetails.filter(i => i.descuento > 0).length,
        discount: formatPrice(discount),
        total: total - discount
    }
}

export const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(price);
}

export const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price - (item.discount || 0)), 0);
}