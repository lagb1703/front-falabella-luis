import { useContext } from "react";
import userContext from "@/gobal/user/user.context";

export function useLocalUserName(){
    const { getUser } = useContext(userContext);
    return getUser.nombres;
}