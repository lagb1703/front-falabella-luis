import { useState, useEffect } from "react";
import footerNavigationMock from "./mocks/footerNavigation.mock.json"
export function useGetNavigationFooter(){
    const [getData, setData] = useState([])
    useEffect(()=>{
        setData(footerNavigationMock)
    }, [])
    return getData
}