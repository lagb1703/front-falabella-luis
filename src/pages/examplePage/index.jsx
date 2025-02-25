import { useGetInformation } from "./examplePage"
import { useEffect } from "react"
import { v4 as uuid } from "uuid"
import {Button} from "@chakra-ui/react"
export default function ExamplePage({ }) {
    const { getNames, setParams } = useGetInformation({ parametro1: "pepe", parametro2: "pepe" })
    useEffect(() => {
        setParams(i => {
            i.parametro1 = "divin"
            i.paremetro2 = "joder"
            return i
        })
    }, [])
    console.log(getNames)
    return (
    <>
        <h1>prueba Pagina</h1>
        <ol>
            {getNames.map((i)=>{
                return (<li key={uuid()}><Button>{i.name}</Button></li>)
            })}
        </ol>
    </>)
}