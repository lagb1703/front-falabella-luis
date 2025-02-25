import { useState, useEffect } from "react";
import names from "./mocks/name.mock.json"

export function useGetInformation({parametro1, paremetro2}){
    const [getNames, setNames] = useState([])
    const [getParams, setParams] = useState({parametro1, paremetro2})
    useEffect(()=>{
        setNames(names);
    }, [getParams])
    return {getNames, setParams};
}