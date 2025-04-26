import { useState } from "react";

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