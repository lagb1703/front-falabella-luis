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
    const addToCart = useCallback((e) => {
        e.preventDefault();
        setCartItems((prevItems) => [...prevItems, product]);
    }, [product]);
    return {
        addToCart
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