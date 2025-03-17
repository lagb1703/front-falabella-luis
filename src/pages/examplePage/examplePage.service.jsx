import { useState, useEffect } from "react";
import { backendURL } from "@/pages";
import subfooterNavigationMock from "./mocks/subFooterHome.mock.json";

export function useGetNavigationSubFooter(){
    const [getData, setData] = useState([])
    useEffect(()=>{
        // const data = fetch(backendURL)
        // data.then(res => res.json()).then(res => setData(res.data))
        setData(subfooterNavigationMock);
    }, [])
    return getData
}