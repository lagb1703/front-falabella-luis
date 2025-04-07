import {
    useParams,
} from "react-router";
import {
    backendURL
} from "@/pages"
import {
    useState,
    useEffect,
    useCallback,
    useContext
} from "react";
import shoppingCartContext from "@/gobal/shoppingCart/shoppingCart.context"

export function getImage(imageName) {
    return `${backendURL}files/images/${imageName}`;
}

export function useCart(product) {
    const { setCartItems } = useContext(shoppingCartContext);
    const [getAmount, setAmount] = useState(1);
    const addAmount = useCallback((e) => {
        e.preventDefault();
        if (getAmount < 20) {
            setAmount((prevAmount) => prevAmount + 1);
        }
    }, [getAmount]);
    const removeAmount = useCallback((e) => {
        e.preventDefault();
        if (getAmount > 1) {
            setAmount((prevAmount) => prevAmount - 1);
        }
    }, [getAmount]);
    const setInputAmount = useCallback((e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        if (value > 0 && value <= 20) {
            setAmount(value);
            return;
        }
        e.target.value = getAmount;
    }, [getAmount]);
    const addToCart = useCallback((e) => {
        e.preventDefault();
        const {code} = product;
        setCartItems((prevItems) => [...prevItems, {product_id:code, carrito_id:0, cantidad: getAmount}]);
    }, [product]);
    return {
        addToCart,
        getAmount,
        addAmount,
        removeAmount,
        setInputAmount
    }
}

export function useGetProduct() {
    const { id } = useParams();
    const [getProduct, setProduct] = useState(null);
    const fetchProduct = useCallback(async () => {
        try {
            const product = await getProductServer(id);
            setProduct(product);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }, [id]);
    useEffect(() => {
        fetchProduct();
    }, [id]);
    return getProduct;
}

async function getProductServer(productId) {
    try {
        const response = await fetch(`${backendURL}products/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}