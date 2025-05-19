import useImages from "./image.service";
import imageContext from "./image.context";
export default function ImageContext({children}){
    const getImage = useImages();
    return(
        <imageContext.Provider value={{getImage}}>
            {children}
        </imageContext.Provider>
    );
}