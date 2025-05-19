import { useContext, useState, useEffect } from "react";
import imageContext from "@/gobal/image/image.context";

export function useImage(imageUrl) {
    const { getImage } = useContext(imageContext);
    const [image, setImage] = useState(null);
    useEffect(() => {
        (async ()=>{
            if (imageUrl) {
                const image = await getImage(imageUrl);
                setImage(image);
            }
        })();
    }, [imageUrl]);
    return image;

}