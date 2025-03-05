import { useState, useEffect } from "react";
import { backendURL } from "@/pages";
import footerNavigationMock from "./mocks/footerNavigation.mock.json"
export function useGetNavigationFooter(){
    const [getData, setData] = useState([])
    useEffect(()=>{
        const data = fetch(backendURL)
        data.then(res => res.json()).then(res => setData(res.data))
    }, [])
    return getData
}