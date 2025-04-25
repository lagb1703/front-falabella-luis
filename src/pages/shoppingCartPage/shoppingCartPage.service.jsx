import {
    useContext,
    useEffect,
    useState,
    useCallback
} from "react";
import shoppingCartContext from "@/gobal/shoppingCart/shoppingCart.context";
import { useDisclosure } from "@chakra-ui/react";

export function useLogin() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const openLogin = useCallback((e) => {
        onOpen(e);
    }, [])
    return { isOpen, onOpen }
}

export function useShoppingCart() {
    const [getProducts, setProducts] = useState([]);
    const {
        getCartItems,
        getCartProductsDetails,
        getProductsDetails
    } = useContext(shoppingCartContext);
    useEffect(() => {
        getProductsDetails();
    }, [getCartItems]);
    useEffect(() => {
        setProducts(defferByProperty(getCartProductsDetails, "marca"));
    }, [getCartProductsDetails]);
    return {
        products: getProducts,
        length: getCartItems.length
    };
}

export function defferByProperty(array, property) {
    const mapa = new Map();
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const value = element[property];
        if (!mapa.has(value)) {
            mapa.set(value, [element]);
            continue;
        }
        mapa.get(value).push(element);
    }
    return mapa;
}