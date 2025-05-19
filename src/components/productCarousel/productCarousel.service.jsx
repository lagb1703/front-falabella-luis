import {
    useState,
    useEffect
} from "react";
import { backendURL, isDevelopment } from "@/pages"
import productsMock from "./mock/products.mock"

export function useCarrusel() {
    const [slider, setSlider] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 3,
        variableWidth: false,
        adaptiveHeight: false,
        arrows: false,
        dots: false,
        beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
    };
    return {
        slider,
        setSlider,
        settings
    }
}

export function useProducts(categoryId, userId) {
    const [getProducts, setProducts] = useState([]);
    const [getPage, setPage] = useState(1);
    useEffect(() => {
        (async () => {
            let response = [];
            if (categoryId) {
                response = await getProductsByCategoryId(categoryId, getPage);
            } else if (userId) {
                response = await getProductsByCategoryId(userId, getPage);
            }
            setProducts(response);
        })();
    }, [categoryId, getPage]);
    return {
        products: getProducts,
        setPage
    }
}

async function getProductsByCategoryId(categoryId, page) {
    if (isDevelopment)
        return productsMock;
    const data = await fetch(
        `${backendURL}products/category/${categoryId}?page=${page}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        }
    );
    return await data.json();

}