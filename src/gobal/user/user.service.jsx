import { useState, useEffect } from "react";

export default function useUser() {
    const userAccountState = useUserAccount();
    const userLocationState = useUserLocation();
    return {
        ...userAccountState,
        ...userLocationState
    }
}

function useUserAccount() {
    const [getUser, setUser] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);
    useEffect(() => {
        if (getUser) {
            localStorage.setItem("user", JSON.stringify(getUser));
            return
        }
        localStorage.removeItem("user");
    }, [getUser]);
    return {
        getUser,
        setUser
    }
}

function useUserLocation() {
    const [getUserState, setUserState] = useState(null);
    const [getUserCity, setUserCity] = useState(null);
    const [getUserNeighborhood, setUserNeighborhood] = useState(null);
    return {
        getUserState,
        setUserState,
        getUserCity,
        setUserCity,
        getUserNeighborhood,
        setUserNeighborhood
    }
}