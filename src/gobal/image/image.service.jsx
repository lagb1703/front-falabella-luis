import { useRef, useCallback } from "react";
import { backendURL, isDevelopment } from "@/pages/index";

export default function useImages() {
    const images = useRef(new Map());
    const getImage = useCallback(async (key) => {
        if (!images.current.has(key)) {
            const image = await getUrlImage(key);
            images.current.set(key, image);
        }
        return images.current.get(key);
    }
        , []);
    return getImage;
}

async function getUrlImage(url) {
    if (isDevelopment) {
        const response = await fetch(url);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    }
    const response = await fetch(`${backendURL}files/images/${url}`);
    if (!response.ok) {
        throw new Error("Error al cargar la imagen");
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}