import{
    backendURL
} from "@/pages"

export function getImage(imageName){
    return `${backendURL}files/images/${imageName}`
}