import shoppingCartContext from "./shoppingCart.context";
import useCart from "./shoppingCart.service";

export default function ShoppingCartContext({children}){
    const shoppingCartData = useCart();
    return(
        <shoppingCartContext.Provider value={{...shoppingCartData}}>
            {children}
        </shoppingCartContext.Provider>
    );
}