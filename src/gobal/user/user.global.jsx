import userContext from "./user.context";
import useUser from "./user.service";

export default function UserContext({children}){
    const userData = useUser();
    return(
        <userContext.Provider value={{...userData}}>
            {children}
        </userContext.Provider>
    );
}